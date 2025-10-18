const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateValues(values, mode = "contact") {
  const e = {};

  if (mode === "login") {
    const msg = "Adresse email ou mot de passe incorrect";
    const emailInvalid = !values.email || !emailValidation.test(values.email);
    const passwordEmpty = !values.password;

    if (emailInvalid || passwordEmpty) {
      e.form = msg;
    }
    return e;
  }

  if (values.lastName !== undefined && values.lastName.trim().length < 2)
    e.lastName = "Le nom doit contenir au moins deux caractères";

  if (values.email !== undefined && !emailValidation.test(values.email))
    e.email = "L'adresse email est invalide";

  if (
    mode === "contact" &&
    values.message !== undefined &&
    values.message.trim().length < 20
  )
    e.message = "Le message doit contenir au moins 20 caractères";

  if (mode === "signup") {
    if (values.password !== undefined && values.password.length < 8)
      e.password = "Le mot de passe doit contenir au moins 8 caractères";
    if (
      values.confirmPassword !== undefined &&
      values.confirmPassword !== values.password
    )
      e.confirmPassword = "Les mots de passe ne correspondent pas";
  }
  return e;
}
