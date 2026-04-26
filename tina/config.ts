import { defineConfig } from 'tinacms';

// ── Champs communs à toutes les pages service ────────────────────────
const commonServiceFields: any[] = [
  { type: 'string', name: 'heroSubtitle', label: "✏️ Texte d'introduction (sous le titre hero)", ui: { component: 'textarea' } },
  { type: 'image',  name: 'photo1',    label: '📷 Photo principale' },
  { type: 'string', name: 'photo1Alt', label: 'Description photo 1 (SEO)' },
  { type: 'image',  name: 'photo2',    label: '📷 Photo secondaire' },
  { type: 'string', name: 'photo2Alt', label: 'Description photo 2 (SEO)' },
  {
    type: 'object', name: 'section', label: '📌 Titre de section (grand titre navy)',
    fields: [
      { type: 'string', name: 'title',   label: 'Ligne 1 (normal)' },
      { type: 'string', name: 'titleEm', label: 'Ligne 2 (italique doré)' },
    ],
  },
  { type: 'string', name: 'intro1', label: '📝 Paragraphe 1', ui: { component: 'textarea' } },
  { type: 'string', name: 'intro2', label: '📝 Paragraphe 2', ui: { component: 'textarea' } },
  { type: 'string', name: 'intro3', label: '📝 Paragraphe 3', ui: { component: 'textarea' } },
  {
    type: 'object', name: 'sidebar', label: '📋 Encart latéral (boîte navy)',
    fields: [
      { type: 'string', name: 'title',     label: 'Titre (ex: Un projet de cuisine ?)' },
      { type: 'string', name: 'subtitle',  label: 'Sous-titre (ex: Devis gratuit · 48h)' },
      { type: 'string', name: 'checklist', label: 'Points avec coches', list: true },
    ],
  },
  {
    type: 'object', name: 'cta', label: '🎯 Section finale (fond navy)',
    fields: [
      { type: 'string', name: 'title',    label: 'Titre ligne 1' },
      { type: 'string', name: 'titleEm',  label: 'Titre ligne 2 (italique doré)' },
      { type: 'string', name: 'subtitle', label: 'Sous-titre', ui: { component: 'textarea' } },
    ],
  },
  {
    type: 'object', name: 'faq', label: '❓ Questions fréquentes (FAQ)', list: true,
    ui: { itemProps: (item: any) => ({ label: item?.q || 'Question' }) },
    fields: [
      { type: 'string', name: 'q', label: 'Question', isTitle: true, required: true },
      { type: 'string', name: 'a', label: 'Réponse', ui: { component: 'textarea' }, required: true },
    ],
  },
];

export default defineConfig({
  branch:   process.env.GITHUB_BRANCH || 'main',
  clientId: process.env.PUBLIC_TINA_CLIENT_ID || '',
  token:    process.env.TINA_TOKEN || '',
  build: { outputFolder: 'admin', publicFolder: 'public' },
  media: { tina: { mediaRoot: 'images', publicFolder: 'public' } },

  schema: {
    collections: [

      // ── PAGE D'ACCUEIL ──────────────────────────────────────────
      {
        name: 'homepage', label: "🏠 Page d'accueil",
        path: 'content', format: 'json', match: { include: 'home' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: 'object', name: 'hero', label: '✏️ Section haute (Hero)',
            fields: [
              { type: 'string', name: 'eyebrow',      label: 'Petite ligne au-dessus du titre' },
              { type: 'string', name: 'titleLine1',   label: 'Titre — ligne 1' },
              { type: 'string', name: 'titleLine2',   label: 'Titre — ligne 2 (or/italique)' },
              { type: 'string', name: 'subtitle',     label: 'Sous-titre', ui: { component: 'textarea' } },
              { type: 'string', name: 'ctaText',      label: 'Bouton principal' },
              { type: 'string', name: 'ctaSecondary', label: 'Bouton secondaire' },
            ],
          },
          {
            type: 'object', name: 'stats', label: '📊 Chiffres clés', list: true,
            ui: { itemProps: (item: any) => ({ label: item?.label || 'Chiffre' }) },
            fields: [
              { type: 'number', name: 'value',  label: 'Nombre' },
              { type: 'string', name: 'suffix', label: 'Suffixe (ex: +, ans, %)' },
              { type: 'string', name: 'label',  label: 'Libellé' },
            ],
          },
          {
            type: 'object', name: 'about', label: "👤 Section À propos",
            fields: [
              { type: 'string', name: 'paragraph1', label: 'Paragraphe 1', ui: { component: 'textarea' } },
              { type: 'string', name: 'paragraph2', label: 'Paragraphe 2', ui: { component: 'textarea' } },
              { type: 'image',  name: 'photo',      label: 'Photo' },
            ],
          },
        ],
      },

      // ── GALERIE ─────────────────────────────────────────────────
      {
        name: 'gallery', label: '📸 Galerie de réalisations',
        path: 'content/gallery', format: 'json',
        ui: { itemProps: (item: any) => ({ label: item?.caption || 'Projet' }) },
        fields: [
          { type: 'string',  name: 'caption',  label: 'Titre du projet', isTitle: true, required: true },
          { type: 'image',   name: 'photo',    label: '📷 Photo' },
          { type: 'string',  name: 'alt',      label: 'Description (SEO)' },
          { type: 'string',  name: 'category', label: 'Catégorie', options: ['Cuisine','Terrasse','Dressing','Bardage','Extension','Autre'] },
          { type: 'boolean', name: 'featured', label: 'Mettre en avant' },
          { type: 'number',  name: 'order',    label: "Ordre d'affichage" },
        ],
      },

      // ── CUISINE SUR MESURE ──────────────────────────────────────
      {
        name: 'cuisine', label: '🍳 Cuisine sur mesure',
        path: 'content/services', format: 'json', match: { include: 'cuisine' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          ...commonServiceFields,
          {
            type: 'object', name: 'etapes', label: '🔢 Étapes du projet', list: true,
            ui: { itemProps: (item: any) => ({ label: item?.title || 'Étape' }) },
            fields: [
              { type: 'string', name: 'num',   label: 'Numéro (ex: 01)' },
              { type: 'string', name: 'title', label: 'Titre', isTitle: true, required: true },
              { type: 'string', name: 'desc',  label: 'Description', ui: { component: 'textarea' } },
            ],
          },
          {
            type: 'object', name: 'materiaux', label: '🪵 Matériaux et finitions', list: true,
            ui: { itemProps: (item: any) => ({ label: item?.label || 'Matériau' }) },
            fields: [
              { type: 'string', name: 'label',  label: 'Nom', isTitle: true, required: true },
              { type: 'string', name: 'detail', label: 'Description courte' },
            ],
          },
        ],
      },

      // ── TERRASSE ────────────────────────────────────────────────
      {
        name: 'terrasse', label: '🌿 Terrasse bois & composite',
        path: 'content/services', format: 'json', match: { include: 'terrasse' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          ...commonServiceFields,
          {
            type: 'object', name: 'comparatif', label: '📊 Tableau comparatif bois vs composite', list: true,
            ui: { itemProps: (item: any) => ({ label: item?.crit || 'Critère' }) },
            fields: [
              { type: 'string', name: 'crit', label: 'Critère', isTitle: true, required: true },
              { type: 'string', name: 'bois', label: 'Bois massif' },
              { type: 'string', name: 'comp', label: 'Composite' },
            ],
          },
          {
            type: 'object', name: 'options', label: '➕ Prestations complémentaires', list: true,
            ui: { itemProps: (item: any) => ({ label: item?.label || 'Option' }) },
            fields: [
              { type: 'string', name: 'label',  label: 'Titre', isTitle: true, required: true },
              { type: 'string', name: 'detail', label: 'Description courte' },
            ],
          },
        ],
      },

      // ── DRESSING ────────────────────────────────────────────────
      {
        name: 'dressing', label: '🚪 Dressing & rangements',
        path: 'content/services', format: 'json', match: { include: 'dressing' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          ...commonServiceFields,
          { type: 'string', name: 'h3Pourquoi', label: '📌 Titre "Pourquoi le sur-mesure ?"' },
          {
            type: 'object', name: 'solutions', label: '🗂️ Solutions de rangement (cartes)', list: true,
            ui: { itemProps: (item: any) => ({ label: item?.title || 'Solution' }) },
            fields: [
              { type: 'string', name: 'title', label: 'Titre', isTitle: true, required: true },
              { type: 'string', name: 'desc',  label: 'Description courte' },
            ],
          },
        ],
      },

      // ── BARDAGE ─────────────────────────────────────────────────
      {
        name: 'bardage', label: '🏠 Bardage extérieur',
        path: 'content/services', format: 'json', match: { include: 'bardage' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          ...commonServiceFields,
          {
            type: 'object', name: 'materiaux', label: '🪵 Matériaux disponibles (fiches)', list: true,
            ui: { itemProps: (item: any) => ({ label: item?.name || 'Matériau' }) },
            fields: [
              { type: 'string', name: 'name',  label: 'Nom du matériau', isTitle: true, required: true },
              { type: 'string', name: 'items', label: 'Caractéristiques', list: true },
              { type: 'string', name: 'pros',  label: '✓ Avantages' },
              { type: 'string', name: 'cons',  label: '△ Point attention' },
            ],
          },
        ],
      },

    ],
  },
});
