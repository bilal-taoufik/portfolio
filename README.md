<p align="center">
  <img src="./DesignGuide/dist/assets/img.png" alt="Design Guide Logo" width="120">
</p>

<h1 align="center">Design Guide SCSS</h1>

<p align="center">
Design system réutilisable construit avec <strong>SCSS</strong> pour centraliser les styles, tokens, composants et bonnes pratiques front-end.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/SCSS-Design%20System-pink?style=for-the-badge">
  <img src="https://img.shields.io/badge/Vite-Frontend%20Tool-646CFF?style=for-the-badge">
  <img src="https://img.shields.io/badge/Architecture-Scalable-blue?style=for-the-badge">
</p>

------------------------------------------------------------------------

# Aperçu

Ce repository contient un **design guide en SCSS** permettant de
structurer proprement les styles d'un projet front-end.

Le but est de créer une base **réutilisable, scalable et maintenable**
pour tous les projets web.

Le design guide centralise :

-   les variables globales
-   les tokens de design
-   les styles HTML de base
-   les composants UI
-   les utilitaires
-   les effets et animations

------------------------------------------------------------------------

# Stack

-   HTML
-   SCSS
-   Vite
-   JavaScript

------------------------------------------------------------------------

# Structure du projet


    src/
    ├── css/
    │
    │   ├── base/
    │   │   ├── _animation.scss
    │   │   ├── _colors.scss
    │   │   ├── _effect.scss
    │   │   ├── _image.scss
    │   │   ├── _structure.scss
    │   │   ├── _typography.scss
    │   │   └── _utility.scss
    │   │
    │   ├── components/
    │   │   ├── _buttons.scss
    │   │   ├── _footer.scss
    │   │   ├── _form.scss
    │   │   └── _header.scss
    │   │
    │   ├── pages/
    │   │   └── _design-guide.scss
    │   │
    │   ├── partials/
    │   │   ├── _fonts.scss
    │   │   ├── _functions.scss
    │   │   ├── _globals.scss
    │   │   ├── _layers.scss
    │   │   ├── _mixins.scss
    │   │   └── _variables.scss
    │   │
    │   ├── vendor/
    │   │   └── modern-normalize.css
    │   │
    │   └── main.scss
    │

------------------------------------------------------------------------

# Organisation des dossiers

## base

Contient les styles fondamentaux du projet.

-   animations globales
-   couleurs
-   effets
-   images
-   structure layout
-   typographie
-   utilitaires

Ces styles sont appliqués globalement dans l'application.

------------------------------------------------------------------------

## components

Contient les **composants UI réutilisables**.

Exemples :

-   boutons
-   header
-   footer
-   formulaires

Chaque composant possède son propre fichier SCSS.

------------------------------------------------------------------------

## pages

Contient les styles spécifiques aux pages.

Dans ce projet :

-   `design-guide.scss` → page de documentation du design system

------------------------------------------------------------------------

## partials

Contient les **fichiers fondamentaux utilisés par toute l'architecture
SCSS**.

-   variables
-   fonctions
-   mixins
-   fonts
-   globals
-   layers

Ces fichiers servent à construire les styles du projet.

------------------------------------------------------------------------

## vendor

Contient les styles externes importés dans le projet.

Exemple :

-   `modern-normalize` pour normaliser les styles entre navigateurs.

------------------------------------------------------------------------

# Installation

Cloner le repository

``` bash
git clone https://github.com/bilal-taoufik/design-guide.git
```

Installer les dépendances

``` bash
npm install
```

Lancer le serveur de développement

``` bash
npm run dev
```

Build de production

``` bash
npm run build
```

------------------------------------------------------------------------

# Principes du Design System

Ce design guide suit plusieurs principes :

-   Cohérence visuelle
-   Réutilisabilité
-   Lisibilité du code
-   Architecture claire
-   Scalabilité

Chaque style doit pouvoir être compris et modifié facilement.

------------------------------------------------------------------------

# Bonnes pratiques

-   Utiliser les variables SCSS pour toutes les valeurs importantes
-   Ne pas dupliquer les styles
-   Créer des composants réutilisables
-   Séparer clairement base / components / utilities
-   Respecter la structure du projet

------------------------------------------------------------------------

# Personnalisation

Pour adapter ce design guide à un autre projet :

1.  Modifier les variables dans `_variables.scss`
2.  Adapter les couleurs dans `_colors.scss`
3.  Modifier la typographie dans `_typography.scss`
4.  Adapter les composants dans `components/`

------------------------------------------------------------------------

# Auteur

Bilal TAOUFIK

Front-end development\
Design systems\
SCSS architecture

------------------------------------------------------------------------

# Licence

Ce projet n’est pas libre d’utilisation. Toute reproduction, distribution ou utilisation du code, en tout ou en partie, est strictement interdite sans autorisation préalable de l’auteur.
