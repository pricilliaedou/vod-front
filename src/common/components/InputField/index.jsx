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
      name={id}
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      error={Boolean(error)}
      helperText={error ? helperText || error : undefined}
      variant="outlined"
      sx={{
        "& .MuiInputLabel-root": {
          fontSize: "0.875rem",
        },
        ...TextFieldProps.sx,
      }}
      {...TextFieldProps}
    />
  );
};

export default InputField;
