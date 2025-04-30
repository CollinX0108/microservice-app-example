### Collin Gonzalez - A00382429
### Manuel Herrera - A00381987

# General Microservices Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Architecture](#architecture)
3. [Cloud Design Patterns](#cloud-design-patterns)
4. [Branching Strategy](#branching-strategy)
5. [Pipelines](#pipelines)
6. [Infrastructure](#infrastructure)
7. [Usage Guide](#usage-guide)

## Introduction
This project implements a microservices application using different technologies and cloud design patterns. The application is composed of several services that work together to provide complete functionality.

## Architecture
The project architecture consists of the following services:

- **Frontend**: Web application built with Vue.js
- **Auth API**: Authentication service in Go
- **Users API**: User management service in Java/Spring Boot
- **TODOs API**: Task management service in Node.js
- **Log Message Processor**: Message processor in Python
- **Redis**: In-memory database for messaging
- **Zipkin**: Distributed tracing system

## Cloud Design Patterns

### Circuit Breaker
Implemented in Auth API (Go) and TODOs API (Node.js):
- Monitors failures in inter-service calls
- "Opens the circuit" when too many failures are detected
- Prevents cascading failures
- Allows automatic recovery

### Retry Pattern
Implemented in Users API (Java/Spring Boot):
- Automatically retries failed operations
- Configured for 3 attempts with 2 seconds between each attempt
- Handles temporary network or database failures

## Branching Strategy

### For Developers (Git Flow)
- `main`: Stable code ready for production
- `develop`: Stable code for testing
- `feature/*`: New feature development
- `release/*`: Production version preparation
- `hotfix/*`: Critical bug fixes in production

### For Operations
- `infra`: Main branch for infrastructure as code
- `infra/dev`: Infrastructure testing and preliminary changes
- `infra/prod`: Protected branch for production deployment

## Pipelines

### Development Pipelines
Each microservice has its own pipeline that:
1. Builds the application
2. Creates the Docker image
3. Uploads the image to the registry
4. Deploys to Kubernetes

### Infrastructure Pipelines
1. **Start Pipeline**:
   - Deploys base infrastructure
   - Configures namespace, redis, zipkin, and ingress
   - Scales services to 1 replica

2. **Stop Pipeline**:
   - Scales all services to 0 replicas
   - Manually executed for cleanup

## Infrastructure

### Kubernetes
- Namespace: `microservices`
- Services: ClusterIP for internal communication
- Frontend: LoadBalancer for external access
- Limited resources per service

### Service Configuration
- Redis: In-memory database
- Zipkin: Distributed tracing
- Ingress: External traffic management

## Usage Guide

### Prerequisites
- Docker
- Kubernetes
- Azure CLI
- Azure DevOps

### Useful Commands
```bash
# Check service status
kubectl get pods -n microservices

# View logs for a specific service
kubectl logs -n microservices [pod-name]

# Manually scale services
kubectl scale deployment -n microservices [service-name] --replicas=[number]
```

### Infrastructure Management
To manage infrastructure, we use Azure DevOps pipelines:

1. **Start Pipeline** (`infra/azure-pipeline.yml`):
   - Automatically runs on push to master
   - Deploys all base infrastructure
   - Scales services to 1 replica

2. **Stop Pipeline** (`infra/stop.yml`):
   - Manually executed when services need to be stopped
   - Scales all services to 0 replicas

### Service Access
- Frontend: http://localhost:80
- Zipkin: http://localhost:9411
- APIs: http://localhost:8080/api/*

### Monitoring
- Zipkin for tracing
- Kubernetes logs for debugging
- Resource metrics per service

## Maintenance

### Scaling
To scale services:
```bash
kubectl scale deployment -n microservices [service-name] --replicas=[number]
```

### Updates
1. Make code changes
2. Create Pull Request to develop
3. After testing, merge to main
4. Automatic pipeline deploys changes

### Troubleshooting
1. Check pod logs
2. Review service status
3. Verify service connections
4. Check Kubernetes configuration 