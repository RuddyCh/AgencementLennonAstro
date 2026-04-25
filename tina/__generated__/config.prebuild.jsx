// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.GITHUB_BRANCH || "main",
  clientId: process.env.PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      // ── PAGE D'ACCUEIL ───────────────────────────────────────────
      {
        name: "homepage",
        label: "Page d'accueil",
        path: "content",
        format: "json",
        match: { include: "home" },
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Section Hero (haut de page)",
            fields: [
              { type: "string", name: "eyebrow", label: "Localisation (ex: Landivisiau \xB7 Finist\xE8re)" },
              { type: "string", name: "titleLine1", label: "Titre ligne 1" },
              { type: "string", name: "titleLine2", label: "Titre ligne 2 (en or)" },
              { type: "string", name: "subtitle", label: "Sous-titre", ui: { component: "textarea" } },
              { type: "string", name: "ctaText", label: "Bouton principal" },
              { type: "string", name: "ctaSecondary", label: "Bouton secondaire" }
            ]
          },
          {
            type: "object",
            name: "stats",
            label: "Chiffres cl\xE9s",
            list: true,
            fields: [
              { type: "number", name: "value", label: "Nombre" },
              { type: "string", name: "suffix", label: "Suffixe (ex: +, %, \u2605)" },
              { type: "string", name: "label", label: "Libell\xE9" }
            ]
          },
          {
            type: "object",
            name: "about",
            label: "Section \xC0 propos",
            fields: [
              { type: "string", name: "paragraph1", label: "Paragraphe 1", ui: { component: "textarea" } },
              { type: "string", name: "paragraph2", label: "Paragraphe 2", ui: { component: "textarea" } },
              { type: "image", name: "photo", label: "Photo" }
            ]
          }
        ]
      },
      // ── GALERIE ──────────────────────────────────────────────────
      {
        name: "gallery",
        label: "Galerie de r\xE9alisations",
        path: "content/gallery",
        format: "json",
        fields: [
          {
            type: "string",
            name: "caption",
            label: "Titre du projet",
            isTitle: true,
            required: true
          },
          { type: "image", name: "photo", label: "Photo du projet" },
          { type: "string", name: "alt", label: "Description photo (SEO)" },
          {
            type: "string",
            name: "category",
            label: "Cat\xE9gorie",
            options: ["Cuisine", "Terrasse", "Dressing", "Bardage", "Extension", "Autre"]
          },
          { type: "boolean", name: "featured", label: "Mettre en avant (grande taille)" },
          { type: "number", name: "order", label: "Ordre d'affichage (1 = en premier)" }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
