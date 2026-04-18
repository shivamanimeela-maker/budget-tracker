// Format number as Indian Rupees
export function fmt(n) {
  if (n === undefined || n === null || isNaN(n)) return '₹—';
  return '₹' + parseFloat(n).toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

// Get today's date as YYYY-MM-DD
export function todayStr() {
  return new Date().toISOString().split('T')[0];
}

// Month names
export const MONTH_NAMES = [
  'Jan','Feb','Mar','Apr','May','Jun',
  'Jul','Aug','Sep','Oct','Nov','Dec',
];
