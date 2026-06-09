import { useState } from 'react';

export default function AdminRequests({ requests, onUpdateRequests }) {
  const [selectedReqId, setSelectedReqId] = useState(null);
  const [status, setStatus] = useState('In progress');
  const [comment, setComment] = useState('');
  
  const [successMsg, setSuccessMsg] = useState('');

  const triggerSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleSelectRequest = (req) => {
    setSelectedReqId(req.id);
    setStatus(req.status);
    setComment(req.latestUpdate || '');
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!selectedReqId) return;

    const updatedRequests = requests.map(req => {
      if (req.id === selectedReqId) {
        return {
          ...req,
          status: status,
          latestUpdate: comment.trim()
        };
      }
      return req;
    });

    onUpdateRequests(updatedRequests);
    setSelectedReqId(null);
    triggerSuccess('Support request status and tracking comments updated successfully!');
  };

  const getStatusStyle = (s) => {
    switch (s) {
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
    <div className="space-y-8 max-w-5xl">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Manage Support Requests</h1>
        <p className="text-slate-500 mt-1">Review active support tickets, update statuses, and log developer comments.</p>
      </div>

      {/* Success Banner */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold animate-fadeIn">
          {successMsg}
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Table column */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50/50">
            <h2 className="text-sm font-bold text-slate-800">Submitted Tickets</h2>
          </div>

          <div className="overflow-x-auto font-sans">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/20">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-550 uppercase tracking-wider">Ticket Info</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-550 uppercase tracking-wider">Submitted</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-550 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-550 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900 text-sm">{req.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5 uppercase tracking-wider font-semibold">{req.type}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{req.submittedDate}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-md border ${getStatusStyle(req.status)}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleSelectRequest(req)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                          selectedReqId === req.id
                            ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Update Form Sidebar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-900">Manage Ticket</h2>
          {!selectedReqId ? (
            <p className="text-sm text-slate-500 italic">Select a ticket from the table to update its progress status and write a tracking comment.</p>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-4 animate-fadeIn">
              <div>
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Selected Ticket ID</span>
                <span className="block font-semibold text-slate-900 mt-1">{selectedReqId}</span>
              </div>

              <div>
                <label htmlFor="status-select" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Update Status</label>
                <select
                  id="status-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-950 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                >
                  <option value="In progress">In progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label htmlFor="tracking-comment-input" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Progress Comment</label>
                <textarea
                  id="tracking-comment-input"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Provide details about the current progress (e.g. sync completed, testing API authentication keys...)"
                  rows={4}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-950 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                ></textarea>
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all active:scale-[0.98]"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedReqId(null)}
                  className="py-2 px-4 bg-slate-100 hover:bg-slate-250 text-slate-700 font-semibold text-sm rounded-xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
