# Dépannage

## Problèmes courants

### 1) Erreurs de tests sur Windows: EMFILE (too many open files)

- Cause: limitations système sur le nombre de fichiers ouverts.
- Solutions:
  - Lancer les tests par fichier/dossier: `yarn test src/utils`
  - Réduire la parallélisation de Vitest (pool forks) ou exécuter moins de tests en parallèle
  - Augmenter la limite système (si possible)

### 2) Avertissements React Testing Library (act(...))

- Certains tests asynchrones nécessitent `waitFor` autour des assertions:

```js
await waitFor(() => {
  expect(...).toBeInTheDocument();
});
```

### 3) Erreurs MUI (attributs DOM)

- Certains composants MUI utilisent `aria-disabled` plutôt que `disabled`.
- Adaptez les assertions des tests (ex: `toHaveAttribute('aria-disabled','true')`).

### 4) Problèmes d'URL YouTube

- La fonction `youtubeId` ne gère pas `youtu.be` à cause d'une coquille (`youtu;be`).
- Corriger si nécessaire dans `utils/youtube.js`.

### 5) Sentry en local

- Sentry est initialisé par défaut. En local, vous pouvez désactiver ou utiliser un DSN de test.

### 6) Variables d'environnement manquantes

- Si `VITE_API_URL` est absent, fallback `http://localhost:8080` sera utilisé.
