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
  options = [],
  error,
  helperText,
  FormControlProps = {},
}) => {
  return (
    <FormControl
      {...FormControlProps}
      error={Boolean(error)}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "15px",
        },
      }}
    >
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        value={value}
        label={label}
        onChange={onChange}
      >
        {options.map((item) => (
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
