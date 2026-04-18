import { useState } from 'react';
import { apiFetch, getApiBase, setApiBase } from '../api/config';
import { useToast } from './Toast';

export default function AuthPage({ onLogin }) {
  const [tab, setTab] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginErr, setLoginErr] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regErr, setRegErr] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  const [apiUrl, setApiUrl] = useState(getApiBase());

  const showToast = useToast();

  const switchTab = (t) => {
    setTab(t);
    setLoginErr('');
    setRegErr('');
  };

  const doLogin = async () => {
    if (!loginEmail || !loginPass) { setLoginErr('Please fill all fields.'); return; }
    setLoginLoading(true);
    setLoginErr('');
    try {
      const user = await apiFetch('/user/login', {
        method: 'POST',
        body: JSON.stringify({ email: loginEmail, password: loginPass }),
      });
      onLogin(user);
    } catch (e) {
      setLoginErr('Login failed: ' + e.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const doRegister = async () => {
    if (!regName || !regEmail || !regPass) { setRegErr('Please fill all fields.'); return; }
    setRegLoading(true);
    setRegErr('');
    try {
      await apiFetch('/user/register', {
        method: 'POST',
        body: JSON.stringify({ name: regName, email: regEmail, password: regPass }),
      });
      showToast('Account created! Please login.', 'success');
      switchTab('login');
    } catch (e) {
      setRegErr('Registration failed: ' + e.message);
    } finally {
      setRegLoading(false);
    }
  };

  const saveApi = () => {
    setApiBase(apiUrl);
    showToast('API URL saved: ' + apiUrl, 'success');
  };

  return (
    <div className="auth-page">
      <div className="logo">BudgetFlow</div>
      <div className="logo-sub">Smart Money. Clear Mind.</div>

      <div className="auth-card">
        <div className="auth-tabs">
          <button className={`auth-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => switchTab('login')}>Login</button>
          <button className={`auth-tab ${tab === 'register' ? 'active' : ''}`} onClick={() => switchTab('register')}>Register</button>
        </div>

        {tab === 'login' ? (
          <div>
            <div className="field">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" placeholder="••••••••" value={loginPass} onChange={e => setLoginPass(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && doLogin()} />
            </div>
            <button className="btn btn-primary" onClick={doLogin} disabled={loginLoading}>
              {loginLoading ? <span className="loading"></span> : 'Sign In'}
            </button>
            {loginErr && <div className="err-msg">{loginErr}</div>}
          </div>
        ) : (
          <div>
            <div className="field">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" value={regName} onChange={e => setRegName(e.target.value)} />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" value={regEmail} onChange={e => setRegEmail(e.target.value)} />
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" placeholder="••••••••" value={regPass} onChange={e => setRegPass(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && doRegister()} />
            </div>
            <button className="btn btn-primary" onClick={doRegister} disabled={regLoading}>
              {regLoading ? <span className="loading"></span> : 'Create Account'}
            </button>
            {regErr && <div className="err-msg">{regErr}</div>}
          </div>
        )}
      </div>

      {/* API Base URL Config */}
      <div className="api-config-wrap">
        <div className="api-config-label">BACKEND URL</div>
        <div className="api-config-row">
          <input type="text" value={apiUrl} onChange={e => setApiUrl(e.target.value)} placeholder="http://localhost:8083" />
          <button onClick={saveApi}>Save</button>
        </div>
      </div>
    </div>
  );
}
