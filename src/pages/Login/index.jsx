import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Sentry from "@sentry/react";
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

  const navigate = useNavigate();

  const onChange = (k) => (e) => setValues({ ...values, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const eObj = validateValues(values, "login");
    setErrors(eObj);
    if (Object.keys(eObj).length) return;

    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await axios.post(`${apiUrl}/public/login`, {
        username: values.email,
        password: values.password,
      });

      if (response.status === 200 || response.status === 201) {
        const { token, user } = response.data;
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } else {
        const msg =
          response?.data?.message || "Adresse email ou mot de passe incorrect";
        setErrors({
          form: msg,
        });
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error("Erreur lors de la connexion", error);

      setErrors({
        form: "Adresse email ou mot de passe incorrect",
      });
    }
  };

  return (
    <AuthLayout>
      <div className="LoginContainer">
        <h2>Se connecter</h2>
        <form onSubmit={submit}>
          <div className="LoginContainer__input">
            <UserFormFields
              values={values}
              errors={{}}
              // errors={errors.form ? { email: true, password: true } : {}}
              onChange={onChange}
              fields={["email", "password"]}
            />
          </div>
          {errors.form && (
            <p className="LoginContainer__error-message">{errors.form}</p>
          )}
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
            S'inscrire
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
