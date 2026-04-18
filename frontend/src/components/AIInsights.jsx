import { useState } from 'react';
import { apiFetch } from '../api/config';
import { fmt } from '../utils/format';
import { useToast } from './Toast';

export default function AIInsights({ user }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const showToast = useToast();

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const ins = await apiFetch('/ai/insights/' + user.userId);
      setData(ins);
      showToast('Analysis complete!', 'success');
    } catch {
      showToast('Failed to load insights.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const isHealthy = data?.message?.includes('✅');
  const rate = data && data.totalIncome > 0
    ? Math.max(0, (data.savings / data.totalIncome) * 100)
    : 0;
  const barColor = rate >= 20 ? 'var(--income-clr)' : 'var(--warning)';

  return (
    <div>
      <div className="section-header">AI Insights</div>
      <div className="section-sub">Smart analysis of your finances</div>

      <div className="panel">
        <div className="panel-title">✦ Generate Analysis</div>
        <button className="btn-submit btn-summary" onClick={fetchInsights} disabled={loading}>
          {loading ? <span className="loading"></span> : '✦ Analyze My Finances'}
        </button>
      </div>

      {data && (
        <div className="insight-box">
          <div className="insight-icon">{isHealthy ? '✅' : '⚠️'}</div>
          <div className="insight-msg">{data.message}</div>
          <div className="insight-stats">
            <div>
              <div className="is-label">Total Income</div>
              <div className="is-val sc-income">{fmt(data.totalIncome)}</div>
            </div>
            <div>
              <div className="is-label">Total Expense</div>
              <div className="is-val sc-expense">{fmt(data.totalExpense)}</div>
            </div>
            <div>
              <div className="is-label">Net Savings</div>
              <div className="is-val sc-savings">{fmt(data.savings)}</div>
            </div>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--muted)', marginBottom: '0.5rem' }}>
              <span>SAVINGS RATE</span>
              <span>{rate.toFixed(1)}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: Math.min(100, rate) + '%', background: barColor }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
