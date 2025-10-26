# Setup du Projet

## Prérequis

- Node.js ≥ 18
- Yarn (recommandé)

## Installation

```bash
yarn install
```

## Variables d'environnement

Créer `.env` à la racine si besoin:

```bash
VITE_API_URL="http://localhost:8080"
```

## Scripts

```bash
yarn dev             # Démarrage en développement
yarn build           # Build de production
yarn preview         # Prévisualiser le build
yarn lint            # Lancer ESLint
yarn test            # Lancer les tests
yarn test:ui         # UI de Vitest
yarn test:coverage   # Couverture de code
```

## Linting

ESLint est intégré via `vite-plugin-eslint`. Lancez:

```bash
yarn lint
```

## Tests

Voir `TESTS.md` pour les détails. Commandes principales:

```bash
yarn test
yarn test:coverage
```
