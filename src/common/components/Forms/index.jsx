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
    const eObj = validateValues(values, "contact");
    setErrors(eObj);
    if (Object.keys(eObj).length) {
      e.preventDefault();
      return;
    }
    // Si pas d'erreurs, le formulaire sera soumis par Netlify
    // Pas de e.preventDefault() pour permettre la soumission native
  };

  return (
    <form
      onSubmit={submit}
      action="/succes"
      name="contact-reunies"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      {/* Champ caché requis par Netlify */}
      <input type="hidden" name="form-name" value="contact-reunies" />

      {/* Champ honeypot pour éviter le spam (caché visuellement) */}
      <p hidden>
        <label>
          Ne pas remplir si vous êtes humain: <input name="bot-field" />
        </label>
      </p>

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
        <Stack spacing={2} direction="row" style={{ marginTop: "20px" }}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={submit}
          >
            Envoyer
          </Button>
        </Stack>
      </div>
    </form>
  );
};

export default Forms;
