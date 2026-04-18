package com.budget.budgettracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.budget.budgettracker.model.Income;
import com.budget.budgettracker.model.User;
import com.budget.budgettracker.repository.IncomeRepository;
import com.budget.budgettracker.repository.UserRepository;

@Service
public class IncomeService {

    @Autowired
    private IncomeRepository incomeRepository;

    @Autowired
    private UserRepository userRepository;

    public Income addIncome(int userId, Income income) {

        // ✅ Find user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // ✅ Set user
        income.setUser(user);

        // ✅ Save income
        return incomeRepository.save(income);
    }
}