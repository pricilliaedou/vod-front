import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TextAreaField from "./index";

describe("TextAreaField", () => {
  it("devrait afficher le champ textarea avec son label", () => {
    render(
      <TextAreaField
        id="test-textarea"
        label="Message"
        value=""
        onChange={() => {}}
      />
    );

    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("devrait afficher la valeur du textarea", () => {
    render(
      <TextAreaField
        id="test-textarea"
        label="Message"
        value="Ceci est un message de test"
        onChange={() => {}}
      />
    );

    const textarea = screen.getByLabelText("Message");
    expect(textarea).toHaveValue("Ceci est un message de test");
  });

  it("devrait appeler onChange quand l'utilisateur tape", () => {
    const handleChange = vi.fn();
    render(
      <TextAreaField
        id="test-textarea"
        label="Message"
        value=""
        onChange={handleChange}
      />
    );

    const textarea = screen.getByLabelText("Message");
    fireEvent.change(textarea, { target: { value: "Nouveau message" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("devrait être multiline", () => {
    render(
      <TextAreaField
        id="test-textarea"
        label="Message"
        value=""
        onChange={() => {}}
      />
    );

    const textarea = screen.getByLabelText("Message");
    expect(textarea).toHaveAttribute("rows");
  });

  it("devrait avoir 4 lignes par défaut", () => {
    render(
      <TextAreaField
        id="test-textarea"
        label="Message"
        value=""
        onChange={() => {}}
      />
    );

    const textarea = screen.getByLabelText("Message");
    expect(textarea).toHaveAttribute("rows", "4");
  });

  it("devrait accepter un nombre de lignes personnalisé", () => {
    render(
      <TextAreaField
        id="test-textarea"
        label="Message"
        value=""
        onChange={() => {}}
        rows={10}
      />
    );

    const textarea = screen.getByLabelText("Message");
    expect(textarea).toHaveAttribute("rows", "10");
  });

  it("devrait afficher une erreur", () => {
    render(
      <TextAreaField
        id="test-textarea"
        label="Message"
        value="Court"
        onChange={() => {}}
        error="Le message doit contenir au moins 20 caractères"
      />
    );

    expect(
      screen.getByText("Le message doit contenir au moins 20 caractères")
    ).toBeInTheDocument();
  });

  it("devrait afficher helperText avec une erreur", () => {
    render(
      <TextAreaField
        id="test-textarea"
        label="Message"
        value="Court"
        onChange={() => {}}
        error="Erreur"
        helperText="Veuillez entrer un message plus long"
      />
    );

    expect(
      screen.getByText("Veuillez entrer un message plus long")
    ).toBeInTheDocument();
  });

  it("devrait avoir l'attribut name égal à id", () => {
    render(
      <TextAreaField
        id="test-textarea"
        label="Message"
        value=""
        onChange={() => {}}
      />
    );

    const textarea = screen.getByLabelText("Message");
    expect(textarea).toHaveAttribute("name", "test-textarea");
  });

  it("ne devrait pas afficher helperText si aucune erreur", () => {
    render(
      <TextAreaField
        id="test-textarea"
        label="Message"
        value="Un message valide avec suffisamment de contenu"
        onChange={() => {}}
      />
    );

    const helperText = screen.queryByText(/caractères/i);
    expect(helperText).not.toBeInTheDocument();
  });

  it("devrait accepter des TextFieldProps personnalisés", () => {
    render(
      <TextAreaField
        id="test-textarea"
        label="Message"
        value=""
        onChange={() => {}}
        TextFieldProps={{
          placeholder: "Entrez votre message ici",
          disabled: true,
        }}
      />
    );

    const textarea = screen.getByLabelText("Message");
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveAttribute("placeholder", "Entrez votre message ici");
  });

  it("devrait accepter des textes longs", () => {
    const longText =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(10);
    render(
      <TextAreaField
        id="test-textarea"
        label="Message"
        value={longText}
        onChange={() => {}}
      />
    );

    const textarea = screen.getByLabelText("Message");
    expect(textarea).toHaveValue(longText);
  });
});
