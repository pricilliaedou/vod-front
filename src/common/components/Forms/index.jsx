import * as React from "react";
import { useState } from "react";
import {
  Box,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Stack,
  Button,
} from "@mui/material";
import "./index.css";

const Forms = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [titre, setTitre] = useState("");
  const [error, setError] = useState({});

  const validate = () => {
    const newError = {};

    if (name.trim().length < 2) {
      newError.name = "Le nom doit contenir au moins 2 caractères";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      newError.email = "L'adresse email est invalide";
    }

    if (message.trim().length < 20) {
      newError.message = "Le message doit contenir au moins 20 caractères";
    }
    setError(newError);

    return Object.keys(newError).length === 0;
  };

  const handleChange = (event) => {
    setTitre(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Formulaire soumis avec succès");
    } else {
      console.log("Formulaire contient des erreurs");
    }
  };

  return (
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
      <div>
        <TextField
          id="name"
          label="Nom"
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
          value={name}
          helperText={error.name}
          error={Boolean(error.name)}
        />
      </div>
      <div>
        <TextField id="prenom" label="Prénom" />
      </div>
      <FormControl sx={{ m: 1, width: { xs: "100%", sm: "25ch" } }}>
        <InputLabel id="demo-simple-select-label">Vous êtes ?</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={titre}
          label="Vous êtes ?"
          onChange={handleChange}
        >
          <MenuItem value="particulier">Particulier</MenuItem>
          <MenuItem value="professionnel">Professionnel</MenuItem>
        </Select>
      </FormControl>
      <div>
        <TextField
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText={error.email}
          error={Boolean(error.email)}
        />
      </div>
      <div>
        <TextField id="sujet" label="Sujet" />
      </div>
      <div>
        <TextField
          sx={{ m: 1, width: "100%" }}
          id="message"
          label="Message"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          helperText={error.message}
          error={Boolean(error.message)}
        />
      </div>
      <div>
        <Stack spacing={2} direction="row">
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Envoyer
          </Button>
        </Stack>
      </div>
    </Box>
  );
};

export default Forms;
