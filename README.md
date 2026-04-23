# Agencement Lennon — Site vitrine

> Menuiserie sur mesure à Landivisiau, Finistère  
> Stack : **Astro 4** · **Tailwind CSS 3** · **GSAP 3 + ScrollTrigger**

---

## 📁 Architecture du projet

```
agencement-lennon/
├── astro.config.mjs          # Config Astro (intégrations, site URL, image)
├── tailwind.config.mjs       # Thème Tailwind (couleurs Navy/Oak/Cream, typographie fluide)
├── tsconfig.json             # TypeScript strict
├── package.json
│
├── public/
│   ├── robots.txt
│   ├── favicon.png
│   └── images/               ← Copier ici toutes les images du site
│       ├── wood-bg-blue.jpg
│       ├── logo-lennon.png
│       ├── 476170703_*.jpg
│       ├── 481985365_*.jpg
│       ├── 483861445_*.jpg
│       ├── 503652431_*.jpeg
│       ├── 515245383_*.jpeg
│       ├── 515812960_*.jpeg
│       ├── 517222383_*.jpeg
│       └── 528993592_*.jpeg
│
└── src/
    ├── layouts/
    │   └── Layout.astro       # Layout principal : SEO, JSON-LD, fonts, GSAP
    ├── pages/
    │   ├── index.astro        # Page d'accueil
    │   ├── mentions-legales.astro
    │   └── politique-cookies.astro
    ├── components/
    │   ├── Navbar.astro       # Header fixe, menu mobile, scroll state
    │   ├── Hero.astro         # Hero plein écran, parallaxe, compteurs
    │   ├── Services.astro     # Grille 3 cartes, bandeau CTA
    │   ├── Gallery.astro      # Galerie photo + lightbox clavier
    │   ├── About.astro        # Section histoire, valeurs
    │   ├── Contact.astro      # Formulaire Formspree + carte Maps
    │   ├── Footer.astro       # Footer 3 colonnes
    │   └── CookieBanner.astro # Bandeau RGPD
    └── styles/
        └── global.css         # Variables CSS, composants Tailwind, utilitaires GSAP
```

---

## 🚀 Installation & développement

### Prérequis
- **Node.js ≥ 18.17.1** (requis par Astro 4)
- npm, pnpm ou yarn

### 1. Installer les dépendances

```bash
npm install
```

### 2. Copier les images

Copiez tous vos fichiers images dans `public/images/` :

```bash
cp path/to/your/images/* public/images/
```

Fichiers nécessaires :
- `wood-bg-blue.jpg` (hero background)
- `logo-lennon.png` (logo)
- `favicon.png`
- Toutes les photos de réalisations (`.jpg` / `.jpeg`)

### 3. Configurer Formspree

Dans `src/components/Contact.astro`, remplacez `VOTRE_ID_FORMSPREE` :

```html
action="https://formspree.io/f/VOTRE_ID_FORMSPREE"
```

→ Créez votre formulaire gratuit sur [formspree.io](https://formspree.io)

### 4. Lancer le serveur de développement

```bash
npm run dev
# → http://localhost:4321
```

### 5. Build de production

```bash
npm run build
# Output dans dist/
```

### 6. Prévisualiser le build

```bash
npm run preview
```

---

## 🎨 Personnalisation du thème

### Couleurs (tailwind.config.mjs)

```js
colors: {
  navy: { DEFAULT: '#0D1F3C', light: '#162E56', dark: '#080F1E' },
  oak:  { DEFAULT: '#C4955A', light: '#DDB97A', dark: '#A07340' },
  cream:{ DEFAULT: '#FAF8F4', warm:  '#F2EDE4', dark: '#E8E0D2' },
}
```

### Typographie fluide (clamp)

Les tailles de texte utilisent `clamp()` pour s'adapter automatiquement
à toutes les tailles d'écran. Exemple :

```css
'display': clamp(2.75rem, 6vw + 1rem, 6.5rem)   /* Grand titre hero */
'h1':      clamp(2.25rem, 4vw + 1rem, 4.5rem)    /* Titre H1 */
'h2':      clamp(1.875rem, 3vw + 0.5rem, 3rem)   /* Titre de section */
```

---

## ✨ Animations GSAP

Les classes CSS pilotent les animations ScrollTrigger définies dans `Layout.astro` :

| Classe CSS          | Effet                                    |
|---------------------|------------------------------------------|
| `.reveal`           | Fade + glisse vers le haut               |
| `.reveal-scale`     | Fade + scale (0.94 → 1)                  |
| `.reveal-left`      | Glisse depuis la gauche                  |
| `.reveal-clip`      | Révélation par clip-path (lignes/titres) |
| `.stagger-parent`   | Active le stagger sur les `.stagger-child` |
| `.stagger-child`    | Éléments décalés (cards, listes)         |
| `.hero-reveal`      | Animation héro séquentielle au chargement|
| `[data-count]`      | Compteur animé (avec `data-suffix`)      |
| `.split-title`      | Révélation lettre par lettre             |
| `.hero-parallax-bg` | Parallaxe léger (scrub GSAP)             |

### Exemple d'utilisation dans un nouveau composant

```astro
<section class="section">
  <h2 class="reveal">Mon titre</h2>
  <div class="ornament-line reveal-clip"></div>

  <!-- Stagger sur les cartes enfants -->
  <div class="grid grid-cols-3 stagger-parent">
    <div class="stagger-child service-card">Card 1</div>
    <div class="stagger-child service-card">Card 2</div>
    <div class="stagger-child service-card">Card 3</div>
  </div>
</section>
```

---

## 🔍 SEO

### JSON-LD LocalBusiness
Intégré dans `Layout.astro` (uniquement sur `index.astro` via `isHome={true}`) :
- `@type: LocalBusiness + HomeAndConstructionBusiness`
- Adresse, téléphone, email, coordonnées GPS
- `hasOfferCatalog` avec les 4 services
- `openingHoursSpecification`
- `areaServed` : Landivisiau, Brest, Morlaix, Finistère, Bretagne

### Sitemap automatique
Généré par `@astrojs/sitemap` à chaque build dans `dist/sitemap-index.xml`.

### Métadonnées
Chaque page accepte des props SEO :
```astro
<Layout
  title="..."
  description="..."
  image="/images/og-image.jpg"
  canonical="https://www.agencementlennon.fr/ma-page"
>
```

---

## 🌐 Déploiement

### Netlify (recommandé)
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"
```

### Vercel
```json
// vercel.json
{ "buildCommand": "npm run build", "outputDirectory": "dist" }
```

### FTP / hébergement classique
Uploadez simplement le contenu du dossier `dist/` sur votre serveur.

---

## ♿ Accessibilité

- Skip link « Aller au contenu principal »
- Tous les éléments interactifs ont un `aria-label`
- Menu mobile géré avec `aria-expanded` / `aria-hidden`
- Lightbox avec focus trap et navigation clavier (←/→/Échap)
- `prefers-reduced-motion` : toutes les animations sont désactivées
- Contraste WCAG AA sur fond navy/cream

---

## 📝 Liste de vérification avant mise en ligne

- [ ] Remplacer `VOTRE_ID_FORMSPREE` dans `Contact.astro`
- [ ] Compléter le nom de l'hébergeur dans `mentions-legales.astro`
- [ ] Vérifier l'adresse et le téléphone dans `Layout.astro` (JSON-LD)
- [ ] Copier toutes les images dans `public/images/`
- [ ] Convertir les images en WebP avec `sharp` ou squoosh.app
- [ ] Tester le formulaire de contact
- [ ] Vérifier le rendu mobile (DevTools ou BrowserStack)
- [ ] Valider le JSON-LD sur [schema.org/validator](https://validator.schema.org)
- [ ] Tester les scores Lighthouse (cible : 95+ Performance, 100 SEO)
