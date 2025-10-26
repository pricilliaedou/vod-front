# API & Client HTTP

Ce projet utilise une instance Axios centralisée (`src/utils/axiosClient.js`).

## Configuration

- `baseURL`: `import.meta.env.VITE_API_URL || "http://localhost:8080"`
- `withCredentials: true`
- Headers par défaut: `Content-Type: application/json`, `Accept: application/json`

## Intercepteurs

### Requête

- Récupère `authToken` depuis `localStorage`
- Ajoute `Authorization: Bearer <token>` si présent

### Réponse

- Si `401`, supprime `authToken` du `localStorage`
- Propage l'erreur

## Endpoints utilisés (exemples)

- `POST /public/login`

  - Body: `{ username, password }`
  - Réponse attendue: `{ token, user }`

- `GET /public/home`
  - Réponse: `{ videoListDTO: Array<{ id, title, url }> }`

## Gestion des erreurs

- Les erreurs sont capturées côté page (ex: `Login`) et, si nécessaire, reportées à Sentry.
