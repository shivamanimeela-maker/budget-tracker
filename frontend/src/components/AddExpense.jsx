import { useState } from 'react';
import { apiFetch } from '../api/config';
import { todayStr } from '../utils/format';
import { useToast } from './Toast';

export default function AddExpense({ user }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(todayStr());
  const [description, setDescription] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const showToast = useToast();

  const handleSubmit = async () => {
    setErr('');
    if (!amount || !date) { setErr('Amount and date are required.'); return; }
    setLoading(true);
    try {
      await apiFetch('/expense/add/' + user.userId, {
        method: 'POST',
        body: JSON.stringify({ amount: parseFloat(amount), category, date, description }),
      });
      showToast('✅ Expense logged!', 'success');
      setAmount('');
      setDescription('');
      setDate(todayStr());
    } catch {
      setErr('Failed to add expense.');
      showToast('❌ Failed to add expense', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="section-header">Add Expense</div>
      <div className="section-sub">Log a new expense entry</div>
      <div className="panel">
        <div className="panel-title">↓ New Expense Entry</div>
        <div className="form-row three">
          <div className="field field-inline">
            <label>Amount (₹)</label>
            <input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} />
          </div>
          <div className="field field-inline">
            <label>Category</label>
            <select className="field-select" value={category} onChange={e => setCategory(e.target.value)}>
              <option>Food</option>
              <option>Transport</option>
              <option>Rent</option>
              <option>Utilities</option>
              <option>Healthcare</option>
              <option>Shopping</option>
              <option>Entertainment</option>
              <option>Education</option>
              <option>Other</option>
            </select>
          </div>
          <div className="field field-inline">
            <label>Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          </div>
        </div>
        <div className="field" style={{ marginTop: '1rem' }}>
          <label>Description (optional)</label>
          <input type="text" placeholder="e.g. Grocery shopping at D-Mart" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="form-actions">
          <button className="btn-submit btn-expense" onClick={handleSubmit} disabled={loading}>
            {loading ? <span className="loading"></span> : '+ Add Expense'}
          </button>
        </div>
        {err && <div className="err-msg">{err}</div>}
      </div>
    </div>
  );
}
