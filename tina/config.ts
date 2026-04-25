import { defineConfig } from 'tinacms';
 
export default defineConfig({
  // ── Connexion Tina Cloud ─────────────────────────────────────────
  branch:   process.env.GITHUB_BRANCH || 'main',
  clientId: process.env.PUBLIC_TINA_CLIENT_ID || '',
  token:    process.env.TINA_TOKEN || '',
 
  build: {
    outputFolder: 'admin',   // génère /admin sur le site
    publicFolder: 'public',
  },
 
  // ── Gestion des images uploadées par Steven ──────────────────────
  media: {
    tina: {
      mediaRoot:    'uploads',   // stockées dans public/uploads/
      publicFolder: 'public',
    },
  },
 
  schema: {
    collections: [
 
      // ════════════════════════════════════════════════════════════
      // 🏠 PAGE D'ACCUEIL — contenu texte
      // Fichier : content/home.json
      // ════════════════════════════════════════════════════════════
      {
        name:   'homepage',
        label:  '🏠 Page d\'accueil',
        path:   'content',
        format: 'json',
        match:  { include: 'home' },
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          // ── Hero ──────────────────────────────────────────────
          {
            type:   'object',
            name:   'hero',
            label:  '✏️ Section haute (Hero)',
            fields: [
              {
                type:  'string',
                name:  'eyebrow',
                label: 'Petite ligne au-dessus du titre (localisation)',
              },
              {
                type:  'string',
                name:  'titleLine1',
                label: 'Titre — ligne 1',
              },
              {
                type:  'string',
                name:  'titleLine2',
                label: 'Titre — ligne 2 (en or/italique)',
              },
              {
                type:  'string',
                name:  'subtitle',
                label: 'Sous-titre',
                ui:    { component: 'textarea' },
              },
              {
                type:  'string',
                name:  'ctaText',
                label: 'Texte du bouton principal',
              },
              {
                type:  'string',
                name:  'ctaSecondary',
                label: 'Texte du bouton secondaire',
              },
            ],
          },
 
          // ── Stats (compteurs animés) ──────────────────────────
          {
            type:  'object',
            name:  'stats',
            label: '📊 Chiffres clés (compteurs)',
            list:  true,
            ui: {
              itemProps: item => ({ label: item?.label || 'Chiffre' }),
            },
            fields: [
              { type: 'number', name: 'value',  label: 'Nombre'                    },
              { type: 'string', name: 'suffix', label: 'Suffixe (ex: +, ans, %)'   },
              { type: 'string', name: 'label',  label: 'Libellé sous le chiffre'   },
            ],
          },
 
          // ── À propos ──────────────────────────────────────────
          {
            type:   'object',
            name:   'about',
            label:  '👤 Section À propos',
            fields: [
              {
                type:  'string',
                name:  'paragraph1',
                label: 'Premier paragraphe',
                ui:    { component: 'textarea' },
              },
              {
                type:  'string',
                name:  'paragraph2',
                label: 'Deuxième paragraphe',
                ui:    { component: 'textarea' },
              },
              {
                type:  'image',
                name:  'photo',
                label: 'Photo (Steven ou chantier)',
              },
            ],
          },
        ],
      },
 
      // ════════════════════════════════════════════════════════════
      // 📸 GALERIE — un fichier JSON par projet
      // Fichier : content/gallery/*.json
      // ════════════════════════════════════════════════════════════
      {
        name:   'gallery',
        label:  '📸 Galerie de réalisations',
        path:   'content/gallery',
        format: 'json',
        ui: {
          itemProps: item => ({ label: item?.caption || 'Projet' }),
        },
        fields: [
          {
            type:    'string',
            name:    'caption',
            label:   'Titre du projet (affiché sous la photo)',
            isTitle: true,
            required: true,
          },
          {
            type:  'image',
            name:  'photo',
            label: '📷 Photo du projet',
          },
          {
            type:  'string',
            name:  'alt',
            label: 'Description de la photo (pour Google & accessibilité)',
          },
          {
            type:    'string',
            name:    'category',
            label:   'Catégorie',
            options: ['Cuisine', 'Terrasse', 'Dressing', 'Bardage', 'Extension', 'Autre'],
          },
          {
            type:  'boolean',
            name:  'featured',
            label: 'Mettre en avant (grande taille dans la grille)',
          },
          {
            type:  'number',
            name:  'order',
            label: 'Ordre d\'affichage (1 = en premier)',
          },
        ],
      },
 
    ],
  },
});