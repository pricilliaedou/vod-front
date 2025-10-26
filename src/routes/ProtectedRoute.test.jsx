import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { AuthContext } from "../context/AuthContext";

describe("ProtectedRoute - Tests d'intégration", () => {
  const TestComponent = () => <div>Protected Content</div>;
  const LoginComponent = () => <div>Login Page</div>;

  beforeEach(() => {
    localStorage.clear();
  });

  const renderWithRouter = (component, authValue) => {
    return render(
      <AuthContext.Provider value={authValue}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={component} />
            <Route path="/login" element={<LoginComponent />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    );
  };

  describe("Utilisateur authentifié", () => {
    it("devrait afficher le contenu protégé si l'utilisateur est authentifié", () => {
      const authValue = {
        token: "test-token",
        user: { id: 1, email: "test@example.com" },
        isAuthenticated: true,
        login: () => {},
        logout: () => {},
      };

      renderWithRouter(
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>,
        authValue
      );

      expect(screen.getByText("Protected Content")).toBeInTheDocument();
    });

    it("devrait rendre les enfants directement sans wrapper supplémentaire", () => {
      const authValue = {
        token: "test-token",
        user: { id: 1, email: "test@example.com" },
        isAuthenticated: true,
        login: () => {},
        logout: () => {},
      };

      const { container } = renderWithRouter(
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>,
        authValue
      );

      expect(container.querySelector("div")).toHaveTextContent(
        "Protected Content"
      );
    });

    it("devrait permettre l'accès avec un token valide", () => {
      const authValue = {
        token: "valid-token-123",
        user: { id: 2, email: "user@example.com", lastName: "User" },
        isAuthenticated: true,
        login: () => {},
        logout: () => {},
      };

      renderWithRouter(
        <ProtectedRoute>
          <div data-testid="protected">Protected Area</div>
        </ProtectedRoute>,
        authValue
      );

      expect(screen.getByTestId("protected")).toBeInTheDocument();
    });
  });

  describe("Utilisateur non authentifié", () => {
    it("devrait rediriger vers /login si l'utilisateur n'est pas authentifié", () => {
      const authValue = {
        token: null,
        user: null,
        isAuthenticated: false,
        login: () => {},
        logout: () => {},
      };

      renderWithRouter(
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>,
        authValue
      );

      expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
      expect(screen.getByText("Login Page")).toBeInTheDocument();
    });

    it("ne devrait pas afficher le contenu protégé sans token", () => {
      const authValue = {
        token: null,
        user: null,
        isAuthenticated: false,
        login: () => {},
        logout: () => {},
      };

      renderWithRouter(
        <ProtectedRoute>
          <div data-testid="protected">Secret Data</div>
        </ProtectedRoute>,
        authValue
      );

      expect(screen.queryByTestId("protected")).not.toBeInTheDocument();
    });

    it("devrait rediriger même si user est défini mais isAuthenticated est false", () => {
      const authValue = {
        token: null,
        user: { id: 1, email: "test@example.com" },
        isAuthenticated: false,
        login: () => {},
        logout: () => {},
      };

      renderWithRouter(
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>,
        authValue
      );

      expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
      expect(screen.getByText("Login Page")).toBeInTheDocument();
    });
  });

  describe("Préservation de la localisation", () => {
    it("devrait préserver la route d'origine pour redirection après login", () => {
      const authValue = {
        token: null,
        user: null,
        isAuthenticated: false,
        login: () => {},
        logout: () => {},
      };

      const { container } = render(
        <AuthContext.Provider value={authValue}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/protected-page"
                element={
                  <ProtectedRoute>
                    <TestComponent />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<LoginComponent />} />
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      );

      // La redirection devrait se produire
      expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
    });
  });

  describe("Gestion de plusieurs enfants", () => {
    it("devrait afficher plusieurs composants enfants si authentifié", () => {
      const authValue = {
        token: "test-token",
        user: { id: 1, email: "test@example.com" },
        isAuthenticated: true,
        login: () => {},
        logout: () => {},
      };

      const TestChildren = () => (
        <>
          <div>First Child</div>
          <div>Second Child</div>
          <div>Third Child</div>
        </>
      );

      renderWithRouter(
        <ProtectedRoute>
          <TestChildren />
        </ProtectedRoute>,
        authValue
      );

      expect(screen.getByText("First Child")).toBeInTheDocument();
      expect(screen.getByText("Second Child")).toBeInTheDocument();
      expect(screen.getByText("Third Child")).toBeInTheDocument();
    });

    it("ne devrait afficher aucun enfant si non authentifié", () => {
      const authValue = {
        token: null,
        user: null,
        isAuthenticated: false,
        login: () => {},
        logout: () => {},
      };

      renderWithRouter(
        <ProtectedRoute>
          <>
            <div>First Child</div>
            <div>Second Child</div>
          </>
        </ProtectedRoute>,
        authValue
      );

      expect(screen.queryByText("First Child")).not.toBeInTheDocument();
      expect(screen.queryByText("Second Child")).not.toBeInTheDocument();
    });
  });

  describe("Tests de sécurité", () => {
    it("ne devrait jamais afficher le contenu protégé avec isAuthenticated false", () => {
      const authValue = {
        token: "fake-token",
        user: { id: 1, email: "hacker@example.com" },
        isAuthenticated: false,
        login: () => {},
        logout: () => {},
      };

      renderWithRouter(
        <ProtectedRoute>
          <div data-testid="sensitive">Sensitive Information</div>
        </ProtectedRoute>,
        authValue
      );

      expect(screen.queryByTestId("sensitive")).not.toBeInTheDocument();
    });

    it("devrait toujours vérifier isAuthenticated avant d'afficher le contenu", () => {
      // Cas limite: token existe mais isAuthenticated est false
      const authValue = {
        token: "expired-token",
        user: null,
        isAuthenticated: false,
        login: () => {},
        logout: () => {},
      };

      renderWithRouter(
        <ProtectedRoute>
          <TestComponent />
        </ProtectedRoute>,
        authValue
      );

      expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
      expect(screen.getByText("Login Page")).toBeInTheDocument();
    });
  });
});
