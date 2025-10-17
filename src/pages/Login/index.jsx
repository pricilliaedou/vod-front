import { useState } from "react";
import { Box, Stack, Button } from "@mui/material";
import AuthLayout from "../../layouts/AuthLayout";
import { validateValues } from "../../utils/validation.js";
import UserFormFields from "../../common/components/UserFormFields";
import { themeColors } from "../../styles/themeColors";
import "./index.css";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const onChange = (k) => (e) =>
    setValues({ ...validateValues, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const eObj = validateValues(values);
    setErrors(eObj);
    if (Object.keys(eObj).length) return;
  };

  return (
    <AuthLayout>
      <div className="LoginContainer">
        <h2>Se connecter</h2>
        <Box
          onSubmit={submit}
          component="form"
          sx={{
            "& .MuiTextField-root": {
              m: 1,
              width: { xs: "100%", sm: "25ch" },
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
              },
            },
            "& .MuiFormControl-root": {
              m: 1,
              width: { xs: "100%", sm: "25ch" },
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
              },
            },

            "& .MuiButton-root": {
              margin: "10px 0",
              borderRadius: "10px",
            },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="LoginContainer__input">
            <UserFormFields
              values={values}
              errors={errors}
              onChange={onChange}
              fields={["email", "password"]}
            />
          </div>

          <div>
            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                color="primary"
                sx={{ color: "#ffffff" }}
              >
                Je me connecte
              </Button>
            </Stack>
          </div>
        </Box>
        <p>
          Vous êtes nouveau ?
          <span style={{ color: themeColors.violet.main }}> S'inscrire</span>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
