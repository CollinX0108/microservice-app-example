# Microservice App - PRFT Devops Training

Esta es una aplicación de ejemplo que implementa una arquitectura de microservicios moderna. El proyecto está diseñado para demostrar las mejores prácticas en el desarrollo de microservicios, incluyendo:

- Arquitectura distribuida
- Comunicación entre servicios
- Autenticación y autorización
- Trazabilidad distribuida
- Procesamiento de mensajes asíncrono
- Despliegue en Kubernetes

## Componentes

El proyecto está compuesto por los siguientes microservicios:

1. [Users API](/users-api) - Aplicación Spring Boot que gestiona los perfiles de usuario
2. [Auth API](/auth-api) - Servicio de autenticación desarrollado en Go que genera tokens JWT
3. [TODOs API](/todos-api) - API REST en Node.js para gestionar tareas pendientes
4. [Log Message Processor](/log-message-processor) - Procesador de mensajes en Python que consume eventos de Redis
5. [Frontend](/frontend) - Interfaz de usuario desarrollada con Vue.js

## Infraestructura

El proyecto incluye configuración para:

- [Kubernetes](/k8s) - Configuraciones para despliegue en Kubernetes
- [Infraestructura](/infra) - Scripts y configuraciones de infraestructura

## Documentación

Para más detalles sobre la configuración y despliegue, consulta:
- [Guía de Configuración](setup-guide.md)
- [Documentación Técnica](/docs)

## Arquitectura

![Diagrama de Arquitectura](/arch-img/Microservices.png)