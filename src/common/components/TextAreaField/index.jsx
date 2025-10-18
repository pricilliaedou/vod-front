import { TextField } from "@mui/material";

const TextAreaField = ({
  id,
  label,
  value,
  onChange,
  rows = 4,
  error,
  helperText,
  TextFieldProps = {},
}) => {
  return (
    <TextField
      id={id}
      label={label}
      multiline
      value={value}
      onChange={onChange}
      rows={rows}
      error={Boolean(error)}
      helperText={error ? helperText || error : undefined}
      variant="outlined"
      sx={{
        width: "100%",
        "& .MuiInputLabel-root": {
          fontSize: "0.875rem",
        },
        ...TextFieldProps.sx,
      }}
      {...TextFieldProps}
    />
  );
};

export default TextAreaField;
