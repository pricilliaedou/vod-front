import { TextField } from "@mui/material";

const InputField = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  error,
  helperText,
  TextFieldProps = {},
}) => {
  return (
    <TextField
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      error={Boolean(error)}
      helperText={error ? helperText || error : undefined}
      variant="outlined"
      {...TextFieldProps}
    />
  );
};

export default InputField;
