package com.budget.budgettracker.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.budget.budgettracker.model.Expense;
import com.budget.budgettracker.model.User;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {

    // ✅ For Expense list by user
    List<Expense> findByUser_UserId(int userId);

    // ✅ For Summary page
    List<Expense> findByUser_UserIdAndDateBetween(
            int userId,
            LocalDate startDate,
            LocalDate endDate
    );

    // ✅ For AI Insights
    List<Expense> findByUser(User user);
}
