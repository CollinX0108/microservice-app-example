# Guía de Configuración de Microservicios

## 1. Servicios de Infraestructura

### Zipkin (Trazabilidad)
```bash
docker run -d -p 9411:9411 --name zipkin openzipkin/zipkin
```
Accesible en: http://localhost:9411

### Redis (Mensajería)
```bash
docker run -d --name redis -p 6379:6379 redis:alpine
```

## 2. Servicios de la Aplicación

### Log Message Processor (Python)
```bash
cd log-message-processor
# Instalar dependencias
pip install -r requirements.txt

# Variables de entorno necesarias
export REDIS_HOST=localhost
export REDIS_PORT=6379
export REDIS_CHANNEL=log_channel
export ZIPKIN_URL=http://localhost:9411/api/v2/spans

# Ejecutar el servicio
chmod +x run.sh && ./run.sh
```

### Users API (Java/Spring Boot)
```bash
cd users-api
# Compilar y ejecutar
mvn clean install
JWT_SECRET=PRFT SERVER_PORT=8083 java -jar target/users-api-0.0.1-SNAPSHOT.jar
```

### Auth API (Go)
```bash
cd auth-api
# Instalar dependencias y ejecutar
 go mod tidy
 go build
 JWT_SECRET=PRFT AUTH_API_PORT=8000 USERS_API_ADDRESS=http://127.0.0.1:8083 ./auth-api
```

### Todos API (Node.js)
```bash
cd todos-api
# Instalar dependencias
npm install
# Ejecutar el servicio
JWT_SECRET=PRFT TODO_API_PORT=8082 npm start
```

## 3. Frontend (Vue.js)
```bash
cd frontend
# Instalar dependencias
npm install --legacy-peer-deps
# Ejecutar en modo desarrollo
npm run dev
```

## Notas Importantes:
1. Asegurarse de que Docker Desktop esté corriendo antes de iniciar los contenedores
2. Los servicios deben iniciarse en el orden listado arriba
3. Cada servicio debe ejecutarse en una terminal separada
4. Verificar que los puertos necesarios estén disponibles:
   - Zipkin: 9411
   - Redis: 6379
   - Users API: 8083
   - Auth API: 8081
   - Todos API: 8082
   - Frontend: 8080

## Verificación
Para verificar que todo está funcionando:
1. Zipkin UI: http://localhost:9411
2. Redis: `docker ps | findstr redis`
3. Los logs deberían aparecer en el log-message-processor
4. Cada servicio debería mostrar mensajes de inicio exitoso en su respectiva terminal 