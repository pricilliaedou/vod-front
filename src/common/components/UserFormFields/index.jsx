import { Box } from "@mui/material";
import InputField from "../InputField";
import PasswordField from "../PasswordField";
import TextAreaField from "../TextAreaField";
import SelectField from "../SelectField";

const UserFormFields = ({
  values,
  errors = {},
  onChange,
  fields = [],
  selectOptions = {},
  sx,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        "& .MuiTextField-root": {
          m: 1,
          width: { xs: "100%", sm: "25ch" },
          "& .MuiOutlinedInput-root": { borderRadius: "15px" },
        },
        "& .MuiFormControl-root": {
          m: 1,
          width: { xs: "100%", sm: "25ch" },
          "& .MuiOutlinedInput-root": { borderRadius: "15px" },
        },
        ...sx,
      }}
      noValidate
      autoComplete="off"
    >
      {fields.includes("lastName") && (
        <InputField
          id="lastName"
          label="Nom"
          value={values.lastName || ""}
          onChange={onChange("lastName")}
          error={errors.lastName}
        />
      )}

      {fields.includes("firstName") && (
        <InputField
          id="firstName"
          label="Prénom"
          value={values.firstName || ""}
          onChange={onChange("firstName")}
          error={errors.firstName}
        />
      )}

      {fields.includes("email") && (
        <InputField
          id="email"
          label="Email"
          type="email"
          value={values.email || ""}
          onChange={onChange("email")}
          error={errors.email}
        />
      )}
      {fields.includes("subject") && (
        <InputField
          id="subject"
          label="Sujet"
          value={values.subject || ""}
          onChange={onChange("subject")}
          error={errors.subject}
        />
      )}

      {fields.includes("role") && (
        <SelectField
          id="role"
          label="Vous êtes ?"
          value={values.role || ""}
          onChange={(e) => onChange("role")(e)}
          error={errors.role}
          options={
            selectOptions.role || [
              { value: "particulier", label: "Particulier" },
              { value: "professionnel", label: "Professionnel" },
            ]
          }
        />
      )}
      {fields.includes("password") && (
        <PasswordField
          id="password"
          label="Mot de passe"
          value={values.password || ""}
          onChange={onChange("password")}
          error={errors.password}
        />
      )}
      {fields.includes("confirmPassword") && (
        <PasswordField
          id="confirmPassword"
          label="Confirmer le mot de passe"
          value={values.confirmPassword || ""}
          onChange={onChange("confirmPassword")}
          error={errors.confirmPassword}
        />
      )}
      {fields.includes("message") && (
        <TextAreaField
          id="message"
          label="Message"
          value={values.message || ""}
          onChange={onChange("message")}
          error={errors.message}
        />
      )}
    </Box>
  );
};

export default UserFormFields;
