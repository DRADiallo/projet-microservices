# Gestion des Étudiants – Microservices & Frontend Angular

## Description

Ce projet est une application web de **gestion des étudiants et des classes**, permettant d’**ajouter**, **modifier**, **supprimer**, **lister** et **consulter** les informations des étudiants.

Il s’appuie sur une **architecture microservices** et propose :

* Un **Eureka Server** pour la découverte des services
* Un **Config Server** pour la configuration centralisée
* Une **API Gateway** pour sécuriser et router les requêtes
* Deux microservices :

  * **MS Étudiant**
  * **MS Classe**
* Une **documentation API** avec **OpenAPI**
* Une **communication interservices** via **Protobuf** & **SDL**



## Architecture du projet

```
Frontend (Angular + TailwindCSS)
        │
        ▼
    API Gateway
        │
 ┌───────────────┐
 │               │
 ▼               ▼
MS Étudiant    MS Classe
        │
        ▼
Base de données
```



##  Fonctionnalités principales

### Étudiants

* **Ajouter** un étudiant
* **Modifier** un étudiant
*  **Supprimer** un étudiant
* **Lister** tous les étudiants
* **Consulter** les détails d’un étudiant

###  Classes

* **Lister** toutes les classes
* **Associer** un étudiant à une classe



## Technologies utilisées

### Backend

* **Java 17 / Spring Boot**
* **Spring Cloud** (Eureka, Config Server, API Gateway)
* **Protobuf** & **SDL** pour la communication
* **OpenAPI / Swagger** pour la documentation

### Frontend

* **Angular 17**
* **TypeScript**
* **Tailwind CSS**
* **FontAwesome** (icônes)


## Installation & Lancement

### Cloner le projet

```bash
git clone https://github.com/ton-repo.git
cd ton-projet
```

### Lancer les microservices (Backend)

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Lancer le frontend (Angular)

```bash
cd frontend
npm install
ng serve
```

## Auteur & Licence
- Aimerou DIA
- Abdourahmane DIALLO
- Safietou DIALLO

Projet réalisé par **3 développeurs** dans le cadre d’un TP / examen sur les microservices et Angular.

