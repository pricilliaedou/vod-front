import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Stack, Button } from "@mui/material";
import AuthLayout from "../../layouts/AuthLayout";
import UserFormFields from "../../common/components/UserFormFields";
import { validateValues } from "../../utils/validation";
import * as Sentry from "@sentry/react";

import "./index.css";

const Signup = () => {
  const [values, setValues] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const onChange = (k) => (e) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const apiUrl = import.meta.env.VITE_API_URL;

  const submit = async (e) => {
    e.preventDefault();
    const eObj = validateValues(values, "signup");
    setErrors(eObj);
    if (Object.keys(eObj).length) return;

    try {
      const response = await axios.post(`${apiUrl}/public/subscribe`, {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        phone: "",
      });

      if (response.status === 200 || response.status === 201) {
        alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
        navigate("/login");
      } else {
        setErrors({
          email: response.data.message,
        });
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error("Erreur lors de l'inscription", error);
      if (error.response?.data?.message) {
        setErrors({
          email: error.response.data.message,
        });
      } else if (error.response?.status === 409) {
        setErrors({
          email: "Cette adresse email est déjà utilisée",
        });
      } else {
        setErrors({
          email:
            "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
        });
      }
    }
  };

  return (
    <AuthLayout>
      <div className="SignupContainer">
        <h2>S'inscrire</h2>
        <form onSubmit={submit}>
          <div className="SignupContainer__input">
            <UserFormFields
              values={values}
              errors={errors}
              onChange={onChange}
              fields={[
                "lastName",
                "firstName",
                "email",
                "password",
                "confirmPassword",
              ]}
            />
          </div>

          <div>
            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ color: "#ffffff" }}
                onClick={submit}
              >
                S'inscrire
              </Button>
            </Stack>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;
