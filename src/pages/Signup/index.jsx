import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import api from "../../utils/axiosClient";
import {
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
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
  const [openSuccess, setOpenSuccess] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/" replace />;

  const onChange = (k) => (e) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const eObj = validateValues(values, "signup");
    setErrors(eObj);
    if (Object.keys(eObj).length) return;

    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/public/subscribe`,
        {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          phone: "",
        }
      );

      if (response.status === 200 || response.status === 201) {
        setOpenSuccess(true);
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

  const goToLogin = () => {
    navigate("/login", { replace: true });
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

      <AnimatePresence>
        {openSuccess && (
          <Dialog
            open={openSuccess}
            onClose={() => navigate("/", { replace: true })}
            aria-labelledby="signup-success-title"
            fullWidth
            maxWidth="xs"
            BackdropProps={{
              sx: {
                backgroundColor: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(2px)",
              },
            }}
            PaperProps={{
              sx: {
                borderRadius: 3,
                overflow: "hidden",
                p: 1,
              },
            }}
          >
            <DialogTitle id="signup-success-title">
              Inscription réussie
            </DialogTitle>
            <DialogContent dividers>
              <div
                style={{
                  display: "grid",
                  placeItems: "center",
                  margin: "12px 0",
                }}
              >
                <motion.svg
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  initial="hidden"
                  animate="visible"
                >
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="48"
                    fill="none"
                    stroke="#2e7d32"
                    strokeWidth="6"
                    variants={{
                      hidden: { pathLength: 0 },
                      visible: {
                        pathLength: 1,
                        transition: { duration: 0.7, ease: "easeOut" },
                      },
                    }}
                  />
                  <motion.path
                    d="M40 62 L55 76 L82 46"
                    fill="none"
                    stroke="#2e7d32"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="8"
                    variants={{
                      hidden: { pathLength: 0, opacity: 0 },
                      visible: {
                        pathLength: 1,
                        opacity: 1,
                        transition: {
                          delay: 0.45,
                          duration: 0.5,
                          ease: "easeOut",
                        },
                      },
                    }}
                  />
                </motion.svg>
                <motion.p
                  style={{ marginTop: 8, textAlign: "center" }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Votre compte a bien été créé. Vous pouvez maintenant vous
                  connecter.
                </motion.p>
              </div>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center", gap: 1 }}>
              <Button onClick={() => navigate("/", { replace: true })}>
                Plus tard
              </Button>
              <Button variant="contained" onClick={goToLogin}>
                Se connecter
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
};

export default Signup;
