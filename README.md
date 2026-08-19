#  Production URL Shortener

**A scalable, modular URL shortening service built with Node.js and modern backend practices.**

[![Node.js](https://img.shields.io/badge/Node.js-v20-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Fastify](https://img.shields.io/badge/Fastify-v5-000000?logo=fastify&logoColor=white)](https://fastify.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v16-336791?logo=postgresql&logoColor=white)](https://postgresql.org)
[![Redis](https://img.shields.io/badge/Redis-v7-DC382D?logo=redis&logoColor=white)](https://redis.io)

---

##  Architecture Overview

The system uses a micro-services approach to decouple API management from high-traffic redirection logic and background processing.

### System Class Structure
```mermaid
classDiagram
    class APIService {
        +createShortUrl(url)
        +getMetrics()
    }
    class RedirectService {
        +resolveShortUrl(id)
        +incrementClicks(id)
    }
    class WorkerService {
        +processAnalytics()
        +cleanupExpired()
    }
    class RedisCache {
        +get(key)
        +set(key, value)
    }
    class Database {
        +saveUrl(longUrl, shortId)
        +findUrl(shortId)
    }

    APIService --> Database : writes
    RedirectService --> RedisCache : reads
    RedirectService --> Database : fallback read
    WorkerService ..> Database : analytics
    WorkerService ..> RedisCache : invalidation
```

### Request Pipeline
This flow illustrates the lifecycle of a request, from initial URL creation to high-speed redirection and background analytics processing.

```mermaid
flowchart TD
    User["User/Client"]
    
    subgraph Frontend["Web Interface"]
        Web["Web Application"]
    end
    
    subgraph Backend["Core Services"]
        API["API Service"]
        Redirect["Redirect Service"]
        Worker["Worker Service"]
    end
    
    subgraph Data["Persistence & Caching"]
        DB[(PostgreSQL)]
        Cache[(Redis)]
    end

    User -->|Create URL| Web
    Web -->|POST request| API
    API -->|Save mapping| DB
    
    User -->|Access Short Link| Redirect
    Redirect -->|Check Cache| Cache
    Cache -- Miss --> Redirect
    Redirect -->|Fetch URL| DB
    Cache -- Hit --> Redirect
    Redirect -->|Analytics Event| Worker
    Worker -->|Update Statistics| DB
```

---

##  Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js (v18+)

### Setup
```bash
# Install dependencies
npm install

# Start infrastructure (PostgreSQL & Redis)
docker compose up -d

# Start services
node src/api/main.js
node src/web/app.js
```

### Configuration
Create a `.env` file in the root directory based on `.env.example`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/url_shortener
REDIS_URL=redis://localhost:6379
PORT=3000
NODE_ENV=development
```

---

##  Deployment

For production environments, ensure you adjust your configuration for security and performance.

### Docker Production Deployment
The provided `docker-compose.yml` can be extended for production. Ensure you mount volumes for database persistence:

```yaml
services:
  db:
    image: postgres:16
    volumes:
      - ./data/pgdata:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: your_secure_password
```

---

##  API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/urls` | Shorten a new URL |
| `GET` | `/health/live` | Service health check |

---

##  License
Distributed under the MIT License. See `LICENSE` for more information.
```
