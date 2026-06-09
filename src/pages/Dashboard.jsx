import { useNavigate } from 'react-router-dom';

export default function Dashboard({ clientData, requests, invoices }) {
  const navigate = useNavigate();

  // Compute metrics
  const openRequestsCount = requests.filter(r => r.status === 'In progress').length;
  
  const pendingInvoicesSum = invoices
    .filter(inv => inv.status === 'Due')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const isContractSigned = clientData.tcAccepted;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {clientData.name}!</h1>
          <p className="text-gray-500 mt-1">Here is an overview of your active plan and operational updates.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button
            onClick={() => navigate('/requests/new')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all active:scale-[0.98]"
          >
            + New request
          </button>
          <button
            onClick={() => navigate('/contract')}
            className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold text-sm rounded-xl transition-all"
          >
            View contract
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Open Requests */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex items-center space-x-5">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 text-2xl flex items-center justify-center">
            📨
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Open Requests</h3>
            <p className="text-3xl font-bold text-gray-950 mt-1">{openRequestsCount}</p>
          </div>
        </div>

        {/* Pending Invoices */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex items-center space-x-5">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 text-2xl flex items-center justify-center">
            💳
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Pending Amount</h3>
            <p className="text-3xl font-bold text-gray-950 mt-1">₹ {pendingInvoicesSum.toFixed(2)}</p>
          </div>
        </div>

        {/* Contract Status */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex items-center space-x-5">
          <div className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center ${
            isContractSigned ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
          }`}>
            📝
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Contract Status</h3>
            <p className={`text-xl font-bold mt-1 ${isContractSigned ? 'text-emerald-600' : 'text-red-500'}`}>
              {isContractSigned ? 'Signed' : 'Not Signed'}
            </p>
          </div>
        </div>
      </div>

      {/* Account Info Cards */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-950">Company Profile</h2>
          <p className="text-sm text-gray-500 mt-1">Overview of registered corporate credentials</p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Company Name</span>
            <span className="block font-semibold text-gray-950 mt-1">{clientData.company}</span>
          </div>
          <div>
            <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Service Plan</span>
            <span className="block font-semibold text-gray-950 mt-1">{clientData.plan}</span>
          </div>
          <div>
            <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact Email</span>
            <span className="block font-semibold text-gray-950 mt-1">{clientData.email}</span>
          </div>
          <div>
            <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Account Created</span>
            <span className="block font-semibold text-gray-950 mt-1">{new Date(clientData.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
