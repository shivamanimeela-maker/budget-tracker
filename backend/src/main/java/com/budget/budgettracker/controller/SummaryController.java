package com.budget.budgettracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.budget.budgettracker.response.MonthlySummaryResponse;
import com.budget.budgettracker.service.SummaryService;

@RestController
@RequestMapping("/summary")
@CrossOrigin("*")
public class SummaryController {

    @Autowired
    private SummaryService summaryService;

    @GetMapping("/{userId}/{month}/{year}")
    public MonthlySummaryResponse getSummary(
            @PathVariable int userId,
            @PathVariable String month,
            @PathVariable String year
    ) {
        return summaryService.getMonthlySummary(userId, month, year);
    }
}
