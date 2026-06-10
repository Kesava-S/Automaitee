import { useNavigate } from 'react-router-dom';

export default function AdminDashboard({ clientData, requests, invoices, announcements }) {
  const navigate = useNavigate();

  // Compute metrics
  const openRequestsCount = requests.filter(r => r.status === 'In progress').length;
  
  const dueInvoices = invoices.filter(inv => inv.status === 'Due');
  const dueBillsCount = dueInvoices.length;
  const outstandingAmount = dueInvoices.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-500 mt-1">Overview of customer integrations, requests status, and billing logs.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Clients */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Active Clients</h2>
          <p className="text-3xl font-bold text-slate-900 mt-1">1</p>
          <span className="text-xs text-slate-500 mt-1 block">{clientData.company} ({clientData.name})</span>
        </div>

        {/* Open Requests */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Open Requests</h2>
          <p className="text-3xl font-bold text-slate-900 mt-1">{openRequestsCount}</p>
          <span className="text-xs text-slate-500 mt-1 block">Awaiting updates or resolutions</span>
        </div>

        {/* Due Invoices */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Unpaid Bills</h2>
          <p className="text-3xl font-bold text-slate-900 mt-1">{dueBillsCount}</p>
          <span className="text-xs text-slate-500 mt-1 block">Total: £ {outstandingAmount.toFixed(2)}</span>
        </div>

        {/* Broadcast Announcements */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Announcements</h2>
          <p className="text-3xl font-bold text-slate-900 mt-1">{announcements.length}</p>
          <span className="text-xs text-slate-500 mt-1 block">Active global broadcasts</span>
        </div>
      </div>

      {/* Quick Operations panel */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Quick Operations</h2>
        <p className="text-slate-500 text-sm">Select an action below to update client profiles, contracts, announcements or billing state.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          <button
            onClick={() => navigate('/admin/billing')}
            className="p-4 bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-blue-50/20 rounded-xl text-left transition-all"
          >
            <h3 className="font-bold text-slate-800 text-sm">Issue New Bill</h3>
            <p className="text-xs text-slate-500 mt-1">Generate a recurring monthly invoice for client review.</p>
          </button>

          <button
            onClick={() => navigate('/admin/announcements')}
            className="p-4 bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-blue-50/20 rounded-xl text-left transition-all"
          >
            <h3 className="font-bold text-slate-800 text-sm">Post Announcement</h3>
            <p className="text-xs text-slate-500 mt-1">Broadcast an update to all onboarding clients at once.</p>
          </button>

          <button
            onClick={() => navigate('/admin/clients')}
            className="p-4 bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-blue-50/20 rounded-xl text-left transition-all"
          >
            <h3 className="font-bold text-slate-800 text-sm">Update Contract</h3>
            <p className="text-xs text-slate-500 mt-1">Edit contract expiry or append new custom addendum services.</p>
          </button>

          <button
            onClick={() => navigate('/admin/requests')}
            className="p-4 bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-blue-50/20 rounded-xl text-left transition-all"
          >
            <h3 className="font-bold text-slate-800 text-sm">Manage Requests</h3>
            <p className="text-xs text-slate-500 mt-1">Update support tickets statuses and type progress comments.</p>
          </button>
        </div>
      </div>
    </div>
  );
}
