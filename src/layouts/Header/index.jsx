import { Link } from "react-router-dom";
import logo from "../../assets/logos/logo.png";
import SearchBar from "../../components/SearchBar";
import { Box, Stack, Button } from "@mui/material";
import "./index.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <SearchBar />
      <Box
        component="form"
        sx={{
          "& .MuiButton-root": {
            margin: "10px 0",
            borderRadius: "10px",
          },
        }}
        noValidate
        autoComplete="off"
      >
        <Stack spacing={2} direction="row">
          <Link to="/login">
            <Button variant="contained" color="secondary">
              S'identifier
            </Button>
          </Link>
        </Stack>
      </Box>
    </div>
  );
};

export default Header;
