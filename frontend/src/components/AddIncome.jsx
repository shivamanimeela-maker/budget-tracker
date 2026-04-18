import { useState } from 'react';
import { apiFetch } from '../api/config';
import { todayStr } from '../utils/format';
import { useToast } from './Toast';

export default function AddIncome({ user }) {
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('Salary');
  const [date, setDate] = useState(todayStr());
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const showToast = useToast();

  const handleSubmit = async () => {
    setErr('');
    if (!amount || !date) { setErr('Amount and date are required.'); return; }
    setLoading(true);
    try {
      await apiFetch('/income/add/' + user.userId, {
        method: 'POST',
        body: JSON.stringify({ amount: parseFloat(amount), source, date }),
      });
      showToast('✅ Income added successfully!', 'success');
      setAmount('');
      setDate(todayStr());
    } catch {
      setErr('Failed to add income. Check your connection.');
      showToast('❌ Failed to add income', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="section-header">Add Income</div>
      <div className="section-sub">Record a new income entry</div>
      <div className="panel">
        <div className="panel-title">↑ New Income Entry</div>
        <div className="form-row three">
          <div className="field field-inline">
            <label>Amount (₹)</label>
            <input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} />
          </div>
          <div className="field field-inline">
            <label>Source</label>
            <select className="field-select" value={source} onChange={e => setSource(e.target.value)}>
              <option>Salary</option>
              <option>Freelance</option>
              <option>Business</option>
              <option>Investment</option>
              <option>Rental</option>
              <option>Other</option>
            </select>
          </div>
          <div className="field field-inline">
            <label>Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          </div>
        </div>
        <div className="form-actions">
          <button className="btn-submit btn-income" onClick={handleSubmit} disabled={loading}>
            {loading ? <span className="loading"></span> : '+ Add Income'}
          </button>
        </div>
        {err && <div className="err-msg">{err}</div>}
      </div>
    </div>
  );
}
