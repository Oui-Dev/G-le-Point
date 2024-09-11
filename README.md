# G’Le Point - Projet de Fin d'Études

**G’Le Point** est une plateforme collaborative de cartographie interactive dédiée à la découverte et au partage de lieux méconnus, tels que des panoramas cachés, des établissements peu médiatisés, ou des sentiers de randonnée uniques. Ce projet vise à renforcer la connexion entre les utilisateurs en leur permettant de partager leurs découvertes locales tout en explorant celles des autres membres de la communauté.

## 📍 Lien vers le projet

- [Accéder à G’Le Point (Production)](https://glepoint.fr/)
- [Accéder à G’Le Point (Staging)](https://staging.glepoint.fr/)

## 📋 Description du projet

L'idée derrière **G’Le Point** est de faciliter la mise en lumière de lieux peu connus grâce à une plateforme collaborative et interactive. Les utilisateurs peuvent :

- Partager des lieux intéressants qu'ils ont découverts.
- Explorer des points d'intérêt mis en avant par d'autres membres de la communauté.
- Accéder à des **Super Points** promus par nos partenaires via des options premium.

Le projet utilise une architecture moderne et performante pour offrir une expérience fluide. Des fonctionnalités de **ludification** sont également intégrées pour enrichir l'interaction utilisateur, créant une expérience amusante et engageante.

## 🚀 Fonctionnalités

- **Partage de lieux** : Les utilisateurs peuvent ajouter des lieux méconnus ou intéressants sur la carte.
- **Exploration communautaire** : Accès à une carte interactive où chacun peut découvrir des points d'intérêt ajoutés par d'autres utilisateurs.
- **Super Points** : Fonctionnalité premium permettant aux partenaires de promouvoir des lieux spécifiques.
- **Ludification** : Ajout d'éléments de jeu pour rendre l'expérience plus immersive et engageante.

## 🛠️ Technologies Utilisées

- **Next.js** : [Next.js](https://nextjs.org/) pour le rendu côté serveur (SSR) et la génération de pages statiques (SSG).
- **TypeScript** : Pour assurer un code robuste et typé.
- **Mapbox** : Pour la gestion des cartes interactives, permettant aux utilisateurs d'ajouter et explorer des points d'intérêt.
- **Vercel** : Pour l'hébergement de notre solution.
- **Firebase** :
  - **Firestore** : Base de données NoSQL en temps réel pour stocker les points d'intérêt et les utilisateurs.
  - **Firebase Authentication** : Gestion de l'authentification sécurisée des utilisateurs.
- **Tailwind CSS** : Pour une gestion efficace des styles et du design responsive.

## ⚙️ Installation et Configuration

1. Cloner le dépôt : `git clone git@github.com:Oui-Dev/G-le-Point.git`
2. Accéder au répertoire du projet.
3. Installer les dépendances : `npm install`
4. Ajouter les informations de configuration Firebase dans un fichier `.env.local` en vous basant sur le fichier `.env.example`.
5. Démarrer l'application : `npm run dev`

## 📝 Conventions de développement

- **Convention de commits** : Nous utilisons une convention de commits stricte basée sur [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) pour garantir une meilleure lisibilité et gestion des versions.

- **Linting et Formatage** :

  - Avant chaque commit, nous utilisons les commandes suivantes pour s'assurer que le code respecte les standards de qualité :
    - `npm run lint` : Pour vérifier et corriger les erreurs de linting.
    - `npm run format` : Pour formater automatiquement le code selon les règles définies.

- **Gestion des branches** :
  - La branche **dev** est utilisée pour le développement et est déployée sur l'URL de staging : [staging.glepoint.fr](https://staging.glepoint.fr).
  - La branche **master** est utilisée pour la production et est déployée sur l'URL de production : [glepoint.fr](https://glepoint.fr).

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Mapbox Documentation](https://docs.mapbox.com/)

## 📧 Contact

Pour toute question, vous pouvez me contacter à : [team.glepoint@gmail.com](mailto:team.glepoint@gmail.com)
