# VOD Front — Application React (Vite)

Application front-end construite avec React + Vite, Material-UI, React Router et Axios. Le projet inclut une authentification contextuelle, un routage protégé, une intégration API, un thème MUI personnalisé, la télémétrie Sentry et une suite de tests complète (Vitest + React Testing Library).

## Sommaire

- Présentation
- Prérequis et installation
- Variables d'environnement
- Scripts disponibles
- Démarrage et build
- Architecture du projet
- Routage et pages
- Authentification
- API et client HTTP
- Thème et styles
- Qualité (ESLint, Tests)
- Déploiement
- Dépannage

---

## Présentation

- UI basée sur Material-UI (MUI)
- Authentification via `AuthProvider` (token + user en localStorage)
- Routage protégé via `ProtectedRoute`
- Appels HTTP via `axios` configuré dans `src/utils/axiosClient.js`
- Tracking d'erreurs via Sentry
- Tests unitaires et d'intégration (Vitest + RTL)

## Prérequis et installation

- Node.js ≥ 18
- Yarn (recommandé)

Installation des dépendances:

```bash
yarn install
```

## Variables d'environnement

Créer un fichier `.env` (ou `.env.local`) à la racine si nécessaire:

```bash
VITE_API_URL="http://localhost:8080"
```

Notes:

- `VITE_API_URL` est utilisé par `axiosClient` comme `baseURL`. Sans valeur, le fallback est `http://localhost:8080`.
- Sentry est initialisé dans `src/main.jsx` avec un DSN déjà présent. Si besoin, remplacez-le ou externalisez-le via env.

## Scripts disponibles

```bash
yarn dev             # Démarrage en développement
yarn build           # Build de production
yarn preview         # Prévisualiser le build
yarn lint            # Lint du projet
yarn test            # Lancer les tests
yarn test:ui         # Interface UI de Vitest
yarn test:coverage   # Rapport de couverture
```

## Démarrage et build

```bash
# Développement
yarn dev

# Build de production
yarn build

# Prévisualisation du build
yarn preview
```

## Architecture du projet

Voir `docs/ARCHITECTURE.md` pour un détail complet. Aperçu:

```
src/
  common/           # Composants communs (Inputs, Buttons, etc.)
  components/       # Composants métiers (Categories, VideoCarousel, ...)
  context/          # AuthContext + AuthProvider
  hooks/            # Hooks (useAuth)
  layouts/          # Layouts (Header, Footer, MainLayout, etc.)
  pages/            # Pages (Home, Login, Contact, ...)
  routes/           # ProtectedRoute
  utils/            # axiosClient, validation, theme, youtube
  styles/           # Couleurs et styles globaux
```

## Routage et pages

Le routage est défini dans `src/App.jsx`. Détails et cartes de navigation dans `docs/ROUTES.md`.

Routes principales:

- `/` (Home)
- `/contact`, `/succes`
- `/login`, `/signup`
- `/videos` (protégée)
- `/temoignages` (protégée)
- `/profil`
- `*` (404)

## Authentification

Authentification basée sur contexte (`AuthContext`, `AuthProvider`).

- Stockage: `authToken` + `user` dans `localStorage`
- Méthodes: `login(token, user)`, `logout()`
- Sécurisation de routes avec `ProtectedRoute`

Voir `docs/AUTH.md`.

## API et client HTTP

Client HTTP unique `src/utils/axiosClient.js`:

- `baseURL = import.meta.env.VITE_API_URL || "http://localhost:8080"`
- `withCredentials: true`
- Intercepteur requête: injecte Authorization si `authToken` existe
- Intercepteur réponse: sur 401, suppression du token

Endpoints utilisés (exemples):

- `GET /public/home` (Home)
- `POST /public/login` (Login)

Voir `docs/API.md`.

## Thème et styles

- MUI Theme dans `src/utils/theme.js`
- Couleurs partagées dans `src/styles/themeColors.jsx`

## Qualité (ESLint, Tests)

- ESLint via `vite-plugin-eslint`
- Tests via Vitest + React Testing Library
- Documentation des tests: `TESTS.md` (guide), `RESUME_TESTS.md` (résumé)

## Déploiement

Guide de déploiement (Netlify/Vercel/Static host) dans `docs/DEPLOY.md`.

## Dépannage

Problèmes connus et solutions dans `docs/TROUBLESHOOTING.md`.
