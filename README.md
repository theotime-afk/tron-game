# Tron Game

Jeu multijoueur local inspiré de **Tron**, développé dans le cadre de ma deuxième année de Licence Informatique.

Le jeu oppose deux joueurs qui se déplacent simultanément dans une arène. Chaque joueur laisse une trajectoire derrière lui et doit éviter les murs ainsi que les trajectoires déjà présentes.

## Fonctionnalités

- Jeu local à deux joueurs
- Déplacements en temps réel
- Gestion des collisions avec les murs
- Collision avec sa propre trajectoire et celle de l'adversaire
- Système de manches et de scores
- Premier joueur à 3 points déclaré vainqueur
- Configuration personnalisée des touches pour chaque joueur
- Mécanique de saut
- Affichage des joueurs et de leurs trajectoires avec HTML5 Canvas
- Orientation graphique des joueurs selon leur direction
- Possibilité de redémarrer une partie

## Technologies utilisées

- HTML5
- CSS3
- JavaScript
- HTML5 Canvas
- jQuery
- jQuery UI

## Lancement

1. Télécharger ou cloner le projet.
2. Ouvrir `index.html` dans un navigateur web.
3. Cliquer sur **START/RESTART** pour lancer une partie.

Les touches des deux joueurs peuvent être modifiées avec le bouton **Configurer les touches**.

## Structure du projet

```text
Tron-game/
├── index.html
├── style.css
├── script.js
├── Audi.png
├── Black_viper.png
└── README.md