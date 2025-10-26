import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "./index";

describe("InputField", () => {
  it("devrait afficher le champ avec son label", () => {
    render(
      <InputField id="test-input" label="Nom" value="" onChange={() => {}} />
    );

    expect(screen.getByLabelText("Nom")).toBeInTheDocument();
  });

  it("devrait afficher la valeur du champ", () => {
    render(
      <InputField
        id="test-input"
        label="Nom"
        value="Dupont"
        onChange={() => {}}
      />
    );

    const input = screen.getByLabelText("Nom");
    expect(input).toHaveValue("Dupont");
  });

  it("devrait appeler onChange quand l'utilisateur tape", () => {
    const handleChange = vi.fn();
    render(
      <InputField
        id="test-input"
        label="Nom"
        value=""
        onChange={handleChange}
      />
    );

    const input = screen.getByLabelText("Nom");
    fireEvent.change(input, { target: { value: "Test" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("devrait afficher une erreur quand error est défini", () => {
    render(
      <InputField
        id="test-input"
        label="Email"
        value="invalid-email"
        onChange={() => {}}
        error="Email invalide"
      />
    );

    expect(screen.getByText("Email invalide")).toBeInTheDocument();
  });

  it("devrait afficher helperText quand une erreur existe", () => {
    render(
      <InputField
        id="test-input"
        label="Nom"
        value="A"
        onChange={() => {}}
        error="Erreur"
        helperText="Le nom doit contenir au moins 2 caractères"
      />
    );

    expect(
      screen.getByText("Le nom doit contenir au moins 2 caractères")
    ).toBeInTheDocument();
  });

  it("devrait utiliser le type text par défaut", () => {
    render(
      <InputField id="test-input" label="Nom" value="" onChange={() => {}} />
    );

    const input = screen.getByLabelText("Nom");
    expect(input).toHaveAttribute("type", "text");
  });

  it("devrait accepter différents types d'input", () => {
    render(
      <InputField
        id="test-input"
        label="Email"
        value=""
        onChange={() => {}}
        type="email"
      />
    );

    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("type", "email");
  });

  it("devrait avoir l'attribut name égal à id", () => {
    render(
      <InputField id="test-input" label="Nom" value="" onChange={() => {}} />
    );

    const input = screen.getByLabelText("Nom");
    expect(input).toHaveAttribute("name", "test-input");
  });

  it("ne devrait pas afficher helperText si aucune erreur", () => {
    render(
      <InputField
        id="test-input"
        label="Nom"
        value="Dupont"
        onChange={() => {}}
      />
    );

    const helperText = screen.queryByText(/caractères/i);
    expect(helperText).not.toBeInTheDocument();
  });

  it("devrait accepter des TextFieldProps personnalisés", () => {
    render(
      <InputField
        id="test-input"
        label="Nom"
        value=""
        onChange={() => {}}
        TextFieldProps={{
          placeholder: "Entrez votre nom",
          disabled: true,
        }}
      />
    );

    const input = screen.getByLabelText("Nom");
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("placeholder", "Entrez votre nom");
  });
});
