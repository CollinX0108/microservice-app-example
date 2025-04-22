#!/bin/bash

echo "🛑 Deteniendo servicios..."

# Escalar los deployments a 0 réplicas
echo "Escalando deployments a 0..."
kubectl scale deployment -n microservices frontend --replicas=0
kubectl scale deployment -n microservices auth-api --replicas=0
kubectl scale deployment -n microservices todos-api --replicas=0
kubectl scale deployment -n microservices users-api --replicas=0
kubectl scale deployment -n microservices log-message-processor --replicas=0
kubectl scale deployment -n microservices zipkin --replicas=0
kubectl scale deployment -n microservices redis --replicas=0

echo "✅ Todos los servicios han sido detenidos. Para reiniciarlos, ejecuta start-services.sh" 