import { useState } from 'react';
import { apiFetch } from '../api/config';
import { fmt } from '../utils/format';
import { useToast } from './Toast';

export default function Summary({ user }) {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const showToast = useToast();

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const sum = await apiFetch(`/summary/${user.userId}/${month}/${year}`);
      setData(sum);
      showToast('Summary loaded!', 'success');
    } catch {
      showToast('Failed to load summary.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const ratio = data && data.totalIncome > 0
    ? Math.min(100, (data.totalExpense / data.totalIncome) * 100)
    : 0;

  return (
    <div>
      <div className="section-header">Monthly Summary</div>
      <div className="section-sub">View your income & expenses by month</div>

      <div className="panel">
        <div className="panel-title">◈ Select Period</div>
        <div className="form-row">
          <div className="field field-inline">
            <label>Month</label>
            <select className="field-select" value={month} onChange={e => setMonth(Number(e.target.value))}>
              <option value={1}>January</option><option value={2}>February</option>
              <option value={3}>March</option><option value={4}>April</option>
              <option value={5}>May</option><option value={6}>June</option>
              <option value={7}>July</option><option value={8}>August</option>
              <option value={9}>September</option><option value={10}>October</option>
              <option value={11}>November</option><option value={12}>December</option>
            </select>
          </div>
          <div className="field field-inline">
            <label>Year</label>
            <select className="field-select" value={year} onChange={e => setYear(Number(e.target.value))}>
              <option>2025</option><option>2026</option><option>2027</option>
            </select>
          </div>
        </div>
        <div className="form-actions">
          <button className="btn-submit btn-summary" onClick={fetchSummary} disabled={loading}>
            {loading ? <span className="loading"></span> : 'Fetch Summary'}
          </button>
        </div>
      </div>

      {data && (
        <div>
          <div className="summary-grid">
            <div className="summary-cell">
              <div className="sc-label">Total Income</div>
              <div className="sc-val sc-income">{fmt(data.totalIncome)}</div>
            </div>
            <div className="summary-cell">
              <div className="sc-label">Total Expense</div>
              <div className="sc-val sc-expense">{fmt(data.totalExpense)}</div>
            </div>
            <div className="summary-cell">
              <div className="sc-label">Net Savings</div>
              <div className="sc-val sc-savings">{fmt(data.savings)}</div>
            </div>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--muted)', marginBottom: '0.5rem', letterSpacing: '1px' }}>
              <span>EXPENSE RATIO</span>
              <span>{ratio.toFixed(1)}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: ratio + '%', background: 'var(--expense-clr)' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
