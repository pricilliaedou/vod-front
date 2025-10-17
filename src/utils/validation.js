const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateValues(values, mode = "contact") {
  const e = {};

  if (values.lastname !== undefined && values.lastname.trim().length < 2)
    e.lastName = "Le nom doit contenir au moins deuc caractères";

  if (values.email !== undefined && !emailValidation.test(values.email))
    e.mail = "L'adresse email est ivalide";

  if (
    mode === "contact" &&
    values.message !== undefined &&
    values.message.trim().length < 20
  )
    e.message = "Le message doit contenir au moins 20 caractères";

  if (mode === "signup") {
    if (values.password !== undefined && values.password.length < 8)
      e.password = "Au moins 8 caractères";
    if (
      values.confirmPassword !== undefined &&
      values.confirmPassword !== values.password
    )
      e.confirmPassword = "Les mots de passe ne correspondent pas";
  }
  return e;
}
