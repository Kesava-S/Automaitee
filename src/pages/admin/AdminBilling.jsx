import { useState } from 'react';
import { CreditCard, CheckCircle, Receipt } from 'lucide-react';
import Button    from '../../components/ui/Button';
import Badge     from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export default function AdminBilling({ invoices, onUpdateInvoices }) {
  const [month,      setMonth]      = useState('June');
  const [year,       setYear]       = useState('2026');
  const [amount,     setAmount]     = useState('150.00');
  const [dueDate,    setDueDate]    = useState('');
  const [saving,     setSaving]     = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const triggerSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const nextInvoiceNumber = () => {
    const serial = String(invoices.length + 301).padStart(3, '0');
    return `INV-${year}-${serial}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0 || !dueDate) return;
    setSaving(true);

    const newInvoice = {
      id:            `inv-${Date.now()}`,
      month,
      year,
      amount:        parsedAmount,
      status:        'Due',
      dueDate,
      invoiceNumber: nextInvoiceNumber(),
    };

    await onUpdateInvoices([newInvoice, ...invoices]);
    setSaving(false);
    setDueDate('');
    triggerSuccess(`Issued invoice ${newInvoice.invoiceNumber} for £${parsedAmount.toFixed(2)}`);
  };

  const handleToggleStatus = async (id) => {
    const updated = invoices.map(inv =>
      inv.id === id
        ? { ...inv, status: inv.status === 'Paid' ? 'Due' : 'Paid' }
        : inv
    );
    await onUpdateInvoices(updated);
    triggerSuccess('Invoice payment status updated.');
  };

  return (
    <div className="space-y-5 lg:space-y-7 max-w-5xl">

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Issue New Bills</h1>
        <p className="text-slate-400 mt-1 text-sm">Generate client billing statements, set due dates, and monitor payment records.</p>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" strokeWidth={2} />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

        {/* Generate Invoice Form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2.5 mb-1">
            <CreditCard className="h-4 w-4 text-slate-400" strokeWidth={2} />
            <h2 className="text-sm font-bold text-slate-900">Generate Invoice</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Target Client</label>
              <input
                type="text"
                value="Acme Corp (Rajiv Menon)"
                disabled
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-sm text-slate-400 cursor-not-allowed"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="billing-month" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Month</label>
                <select
                  id="billing-month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                >
                  {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="billing-year" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Year</label>
                <input
                  id="billing-year"
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="billing-amount" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Amount (£)</label>
                <input
                  id="billing-amount"
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="150.00"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>
              <div>
                <label htmlFor="billing-due" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Due Date</label>
                <input
                  id="billing-due"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              loading={saving}
              iconLeft={<CreditCard className="h-4 w-4" strokeWidth={2} />}
            >
              Issue Invoice
            </Button>
          </form>
        </div>

        {/* Billing Log */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2.5">
            <Receipt className="h-4 w-4 text-slate-400" strokeWidth={2} />
            <h2 className="text-sm font-bold text-slate-800">Billing Log</h2>
            <span className="ml-auto text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
              {invoices.length}
            </span>
          </div>

          {invoices.length === 0 ? (
            <EmptyState
              icon={Receipt}
              title="No invoices issued yet."
              desc="Use the form to generate the first client invoice."
              compact
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/20">
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Statement</th>
                    <th className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Invoice No.</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Amount</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm">
                        <div className="font-semibold text-slate-800">{inv.month} {inv.year}</div>
                        <div className="text-xs text-slate-400 mt-0.5">Due: {inv.dueDate}</div>
                      </td>
                      <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-sm text-slate-500 font-mono font-medium">{inv.invoiceNumber}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm font-bold text-slate-900">£ {inv.amount.toFixed(2)}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <Badge variant={inv.status === 'Paid' ? 'paid' : 'due'}>{inv.status}</Badge>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => handleToggleStatus(inv.id)}
                        >
                          Mark {inv.status === 'Paid' ? 'Due' : 'Paid'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
