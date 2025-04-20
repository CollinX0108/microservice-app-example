package handlers

import (
    "net/http"
    "time"
    "auth-api/pkg/middleware"
)

var breaker = middleware.NewCircuitBreaker(5, 30*time.Second)

func AuthHandler(w http.ResponseWriter, r *http.Request) {
    err := breaker.Execute(func() error {
        // Lógica de autenticación existente
        return authenticateUser(r)
    })

    if err == middleware.ErrCircuitBreakerOpen {
        http.Error(w, "Servicio temporalmente no disponible", http.StatusServiceUnavailable)
        return
    }

    if err != nil {
        http.Error(w, err.Error(), http.StatusUnauthorized)
        return
    }

    // Continuar con el flujo normal...
} 