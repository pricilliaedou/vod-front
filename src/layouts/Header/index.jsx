import logo from "../../assets/logos/logo.png";
import SearchBar from "../../components/SearchBar";
import { Stack, Button } from "@mui/material";
import "./index.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-logo">
        <img src={logo} alt="logo" />
      </div>
      <SearchBar />
      <Stack spacing={2} direction="row">
        <Button variant="contained" color="secondary">
          S'identifier
        </Button>
      </Stack>
    </div>
  );
};

export default Header;
