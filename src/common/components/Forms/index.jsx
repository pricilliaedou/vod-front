import * as React from "react";
import { useState } from "react";
import { Stack, Button } from "@mui/material";
import UserFormFields from "../UserFormFields";
import { validateValues } from "../../../utils/validation";
import "./index.css";

const Forms = () => {
  const [values, setValues] = useState({
    lastName: "",
    firstName: "",
    role: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const onChange = (k) => (e) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const eObj = validateValues(values, "contact");
    setErrors(eObj);
    if (Object.keys(eObj).length) return;
  };

  return (
    <form onSubmit={submit}>
      <UserFormFields
        values={values}
        errors={errors}
        onChange={onChange}
        fields={[
          "lastName",
          "firstName",
          "email",
          "role",
          "subject",
          "message",
        ]}
        selectOptions={{
          role: [
            { value: "particulier", label: "Particulier" },
            { value: "professionnel", label: "Professionnel" },
          ],
        }}
      />
      <div>
        <Stack spacing={2} direction="row">
          <Button variant="contained" color="secondary">
            Envoyer
          </Button>
        </Stack>
      </div>
    </form>
  );
};

export default Forms;
