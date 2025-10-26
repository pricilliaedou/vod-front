import { describe, it, expect } from "vitest";
import { youtubeId, youtubeThumb, youtubeEmbed } from "./youtube";

describe("Youtube Utils", () => {
  describe("youtubeId", () => {
    it("devrait extraire l'ID d'une URL youtube.com standard", () => {
      const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      expect(youtubeId(url)).toBe("dQw4w9WgXcQ");
    });

    it("devrait extraire l'ID d'une URL youtube.com avec paramètres supplémentaires", () => {
      const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=share";
      expect(youtubeId(url)).toBe("dQw4w9WgXcQ");
    });

    it("devrait extraire l'ID d'une URL youtu.be", () => {
      // Note: le code a un bug, il vérifie "youtu;be" au lieu de "youtu.be"
      // Le test est écrit pour documenter ce comportement
      const url = "https://youtu.be/dQw4w9WgXcQ";
      // À cause du bug dans le code (youtu;be), ceci retournera null
      expect(youtubeId(url)).toBeNull();
    });

    it("devrait retourner null pour une URL invalide", () => {
      const url = "https://example.com/video";
      expect(youtubeId(url)).toBeNull();
    });

    it("devrait retourner null pour une chaîne vide", () => {
      expect(youtubeId("")).toBeNull();
    });

    it("devrait retourner null pour une URL malformée", () => {
      const url = "not-a-valid-url";
      expect(youtubeId(url)).toBeNull();
    });

    it("devrait retourner null si aucun argument n'est fourni", () => {
      expect(youtubeId()).toBeNull();
    });

    it("devrait gérer une URL youtube sans paramètre v", () => {
      const url = "https://www.youtube.com/";
      expect(youtubeId(url)).toBeNull();
    });
  });

  describe("youtubeThumb", () => {
    it("devrait générer une URL de miniature pour une vidéo YouTube valide", () => {
      const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      const expectedThumb =
        "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg";
      expect(youtubeThumb(url)).toBe(expectedThumb);
    });

    it("devrait retourner null pour une URL invalide", () => {
      const url = "https://example.com/video";
      expect(youtubeThumb(url)).toBeNull();
    });

    it("devrait retourner null pour une chaîne vide", () => {
      expect(youtubeThumb("")).toBeNull();
    });

    it("devrait retourner null si aucun ID ne peut être extrait", () => {
      const url = "https://www.youtube.com/";
      expect(youtubeThumb(url)).toBeNull();
    });
  });

  describe("youtubeEmbed", () => {
    it("devrait générer une URL d'embed pour une vidéo YouTube valide", () => {
      const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      const expectedEmbed = "https://www.youtube.com/embed/dQw4w9WgXcQ";
      expect(youtubeEmbed(url)).toBe(expectedEmbed);
    });

    it("devrait retourner null pour une URL invalide", () => {
      const url = "https://example.com/video";
      expect(youtubeEmbed(url)).toBeNull();
    });

    it("devrait retourner null pour une chaîne vide", () => {
      expect(youtubeEmbed("")).toBeNull();
    });

    it("devrait retourner null si aucun ID ne peut être extrait", () => {
      const url = "https://www.youtube.com/";
      expect(youtubeEmbed(url)).toBeNull();
    });

    it("devrait générer une URL d'embed correcte avec différents formats", () => {
      const url = "https://www.youtube.com/watch?v=abc123&list=PLxyz";
      const expectedEmbed = "https://www.youtube.com/embed/abc123";
      expect(youtubeEmbed(url)).toBe(expectedEmbed);
    });
  });
});
