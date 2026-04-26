// tina/config.ts
import { defineConfig } from "tinacms";
var commonServiceFields = [
  { type: "string", name: "heroSubtitle", label: "\u270F\uFE0F Texte d'introduction (sous le titre hero)", ui: { component: "textarea" } },
  { type: "image", name: "photo1", label: "\u{1F4F7} Photo principale" },
  { type: "string", name: "photo1Alt", label: "Description photo 1 (SEO)" },
  { type: "image", name: "photo2", label: "\u{1F4F7} Photo secondaire" },
  { type: "string", name: "photo2Alt", label: "Description photo 2 (SEO)" },
  {
    type: "object",
    name: "section",
    label: "\u{1F4CC} Titre de section (grand titre navy)",
    fields: [
      { type: "string", name: "title", label: "Ligne 1 (normal)" },
      { type: "string", name: "titleEm", label: "Ligne 2 (italique dor\xE9)" }
    ]
  },
  { type: "string", name: "intro1", label: "\u{1F4DD} Paragraphe 1", ui: { component: "textarea" } },
  { type: "string", name: "intro2", label: "\u{1F4DD} Paragraphe 2", ui: { component: "textarea" } },
  { type: "string", name: "intro3", label: "\u{1F4DD} Paragraphe 3", ui: { component: "textarea" } },
  {
    type: "object",
    name: "sidebar",
    label: "\u{1F4CB} Encart lat\xE9ral (bo\xEEte navy)",
    fields: [
      { type: "string", name: "title", label: "Titre (ex: Un projet de cuisine ?)" },
      { type: "string", name: "subtitle", label: "Sous-titre (ex: Devis gratuit \xB7 48h)" },
      { type: "string", name: "checklist", label: "Points avec coches", list: true }
    ]
  },
  {
    type: "object",
    name: "cta",
    label: "\u{1F3AF} Section finale (fond navy)",
    fields: [
      { type: "string", name: "title", label: "Titre ligne 1" },
      { type: "string", name: "titleEm", label: "Titre ligne 2 (italique dor\xE9)" },
      { type: "string", name: "subtitle", label: "Sous-titre", ui: { component: "textarea" } }
    ]
  },
  {
    type: "object",
    name: "faq",
    label: "\u2753 Questions fr\xE9quentes (FAQ)",
    list: true,
    ui: { itemProps: (item) => ({ label: item?.q || "Question" }) },
    fields: [
      { type: "string", name: "q", label: "Question", isTitle: true, required: true },
      { type: "string", name: "a", label: "R\xE9ponse", ui: { component: "textarea" }, required: true }
    ]
  }
];
var config_default = defineConfig({
  branch: process.env.GITHUB_BRANCH || "main",
  clientId: process.env.PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "images", publicFolder: "public" } },
  schema: {
    collections: [
      // ── PAGE D'ACCUEIL ──────────────────────────────────────────
      {
        name: "homepage",
        label: "\u{1F3E0} Page d'accueil",
        path: "content",
        format: "json",
        match: { include: "home" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "\u270F\uFE0F Section haute (Hero)",
            fields: [
              { type: "string", name: "eyebrow", label: "Petite ligne au-dessus du titre" },
              { type: "string", name: "titleLine1", label: "Titre \u2014 ligne 1" },
              { type: "string", name: "titleLine2", label: "Titre \u2014 ligne 2 (or/italique)" },
              { type: "string", name: "subtitle", label: "Sous-titre", ui: { component: "textarea" } },
              { type: "string", name: "ctaText", label: "Bouton principal" },
              { type: "string", name: "ctaSecondary", label: "Bouton secondaire" }
            ]
          },
          {
            type: "object",
            name: "stats",
            label: "\u{1F4CA} Chiffres cl\xE9s",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label || "Chiffre" }) },
            fields: [
              { type: "number", name: "value", label: "Nombre" },
              { type: "string", name: "suffix", label: "Suffixe (ex: +, ans, %)" },
              { type: "string", name: "label", label: "Libell\xE9" }
            ]
          },
          {
            type: "object",
            name: "about",
            label: "\u{1F464} Section \xC0 propos",
            fields: [
              { type: "string", name: "paragraph1", label: "Paragraphe 1", ui: { component: "textarea" } },
              { type: "string", name: "paragraph2", label: "Paragraphe 2", ui: { component: "textarea" } },
              { type: "image", name: "photo", label: "Photo" }
            ]
          }
        ]
      },
      // ── GALERIE ─────────────────────────────────────────────────
      {
        name: "gallery",
        label: "\u{1F4F8} Galerie de r\xE9alisations",
        path: "content/gallery",
        format: "json",
        ui: { itemProps: (item) => ({ label: item?.caption || "Projet" }) },
        fields: [
          { type: "string", name: "caption", label: "Titre du projet", isTitle: true, required: true },
          { type: "image", name: "photo", label: "\u{1F4F7} Photo" },
          { type: "string", name: "alt", label: "Description (SEO)" },
          { type: "string", name: "category", label: "Cat\xE9gorie", options: ["Cuisine", "Terrasse", "Dressing", "Bardage", "Extension", "Autre"] },
          { type: "boolean", name: "featured", label: "Mettre en avant" },
          { type: "number", name: "order", label: "Ordre d'affichage" }
        ]
      },
      // ── CUISINE SUR MESURE ──────────────────────────────────────
      {
        name: "cuisine",
        label: "\u{1F373} Cuisine sur mesure",
        path: "content/services",
        format: "json",
        match: { include: "cuisine" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          ...commonServiceFields,
          {
            type: "object",
            name: "etapes",
            label: "\u{1F522} \xC9tapes du projet",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title || "\xC9tape" }) },
            fields: [
              { type: "string", name: "num", label: "Num\xE9ro (ex: 01)" },
              { type: "string", name: "title", label: "Titre", isTitle: true, required: true },
              { type: "string", name: "desc", label: "Description", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "materiaux",
            label: "\u{1FAB5} Mat\xE9riaux et finitions",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label || "Mat\xE9riau" }) },
            fields: [
              { type: "string", name: "label", label: "Nom", isTitle: true, required: true },
              { type: "string", name: "detail", label: "Description courte" }
            ]
          }
        ]
      },
      // ── TERRASSE ────────────────────────────────────────────────
      {
        name: "terrasse",
        label: "\u{1F33F} Terrasse bois & composite",
        path: "content/services",
        format: "json",
        match: { include: "terrasse" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          ...commonServiceFields,
          {
            type: "object",
            name: "comparatif",
            label: "\u{1F4CA} Tableau comparatif bois vs composite",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.crit || "Crit\xE8re" }) },
            fields: [
              { type: "string", name: "crit", label: "Crit\xE8re", isTitle: true, required: true },
              { type: "string", name: "bois", label: "Bois massif" },
              { type: "string", name: "comp", label: "Composite" }
            ]
          },
          {
            type: "object",
            name: "options",
            label: "\u2795 Prestations compl\xE9mentaires",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label || "Option" }) },
            fields: [
              { type: "string", name: "label", label: "Titre", isTitle: true, required: true },
              { type: "string", name: "detail", label: "Description courte" }
            ]
          }
        ]
      },
      // ── DRESSING ────────────────────────────────────────────────
      {
        name: "dressing",
        label: "\u{1F6AA} Dressing & rangements",
        path: "content/services",
        format: "json",
        match: { include: "dressing" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          ...commonServiceFields,
          { type: "string", name: "h3Pourquoi", label: '\u{1F4CC} Titre "Pourquoi le sur-mesure ?"' },
          {
            type: "object",
            name: "solutions",
            label: "\u{1F5C2}\uFE0F Solutions de rangement (cartes)",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title || "Solution" }) },
            fields: [
              { type: "string", name: "title", label: "Titre", isTitle: true, required: true },
              { type: "string", name: "desc", label: "Description courte" }
            ]
          }
        ]
      },
      // ── BARDAGE ─────────────────────────────────────────────────
      {
        name: "bardage",
        label: "\u{1F3E0} Bardage ext\xE9rieur",
        path: "content/services",
        format: "json",
        match: { include: "bardage" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          ...commonServiceFields,
          {
            type: "object",
            name: "materiaux",
            label: "\u{1FAB5} Mat\xE9riaux disponibles (fiches)",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.name || "Mat\xE9riau" }) },
            fields: [
              { type: "string", name: "name", label: "Nom du mat\xE9riau", isTitle: true, required: true },
              { type: "string", name: "items", label: "Caract\xE9ristiques", list: true },
              { type: "string", name: "pros", label: "\u2713 Avantages" },
              { type: "string", name: "cons", label: "\u25B3 Point attention" }
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
