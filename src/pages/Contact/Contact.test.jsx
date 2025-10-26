import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Contact from "./index";
import { AuthContext } from "../../context/AuthContext";

describe("Contact Page - Tests d'intégration", () => {
  const mockAuthValue = {
    token: null,
    user: null,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
  };

  beforeEach(() => {
    localStorage.clear();
  });

  const renderContact = (authValue = mockAuthValue) => {
    return render(
      <AuthContext.Provider value={authValue}>
        <BrowserRouter>
          <Contact />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  };

  describe("Affichage de la page", () => {
    it("devrait afficher le titre principal", () => {
      renderContact();
      expect(screen.getByText("Besoin de réponses?")).toBeInTheDocument();
      expect(screen.getByText("Contactez-nous !")).toBeInTheDocument();
    });

    it("devrait afficher les informations de contact", () => {
      renderContact();
      expect(screen.getByText("01 00 00 00 00")).toBeInTheDocument();
      expect(
        screen.getByText("40 rue Fictive Paris 75000")
      ).toBeInTheDocument();
    });

    it("devrait afficher le formulaire de contact", () => {
      renderContact();
      // Le composant Forms devrait être présent
      const container = screen
        .getByText("Besoin de réponses?")
        .closest(".contactContainer");
      expect(container).toBeInTheDocument();
    });
  });

  describe("Liens sociaux", () => {
    it("devrait afficher le lien LinkedIn", () => {
      renderContact();
      const linkedinLink = screen.getByRole("link", { name: /linkedin/i });
      expect(linkedinLink).toBeInTheDocument();
      expect(linkedinLink).toHaveAttribute(
        "href",
        "https://www.linkedin.com/in/pricillia-lydiane-edou-edou"
      );
      expect(linkedinLink).toHaveAttribute("target", "_blank");
    });

    it("devrait afficher le lien GitHub", () => {
      renderContact();
      const githubLink = screen.getByRole("link", { name: /github/i });
      expect(githubLink).toBeInTheDocument();
      expect(githubLink).toHaveAttribute(
        "href",
        "https://github.com/pricilliaedou"
      );
      expect(githubLink).toHaveAttribute("target", "_blank");
    });

    it("devrait afficher le lien Portfolio", () => {
      renderContact();
      const portfolioLink = screen.getByRole("link", { name: /portfolio/i });
      expect(portfolioLink).toBeInTheDocument();
      expect(portfolioLink).toHaveAttribute(
        "href",
        "https://pricilliae-portfolio.netlify.app"
      );
      expect(portfolioLink).toHaveAttribute("target", "_blank");
    });

    it('tous les liens externes devraient avoir rel="noopener noreferrer"', () => {
      renderContact();
      const externalLinks = screen.getAllByRole("link");

      externalLinks.forEach((link) => {
        if (link.getAttribute("target") === "_blank") {
          expect(link).toHaveAttribute("rel", "noopener noreferrer");
        }
      });
    });
  });

  describe("Layout et structure", () => {
    it("devrait utiliser le MainLayout", () => {
      const { container } = renderContact();
      // Vérifier que le conteneur principal existe
      expect(container.querySelector(".contactContainer")).toBeInTheDocument();
    });

    it("devrait avoir une section gauche et droite", () => {
      const { container } = renderContact();
      expect(
        container.querySelector(".contactContainer-left")
      ).toBeInTheDocument();
      expect(
        container.querySelector(".contactContainer-right")
      ).toBeInTheDocument();
    });

    it("devrait afficher les icônes de réseaux sociaux", () => {
      const { container } = renderContact();
      const iconsContainer = container.querySelector(
        ".contactContainer-right-icons"
      );
      expect(iconsContainer).toBeInTheDocument();

      // Vérifier qu'il y a plusieurs liens dans le conteneur d'icônes
      const links = iconsContainer?.querySelectorAll("a");
      expect(links?.length).toBeGreaterThan(0);
    });
  });

  describe("Accessibilité", () => {
    it("devrait être accessible avec un utilisateur authentifié", () => {
      const authValueAuthenticated = {
        token: "test-token",
        user: { id: 1, email: "test@example.com" },
        isAuthenticated: true,
        login: () => {},
        logout: () => {},
      };

      renderContact(authValueAuthenticated);
      expect(screen.getByText("Contactez-nous !")).toBeInTheDocument();
    });

    it("devrait être accessible avec un utilisateur non authentifié", () => {
      renderContact();
      expect(screen.getByText("Contactez-nous !")).toBeInTheDocument();
    });
  });

  describe("Contenu complet", () => {
    it("devrait afficher tous les éléments essentiels de la page", () => {
      renderContact();

      // Vérifier les titres
      expect(screen.getByText("Besoin de réponses?")).toBeInTheDocument();
      expect(screen.getByText("Contactez-nous !")).toBeInTheDocument();

      // Vérifier les informations de contact
      expect(screen.getByText("01 00 00 00 00")).toBeInTheDocument();
      expect(
        screen.getByText("40 rue Fictive Paris 75000")
      ).toBeInTheDocument();

      // Vérifier qu'il y a au moins 3 liens (réseaux sociaux)
      const links = screen.getAllByRole("link");
      expect(links.length).toBeGreaterThanOrEqual(3);
    });
  });
});
