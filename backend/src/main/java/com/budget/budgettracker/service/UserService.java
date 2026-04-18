package com.budget.budgettracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.budget.budgettracker.model.User;
import com.budget.budgettracker.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User register(User user) {
        return userRepository.save(user); // MUST return saved user
    }

    public User login(String email, String password) {
        return userRepository
                .findByEmailAndPassword(email, password)
                .orElseThrow(() ->
                        new RuntimeException("Invalid Email or Password"));
    }
}
