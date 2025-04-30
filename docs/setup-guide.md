# Setup Guide

## Prerequisites

### Required Software
- Docker Desktop
- Kubernetes (minikube or Docker Desktop Kubernetes)
- kubectl
- Azure CLI
- Azure DevOps CLI

### Required Accounts
- Azure Account
- Azure DevOps Account
- Docker Hub Account

## Local Environment Setup

### 1. Install Required Software

#### Docker Desktop
1. Download and install Docker Desktop from [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
2. Enable Kubernetes in Docker Desktop settings

#### Azure CLI
```bash
# For macOS
brew update && brew install azure-cli

# For Windows
winget install Microsoft.AzureCLI

# For Linux
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

#### Azure DevOps CLI
```bash
az extension add --name azure-devops
```

### 2. Configure Azure CLI
```bash
az login
az account set --subscription "Your Subscription Name"
```

### 3. Configure Azure DevOps CLI
```bash
az devops login
az devops configure --defaults organization=https://dev.azure.com/your-org project=your-project
```

## Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/microservice-app-example2.git
cd microservice-app-example2
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your-password
DB_NAME=microservices

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=3600

# Azure
AZURE_SUBSCRIPTION_ID=your-subscription-id
AZURE_TENANT_ID=your-tenant-id
AZURE_CLIENT_ID=your-client-id
AZURE_CLIENT_SECRET=your-client-secret
```

### 3. Start Local Services
```bash
# Start Docker containers
docker-compose up -d

# Verify services are running
docker-compose ps
```

## Kubernetes Setup

### 1. Create Kubernetes Namespace
```bash
kubectl create namespace microservices
```

### 2. Apply Kubernetes Manifests
```bash
# Apply base infrastructure
kubectl apply -f k8s/namespace.yml
kubectl apply -f k8s/redis.yml
kubectl apply -f k8s/zipkin.yml
kubectl apply -f k8s/ingress.yml

# Apply services
kubectl apply -f k8s/auth.yml
kubectl apply -f k8s/users.yml
kubectl apply -f k8s/todos.yml
kubectl apply -f k8s/frontend.yml
kubectl apply -f k8s/log-message-processor.yml
```

### 3. Verify Deployment
```bash
# Check pods status
kubectl get pods -n microservices

# Check services
kubectl get svc -n microservices

# Check ingress
kubectl get ingress -n microservices
```

## Azure DevOps Setup

### 1. Create Service Connection
1. Go to Project Settings > Service Connections
2. Create a new service connection for Azure Resource Manager
3. Select "Service Principal (automatic)"
4. Complete the configuration

### 2. Configure Pipeline Variables
1. Go to Pipelines > Library
2. Create a new variable group named "microservices"
3. Add the following variables:
   - `DOCKER_USERNAME`
   - `DOCKER_PASSWORD`
   - `AZURE_SUBSCRIPTION_ID`
   - `AZURE_TENANT_ID`
   - `AZURE_CLIENT_ID`
   - `AZURE_CLIENT_SECRET`

### 3. Import Pipelines
1. Go to Pipelines > Create Pipeline
2. Select "Azure Repos Git"
3. Select your repository
4. Import the following pipeline files:
   - `infra/pipeline.yml`
   - `auth-api/pipeline.yml`
   - `users-api/pipeline.yml`
   - `todos-api/pipeline.yml`
   - `frontend/pipeline.yml`
   - `log-message-processor/pipeline.yml`

## Accessing Services

### Local Development
- Frontend: http://localhost:80
- Auth API: http://localhost:8080/api/auth
- Users API: http://localhost:8080/api/users
- TODOs API: http://localhost:8080/api/todos
- Zipkin: http://localhost:9411

### Kubernetes
- Frontend: http://your-cluster-ip
- Auth API: http://your-cluster-ip/api/auth
- Users API: http://your-cluster-ip/api/users
- TODOs API: http://your-cluster-ip/api/todos
- Zipkin: http://your-cluster-ip/zipkin

## Troubleshooting

### Common Issues

#### Docker Issues
```bash
# Check Docker status
docker info

# Check container logs
docker logs <container-id>

# Restart Docker
sudo systemctl restart docker
```

#### Kubernetes Issues
```bash
# Check cluster status
kubectl cluster-info

# Check pod logs
kubectl logs -n microservices <pod-name>

# Describe pod
kubectl describe pod -n microservices <pod-name>
```

#### Azure DevOps Issues
```bash
# Check Azure CLI status
az account show

# Check Azure DevOps status
az devops project list
```

### Debugging Tips
1. Check service logs
2. Verify network connectivity
3. Check resource limits
4. Verify environment variables
5. Check Kubernetes events

## Maintenance

### Regular Tasks
1. Update dependencies
2. Monitor resource usage
3. Backup configurations
4. Review logs
5. Update security patches

### Scaling
```bash
# Scale services
kubectl scale deployment -n microservices <deployment-name> --replicas=<number>

# Example: Scale frontend to 3 replicas
kubectl scale deployment -n microservices frontend --replicas=3
```

### Updates
1. Pull latest changes
2. Rebuild images
3. Apply Kubernetes manifests
4. Verify deployment
5. Monitor for issues 