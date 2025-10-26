import { describe, it, expect, beforeEach } from "vitest";
import api from "./axiosClient";

describe("axiosClient", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("Instance API", () => {
    it("devrait exporter une instance axios configurée", () => {
      expect(api).toBeDefined();
      // Axios instance peut être une fonction avec des propriétés
      expect(api).toBeTruthy();
    });

    it("devrait avoir les méthodes HTTP de base", () => {
      expect(typeof api.get).toBe("function");
      expect(typeof api.post).toBe("function");
      expect(typeof api.put).toBe("function");
      expect(typeof api.delete).toBe("function");
      expect(typeof api.patch).toBe("function");
    });

    it("devrait avoir des intercepteurs configurés", () => {
      expect(api.interceptors).toBeDefined();
      expect(api.interceptors.request).toBeDefined();
      expect(api.interceptors.response).toBeDefined();
    });

    it("devrait avoir une configuration de base", () => {
      expect(api.defaults).toBeDefined();
      expect(api.defaults.headers).toBeDefined();
      expect(api.defaults.headers["Content-Type"]).toBe("application/json");
      expect(api.defaults.headers["Accept"]).toBe("application/json");
      expect(api.defaults.withCredentials).toBe(true);
    });

    it("devrait avoir une baseURL configurée", () => {
      expect(api.defaults.baseURL).toBeDefined();
      expect(typeof api.defaults.baseURL).toBe("string");
    });
  });

  describe("Gestion du token", () => {
    it("devrait avoir accès à localStorage", () => {
      expect(localStorage).toBeDefined();
      expect(typeof localStorage.setItem).toBe("function");
      expect(typeof localStorage.getItem).toBe("function");
      expect(typeof localStorage.removeItem).toBe("function");
    });

    it("devrait avoir les méthodes localStorage nécessaires", () => {
      expect(localStorage.setItem).toBeDefined();
      expect(localStorage.getItem).toBeDefined();
      expect(localStorage.removeItem).toBeDefined();
      expect(localStorage.clear).toBeDefined();
    });
  });

  describe("Configuration des headers", () => {
    it("devrait avoir Content-Type défini sur application/json", () => {
      expect(api.defaults.headers["Content-Type"]).toBe("application/json");
    });

    it("devrait avoir Accept défini sur application/json", () => {
      expect(api.defaults.headers["Accept"]).toBe("application/json");
    });

    it("devrait avoir withCredentials activé", () => {
      expect(api.defaults.withCredentials).toBe(true);
    });
  });

  describe("Méthodes HTTP", () => {
    it("devrait exposer la méthode GET", () => {
      expect(api.get).toBeDefined();
      expect(typeof api.get).toBe("function");
    });

    it("devrait exposer la méthode POST", () => {
      expect(api.post).toBeDefined();
      expect(typeof api.post).toBe("function");
    });

    it("devrait exposer la méthode PUT", () => {
      expect(api.put).toBeDefined();
      expect(typeof api.put).toBe("function");
    });

    it("devrait exposer la méthode DELETE", () => {
      expect(api.delete).toBeDefined();
      expect(typeof api.delete).toBe("function");
    });

    it("devrait exposer la méthode PATCH", () => {
      expect(api.patch).toBeDefined();
      expect(typeof api.patch).toBe("function");
    });
  });

  describe("Structure de l'instance", () => {
    it("devrait avoir une structure d'instance axios valide", () => {
      expect(api).toHaveProperty("defaults");
      expect(api).toHaveProperty("interceptors");
      expect(api).toHaveProperty("get");
      expect(api).toHaveProperty("post");
      expect(api).toHaveProperty("put");
      expect(api).toHaveProperty("delete");
      expect(api).toHaveProperty("patch");
      expect(api).toHaveProperty("request");
    });
  });
});
