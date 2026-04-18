import { createContext, useContext, useState, useCallback, useRef } from 'react';

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ msg: '', type: 'success', visible: false });
  const timerRef = useRef(null);

  const showToast = useCallback((msg, type = 'success') => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ msg, type, visible: true });
    timerRef.current = setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className={`toast ${toast.visible ? 'show' : ''} ${toast.type}`}>
        {toast.msg}
      </div>
    </ToastContext.Provider>
  );
}
