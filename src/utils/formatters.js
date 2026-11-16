export const formatCurrency = (amount, currency = 'INR') => {
  if (amount === undefined || amount === null || isNaN(amount)) return 'Flexible';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString) => {
  if (!dateString) return 'Not specified';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
};

export const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'NEW':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'CONTACTED':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'FOLLOW_UP_REQUIRED':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'QUOTATION_PREPARATION':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'QUOTATION_SENT':
      return 'bg-teal-100 text-teal-800 border-teal-200';
    case 'CONFIRMED':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'CLOSED':
      return 'bg-gray-100 text-gray-700 border-gray-300';
    case 'CANCELLED':
      return 'bg-rose-100 text-rose-800 border-rose-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};
