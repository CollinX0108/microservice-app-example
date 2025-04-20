package com.example.users.service;

import io.github.resilience4j.circuitbreaker.CircuitBreaker;
import io.github.resilience4j.circuitbreaker.CircuitBreakerRegistry;
import org.springframework.retry.annotation.Retryable;
import org.springframework.retry.annotation.Backoff;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.retry.support.RetryTemplate;
import com.elgris.usersapi.models.User;
import com.elgris.usersapi.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private RetryTemplate retryTemplate;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CircuitBreakerRegistry circuitBreakerRegistry;
    
    @Retryable(
        value = { Exception.class },
        maxAttempts = 3,
        backoff = @Backoff(delay = 2000)
    )
    public User getUser(String username) {
        CircuitBreaker circuitBreaker = circuitBreakerRegistry.circuitBreaker("userService");
        return circuitBreaker.executeSupplier(() -> findUserByUsername(username));
    }

    public User getUserWithTemplate(String username) {
        CircuitBreaker circuitBreaker = circuitBreakerRegistry.circuitBreaker("userService");
        return retryTemplate.execute(context -> 
            circuitBreaker.executeSupplier(() -> findUserByUsername(username))
        );
    }

    private User findUserByUsername(String username) {
        User user = userRepository.findOneByUsername(username);
        if (user == null) {
            throw new RuntimeException("Usuario no encontrado");
        }
        return user;
    }
} 