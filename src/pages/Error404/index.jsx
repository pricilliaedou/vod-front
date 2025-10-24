import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { Error404Img } from "../../common/assets/pictures";
import "./index.css";

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <div className="error404">
      <div className="error404-left">
        <div className="error404-left-content">
          <p>Oh non !</p>
          <p>Cette page est introuvable.</p>
          <p>
            Revenir à la page d'accueil en cliquant sur le bouton ci-dessous
          </p>
          <Stack spacing={2} direction="row" style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/")}
            >
              Accueil
            </Button>
          </Stack>
        </div>
      </div>
      <div className="error404-right">
        <Error404Img className="error404-right-image" />
      </div>
    </div>
  );
};

export default Error404;
