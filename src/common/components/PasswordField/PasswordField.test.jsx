import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PasswordField from "./index";

describe("PasswordField", () => {
  it("devrait afficher le champ avec le label par défaut", () => {
    render(<PasswordField id="password" value="" onChange={() => {}} />);

    expect(screen.getByLabelText("Mot de passe")).toBeInTheDocument();
  });

  it("devrait afficher un label personnalisé", () => {
    render(
      <PasswordField
        id="password"
        label="Nouveau mot de passe"
        value=""
        onChange={() => {}}
      />
    );

    expect(screen.getByLabelText("Nouveau mot de passe")).toBeInTheDocument();
  });

  it("devrait masquer le mot de passe par défaut", () => {
    render(
      <PasswordField id="password" value="secret123" onChange={() => {}} />
    );

    const input = screen.getByLabelText("Mot de passe");
    expect(input).toHaveAttribute("type", "password");
  });

  it("devrait afficher le mot de passe quand on clique sur l'icône", () => {
    render(
      <PasswordField id="password" value="secret123" onChange={() => {}} />
    );

    const toggleButton = screen.getByLabelText("toggle password visibility");
    fireEvent.click(toggleButton);

    const input = screen.getByLabelText("Mot de passe");
    expect(input).toHaveAttribute("type", "text");
  });

  it("devrait basculer entre masquer/afficher le mot de passe", () => {
    render(
      <PasswordField id="password" value="secret123" onChange={() => {}} />
    );

    const toggleButton = screen.getByLabelText("toggle password visibility");
    const input = screen.getByLabelText("Mot de passe");

    // Initialement masqué
    expect(input).toHaveAttribute("type", "password");

    // Cliquer pour afficher
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "text");

    // Cliquer pour masquer à nouveau
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "password");
  });

  it("devrait appeler onChange quand l'utilisateur tape", () => {
    const handleChange = vi.fn();
    render(<PasswordField id="password" value="" onChange={handleChange} />);

    const input = screen.getByLabelText("Mot de passe");
    fireEvent.change(input, { target: { value: "newpassword" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("devrait afficher une erreur", () => {
    render(
      <PasswordField
        id="password"
        value="short"
        onChange={() => {}}
        error="Le mot de passe doit contenir au moins 8 caractères"
      />
    );

    expect(
      screen.getByText("Le mot de passe doit contenir au moins 8 caractères")
    ).toBeInTheDocument();
  });

  it("devrait afficher helperText personnalisé avec une erreur", () => {
    render(
      <PasswordField
        id="password"
        value="short"
        onChange={() => {}}
        error="Erreur"
        helperText="Texte d'aide personnalisé"
      />
    );

    expect(screen.getByText("Texte d'aide personnalisé")).toBeInTheDocument();
  });

  it("devrait afficher la valeur actuelle du mot de passe", () => {
    render(
      <PasswordField id="password" value="mypassword123" onChange={() => {}} />
    );

    const input = screen.getByLabelText("Mot de passe");
    expect(input).toHaveValue("mypassword123");
  });

  it("devrait avoir un bouton de visibilité cliquable", () => {
    render(<PasswordField id="password" value="secret" onChange={() => {}} />);

    const toggleButton = screen.getByLabelText("toggle password visibility");
    expect(toggleButton).toBeInTheDocument();
    expect(() => fireEvent.click(toggleButton)).not.toThrow();
  });
});
