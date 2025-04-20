package middleware

import (
    "errors"
    "sync"
    "time"
)

var ErrCircuitBreakerOpen = errors.New("circuit breaker is open")

type CircuitBreaker struct {
    mutex      sync.RWMutex
    failureThreshold uint
    resetTimeout    time.Duration
    failures       uint
    lastFailure    time.Time
    isOpen        bool
}

func NewCircuitBreaker(failureThreshold uint, resetTimeout time.Duration) *CircuitBreaker {
    return &CircuitBreaker{
        failureThreshold: failureThreshold,
        resetTimeout:    resetTimeout,
    }
}

func (cb *CircuitBreaker) Execute(fn func() error) error {
    if !cb.canRequest() {
        return ErrCircuitBreakerOpen
    }

    err := fn()
    if err != nil {
        cb.recordFailure()
        return err
    }

    cb.reset()
    return nil
}

func (cb *CircuitBreaker) canRequest() bool {
    cb.mutex.RLock()
    defer cb.mutex.RUnlock()

    if !cb.isOpen {
        return true
    }

    if time.Since(cb.lastFailure) > cb.resetTimeout {
        cb.mutex.RUnlock()
        cb.mutex.Lock()
        cb.isOpen = false
        cb.mutex.Unlock()
        cb.mutex.RLock()
        return true
    }

    return false
}

func (cb *CircuitBreaker) recordFailure() {
    cb.mutex.Lock()
    defer cb.mutex.Unlock()

    cb.failures++
    cb.lastFailure = time.Now()

    if cb.failures >= cb.failureThreshold {
        cb.isOpen = true
    }
}

func (cb *CircuitBreaker) reset() {
    cb.mutex.Lock()
    defer cb.mutex.Unlock()
    
    cb.failures = 0
    cb.isOpen = false
} 