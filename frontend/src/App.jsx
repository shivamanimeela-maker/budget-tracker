import { useState } from 'react';
import { ToastProvider, useToast } from './components/Toast';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import AddIncome from './components/AddIncome';
import AddExpense from './components/AddExpense';
import Summary from './components/Summary';
import AIInsights from './components/AIInsights';

function AppInner() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const showToast = useToast();

  const handleLogin = (userData) => {
    setUser(userData);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    showToast('Logged out.', 'success');
  };

  const tabs = [
    { id: 'dashboard', icon: '⬡', label: 'Dashboard' },
    { id: 'income',    icon: '↑', label: 'Add Income' },
    { id: 'expense',   icon: '↓', label: 'Add Expense' },
    { id: 'summary',   icon: '◈', label: 'Summary' },
    { id: 'ai',        icon: '✦', label: 'AI Insights' },
  ];

  // Not logged in → show auth
  if (!user) {
    return (
      <>
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <AuthPage onLogin={handleLogin} />
      </>
    );
  }

  // Logged in → show app
  return (
    <>
      <div className="orb orb1"></div>
      <div className="orb orb2"></div>

      {/* Top Nav */}
      <nav className="topnav">
        <div className="nav-logo">BudgetFlow</div>
        <div className="nav-user">
          <span>{user.name || user.email || 'User'}</span>
          <button className="btn-sm" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="app-body">
        {/* Sidebar */}
        <aside className="sidebar">
          {tabs.map(t => (
            <button
              key={t.id}
              className={`sidebar-item ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              <span className="icon">{t.icon}</span> {t.label}
            </button>
          ))}
        </aside>

        {/* Content */}
        <main className="content">
          {activeTab === 'dashboard' && <Dashboard user={user} />}
          {activeTab === 'income' && <AddIncome user={user} />}
          {activeTab === 'expense' && <AddExpense user={user} />}
          {activeTab === 'summary' && <Summary user={user} />}
          {activeTab === 'ai' && <AIInsights user={user} />}
        </main>
      </div>
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppInner />
    </ToastProvider>
  );
}
