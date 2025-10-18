import { useState } from "react";
import { Stack, Button } from "@mui/material";
import AuthLayout from "../../layouts/AuthLayout";
import UserFormFields from "../../common/components/UserFormFields";
import { validateValues } from "../../utils/validation";
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
  const onChange = (k) => (e) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const eObj = validateValues(values, "signup");
    setErrors(eObj);
    if (Object.keys(eObj).length) return;
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
