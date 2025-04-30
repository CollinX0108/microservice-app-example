# Guía de Configuración de Microservicios

## 1. Requisitos Previos

- Docker Desktop
- Kubernetes (Minikube o similar)
- kubectl
- helm

## 2. Configuración del Entorno

### 2.1. Configuración de Kubernetes

```bash
# Iniciar Minikube
minikube start
```

### 2.2. Despliegue de Servicios de Infraestructura

```bash
# Desplegar Zipkin (Trazabilidad)
kubectl apply -f k8s/zipkin.yaml

# Desplegar Redis (Mensajería)
kubectl apply -f k8s/redis.yaml
```

## 3. Despliegue de Microservicios

### 3.1. Construcción de Imágenes

```bash
# Construir imágenes Docker
docker build -t users-api ./users-api
docker build -t auth-api ./auth-api
docker build -t todos-api ./todos-api
docker build -t log-processor ./log-message-processor
docker build -t frontend ./frontend
```

### 3.2. Despliegue en Kubernetes

```bash
# Aplicar configuraciones de Kubernetes
kubectl apply -f k8s/users-api.yaml
kubectl apply -f k8s/auth-api.yaml
kubectl apply -f k8s/todos-api.yaml
kubectl apply -f k8s/log-processor.yaml
kubectl apply -f k8s/frontend.yaml
```

## 4. Acceso a los Servicios

Una vez desplegado, los servicios estarán disponibles en:

- Frontend: http://localhost:8080
- Zipkin UI: http://localhost:9411
- Grafana: http://localhost:3000

## 5. Verificación

Para verificar que todo está funcionando:

1. Verificar pods:
```bash
kubectl get pods
```

2. Verificar servicios:
```bash
kubectl get services
```

3. Verificar logs:
```bash
kubectl logs -f deployment/log-processor
```

## 6. Desarrollo Local

Para desarrollo local, puedes ejecutar los servicios individualmente:

### Log Message Processor (Python)
```bash
cd log-message-processor
pip install -r requirements.txt
export REDIS_HOST=localhost
export REDIS_PORT=6379
export REDIS_CHANNEL=log_channel
export ZIPKIN_URL=http://localhost:9411/api/v2/spans
chmod +x run.sh && ./run.sh
```

### Users API (Java/Spring Boot)
```bash
cd users-api
mvn clean install
JWT_SECRET=PRFT SERVER_PORT=8083 java -jar target/users-api-0.0.1-SNAPSHOT.jar
```

### Auth API (Go)
```bash
cd auth-api
go mod tidy
go build
JWT_SECRET=PRFT AUTH_API_PORT=8000 USERS_API_ADDRESS=http://127.0.0.1:8083 ./auth-api
```

### Todos API (Node.js)
```bash
cd todos-api
npm install
JWT_SECRET=PRFT TODO_API_PORT=8082 npm start
```

### Frontend (Vue.js)
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

## Notas Importantes

1. Asegúrate de que todos los requisitos previos estén instalados
2. Los servicios deben iniciarse en el orden correcto
3. Verifica que los puertos necesarios estén disponibles
4. Para desarrollo local, asegúrate de que Redis y Zipkin estén ejecutándose
5. Para producción, utiliza las configuraciones de Kubernetes 