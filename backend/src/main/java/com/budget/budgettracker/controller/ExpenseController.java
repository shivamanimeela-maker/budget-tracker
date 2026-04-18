package com.budget.budgettracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.budget.budgettracker.model.Expense;
import com.budget.budgettracker.service.ExpenseService;

@RestController
@RequestMapping("/expense")
@CrossOrigin("*")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    // ✅ MUST HAVE userId in PATH
    @PostMapping("/add/{userId}")
    public Expense addExpense(
            @PathVariable int userId,
            @RequestBody Expense expense
    ) {
        return expenseService.addExpense(userId, expense);
    }
}
