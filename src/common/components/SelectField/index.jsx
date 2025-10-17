import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

const SelectField = ({
  id,
  label,
  value,
  onChange,
  option = [],
  error,
  helperText,
  FormControlProps = {},
}) => {
  return (
    <FormControl {...FormControlProps} error={Boolean(error)}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        value={value}
        label={label}
        onChange={onChange}
      >
        {option.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{helperText || error}</FormHelperText>}
    </FormControl>
  );
};

export default SelectField;
