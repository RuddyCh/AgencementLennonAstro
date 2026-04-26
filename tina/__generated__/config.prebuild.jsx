// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  // ── Connexion Tina Cloud ─────────────────────────────────────────
  branch: process.env.GITHUB_BRANCH || "main",
  clientId: process.env.PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    // génère /admin sur le site
    publicFolder: "public"
  },
  // ── Gestion des images uploadées par Steven ──────────────────────
  media: {
    tina: {
      mediaRoot: "images",
      // stockées dans public/images/
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      // ════════════════════════════════════════════════════════════
      // 🏠 PAGE D'ACCUEIL — contenu texte
      // Fichier : content/home.json
      // ════════════════════════════════════════════════════════════
      {
        name: "homepage",
        label: "\u{1F3E0} Page d'accueil",
        path: "content",
        format: "json",
        match: { include: "home" },
        ui: {
          allowedActions: { create: false, delete: false }
        },
        fields: [
          // ── Hero ──────────────────────────────────────────────
          {
            type: "object",
            name: "hero",
            label: "\u270F\uFE0F Section haute (Hero)",
            fields: [
              {
                type: "string",
                name: "eyebrow",
                label: "Petite ligne au-dessus du titre (localisation)"
              },
              {
                type: "string",
                name: "titleLine1",
                label: "Titre \u2014 ligne 1"
              },
              {
                type: "string",
                name: "titleLine2",
                label: "Titre \u2014 ligne 2 (en or/italique)"
              },
              {
                type: "string",
                name: "subtitle",
                label: "Sous-titre",
                ui: { component: "textarea" }
              },
              {
                type: "string",
                name: "ctaText",
                label: "Texte du bouton principal"
              },
              {
                type: "string",
                name: "ctaSecondary",
                label: "Texte du bouton secondaire"
              }
            ]
          },
          // ── Stats (compteurs animés) ──────────────────────────
          {
            type: "object",
            name: "stats",
            label: "\u{1F4CA} Chiffres cl\xE9s (compteurs)",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.label || "Chiffre" })
            },
            fields: [
              { type: "number", name: "value", label: "Nombre" },
              { type: "string", name: "suffix", label: "Suffixe (ex: +, ans, %)" },
              { type: "string", name: "label", label: "Libell\xE9 sous le chiffre" }
            ]
          },
          // ── À propos ──────────────────────────────────────────
          {
            type: "object",
            name: "about",
            label: "\u{1F464} Section \xC0 propos",
            fields: [
              {
                type: "string",
                name: "paragraph1",
                label: "Premier paragraphe",
                ui: { component: "textarea" }
              },
              {
                type: "string",
                name: "paragraph2",
                label: "Deuxi\xE8me paragraphe",
                ui: { component: "textarea" }
              },
              {
                type: "image",
                name: "photo",
                label: "Photo (Steven ou chantier)"
              }
            ]
          }
        ]
      },
      // ════════════════════════════════════════════════════════════
      // 📸 GALERIE — un fichier JSON par projet
      // Fichier : content/gallery/*.json
      // ════════════════════════════════════════════════════════════
      {
        name: "gallery",
        label: "\u{1F4F8} Galerie de r\xE9alisations",
        path: "content/gallery",
        format: "json",
        ui: {
          itemProps: (item) => ({ label: item?.caption || "Projet" })
        },
        fields: [
          {
            type: "string",
            name: "caption",
            label: "Titre du projet (affich\xE9 sous la photo)",
            isTitle: true,
            required: true
          },
          {
            type: "image",
            name: "photo",
            label: "\u{1F4F7} Photo du projet"
          },
          {
            type: "string",
            name: "alt",
            label: "Description de la photo (pour Google & accessibilit\xE9)"
          },
          {
            type: "string",
            name: "category",
            label: "Cat\xE9gorie",
            options: ["Cuisine", "Terrasse", "Dressing", "Bardage", "Extension", "Autre"]
          },
          {
            type: "boolean",
            name: "featured",
            label: "Mettre en avant (grande taille dans la grille)"
          },
          {
            type: "number",
            name: "order",
            label: "Ordre d'affichage (1 = en premier)"
          }
        ]
      },
      // ── PAGES SERVICES ───────────────────────────────────────────
      {
        name: "services",
        label: "\u{1F527} Pages Services (photos & textes)",
        path: "content/services",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          itemProps: (item) => ({ label: item?.heroSubtitle ? "\u2713" : "\u25CB" })
        },
        fields: [
          {
            type: "string",
            name: "heroSubtitle",
            label: "Texte d'introduction (sous le titre)",
            ui: { component: "textarea" }
          },
          { type: "image", name: "photo1", label: "\u{1F4F7} Photo principale" },
          { type: "string", name: "photo1Alt", label: "Description photo 1 (SEO)" },
          { type: "image", name: "photo2", label: "\u{1F4F7} Photo secondaire" },
          { type: "string", name: "photo2Alt", label: "Description photo 2 (SEO)" },
          {
            type: "string",
            name: "intro1",
            label: "Paragraphe 1",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "intro2",
            label: "Paragraphe 2",
            ui: { component: "textarea" }
          },
          {
            type: "string",
            name: "intro3",
            label: "Paragraphe 3",
            ui: { component: "textarea" }
          },
          // ── FAQ ───────────────────────────────────────────────
          {
            type: "object",
            name: "faq",
            label: "\u2753 Questions fr\xE9quentes (FAQ)",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item?.q || "Question" })
            },
            fields: [
              {
                type: "string",
                name: "q",
                label: "Question",
                isTitle: true,
                required: true
              },
              {
                type: "string",
                name: "a",
                label: "R\xE9ponse",
                ui: { component: "textarea" },
                required: true
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
