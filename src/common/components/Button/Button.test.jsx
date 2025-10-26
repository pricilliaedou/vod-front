import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./index";

describe("Button", () => {
  it("devrait afficher le texte du bouton", () => {
    render(<Button>Cliquez ici</Button>);
    expect(screen.getByText("Cliquez ici")).toBeInTheDocument();
  });

  it("devrait appeler onClick quand le bouton est cliqué", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Cliquez ici</Button>);

    const button = screen.getByText("Cliquez ici");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("devrait appliquer les classes CSS personnalisées", () => {
    render(<Button className="custom-class">Test</Button>);

    const button = screen.getByText("Test");
    expect(button).toHaveClass("button");
    expect(button).toHaveClass("custom-class");
  });

  it("devrait appliquer uniquement la classe button par défaut", () => {
    render(<Button>Test</Button>);

    const button = screen.getByText("Test");
    expect(button).toHaveClass("button");
  });

  it("devrait gérer plusieurs clics successifs", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Test</Button>);

    const button = screen.getByText("Test");
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(3);
  });

  it("devrait accepter des enfants autres que du texte", () => {
    render(
      <Button>
        <span>Icône</span>
        <span>Texte</span>
      </Button>
    );

    expect(screen.getByText("Icône")).toBeInTheDocument();
    expect(screen.getByText("Texte")).toBeInTheDocument();
  });

  it("devrait fonctionner sans handler onClick", () => {
    render(<Button>Test</Button>);

    const button = screen.getByText("Test");
    expect(() => fireEvent.click(button)).not.toThrow();
  });
});
