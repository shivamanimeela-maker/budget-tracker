package com.budget.budgettracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.budget.budgettracker.model.Income;
import com.budget.budgettracker.service.IncomeService;

@RestController
@RequestMapping("/income")
@CrossOrigin("*")
public class IncomeController {

    @Autowired
    private IncomeService incomeService;

    // ✅ MUST HAVE userId in PATH
    @PostMapping("/add/{userId}")
    public Income addIncome(
            @PathVariable int userId,
            @RequestBody Income income
    ) {
        return incomeService.addIncome(userId, income);
    }
}
