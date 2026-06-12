import { Receipt, Download, CreditCard } from 'lucide-react';
import Badge from '../components/ui/Badge';

export default function Invoices({ invoices }) {

  const handleDownloadPdf = (invoiceNumber) => {
    alert('PDF download will be available once backend is connected');
  };

  const handlePayBill = (invoice) => {
    alert(`Redirecting to bank gateway for invoice ${invoice.invoiceNumber} (Amount: £${invoice.amount.toFixed(2)})`);
  };

  return (
    <div className="space-y-5 lg:space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Invoices</h1>
        <p className="text-sm text-gray-400 mt-0.5">Review your statements and payment records</p>
      </div>

      {/* Invoices List */}
      <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {invoices.length === 0 ? (
          <div className="p-14 text-center space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto">
              <Receipt className="h-6 w-6 text-gray-300" strokeWidth={1.5} />
            </div>
            <p className="font-semibold text-gray-500">No invoices available.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Billing Statement</th>
                  <th className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Invoice No.</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="font-semibold text-gray-900 text-sm">{inv.month} {inv.year}</div>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Due: {new Date(inv.dueDate).toLocaleDateString('en-GB', {
                          day: '2-digit', month: 'short', year: 'numeric',
                        })}
                      </p>
                    </td>
                    <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-sm text-gray-500 font-mono font-medium">{inv.invoiceNumber}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm font-bold text-gray-900">£ {inv.amount.toFixed(2)}</td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <Badge variant={inv.status === 'Paid' ? 'paid' : 'due'}>{inv.status}</Badge>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                      <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-2">
                        {inv.status === 'Due' && (
                          <button
                            onClick={() => handlePayBill(inv)}
                            className="
                              h-10
                              px-6
                              inline-flex
                              items-center
                              justify-center
                              gap-2
                              rounded-full
                              bg-gradient-to-r
                              from-blue-600
                              to-blue-700
                              text-white
                              font-semibold
                              text-sm
                              shadow-md
                              shadow-blue-200
                              hover:shadow-lg
                              hover:shadow-blue-300
                              hover:from-blue-700
                              hover:to-blue-800
                              active:scale-95
                              transition-all
                              duration-200
                              whitespace-nowrap
                            "
                            style={{ minWidth: '110px' }}
                          >
                            <CreditCard className="h-4 w-4" strokeWidth={2.5} />
                            <span>Pay bill</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleDownloadPdf(inv.invoiceNumber)}
                          className="
                              h-10
                              px-6
                              inline-flex
                              items-center
                              justify-center
                              gap-2
                              rounded-full
                              bg-white
                              border-2
                              border-slate-200
                              text-slate-700
                              font-semibold
                              text-sm
                              shadow-md
                              hover:border-slate-300
                              hover:bg-slate-50
                              hover:shadow-lg
                              active:scale-95
                              transition-all
                              duration-200
                              whitespace-nowrap
                            "
                          style={{ minWidth: '90px' }}
                        >
                          <Download className="h-4 w-4" strokeWidth={2} />
                          <span>PDF</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
