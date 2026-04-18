package com.budget.budgettracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.budget.budgettracker.model.Expense;
import com.budget.budgettracker.model.Income;
import com.budget.budgettracker.model.User;
import com.budget.budgettracker.model.AIInsightResponse;
import com.budget.budgettracker.repository.ExpenseRepository;
import com.budget.budgettracker.repository.IncomeRepository;
import com.budget.budgettracker.repository.UserRepository;

@Service   // 🔥 THIS ANNOTATION IS MANDATORY
public class AIInsightService {

    @Autowired
    private IncomeRepository incomeRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserRepository userRepository;

    public AIInsightResponse generateInsights(int userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Income> incomes = incomeRepository.findByUser(user);
        List<Expense> expenses = expenseRepository.findByUser(user);

        double totalIncome = incomes.stream()
                .mapToDouble(Income::getAmount)
                .sum();

        double totalExpense = expenses.stream()
                .mapToDouble(Expense::getAmount)
                .sum();

        double savings = totalIncome - totalExpense;

        AIInsightResponse response = new AIInsightResponse();
        response.setTotalIncome(totalIncome);
        response.setTotalExpense(totalExpense);
        response.setSavings(savings);

        if (totalIncome > 0 && (savings / totalIncome) < 0.2) {
            response.setMessage("⚠ Your savings are low. Try to save at least 20% of your income.");
        } else {
            response.setMessage("✅ Great job! Your savings look healthy.");
        }

        return response;
    }
}
