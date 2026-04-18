package com.budget.budgettracker.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.budget.budgettracker.model.Expense;
import com.budget.budgettracker.model.Income;
import com.budget.budgettracker.response.MonthlySummaryResponse;

import com.budget.budgettracker.repository.ExpenseRepository;
import com.budget.budgettracker.repository.IncomeRepository;

@Service
public class SummaryService {

    @Autowired
    private IncomeRepository incomeRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    public MonthlySummaryResponse getMonthlySummary(
            int userId,
            String month,
            String year
    ) {

        int m = Integer.parseInt(month);
        int y = Integer.parseInt(year);

        // ✅ Use LocalDate ONLY
        LocalDate startDate = LocalDate.of(y, m, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        // ✅ Income (LocalDate → LocalDate)
        List<Income> incomes =
                incomeRepository.findByUser_UserIdAndDateBetween(
                        userId, startDate, endDate);

        // ✅ Expense (LocalDate → LocalDate)
        List<Expense> expenses =
                expenseRepository.findByUser_UserIdAndDateBetween(
                        userId, startDate, endDate);

        double totalIncome = incomes.stream()
                .mapToDouble(Income::getAmount)
                .sum();

        double totalExpense = expenses.stream()
                .mapToDouble(Expense::getAmount)
                .sum();

        MonthlySummaryResponse res = new MonthlySummaryResponse();
        res.setMonth(month);
        res.setYear(year);
        res.setTotalIncome(totalIncome);
        res.setTotalExpense(totalExpense);
        res.setSavings(totalIncome - totalExpense);

        return res;
    }
}
