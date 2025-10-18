import { useState } from "react";
import { Link } from "react-router-dom";
import { Stack, Button } from "@mui/material";
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

  const onChange = (k) => (e) => setValues({ ...values, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const eObj = validateValues(values, "login");
    setErrors(eObj);
    if (Object.keys(eObj).length) return;
  };

  return (
    <AuthLayout>
      <div className="LoginContainer">
        <h2>Se connecter</h2>
        <form onSubmit={submit}>
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
                type="submit"
                variant="contained"
                color="primary"
                sx={{ color: "#ffffff" }}
                onClick={submit}
              >
                Je me connecte
              </Button>
            </Stack>
          </div>
        </form>
        <p>
          Vous êtes nouveau ?
          <Link to="/signup" style={{ color: themeColors.violet.main }}>
            {" "}
            S'inscrire
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
