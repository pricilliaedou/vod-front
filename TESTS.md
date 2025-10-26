# Documentation des Tests - VOD Front

## 📋 Table des matières

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Exécution des tests](#exécution-des-tests)
4. [Structure des tests](#structure-des-tests)
5. [Couverture de code](#couverture-de-code)
6. [Types de tests](#types-de-tests)
7. [Bonnes pratiques](#bonnes-pratiques)

## 🎯 Introduction

Ce projet utilise **Vitest** comme framework de test et **React Testing Library** pour tester les composants React. Les tests sont organisés en deux catégories principales :

- **Tests unitaires** : Testent des fonctions et composants isolés
- **Tests d'intégration** : Testent l'interaction entre plusieurs composants

## 📦 Installation

Les dépendances de test sont déjà installées. Si vous devez les réinstaller :

```bash
yarn add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitest/ui happy-dom
```

## 🚀 Exécution des tests

### Commandes disponibles

```bash
# Exécuter tous les tests en mode watch
yarn test

# Exécuter tous les tests une seule fois
yarn test run

# Exécuter les tests avec l'interface UI
yarn test:ui

# Générer un rapport de couverture
yarn test:coverage
```

### Exécuter des tests spécifiques

```bash
# Tester un fichier spécifique
yarn test validation.test.js

# Tester tous les fichiers dans un dossier
yarn test src/utils/

# Tester avec un pattern
yarn test --grep "AuthProvider"
```

## 📁 Structure des tests

Les fichiers de test sont placés à côté des fichiers source avec l'extension `.test.js` ou `.test.jsx` :

```
src/
├── utils/
│   ├── validation.js
│   └── validation.test.js          # Tests unitaires
├── hooks/
│   ├── useAuth.js
│   └── useAuth.test.js             # Tests unitaires
├── context/
│   ├── AuthProvider.jsx
│   └── AuthProvider.test.jsx       # Tests d'intégration
├── components/
│   ├── Button/
│   │   ├── index.jsx
│   │   └── Button.test.jsx         # Tests unitaires
└── pages/
    ├── Login/
    │   ├── index.jsx
    │   └── Login.test.jsx           # Tests d'intégration
```

## 📊 Couverture de code

### Générer un rapport de couverture

```bash
yarn test:coverage
```

Cette commande génère :

- Un rapport dans le terminal
- Un rapport HTML dans `coverage/index.html`
- Un rapport JSON pour l'intégration CI/CD

### Ouvrir le rapport de couverture

```bash
# Windows
start coverage/index.html

# macOS
open coverage/index.html

# Linux
xdg-open coverage/index.html
```

### Objectifs de couverture

Le projet vise les objectifs suivants :

- **Déclarations** (Statements) : > 80%
- **Branches** : > 75%
- **Fonctions** : > 80%
- **Lignes** : > 80%

## 🧪 Types de tests

### 1. Tests Unitaires

#### Utils (validation.js)

- ✅ Validation des emails
- ✅ Validation des mots de passe
- ✅ Validation des formulaires (contact, login, signup)
- ✅ Gestion des cas limites

#### Utils (youtube.js)

- ✅ Extraction des IDs YouTube
- ✅ Génération des URLs de miniatures
- ✅ Génération des URLs d'embed
- ✅ Gestion des URLs invalides

#### Utils (axiosClient.js)

- ✅ Configuration de l'instance Axios
- ✅ Intercepteurs de requêtes
- ✅ Intercepteurs de réponses
- ✅ Gestion des erreurs 401

#### Hooks (useAuth.js)

- ✅ Retour du contexte d'authentification
- ✅ Gestion des états authentifiés/non authentifiés
- ✅ Accès aux fonctions login/logout

#### Composants communs

- ✅ **Button** : Affichage, événements onClick, classes CSS
- ✅ **InputField** : Valeurs, onChange, erreurs, validation
- ✅ **PasswordField** : Visibilité, basculement masquer/afficher
- ✅ **SelectField** : Options, sélection, validation
- ✅ **TextAreaField** : Multiline, lignes, validation

### 2. Tests d'Intégration

#### Context (AuthProvider)

- ✅ Initialisation du contexte
- ✅ Restauration depuis localStorage
- ✅ Fonctions login/logout
- ✅ Flux d'authentification complet
- ✅ Persistance des données
- ✅ Gestion des erreurs JSON

#### Routes (ProtectedRoute)

- ✅ Accès pour utilisateurs authentifiés
- ✅ Redirection pour utilisateurs non authentifiés
- ✅ Préservation de la localisation
- ✅ Gestion de plusieurs enfants
- ✅ Tests de sécurité

#### Pages (Login)

- ✅ Affichage du formulaire
- ✅ Validation des champs
- ✅ Soumission du formulaire
- ✅ Appel API et gestion des réponses
- ✅ Gestion des erreurs
- ✅ Redirection après connexion

#### Pages (Contact)

- ✅ Affichage des informations
- ✅ Formulaire de contact
- ✅ Liens sociaux
- ✅ Layout et structure
- ✅ Accessibilité

#### Pages (Home)

- ✅ Chargement des vidéos depuis l'API
- ✅ Filtrage des vidéos YouTube
- ✅ Limitation à 3 vidéos
- ✅ Affichage conditionnel selon authentification
- ✅ Validation des URLs embeddables
- ✅ Gestion des erreurs API

## ✅ Bonnes pratiques

### 1. Nommage des tests

Utilisez des descriptions claires en français :

```javascript
describe("validateValues", () => {
  it("devrait valider un formulaire de contact correct", () => {
    // Test
  });

  it("devrait retourner une erreur pour un email invalide", () => {
    // Test
  });
});
```

### 2. Organisation des tests

Groupez les tests par fonctionnalité :

```javascript
describe("Login Page", () => {
  describe("Affichage de la page", () => {
    // Tests d'affichage
  });

  describe("Validation du formulaire", () => {
    // Tests de validation
  });

  describe("Soumission du formulaire", () => {
    // Tests de soumission
  });
});
```

### 3. Utilisation des mocks

Moquez les dépendances externes :

```javascript
vi.mock("axios");
vi.mock("../../utils/axiosClient");

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});
```

### 4. Tests asynchrones

Utilisez `waitFor` pour les opérations asynchrones :

```javascript
await waitFor(() => {
  expect(screen.getByText("Success")).toBeInTheDocument();
});
```

### 5. Nettoyage

Nettoyez après chaque test :

```javascript
beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});
```

## 🐛 Débogage

### Afficher le DOM actuel

```javascript
import { screen } from "@testing-library/react";

screen.debug(); // Affiche le DOM complet
screen.debug(screen.getByTestId("my-element")); // Affiche un élément spécifique
```

### Logs utiles

```javascript
console.log(screen.getByRole("button").textContent);
console.log(container.innerHTML);
```

### Mode debug de Vitest

```bash
yarn test --reporter=verbose
```

## 📈 Amélioration continue

### Ajout de nouveaux tests

1. Créez un fichier `.test.js` à côté du fichier source
2. Importez les utilitaires nécessaires
3. Écrivez vos tests en suivant les bonnes pratiques
4. Exécutez `yarn test` pour vérifier

### Maintenance des tests

- Maintenez une couverture > 80%
- Mettez à jour les tests lors des changements de code
- Refactorisez les tests dupliqués
- Documentez les cas complexes

## 🔗 Ressources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## 📝 Statistiques des tests

Au total, le projet contient :

- **Tests unitaires** :

  - 3 fichiers utils (validation, youtube, axiosClient)
  - 1 fichier hooks (useAuth)
  - 5 fichiers composants (Button, InputField, PasswordField, SelectField, TextAreaField)

- **Tests d'intégration** :
  - 1 fichier context (AuthProvider)
  - 1 fichier routes (ProtectedRoute)
  - 3 fichiers pages (Login, Contact, Home)

**Total** : **14 fichiers de tests** couvrant les fonctionnalités principales de l'application.

## 🎉 Conclusion

Cette suite de tests complète assure la qualité et la fiabilité du code. N'hésitez pas à ajouter de nouveaux tests au fur et à mesure de l'évolution du projet !
