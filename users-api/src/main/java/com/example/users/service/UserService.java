package com.example.users.service;

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
    
    @Retryable(
        value = { Exception.class },
        maxAttempts = 3,
        backoff = @Backoff(delay = 2000)
    )
    public User getUser(String username) {
        return findUserByUsername(username);
    }

    public User getUserWithTemplate(String username) {
        return retryTemplate.execute(context -> findUserByUsername(username));
    }

    private User findUserByUsername(String username) {
        User user = userRepository.findOneByUsername(username);
        if (user == null) {
            throw new RuntimeException("Usuario no encontrado");
        }
        return user;
    }
} 