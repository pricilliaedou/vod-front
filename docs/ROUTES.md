# Routage

Le routage est défini dans `src/App.jsx` avec `react-router-dom`.

## Tableau des routes

- `/` → Home (publique)
- `/contact` → Contact (publique)
- `/succes` → Succes (publique)
- `/login` → Login (publique)
- `/signup` → Signup (publique)
- `/profil` → Profil (publique)
- `/videos` → Videos (protégée)
- `/temoignages` → Temoignages (protégée)
- `*` → Error404

## Routes protégées

`ProtectedRoute` vérifie `isAuthenticated` depuis `useAuth()` et redirige vers `/login` si nécessaire tout en conservant la `location` d'origine dans `state` pour une redirection après login.
