package com.example.users.service;

import org.springframework.retry.annotation.Retryable;
import org.springframework.retry.annotation.Backoff;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.retry.support.RetryTemplate;

@Service
public class UserService {
    
    @Autowired
    private RetryTemplate retryTemplate;
    
    @Retryable(
        value = { Exception.class },
        maxAttempts = 3,
        backoff = @Backoff(delay = 2000)
    )
    public User getUser(Long id) {
        // Lógica para obtener usuario
        return findUserById(id);
    }

    public User getUserWithTemplate(Long id) {
        return retryTemplate.execute(context -> {
            return findUserById(id);
        });
    }

    private User findUserById(Long id) {
        // Implementación existente
        return userRepository.findById(id);
    }
} 