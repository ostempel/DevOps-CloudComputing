# DevOps & CloudComputing

Das Repository enthält ein Projekt für das Fach "DevOps & CloudComputing". Das Projekt zeigt, wie man Microservices lokal entwickeln und die komplette Microservice-Architektur über das Orchestrierungstool docker-compose starten kann. Jeder Komponente enthält ein eigenes Dockerfile, das ein Image erzeugt. Dieses wird wiederum von docker-compose verwendt, um die Architektur in einem Kontext zu starten.
**Die Architektur enthält:**

- Frontend (React, Node.js)
- API-Gateway (GraphQL, Node.js)
- Microservices (NestJS, Node.js)
- Datenbanken (PostgreSQL)

---

## Vorraussetzungen

Es werden verschiedene Technologien benötigt:

- Docker
- Node.js -> npm, yarn package manager

---

## Installation

In jedes Root-Verzeichnis einer Komponente (außer Datenbanken) per CLI gehen und die packages installieren.
Bsp.: Cars-service

```
cd service-cars
yarn install
```

---

## Starten

In das Root-Verzeichnis des Projekt per CLI gehen und die Umgebung per docker-compose bauen und starten.

```
docker-compose up --build
```

Das Frontend wird native auf dem lokalen Betriebssystem gestartet. Dadurch ist der Hot-Reload von React schneller und optimiert den Entwicklungsprozess. Im Root-Verzeichnis des Frontends:

```
yarn start
```
