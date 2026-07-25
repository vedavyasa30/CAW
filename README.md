# 🔗 Production URL Shortener

A production-oriented URL shortener built using **Node.js**, **Fastify**, **PostgreSQL**, **Redis**, and **Docker**. This project demonstrates scalable backend architecture and production-ready development practices.


## **Tech Stack**

- Node.js
- Fastify
- PostgreSQL
- Redis
- Docker & Docker Compose

## **Project Structure**

├── src
│   ├── api
│   ├── web
│   ├── redirect-service
│   ├── worker
│   └── infra
├── docker-compose.yml
├── package.json
├── .env
└── README.md


## Getting Started

bash
# Install dependencies
npm install

# Start PostgreSQL & Redis
docker compose up -d

# Run the API
node src/api/main.js

# Run the Web App
node src/web/app.js


## 🌐 API

### Create Short URL

http
POST /api/v1/urls


json
{
  "originalUrl": "https://example.com"
}


### **Health Check**

http GET /health/live


## **Features**

- URL Shortening
- Fast Redirects
- Health Check Endpoint
- Dockerized Setup
- Redis Caching
- PostgreSQL Storage
- Modular Project Structure
  
## **Future Improvements**

- User Authentication
- Custom URL Aliases
- Click Analytics
- Rate Limiting
- CI/CD Pipeline
- Kubernetes Deployment

 📄 License

This project is intended for learning and demonstration purposes.
