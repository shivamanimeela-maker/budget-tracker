package com.budget.budgettracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.budget.budgettracker.model.Expense;
import com.budget.budgettracker.model.User;
import com.budget.budgettracker.repository.ExpenseRepository;
import com.budget.budgettracker.repository.UserRepository;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserRepository userRepository;

    public Expense addExpense(int userId, Expense expense) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        expense.setUser(user);  // 🔥 THIS WAS MISSING
        expense.setCategory(expense.getCategory().toLowerCase().trim());

        return expenseRepository.save(expense);
    }
}
