import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import AuthProvider from "./AuthProvider";
import { useAuth } from "../hooks/useAuth";

describe("AuthProvider - Tests d'intégration", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

  describe("Initialisation", () => {
    it("devrait initialiser avec token et user à null", () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.token).toBeNull();
      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });

    it("devrait fournir les fonctions login et logout", () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(typeof result.current.login).toBe("function");
      expect(typeof result.current.logout).toBe("function");
    });

    it("devrait initialiser avec isAuthenticated à false", () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe("Fonction login", () => {
    it("devrait définir le token et l'utilisateur lors de la connexion", () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      const mockToken = "new-token-456";
      const mockUser = { id: 2, email: "user@example.com", lastName: "User" };

      act(() => {
        result.current.login(mockToken, mockUser);
      });

      expect(result.current.token).toBe(mockToken);
      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);
    });

    it("devrait mettre à jour isAuthenticated à true après login", () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.isAuthenticated).toBe(false);

      act(() => {
        result.current.login("token", { id: 1, email: "test@example.com" });
      });

      expect(result.current.isAuthenticated).toBe(true);
    });

    it("devrait accepter différents utilisateurs", () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      const user1 = { id: 1, email: "user1@example.com", lastName: "User1" };
      const user2 = { id: 2, email: "user2@example.com", lastName: "User2" };

      act(() => {
        result.current.login("token1", user1);
      });

      expect(result.current.user).toEqual(user1);

      act(() => {
        result.current.login("token2", user2);
      });

      expect(result.current.user).toEqual(user2);
    });
  });

  describe("Fonction logout", () => {
    it("devrait réinitialiser le token et l'utilisateur lors de la déconnexion", () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      // Se connecter d'abord
      act(() => {
        result.current.login("token", { id: 1, email: "test@example.com" });
      });

      expect(result.current.isAuthenticated).toBe(true);

      // Se déconnecter
      act(() => {
        result.current.logout();
      });

      expect(result.current.token).toBeNull();
      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });

    it("devrait fonctionner même si l'utilisateur n'est pas connecté", () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(() => {
        act(() => {
          result.current.logout();
        });
      }).not.toThrow();

      expect(result.current.token).toBeNull();
      expect(result.current.user).toBeNull();
    });

    it("devrait réinitialiser isAuthenticated à false", () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      act(() => {
        result.current.login("token", { id: 1, email: "test@example.com" });
      });

      expect(result.current.isAuthenticated).toBe(true);

      act(() => {
        result.current.logout();
      });

      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe("Flux d'authentification complet", () => {
    it("devrait gérer le flux login -> logout -> login", () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      const user1 = { id: 1, email: "user1@example.com", lastName: "User1" };
      const user2 = { id: 2, email: "user2@example.com", lastName: "User2" };

      // Premier login
      act(() => {
        result.current.login("token1", user1);
      });

      expect(result.current.user).toEqual(user1);
      expect(result.current.isAuthenticated).toBe(true);

      // Logout
      act(() => {
        result.current.logout();
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);

      // Second login
      act(() => {
        result.current.login("token2", user2);
      });

      expect(result.current.user).toEqual(user2);
      expect(result.current.isAuthenticated).toBe(true);
    });

    it("devrait permettre plusieurs connexions/déconnexions successives", () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      for (let i = 0; i < 5; i++) {
        act(() => {
          result.current.login(`token${i}`, {
            id: i,
            email: `user${i}@example.com`,
          });
        });

        expect(result.current.isAuthenticated).toBe(true);

        act(() => {
          result.current.logout();
        });

        expect(result.current.isAuthenticated).toBe(false);
      }
    });
  });

  describe("Tests de stabilité du contexte", () => {
    it("devrait fournir des fonctions stables", () => {
      const { result, rerender } = renderHook(() => useAuth(), { wrapper });

      const initialLogin = result.current.login;
      const initialLogout = result.current.logout;

      rerender();

      // Les fonctions ne doivent pas changer entre les renders
      expect(result.current.login).toBe(initialLogin);
      expect(result.current.logout).toBe(initialLogout);
    });

    it("devrait maintenir la cohérence des données", () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      const mockUser = { id: 1, email: "test@example.com", lastName: "Test" };

      act(() => {
        result.current.login("token", mockUser);
      });

      // Vérifier la cohérence: si token existe, isAuthenticated devrait être true
      if (result.current.token) {
        expect(result.current.isAuthenticated).toBe(true);
      }

      // Vérifier la cohérence: si isAuthenticated est true, token et user doivent exister
      if (result.current.isAuthenticated) {
        expect(result.current.token).toBeTruthy();
        expect(result.current.user).toBeTruthy();
      }
    });
  });

  describe("Gestion des données", () => {
    it("devrait préserver les propriétés de l'utilisateur", () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      const mockUser = {
        id: 1,
        email: "test@example.com",
        lastName: "TestLastName",
        firstName: "TestFirstName",
        extraField: "extraValue",
      };

      act(() => {
        result.current.login("token", mockUser);
      });

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.user.extraField).toBe("extraValue");
    });

    it("devrait gérer différents types de tokens", () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      const tokens = [
        "short",
        "very-long-token-with-many-characters-123456789",
        "token.with.dots",
        "token-with-dashes",
      ];

      tokens.forEach((token) => {
        act(() => {
          result.current.login(token, { id: 1, email: "test@example.com" });
        });

        expect(result.current.token).toBe(token);
      });
    });
  });
});
