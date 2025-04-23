# Documentación General del Proyecto Microservicios

## Índice
1. [Introducción](#introducción)
2. [Arquitectura](#arquitectura)
3. [Patrones de Diseño Cloud](#patrones-de-diseño-cloud)
4. [Estrategia de Branching](#estrategia-de-branching)
5. [Pipelines](#pipelines)
6. [Infraestructura](#infraestructura)
7. [Guía de Uso](#guía-de-uso)

## Introducción
Este proyecto implementa una aplicación de microservicios utilizando diferentes tecnologías y patrones de diseño cloud. La aplicación está compuesta por varios servicios que trabajan juntos para proporcionar una funcionalidad completa.

## Arquitectura
La arquitectura del proyecto se compone de los siguientes servicios:

- **Frontend**: Aplicación web construida con Vue.js
- **Auth API**: Servicio de autenticación en Go
- **Users API**: Servicio de gestión de usuarios en Java/Spring Boot
- **TODOs API**: Servicio de gestión de tareas en Node.js
- **Log Message Processor**: Procesador de mensajes en Python
- **Redis**: Base de datos en memoria para mensajería
- **Zipkin**: Sistema de trazabilidad distribuida

## Patrones de Diseño Cloud

### Circuit Breaker
Implementado en Auth API (Go) y TODOs API (Node.js):
- Monitorea fallos en las llamadas entre servicios
- "Abre el circuito" cuando detecta demasiados fallos
- Evita fallos en cascada
- Permite recuperación automática

### Retry Pattern
Implementado en Users API (Java/Spring Boot):
- Reintenta automáticamente operaciones fallidas
- Configurado para 3 intentos con 2 segundos entre cada intento
- Maneja fallos temporales de red o base de datos

## Estrategia de Branching

### Para Desarrolladores (Git Flow)
- `main`: Código estable y listo para producción
- `develop`: Código en estado estable para pruebas
- `feature/*`: Desarrollo de nuevas funcionalidades
- `release/*`: Preparación de versiones para producción
- `hotfix/*`: Corrección de bugs críticos en producción

### Para Operaciones
- `infra`: Rama principal para infraestructura como código
- `infra/dev`: Pruebas y cambios preliminares de infraestructura
- `infra/prod`: Rama protegida para despliegue en producción

## Pipelines

### Pipelines de Desarrollo
Cada microservicio tiene su propio pipeline que:
1. Construye la aplicación
2. Crea la imagen Docker
3. Sube la imagen al registro
4. Despliega en Kubernetes

### Pipelines de Infraestructura
1. **Pipeline de Inicio**:
   - Despliega infraestructura base
   - Configura namespace, redis, zipkin e ingress
   - Escala servicios a 1 réplica

2. **Pipeline de Detención**:
   - Escala todos los servicios a 0 réplicas
   - Se ejecuta manualmente para limpieza

## Infraestructura

### Kubernetes
- Namespace: `microservices`
- Servicios: ClusterIP para comunicación interna
- Frontend: LoadBalancer para acceso externo
- Recursos limitados por servicio

### Configuración de Servicios
- Redis: Base de datos en memoria
- Zipkin: Trazabilidad distribuida
- Ingress: Manejo de tráfico externo

## Guía de Uso

### Requisitos Previos
- Docker
- Kubernetes
- Azure CLI
- Azure DevOps

### Comandos Útiles
```bash
# Verificar estado de los servicios
kubectl get pods -n microservices

# Ver logs de un servicio específico
kubectl logs -n microservices [nombre-pod]

# Escalar servicios manualmente
kubectl scale deployment -n microservices [nombre-servicio] --replicas=[número]
```

### Gestión de Infraestructura
Para gestionar la infraestructura, utilizamos los pipelines de Azure DevOps:

1. **Pipeline de Inicio** (`infra/azure-pipeline.yml`):
   - Se ejecuta automáticamente al hacer push a master
   - Despliega toda la infraestructura base
   - Escala los servicios a 1 réplica

2. **Pipeline de Detención** (`infra/stop.yml`):
   - Se ejecuta manualmente cuando se necesita detener los servicios
   - Escala todos los servicios a 0 réplicas

### Acceso a Servicios
- Frontend: http://localhost:80
- Zipkin: http://localhost:9411
- APIs: http://localhost:8080/api/*

### Monitoreo
- Zipkin para trazabilidad
- Logs de Kubernetes para debugging
- Métricas de recursos por servicio

## Mantenimiento

### Escalado
Para escalar servicios:
```bash
kubectl scale deployment -n microservices [nombre-servicio] --replicas=[número]
```

### Actualización
1. Hacer cambios en el código
2. Crear Pull Request a develop
3. Después de pruebas, merge a main
4. Pipeline automático despliega cambios

### Troubleshooting
1. Verificar logs de pods
2. Revisar estado de servicios
3. Comprobar conexiones entre servicios
4. Verificar configuración de Kubernetes 