import { useNavigate } from 'react-router-dom';

export default function Requests({ requests }) {
  const navigate = useNavigate();

  // Helper for status badge styling
  const getStatusStyle = (status) => {
    switch (status) {
      case 'In progress':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Resolved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Cancelled':
        return 'bg-red-50 text-red-700 border-red-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All requests</h1>
          <p className="text-sm text-gray-500 mt-1">Review active updates and support resolutions</p>
        </div>
        <button
          onClick={() => navigate('/requests/new')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all active:scale-[0.98]"
        >
          + New request
        </button>
      </div>

      {/* Requests List */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {requests.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <span className="text-3xl block mb-2">📨</span>
            <p className="font-semibold">No requests submitted yet.</p>
            <button
              onClick={() => navigate('/requests/new')}
              className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 font-semibold text-sm rounded-lg hover:bg-blue-100 transition-all"
            >
              Submit your first request
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Request Subject</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Submitted Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-950 text-sm">{req.title}</div>
                      {req.details && (
                        <p className="text-xs text-gray-400 mt-1 max-w-lg truncate">{req.details}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{req.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(req.submittedDate).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-md border ${getStatusStyle(req.status)}`}>
                        {req.status}
                      </span>
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
