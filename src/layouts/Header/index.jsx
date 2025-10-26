import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Tooltip,
  IconButton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/logos/logo.png";
// import SearchBar from "../../components/SearchBar";
import "./index.css";

const getInitials = (user) => {
  if (!user) return null;
  const firstName = user.firstName?.trim();
  const lastName = user.lastName?.trim();
  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }
  if (firstName) return firstName[0].toUpperCase();
  if (lastName) return lastName[0].toUpperCase();
  return null;
};

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  // console.log("user in Header", user);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const initials = getInitials(user);

  const go = (path) => {
    handleClose();
    navigate(path);
  };

  const onLogout = () => {
    handleClose();
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="header">
      <div className="header-logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      {/* <SearchBar /> */}
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
        {!isAuthenticated ? (
          <Stack spacing={2} direction="row">
            <Link to="/login">
              <Button variant="contained" color="secondary">
                S'identifier
              </Button>
            </Link>
          </Stack>
        ) : (
          <>
            <Tooltip title="Compte">
              <IconButton
                onClick={handleAvatarClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar color="primary" sx={{ width: 42, height: 42 }}>
                  {initials ? initials : <PersonIcon fontSize="small" />}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 4,
                  sx: {
                    mt: 1.2,
                    minWidth: 220,
                    overflow: "visible",
                    borderRadius: 2,
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 16,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={() => go("/profil")}>
                  {/* <MenuItem onClick={()=>go("/account")}> */}
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  Mes informations
                </MenuItem>

                <MenuItem onClick={() => console.log("settings")}>
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  Paramètres
                </MenuItem>

                <Divider />
                <MenuItem onClick={onLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Se déconnecter
                </MenuItem>
              </Menu>
            </Tooltip>
          </>
        )}
      </Box>
    </div>
  );
};

export default Header;
