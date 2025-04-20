const CircuitBreaker = require('opossum');

const circuitBreakerOptions = {
    timeout: 3000, // Si una operación tarda más de 3 segundos, se considera fallida
    errorThresholdPercentage: 50, // Si 50% de las peticiones fallan, el circuito se abre
    resetTimeout: 30000 // Después de 30 segundos, el circuito intenta cerrarse
};

function createCircuitBreaker(requestHandler) {
    const breaker = new CircuitBreaker(requestHandler, circuitBreakerOptions);

    breaker.fallback(() => {
        return {
            error: 'Service is temporarily unavailable. Please try again later.'
        };
    });

    breaker.on('success', () => {
        console.log('Request successful');
    });

    breaker.on('timeout', () => {
        console.log('Request timed out');
    });

    breaker.on('reject', () => {
        console.log('Circuit breaker is open, request rejected');
    });

    return breaker;
}

module.exports = createCircuitBreaker; 