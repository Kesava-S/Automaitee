import { useState } from 'react';

export default function AdminBilling({ invoices, onUpdateInvoices }) {
  const [month, setMonth] = useState('June');
  const [year, setYear] = useState('2026');
  const [amount, setAmount] = useState('150.00');
  const [dueDate, setDueDate] = useState('');
  
  const [successMsg, setSuccessMsg] = useState('');

  const triggerSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // Generate next serial invoice number based on invoices length
  const nextInvoiceNumber = () => {
    const yearSuffix = year;
    const serial = String(invoices.length + 301).padStart(3, '0');
    return `INV-${yearSuffix}-${serial}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0 || !dueDate) return;

    const newInvoice = {
      id: `inv-${Date.now()}`,
      month: month,
      year: year,
      amount: parsedAmount,
      status: "Due",
      dueDate: dueDate,
      invoiceNumber: nextInvoiceNumber()
    };

    const updated = [newInvoice, ...invoices];
    onUpdateInvoices(updated);

    // Reset Form
    setDueDate('');
    triggerSuccess(`Successfully issued invoice ${newInvoice.invoiceNumber} for £${parsedAmount.toFixed(2)}`);
  };

  // Toggle paid status for debugging/demo purposes
  const handleToggleStatus = (id) => {
    const updated = invoices.map(inv => {
      if (inv.id === id) {
        return {
          ...inv,
          status: inv.status === 'Paid' ? 'Due' : 'Paid'
        };
      }
      return inv;
    });
    onUpdateInvoices(updated);
    triggerSuccess('Invoice payment status toggled.');
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Issue New Bills</h1>
        <p className="text-slate-500 mt-1">Generate client billing statements, set due dates, and monitor payment records.</p>
      </div>

      {/* Success Banner */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold animate-fadeIn">
          {successMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Form Column */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">Generate Invoice</h2>
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Target Client</label>
              <input
                type="text"
                value="Acme Corp (Rajiv Menon)"
                disabled
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-sm text-slate-500 cursor-not-allowed"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="billing-month" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Billing Month</label>
                <select
                  id="billing-month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-950 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                >
                  {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="billing-year" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Billing Year</label>
                <input
                  id="billing-year"
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-950 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="billing-amount" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Amount (£)</label>
                <input
                  id="billing-amount"
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="150.00"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-950 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label htmlFor="billing-due" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Due Date</label>
                <input
                  id="billing-due"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-950 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all active:scale-[0.98]"
            >
              Issue Invoice
            </button>
          </form>
        </div>

        {/* Invoices List Column */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50/50">
            <h2 className="text-sm font-bold text-slate-800">Billing Log</h2>
          </div>

          <div className="overflow-x-auto font-sans">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/20">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-550 uppercase tracking-wider">Statement</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-550 uppercase tracking-wider">Invoice Number</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-550 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-550 uppercase tracking-wider">Payment Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-550 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-800">
                      <div className="font-semibold">{inv.month} {inv.year}</div>
                      <div className="text-xs text-slate-400 mt-0.5">Due: {inv.dueDate}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-mono font-medium">{inv.invoiceNumber}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">£ {inv.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-md border ${
                        inv.status === 'Paid'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                          : 'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleToggleStatus(inv.id)}
                        className="text-xs font-bold text-slate-600 hover:text-slate-950 hover:bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded transition-all"
                      >
                        Mark {inv.status === 'Paid' ? 'Due' : 'Paid'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
