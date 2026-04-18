import { useState, useEffect } from 'react';
import { apiFetch } from '../api/config';
import { fmt, MONTH_NAMES } from '../utils/format';

export default function Dashboard({ user }) {
  const [income, setIncome] = useState(null);
  const [expense, setExpense] = useState(null);
  const [savings, setSavings] = useState(null);
  const [insightMsg, setInsightMsg] = useState('');
  const [insightHealthy, setInsightHealthy] = useState(true);
  const [monthData, setMonthData] = useState(null);

  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const monthLabel = MONTH_NAMES[now.getMonth()] + ' ' + year;

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    // AI insights (overall)
    try {
      const ins = await apiFetch('/ai/insights/' + user.userId);
      setIncome(ins.totalIncome);
      setExpense(ins.totalExpense);
      setSavings(ins.savings);
      setInsightMsg(ins.message || '');
      setInsightHealthy(ins.message ? ins.message.includes('✅') : true);
    } catch {
      setInsightMsg('Could not load insights.');
    }

    // Monthly summary
    try {
      const sum = await apiFetch(`/summary/${user.userId}/${month}/${year}`);
      setMonthData(sum);
    } catch {
      setMonthData(null);
    }
  }

  const monthRatio = monthData && monthData.totalIncome > 0
    ? Math.min(100, (monthData.totalExpense / monthData.totalIncome) * 100)
    : 0;

  return (
    <div>
      <div className="section-header">Welcome back 👋</div>
      <div className="section-sub">Here's your financial snapshot</div>

      {/* Stat Cards */}
      <div className="stat-grid">
        <div className="stat-card" style={{ '--clr': 'var(--income-clr)' }}>
          <div className="stat-label">Total Income</div>
          <div className="stat-value">{fmt(income)}</div>
          <div className="stat-sub">All time</div>
        </div>
        <div className="stat-card" style={{ '--clr': 'var(--expense-clr)' }}>
          <div className="stat-label">Total Expense</div>
          <div className="stat-value">{fmt(expense)}</div>
          <div className="stat-sub">All time</div>
        </div>
        <div className="stat-card" style={{ '--clr': 'var(--accent)' }}>
          <div className="stat-label">Net Savings</div>
          <div className="stat-value">{fmt(savings)}</div>
          <div className="stat-sub">Income – Expense</div>
        </div>
      </div>

      {/* AI Quick Insight */}
      <div className="panel">
        <div className="panel-title">✦ AI Quick Insight</div>
        {insightMsg ? (
          <div className="insight-box" style={{ marginTop: 0 }}>
            <div className="insight-icon">{insightHealthy ? '✅' : '⚠️'}</div>
            <div className="insight-msg">{insightMsg}</div>
          </div>
        ) : (
          <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Loading insights...</div>
        )}
      </div>

      {/* This Month */}
      <div className="panel">
        <div className="panel-title">◈ This Month — {monthLabel}</div>
        {monthData ? (
          <>
            <div className="summary-grid" style={{ marginTop: 0 }}>
              <div className="summary-cell">
                <div className="sc-label">Income</div>
                <div className="sc-val sc-income">{fmt(monthData.totalIncome)}</div>
              </div>
              <div className="summary-cell">
                <div className="sc-label">Expense</div>
                <div className="sc-val sc-expense">{fmt(monthData.totalExpense)}</div>
              </div>
              <div className="summary-cell">
                <div className="sc-label">Savings</div>
                <div className="sc-val sc-savings">{fmt(monthData.savings)}</div>
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--muted)', marginBottom: '0.5rem', letterSpacing: '1px' }}>
                <span>EXPENSE RATIO</span>
                <span>{monthRatio.toFixed(1)}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: monthRatio + '%', background: 'var(--expense-clr)' }}></div>
              </div>
            </div>
          </>
        ) : (
          <div style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>Loading...</div>
        )}
      </div>
    </div>
  );
}
