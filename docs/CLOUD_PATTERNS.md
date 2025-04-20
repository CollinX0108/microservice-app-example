# Patrones de Diseño Cloud Implementados

## 1. Circuit Breaker Pattern

### Implementación en Auth API (Go)
El Circuit Breaker se implementa de forma nativa en Go usando mutexes para control de concurrencia.

```go
// Crear una instancia del Circuit Breaker
breaker := middleware.NewCircuitBreaker(
    5,                     // failureThreshold
    30 * time.Second,      // resetTimeout
)

// Ejemplo de uso en un handler HTTP
func authHandler(w http.ResponseWriter, r *http.Request) {
    err := breaker.Execute(func() error {
        // Tu lógica de autenticación aquí
        return authenticateUser(r)
    })

    if err == middleware.ErrCircuitBreakerOpen {
        http.Error(w, "Servicio temporalmente no disponible", http.StatusServiceUnavailable)
        return
    }
    // Manejo normal de la respuesta...
}
```

### Implementación en TODOs API (Node.js)
Utilizamos la biblioteca Opossum para implementar el Circuit Breaker.

```javascript
const createCircuitBreaker = require('./middleware/circuitBreaker');

// Ejemplo de uso en una ruta Express
app.get('/todos', async (req, res) => {
    const breaker = createCircuitBreaker(async () => {
        // Tu lógica de obtención de TODOs aquí
        return await getTodosFromDatabase();
    });

    try {
        const todos = await breaker.fire();
        res.json(todos);
    } catch (error) {
        res.status(503).json({ error: 'Servicio temporalmente no disponible' });
    }
});
```

## 2. Retry Pattern

### Implementación en Users API (Java/Spring Boot)
Utilizamos Spring Retry para implementar el patrón de reintentos.

```java
// En tu servicio
@Service
public class UserService {
    
    @Autowired
    private RetryTemplate retryTemplate;

    @Retryable(
        value = { SQLException.class },
        maxAttempts = 3,
        backoff = @Backoff(delay = 2000)
    )
    public User getUser(Long id) {
        // Tu lógica para obtener usuario
        return userRepository.findById(id);
    }

    // Alternativa usando RetryTemplate
    public User getUserWithRetry(Long id) {
        return retryTemplate.execute(context -> {
            return userRepository.findById(id);
        });
    }
}
```

## Configuración y Uso

### Auth API (Go)
1. El Circuit Breaker está implementado en `pkg/middleware/circuit_breaker.go`
2. Parámetros configurables:
   - `failureThreshold`: Número de fallos antes de abrir el circuito
   - `resetTimeout`: Tiempo antes de intentar cerrar el circuito

### Users API (Java)
1. Configuración en `src/main/java/com/example/users/config/RetryConfig.java`
2. Parámetros configurables:
   - `maxAttempts`: Número máximo de intentos (default: 3)
   - `backOffPeriod`: Tiempo entre reintentos (default: 2000ms)

### TODOs API (Node.js)
1. Circuit Breaker implementado en `src/middleware/circuitBreaker.js`
2. Parámetros configurables:
   - `timeout`: 3000ms
   - `errorThresholdPercentage`: 50%
   - `resetTimeout`: 30000ms

## Beneficios de la Implementación

1. **Circuit Breaker**:
   - Previene fallos en cascada
   - Permite degradación elegante del servicio
   - Implementación específica para cada tecnología

2. **Retry Pattern**:
   - Manejo automático de fallos transitorios
   - Configuración flexible de reintentos
   - Integración nativa con Spring Boot 