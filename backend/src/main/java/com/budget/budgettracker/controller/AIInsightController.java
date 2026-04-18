package com.budget.budgettracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.budget.budgettracker.model.AIInsightResponse;
import com.budget.budgettracker.service.AIInsightService;

@RestController
@RequestMapping("/ai")
@CrossOrigin("*")
public class AIInsightController {

    @Autowired
    private AIInsightService aiInsightService;

    @GetMapping("/insights/{userId}")
    public AIInsightResponse getInsights(@PathVariable int userId) {
        return aiInsightService.generateInsights(userId);
    }
}
