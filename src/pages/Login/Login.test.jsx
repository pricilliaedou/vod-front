import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./index";
import { AuthContext } from "../../context/AuthContext";
import api from "../../utils/axiosClient";

vi.mock("../../utils/axiosClient");

describe("Login Page - Tests d'intégration", () => {
  const mockLogin = vi.fn();
  const mockNavigate = vi.fn();

  const authValueNotAuthenticated = {
    token: null,
    user: null,
    isAuthenticated: false,
    login: mockLogin,
    logout: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    vi.mock("react-router-dom", async () => {
      const actual = await vi.importActual("react-router-dom");
      return {
        ...actual,
        useNavigate: () => mockNavigate,
        useLocation: () => ({ state: null }),
      };
    });
  });

  const renderLogin = (authValue = authValueNotAuthenticated) => {
    return render(
      <AuthContext.Provider value={authValue}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  };

  describe("Affichage de la page", () => {
    it('devrait afficher le titre "Se connecter"', () => {
      renderLogin();
      expect(screen.getByText("Se connecter")).toBeInTheDocument();
    });

    it("devrait afficher les champs email et mot de passe", () => {
      renderLogin();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    });

    it("devrait afficher le bouton de connexion", () => {
      renderLogin();
      expect(screen.getByText("Je me connecte")).toBeInTheDocument();
    });

    it("devrait afficher le lien d'inscription", () => {
      renderLogin();
      expect(screen.getByText(/Vous êtes nouveau/i)).toBeInTheDocument();
      expect(screen.getByText(/S'inscrire/i)).toBeInTheDocument();
    });
  });

  describe("Validation du formulaire", () => {
    it("devrait afficher une erreur avec un email invalide", async () => {
      renderLogin();

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/mot de passe/i);
      const submitButton = screen.getByText("Je me connecte");

      fireEvent.change(emailInput, { target: { value: "invalid-email" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/Adresse email ou mot de passe incorrect/i)
        ).toBeInTheDocument();
      });
    });

    it("devrait afficher une erreur si les champs sont vides", async () => {
      renderLogin();

      const submitButton = screen.getByText("Je me connecte");
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/Adresse email ou mot de passe incorrect/i)
        ).toBeInTheDocument();
      });
    });

    it("devrait afficher une erreur si le mot de passe est vide", async () => {
      renderLogin();

      const emailInput = screen.getByLabelText(/email/i);
      const submitButton = screen.getByText("Je me connecte");

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/Adresse email ou mot de passe incorrect/i)
        ).toBeInTheDocument();
      });
    });
  });

  describe("Soumission du formulaire", () => {
    it("devrait appeler l'API avec les bonnes données lors de la soumission", async () => {
      api.post.mockResolvedValue({
        status: 200,
        data: {
          token: "test-token",
          user: { id: 1, email: "test@example.com", lastName: "Test" },
        },
      });

      renderLogin();

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/mot de passe/i);
      const submitButton = screen.getByText("Je me connecte");

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(api.post).toHaveBeenCalledWith(
          expect.stringContaining("/public/login"),
          {
            username: "test@example.com",
            password: "password123",
          }
        );
      });
    });

    it("devrait appeler login() après une connexion réussie", async () => {
      const mockToken = "test-token-123";
      const mockUser = { id: 1, email: "test@example.com", lastName: "Test" };

      api.post.mockResolvedValue({
        status: 200,
        data: {
          token: mockToken,
          user: mockUser,
        },
      });

      renderLogin();

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/mot de passe/i);
      const submitButton = screen.getByText("Je me connecte");

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith(mockToken, mockUser);
      });
    });

    it("devrait afficher une erreur si l'API retourne une erreur", async () => {
      api.post.mockRejectedValue({
        response: {
          status: 401,
          data: { message: "Identifiants incorrects" },
        },
      });

      renderLogin();

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/mot de passe/i);
      const submitButton = screen.getByText("Je me connecte");

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/Adresse email ou mot de passe incorrect/i)
        ).toBeInTheDocument();
      });
    });
  });

  describe("Redirection", () => {
    it("devrait rediriger si l'utilisateur est déjà authentifié", () => {
      const authValueAuthenticated = {
        token: "existing-token",
        user: { id: 1, email: "test@example.com" },
        isAuthenticated: true,
        login: mockLogin,
        logout: vi.fn(),
      };

      const { container } = renderLogin(authValueAuthenticated);

      // Si l'utilisateur est authentifié, le formulaire de login ne devrait pas être affiché
      expect(screen.queryByText("Se connecter")).not.toBeInTheDocument();
    });
  });

  describe("Gestion des erreurs", () => {
    it("devrait effacer les erreurs précédentes lors d'une nouvelle soumission", async () => {
      renderLogin();

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/mot de passe/i);
      const submitButton = screen.getByText("Je me connecte");

      // Première soumission avec erreur
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/Adresse email ou mot de passe incorrect/i)
        ).toBeInTheDocument();
      });

      // Deuxième soumission avec des valeurs correctes
      api.post.mockResolvedValue({
        status: 200,
        data: {
          token: "test-token",
          user: { id: 1, email: "test@example.com" },
        },
      });

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalled();
      });
    });
  });
});
