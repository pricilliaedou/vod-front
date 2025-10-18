import { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordField = ({
  id,
  label = "Mot de passe",
  value,
  onChange,
  error,
  helperText,
  TextFieldProps = {},
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      id={id}
      label={label}
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={onChange}
      error={Boolean(error)}
      helperText={error ? helperText || error : undefined}
      variant="outlined"
      sx={{
        "& .MuiInputLabel-root": {
          fontSize: "0.875rem",
        },
        ...TextFieldProps.sx,
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...TextFieldProps}
    />
  );
};

export default PasswordField;
