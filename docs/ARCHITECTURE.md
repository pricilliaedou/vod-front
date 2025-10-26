# Architecture du Projet

Ce document décrit la structure du projet, les flux principaux (authentification, navigation, API), et les dépendances majeures.

## Arborescence

```
src/
  App.jsx                 # Définition des routes
  main.jsx                # Entrée app, Sentry, MUI Theme
  common/                 # Composants UI réutilisables
  components/             # Composants métiers (carrousels, sections)
  context/                # AuthContext + Provider
  hooks/                  # Hooks applicatifs (useAuth)
  layouts/                # Layouts (Header, Footer, Main, etc.)
  pages/                  # Pages (Home, Login, Contact, ...)
  routes/                 # ProtectedRoute
  styles/                 # Couleurs globales
  utils/                  # axiosClient, validation, theme, youtube
```

## Flux d'authentification

- `AuthProvider` lit `authToken` et `user` depuis `localStorage` au montage
- `login(token, user)` : met à jour l'état et persiste dans `localStorage`
- `logout()` : nettoie l'état et `localStorage`
- `ProtectedRoute` redirige vers `/login` si `isAuthenticated` est `false`

## Routage

Implémenté avec `react-router-dom` dans `App.jsx`.

- Routes publiques: `/`, `/contact`, `/succes`, `/login`, `/signup`, `/profil`, `*`
- Routes protégées: `/videos`, `/temoignages`

## Accès API

`src/utils/axiosClient.js` contient l'instance Axios:

- `baseURL` configurable via `VITE_API_URL`
- Intercepteur requête: injection du header `Authorization`
- Intercepteur réponse: nettoyage du token sur 401

Points d'entrée connus:

- `GET /public/home` pour récupérer des vidéos (Home)
- `POST /public/login` pour l'authentification (Login)

## Thème et Design System

- Thème MUI dans `utils/theme.js` (palette, typo)
- Couleurs partagées dans `styles/themeColors.jsx`

## Observabilité

- Sentry initialisé dans `main.jsx` (DSN configurable)

## Tests et Qualité

- Vitest + React Testing Library
- Suite de tests couvrant utils, hooks, composants, routes et pages
- Voir `TESTS.md` pour les commandes et la structure
