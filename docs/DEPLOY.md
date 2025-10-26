# Déploiement

Plusieurs options s'offrent à vous: Netlify, Vercel, hébergement statique.

## Build de production

```bash
yarn build
```

Le build sera disponible dans `dist/`.

## Variables d'environnement

- `VITE_API_URL` doit être défini sur l'URL de l'API en production.
- (Optionnel) DSN Sentry si vous l'externalisez.

## Netlify

- Créer un nouveau site → lier le repo
- Commande de build: `yarn build`
- Dossier de publication: `dist`
- Redirections: ajouter `public/_redirects` (déjà présent) pour SPA

## Vercel

- Importer le repo
- Commande de build: `yarn build`
- Output: `dist`

## Hébergement statique (Nginx/Apache)

- Servir le contenu de `dist/`
- Configurer les réécritures vers `index.html` pour le SPA routing
