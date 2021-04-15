# AssignmentApp
Une application web de gestion de devoir.
* **Url heroku** : https://front-angular-2021.herokuapp.com/
* **Login admin** : admin / admin
* **Login moderateur** : modo / modo

## Membre du groupe
* RASOANAIVO Ny Toky Andi n°47
* RAMANANTSALAMA Anthony Tiana  n°31

## Fonctionnalités
1. Gestion de login/password avec Json Web Tokens (JWT) et gestion du cas particulier admin
2. Ajout des collections Users, Matières et Elèves
3. Création d'un nouveau devoir avec un formulaire de type stepper avec :
* choix de la matière
* choix de l'élève
4. Modification et suppression d'un devoir
5. Liste des devoirs paginée divisé en 2 onglets selon qu'ils ont été rendus ou pas encore rendus
6. Drag and drop entre les 2 onglets pour faire passer un devoir du statut non rendu à rendu ou l'inverse (avec déclenchement de la notation s'il n'y a pas encore de note pour le statut rendu)
7. Bouton pour peupler la base de données avec 500 devoirs
8. Affichage d'un snack bar pour les messages de succès

## Pour lancer ce projet chez vous 

* Cloner ce projet et le projet back end : https://github.com/Andi-kun/back-node-2021
* Effectuer un `npm install` dans les répertoires des 2 projets
* Lancer le projet back end avec la commande : `node server.js`
* Lancer le projet front end avec la commande : `ng serve`
* Naviguer vers `http://localhost:4200/`

## Sources 
* JWT : https://www.section.io/engineering-education/getting-started-with-jwt-using-angular8-and-nodejs/
* Composants Angular Material : https://material.angular.io/components/
