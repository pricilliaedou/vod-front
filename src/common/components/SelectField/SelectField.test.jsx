import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SelectField from "./index";

describe("SelectField", () => {
  const mockOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  it("devrait afficher le champ select avec son label", () => {
    render(
      <SelectField
        id="test-select"
        label="Choisissez une option"
        value=""
        onChange={() => {}}
        options={mockOptions}
      />
    );

    expect(screen.getByLabelText("Choisissez une option")).toBeInTheDocument();
  });

  it("devrait afficher toutes les options", () => {
    render(
      <SelectField
        id="test-select"
        label="Options"
        value=""
        onChange={() => {}}
        options={mockOptions}
      />
    );

    const select = screen.getByLabelText("Options");
    fireEvent.mouseDown(select);

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  it("devrait afficher la valeur sélectionnée", () => {
    render(
      <SelectField
        id="test-select"
        label="Options"
        value="option2"
        onChange={() => {}}
        options={mockOptions}
      />
    );

    // Pour MUI Select, vérifier le texte affiché plutôt que la valeur
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("devrait appeler onChange quand une option est sélectionnée", () => {
    const handleChange = vi.fn();
    render(
      <SelectField
        id="test-select"
        label="Options"
        value=""
        onChange={handleChange}
        options={mockOptions}
      />
    );

    const select = screen.getByLabelText("Options");
    fireEvent.mouseDown(select);

    const option = screen.getByText("Option 2");
    fireEvent.click(option);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("devrait afficher une erreur", () => {
    render(
      <SelectField
        id="test-select"
        label="Options"
        value=""
        onChange={() => {}}
        options={mockOptions}
        error="Veuillez sélectionner une option"
      />
    );

    expect(
      screen.getByText("Veuillez sélectionner une option")
    ).toBeInTheDocument();
  });

  it("devrait afficher helperText avec une erreur", () => {
    render(
      <SelectField
        id="test-select"
        label="Options"
        value=""
        onChange={() => {}}
        options={mockOptions}
        error="Erreur"
        helperText="Texte d'aide personnalisé"
      />
    );

    expect(screen.getByText("Texte d'aide personnalisé")).toBeInTheDocument();
  });

  it("devrait fonctionner avec un tableau d'options vide", () => {
    render(
      <SelectField
        id="test-select"
        label="Options"
        value=""
        onChange={() => {}}
        options={[]}
      />
    );

    const select = screen.getByLabelText("Options");
    expect(select).toBeInTheDocument();
  });

  it("devrait fonctionner sans options (par défaut)", () => {
    render(
      <SelectField
        id="test-select"
        label="Options"
        value=""
        onChange={() => {}}
      />
    );

    const select = screen.getByLabelText("Options");
    expect(select).toBeInTheDocument();
  });

  it("devrait avoir l'id correct", () => {
    render(
      <SelectField
        id="test-select"
        label="Options"
        value=""
        onChange={() => {}}
        options={mockOptions}
      />
    );

    const select = screen.getByLabelText("Options");
    expect(select).toHaveAttribute("id", "test-select");
  });

  it("devrait accepter des FormControlProps personnalisés", () => {
    render(
      <SelectField
        id="test-select"
        label="Options"
        value=""
        onChange={() => {}}
        options={mockOptions}
        FormControlProps={{
          disabled: true,
        }}
      />
    );

    const select = screen.getByLabelText("Options");
    // MUI Select utilise aria-disabled au lieu de disabled
    expect(select).toHaveAttribute("aria-disabled", "true");
  });

  it("ne devrait pas afficher helperText si aucune erreur", () => {
    render(
      <SelectField
        id="test-select"
        label="Options"
        value="option1"
        onChange={() => {}}
        options={mockOptions}
      />
    );

    const helperText = screen.queryByText(/aide/i);
    expect(helperText).not.toBeInTheDocument();
  });
});
