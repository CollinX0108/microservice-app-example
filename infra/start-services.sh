#!/bin/bash

echo "🚀 Iniciando servicios..."

# Escalar los deployments a 1 réplica
echo "Escalando deployments a 1..."
kubectl scale deployment -n microservices frontend --replicas=1
kubectl scale deployment -n microservices auth-api --replicas=1
kubectl scale deployment -n microservices todos-api --replicas=1
kubectl scale deployment -n microservices users-api --replicas=1
kubectl scale deployment -n microservices log-message-processor --replicas=1
kubectl scale deployment -n microservices zipkin --replicas=1
kubectl scale deployment -n microservices redis --replicas=1

echo "⏳ Esperando a que los pods estén listos..."
kubectl wait --namespace microservices \
  --for=condition=ready pod \
  --selector=app in (frontend,auth-api,todos-api,users-api,log-message-processor,zipkin,redis) \
  --timeout=300s

echo "✅ Todos los servicios han sido iniciados y están listos" 