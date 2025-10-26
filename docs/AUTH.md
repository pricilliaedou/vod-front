# Authentification

L'authentification est gérée via un contexte React (`AuthContext`) et un provider (`AuthProvider`).

## Stockage

- `authToken` (string) et `user` (objet JSON) sont stockés dans `localStorage`.
- Au montage, `AuthProvider` restaure ces valeurs si présentes.

## API du contexte

Exposé via le hook `useAuth()`:

- `token: string | null`
- `user: object | null`
- `isAuthenticated: boolean`
- `login(token, user)`
- `logout()`

## Sécurisation des routes

`ProtectedRoute` bloque l'accès si `!isAuthenticated` et redirige vers `/login` avec `state: { from: location }`.

## Client HTTP et token

`axiosClient` ajoute le header `Authorization: Bearer <token>` si `authToken` est présent dans `localStorage`.
En cas de `401`, il supprime le token.
