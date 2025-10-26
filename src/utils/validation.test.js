import { describe, it, expect } from "vitest";
import { validateValues } from "./validation";

describe("validateValues", () => {
  describe("Mode: contact (défaut)", () => {
    it("devrait valider un formulaire de contact correct", () => {
      const values = {
        lastName: "Dupont",
        email: "jean.dupont@example.com",
        message: "Ceci est un message de test avec plus de 20 caractères",
      };
      const errors = validateValues(values, "contact");
      expect(Object.keys(errors).length).toBe(0);
    });

    it("devrait retourner une erreur pour un nom trop court", () => {
      const values = {
        lastName: "D",
        email: "jean.dupont@example.com",
        message: "Ceci est un message de test avec plus de 20 caractères",
      };
      const errors = validateValues(values, "contact");
      expect(errors.lastName).toBe(
        "Le nom doit contenir au moins deux caractères"
      );
    });

    it("devrait retourner une erreur pour un email invalide", () => {
      const values = {
        lastName: "Dupont",
        email: "email-invalide",
        message: "Ceci est un message de test avec plus de 20 caractères",
      };
      const errors = validateValues(values, "contact");
      expect(errors.email).toBe("L'adresse email est invalide");
    });

    it("devrait retourner une erreur pour un email sans @", () => {
      const values = {
        lastName: "Dupont",
        email: "emailinvalide.com",
        message: "Ceci est un message de test avec plus de 20 caractères",
      };
      const errors = validateValues(values, "contact");
      expect(errors.email).toBe("L'adresse email est invalide");
    });

    it("devrait retourner une erreur pour un message trop court", () => {
      const values = {
        lastName: "Dupont",
        email: "jean.dupont@example.com",
        message: "Court",
      };
      const errors = validateValues(values, "contact");
      expect(errors.message).toBe(
        "Le message doit contenir au moins 20 caractères"
      );
    });

    it("devrait retourner plusieurs erreurs si plusieurs champs sont invalides", () => {
      const values = {
        lastName: "D",
        email: "invalid-email",
        message: "Court",
      };
      const errors = validateValues(values, "contact");
      expect(errors.lastName).toBeDefined();
      expect(errors.email).toBeDefined();
      expect(errors.message).toBeDefined();
      expect(Object.keys(errors).length).toBe(3);
    });

    it("devrait ignorer les espaces dans le nom et le message", () => {
      const values = {
        lastName: "  ",
        email: "jean.dupont@example.com",
        message: "   ",
      };
      const errors = validateValues(values, "contact");
      expect(errors.lastName).toBe(
        "Le nom doit contenir au moins deux caractères"
      );
      expect(errors.message).toBe(
        "Le message doit contenir au moins 20 caractères"
      );
    });
  });

  describe("Mode: login", () => {
    it("devrait valider un formulaire de login correct", () => {
      const values = {
        email: "jean.dupont@example.com",
        password: "monMotDePasse123",
      };
      const errors = validateValues(values, "login");
      expect(Object.keys(errors).length).toBe(0);
    });

    it("devrait retourner une erreur si email est invalide", () => {
      const values = {
        email: "email-invalide",
        password: "monMotDePasse123",
      };
      const errors = validateValues(values, "login");
      expect(errors.form).toBe("Adresse email ou mot de passe incorrect");
    });

    it("devrait retourner une erreur si email est vide", () => {
      const values = {
        email: "",
        password: "monMotDePasse123",
      };
      const errors = validateValues(values, "login");
      expect(errors.form).toBe("Adresse email ou mot de passe incorrect");
    });

    it("devrait retourner une erreur si le mot de passe est vide", () => {
      const values = {
        email: "jean.dupont@example.com",
        password: "",
      };
      const errors = validateValues(values, "login");
      expect(errors.form).toBe("Adresse email ou mot de passe incorrect");
    });

    it("devrait retourner une erreur si email et mot de passe sont vides", () => {
      const values = {
        email: "",
        password: "",
      };
      const errors = validateValues(values, "login");
      expect(errors.form).toBe("Adresse email ou mot de passe incorrect");
    });
  });

  describe("Mode: signup", () => {
    it("devrait valider un formulaire d'inscription correct", () => {
      const values = {
        lastName: "Dupont",
        email: "jean.dupont@example.com",
        password: "motDePasseSecurise123",
        confirmPassword: "motDePasseSecurise123",
      };
      const errors = validateValues(values, "signup");
      expect(Object.keys(errors).length).toBe(0);
    });

    it("devrait retourner une erreur si le mot de passe est trop court", () => {
      const values = {
        lastName: "Dupont",
        email: "jean.dupont@example.com",
        password: "court",
        confirmPassword: "court",
      };
      const errors = validateValues(values, "signup");
      expect(errors.password).toBe(
        "Le mot de passe doit contenir au moins 8 caractères"
      );
    });

    it("devrait retourner une erreur si les mots de passe ne correspondent pas", () => {
      const values = {
        lastName: "Dupont",
        email: "jean.dupont@example.com",
        password: "motDePasseSecurise123",
        confirmPassword: "motDePasseDifferent123",
      };
      const errors = validateValues(values, "signup");
      expect(errors.confirmPassword).toBe(
        "Les mots de passe ne correspondent pas"
      );
    });

    it("devrait retourner plusieurs erreurs si plusieurs champs sont invalides", () => {
      const values = {
        lastName: "D",
        email: "invalid-email",
        password: "court",
        confirmPassword: "different",
      };
      const errors = validateValues(values, "signup");
      expect(errors.lastName).toBeDefined();
      expect(errors.email).toBeDefined();
      expect(errors.password).toBeDefined();
      expect(errors.confirmPassword).toBeDefined();
      expect(Object.keys(errors).length).toBe(4);
    });

    it("devrait valider correctement avec un mot de passe de 8 caractères", () => {
      const values = {
        lastName: "Dupont",
        email: "jean.dupont@example.com",
        password: "12345678",
        confirmPassword: "12345678",
      };
      const errors = validateValues(values, "signup");
      expect(errors.password).toBeUndefined();
      expect(errors.confirmPassword).toBeUndefined();
    });
  });

  describe("Tests des valeurs limites", () => {
    it("devrait accepter un nom de 2 caractères", () => {
      const values = {
        lastName: "Du",
        email: "test@example.com",
      };
      const errors = validateValues(values, "contact");
      expect(errors.lastName).toBeUndefined();
    });

    it("devrait accepter un message de 20 caractères", () => {
      const values = {
        lastName: "Dupont",
        email: "test@example.com",
        message: "12345678901234567890",
      };
      const errors = validateValues(values, "contact");
      expect(errors.message).toBeUndefined();
    });

    it("devrait accepter un email avec plusieurs domaines", () => {
      const values = {
        email: "user@mail.example.com",
      };
      const errors = validateValues(values, "contact");
      expect(errors.email).toBeUndefined();
    });
  });
});
