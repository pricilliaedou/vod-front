import { Link } from "react-router-dom";
import { Box, TextField, Stack, Button } from "@mui/material";
import Logo from "../../assets/logos/logo.png";
import { LoginImage } from "../../common/assets/pictures";
import { themeColors } from "../../styles/themeColors";
import "./index.css";

const Login = () => {
  return (
    <div className="containerLogin">
      <div className="containerLogin-left">
        <LoginImage />
      </div>
      <div className="containerLogin-right">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
        <div className="containerLogin-right__contain">
          <h2>Se connecter</h2>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: { xs: "100%", sm: "25ch" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                },
              },
              "& .MuiFormControl-root": {
                m: 1,
                width: { xs: "100%", sm: "25ch" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                },
              },

              "& .MuiButton-root": {
                margin: "10px 0",
                borderRadius: "10px",
              },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="containerLogin-right__input">
              <TextField
                id="email"
                label="Email"
                variant="outlined"

                //   onChange={(e) => setEmail(e.target.value)}
                //   helperText={error.email}
                //   error={Boolean(error.email)}
              />
            </div>
            <div className="containerLogin-right__input">
              <TextField
                id="password"
                label="Mot de passe"
                variant="outlined"
                //   onChange={(e) => setPassword(e.target.value)}
                //   helperText={error.password}
                //   error={Boolean(error.password)}
              />
            </div>
            <div>
              <Stack spacing={2} direction="row">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ color: "#ffffff" }}

                  // onClick={handleSubmitAsync}
                  // disabled={loading}
                >
                  Je me connecte
                </Button>
              </Stack>
            </div>
          </Box>
          <p>
            Vous êtes nouveau ?
            <span style={{ color: themeColors.violet.main }}> S'inscrire</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
