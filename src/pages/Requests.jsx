import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Requests({ requests }) {
  const [selectedRequestForTracking, setSelectedRequestForTracking] = useState(null);
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
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-md border ${getStatusStyle(req.status)}`}>
                          {req.status}
                        </span>
                        <button
                          onClick={() => setSelectedRequestForTracking(req)}
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 text-xs font-semibold rounded-lg transition-all active:scale-[0.98]"
                        >
                          Track
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

      {/* Track Progress Modal */}
      {selectedRequestForTracking && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div role="dialog" aria-modal="true" aria-labelledby="track-progress-title" className="bg-white w-full max-w-md rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-slideUp">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 id="track-progress-title" className="text-lg font-bold text-slate-900">Track Progress</h2>
                <p className="text-xs text-slate-500 mt-1">{selectedRequestForTracking.title}</p>
              </div>
              <button 
                onClick={() => setSelectedRequestForTracking(null)}
                aria-label="Close track progress modal"
                className="text-slate-400 hover:text-slate-600 text-lg font-semibold h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-all"
              >
                &times;
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 space-y-5">
              <div>
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</span>
                <span className={`inline-flex mt-1.5 px-2.5 py-1 text-xs font-semibold rounded-md border ${getStatusStyle(selectedRequestForTracking.status)}`}>
                  {selectedRequestForTracking.status}
                </span>
              </div>
              
              <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl">
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Latest Comment from Automaitee</span>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {selectedRequestForTracking.latestUpdate || "No comments posted yet. We will review your request and update this status shortly."}
                </p>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedRequestForTracking(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-sm rounded-xl transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
