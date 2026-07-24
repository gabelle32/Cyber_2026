# Cyber Arcade - Monitoring & CI/CD

Ce projet met en place la conteneurisation, l'intégration continue, le monitoring et les tests de charge pour l'API Cyber Arcade.

---

## 🛠️ Choix Techniques

* **Conteneurisation** : Docker & Docker Compose pour orchestrer l'API FastAPI, Prometheus et Grafana.
* **Intégration Continue (CI)** : GitHub Actions pour automatiser les tests et le build du projet.
* **Monitoring** : Prometheus pour la collecte des métriques système et applicatives exposées sur `/metrics`.
* **Visualisation** : Grafana avec un tableau de bord sur-mesure (`arcade_dashboard.json`).
* **Alerting** : Règles Prometheus configurées pour la disponibilité (`up == 0`), la latence p95 et les pics de triche.
* **Tests de charge** : Script `k6` simulant une montée progressive d'utilisateurs simultanés.

---

## 🚀 Lancement du Projet

### 1. Démarrer la stack (Dev / Prod)

Pour lancer l'ensemble des services (API, Prometheus, Grafana) :

```bash
docker compose up -d --build


Accès aux Services & Monitoring
Une fois la stack démarrée :

API Cyber Arcade : http://localhost:8000

Documentation Swagger : http://localhost:8000/docs

Prometheus : http://localhost:9090

État des alertes : http://localhost:9090/alerts

Grafana : http://localhost:3000 (Dashboard : Cyber Arcade - Monitoring)


Exécution du Test de Montée en Charge
Le script de charge est écrit avec k6 et se trouve dans load-test.js.

Pour lancer le test via Docker :Get-Content load-test.js | docker run --rm -i --network="host" grafana/k6 run -


Captures d'Écran (Livrables)
Les captures justifiant du bon fonctionnement sont disponibles dans le projet :

CI GitHub Actions : Pipeline de validation au statut vert.

Dashboard Grafana : Visualisation des métriques lors du test de charge.

Alerting : Alerte ServiceDown déclenchée lors de l'arrêt de l'API.
