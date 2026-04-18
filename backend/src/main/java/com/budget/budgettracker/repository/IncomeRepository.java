package com.budget.budgettracker.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.budget.budgettracker.model.Income;
import com.budget.budgettracker.model.User;

public interface IncomeRepository extends JpaRepository<Income, Integer> {

    // For Summary
    List<Income> findByUser_UserIdAndDateBetween(
            int userId,
            LocalDate startDate,
            LocalDate endDate
    );

    // For AI Insights
    List<Income> findByUser(User user);
}
