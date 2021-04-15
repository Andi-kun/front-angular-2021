# AssignmentApp
Une application de gestion de devoir.
* url heroku : https://front-angular-2021.herokuapp.com/
* **login admin** : admin / admin
* **login moderateur** : modo / modo

## Membre du groupe
* RASOANAIVO Ny Toky Andi n°47
* RAMANANTSALAMA Anthony Tiana  n°31

## Fonctionnalités
1. Gestion de login/password avec Json Web Tokens (JWT) et Gestion du cas particulier admin
2. Création d'un nouveau devoir avec un formulaire de type stepper avec :
* choix de la matière
* choix de l'élève
3. Modification et suppression d'un devoir
4. Liste des devoirs paginée divisé en 2 onglets selon qu'ils ont été rendus ou pas encore rendus
5. Drag and drop entre les 2 onglets pour faire passer un devoir du statut rendu ou non rendu (avec déclenchement de la notation s'il n'y a pas encore de note pour le statut rendu)
6. Bouton pour peupler la base de données avec 500 devoirs
7. Affichage d'un snack bar pour les messages de succès

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

