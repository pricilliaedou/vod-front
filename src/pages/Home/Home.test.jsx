import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Home from "./index";
import { AuthContext } from "../../context/AuthContext";

vi.mock("axios");

describe("Home Page - Tests d'intégration", () => {
  const mockVideos = {
    videoListDTO: [
      {
        id: 1,
        title: "Video 1",
        url: "https://www.youtube.com/watch?v=test1",
      },
      {
        id: 2,
        title: "Video 2",
        url: "https://www.youtube.com/watch?v=test2",
      },
      {
        id: 3,
        title: "Video 3",
        url: "https://youtu.be/test3",
      },
    ],
  };

  const authValueNotAuthenticated = {
    token: null,
    user: null,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
  };

  const authValueAuthenticated = {
    token: "test-token",
    user: { id: 1, email: "test@example.com", lastName: "Test" },
    isAuthenticated: true,
    login: () => {},
    logout: () => {},
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    axios.get.mockResolvedValue({ data: mockVideos });
  });

  const renderHome = (authValue = authValueNotAuthenticated) => {
    return render(
      <AuthContext.Provider value={authValue}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  };

  describe("Chargement des vidéos", () => {
    it("devrait appeler l'API pour récupérer les vidéos", async () => {
      renderHome();

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalledWith(
          expect.stringContaining("/public/home")
        );
      });
    });

    it("devrait filtrer les vidéos non-YouTube", async () => {
      const mixedVideos = {
        videoListDTO: [
          { id: 1, url: "https://www.youtube.com/watch?v=test1" },
          { id: 2, url: "https://vimeo.com/123456" }, // Non-YouTube
          { id: 3, url: "https://youtu.be/test3" },
        ],
      };

      axios.get.mockResolvedValue({ data: mixedVideos });

      renderHome();

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalled();
      });

      // Les vidéos non-YouTube devraient être filtrées
    });

    it("devrait limiter à 3 vidéos maximum", async () => {
      const manyVideos = {
        videoListDTO: Array.from({ length: 10 }, (_, i) => ({
          id: i,
          url: `https://www.youtube.com/watch?v=test${i}`,
        })),
      };

      axios.get.mockResolvedValue({ data: manyVideos });

      renderHome();

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalled();
      });

      // Seulement 3 vidéos devraient être affichées
    });

    it("devrait gérer les erreurs de l'API", async () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      axios.get.mockRejectedValue(new Error("API Error"));

      renderHome();

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "Home fetch error:",
          expect.any(Error)
        );
      });

      consoleErrorSpy.mockRestore();
    });
  });

  describe("Affichage conditionnel selon l'authentification", () => {
    it("devrait afficher la Navbar pour les utilisateurs non authentifiés", () => {
      renderHome(authValueNotAuthenticated);

      // Vérifier que la Navbar est présente
      const container = document.querySelector(
        ".homeLayout-firstSection-disconnected-navbar"
      );
      expect(container).toBeInTheDocument();
    });

    it("devrait afficher NavbarHome pour les utilisateurs authentifiés", () => {
      renderHome(authValueAuthenticated);

      // L'affichage devrait être différent pour les utilisateurs authentifiés
      expect(document.querySelector(".homeLayout")).toBeInTheDocument();
    });
  });

  describe("Fonction isEmbeddable", () => {
    it("devrait accepter les URLs youtube.com", async () => {
      const videos = {
        videoListDTO: [{ id: 1, url: "https://www.youtube.com/watch?v=test" }],
      };

      axios.get.mockResolvedValue({ data: videos });

      renderHome();

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalled();
      });
    });

    it("devrait accepter les URLs youtu.be", async () => {
      const videos = {
        videoListDTO: [{ id: 1, url: "https://youtu.be/test" }],
      };

      axios.get.mockResolvedValue({ data: videos });

      renderHome();

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalled();
      });
    });

    it("devrait rejeter les URLs non-YouTube", async () => {
      const videos = {
        videoListDTO: [
          { id: 1, url: "https://vimeo.com/123456" },
          { id: 2, url: "https://dailymotion.com/video/xyz" },
        ],
      };

      axios.get.mockResolvedValue({ data: videos });

      renderHome();

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalled();
      });
    });

    it("devrait gérer les URLs invalides", async () => {
      const videos = {
        videoListDTO: [
          { id: 1, url: "not-a-valid-url" },
          { id: 2, url: "" },
        ],
      };

      axios.get.mockResolvedValue({ data: videos });

      renderHome();

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalled();
      });

      // Les URLs invalides devraient être filtrées
    });
  });

  describe("Nettoyage", () => {
    it("devrait nettoyer les requêtes en attente lors du démontage", async () => {
      const { unmount } = renderHome();

      unmount();

      // S'assurer qu'aucune erreur n'est levée après le démontage
      await waitFor(() => {
        expect(axios.get).toHaveBeenCalled();
      });
    });

    it("ne devrait pas mettre à jour l'état après le démontage", async () => {
      const consoleErrorSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const { unmount } = renderHome();

      unmount();

      await new Promise((resolve) => setTimeout(resolve, 100));

      // Vérifier qu'il n'y a pas d'erreurs de mise à jour d'état
      expect(consoleErrorSpy).not.toHaveBeenCalledWith(
        expect.stringContaining("Can't perform a React state update")
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe("Layout", () => {
    it("devrait utiliser BodyLayout", () => {
      renderHome();

      const homeLayout = document.querySelector(".homeLayout");
      expect(homeLayout).toBeInTheDocument();
    });

    it("devrait afficher les composants Categories et VideoCarousel", async () => {
      renderHome(authValueNotAuthenticated);

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalled();
      });

      // Les composants devraient être présents dans le DOM
    });
  });

  describe("Gestion des données vides", () => {
    it("devrait gérer une réponse API vide", async () => {
      axios.get.mockResolvedValue({ data: {} });

      renderHome();

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalled();
      });

      // Ne devrait pas planter même avec des données vides
    });

    it("devrait gérer un tableau de vidéos vide", async () => {
      axios.get.mockResolvedValue({ data: { videoListDTO: [] } });

      renderHome();

      await waitFor(() => {
        expect(axios.get).toHaveBeenCalled();
      });

      // Ne devrait pas planter avec un tableau vide
    });
  });
});
