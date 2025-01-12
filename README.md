# Learning Platform NoSQL

## Installation et Lancement du Projet

### Prérequis

- Node.js (version 14 ou supérieure)
- MongoDB
- Redis

### Étapes d'installation

1. Clonez le dépôt :

   ```bash
   git clone <URL_DU_DEPOT>
   cd learning-platform-nosql
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Configurez les variables d'environnement :

   - Copiez le fichier `.env.example` en `.env` :
     ```bash
     cp .env.example .env
     ```
   - Remplissez les valeurs appropriées dans le fichier `.env`.

4. Lancez le projet :
   ```bash
   npm start
   ```

## Structure du Projet

```
learning-platform-nosql/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   ├── env.js
│   ├── controllers/
│   │   ├── courseController.js
│   ├── routes/
│   │   ├── courseRoutes.js
│   ├── services/
│   │   ├── mongoService.js
│   │   ├── redisService.js
│   ├── app.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Choix Techniques

- **Express.js** : Utilisé pour créer le serveur et gérer les routes.
- **MongoDB** : Base de données NoSQL pour stocker les données des cours.
- **Redis** : Utilisé pour le caching afin d'améliorer les performances.
- **dotenv** : Pour gérer les variables d'environnement.

## Réponses aux Questions

### .env.example

- **Quelles sont les informations sensibles à ne jamais commiter ?**
  - Les informations sensibles comprennent les clés API, les mots de passe, les bases de données et d'autres.
- **Pourquoi utiliser des variables d'environnement ?**
  - Pour assurer une bonne structuration du code en séparant les paramètres de configuration et en même temps protéger les informations sensibles à être partagées en public (GitHub, etc.).

### .gitignore

- **Explication :**
  - Le fichier `.gitignore permet de spécifier les fichiers et dossiers qui ne doivent pas être suivis par Git. Dans notre cas, on va mettre le fichier environnement `.env`et les dossiers`node_modules`.

### src/config/env.js

- **Pourquoi est-il important de valider les variables d'environnement au démarrage ?**
  - Il est impératif de valider les variables d'environnement au démarrage pour éviter des erreurs de configuration pendant l'exécution du code.
- **Que se passe-t-il si une variable requise est manquante ?**
  - Dans ce cas, l'application doit lever une erreur explicative et arrêter son exécution.

### src/config/db.js

- **Pourquoi créer un module séparé pour les connexions aux bases de données ?**
  - Je pense que cela permet de centraliser la logique de connexion, de faciliter la maintenance et de réutiliser le code dans différentes parties de l'application.
- **Comment gérer proprement la fermeture des connexions ?**
  - Pour ce faire, il faut implémenter des fonctions de fermeture qui s'assurent que toutes les connexions sont correctement fermées avant que l'application ne se termine.

### src/controllers/courseController.js

- **Quelle est la différence entre un contrôleur et une route ?**
  - Une route définit les URL et les méthodes HTTP, alors qu'un contrôleur contient la logique métier exécutée par ces routes.
- **Pourquoi séparer la logique métier des routes ?**
  - Pour rendre le code plus modulaire, maintenable.

### src/routes/courseRoutes.js

- **Pourquoi séparer les routes dans différents fichiers ?**
  - Pour bien organiser le code.
- **Comment organiser les routes de manière cohérente ?**
  - Grouper les routes similaires dans les mêmes fichiers.

### src/services/redisService.js

- **Comment gérer efficacement le cache avec Redis ?**
  - Utiliser des TTL (Time To Live) pour les clés, invalider le cache lorsque les données changent, et structurer les clés de manière logique.
- **Quelles sont les bonnes pratiques pour les clés Redis ?**
  - Utiliser des noms de clés descriptifs et cohérents, éviter les clés trop longues, et utiliser des namespaces pour organiser les clés.

### src/services/mongoService.js

- **Pourquoi créer des services séparés ?**
  - Assurer la modularité du code et une facilité des tests.
