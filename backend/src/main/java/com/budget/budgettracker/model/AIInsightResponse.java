package com.budget.budgettracker.model;

import java.util.Map;

public class AIInsightResponse {

    private double totalIncome;
    private double totalExpense;
    private double savings;
    private String message;
    private Map<String, Double> categoryWiseExpense;

    public double getTotalIncome() {
        return totalIncome;
    }
    public void setTotalIncome(double totalIncome) {
        this.totalIncome = totalIncome;
    }

    public double getTotalExpense() {
        return totalExpense;
    }
    public void setTotalExpense(double totalExpense) {
        this.totalExpense = totalExpense;
    }

    public double getSavings() {
        return savings;
    }
    public void setSavings(double savings) {
        this.savings = savings;
    }

    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, Double> getCategoryWiseExpense() {
        return categoryWiseExpense;
    }
    public void setCategoryWiseExpense(Map<String, Double> categoryWiseExpense) {
        this.categoryWiseExpense = categoryWiseExpense;
    }
}
