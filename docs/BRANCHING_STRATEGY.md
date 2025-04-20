# Estrategia de Branching

## Estrategia para Desarrolladores (Git Flow)

### Estructura de Ramas
- `main`: Código estable y listo para producción
- `develop`: Código en estado estable para pruebas
- `feature/*`: Desarrollo de nuevas funcionalidades
- `release/*`: Preparación de versiones para producción
- `hotfix/*`: Corrección de bugs críticos en producción

### Flujo de Trabajo
1. Crear rama `feature/nombre-funcionalidad` desde `develop`
2. Desarrollar y probar la funcionalidad
3. Crear Pull Request a `develop`
4. Para releases, crear rama `release/x.x.x` desde `develop`
5. Tras pruebas, fusionar `release/x.x.x` a `main` y `develop`
6. Para bugs críticos, crear `hotfix/x.x.x` desde `main`

## Estrategia para Operaciones

### Estructura de Ramas
- `infra`: Rama principal para infraestructura como código
- `infra/dev`: Pruebas y cambios preliminares de infraestructura
- `infra/prod`: Rama protegida para despliegue en producción

### Organización de Carpetas
```
infra/
├── cloud-patterns/     # Patrones de diseño cloud
├── k8s/               # Configuraciones de Kubernetes
├── pipelines/         # Definiciones de CI/CD
└── scripts/          # Scripts de automatización
```

## Patrones de Diseño Cloud Implementados

### 1. Circuit Breaker Pattern
- Implementado usando Istio
- Configuración en `infra/cloud-patterns/circuit-breaker.yaml`
- Protege contra fallos en cascada
- Monitorea fallos consecutivos

### 2. Retry Pattern
- Implementado usando Istio
- Configuración en `infra/cloud-patterns/retry-policy.yaml`
- Maneja fallos transitorios
- Configurable por servicio 