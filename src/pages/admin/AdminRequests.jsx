import { useState } from 'react';
import { MessageSquare, CheckCircle, X, Save } from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';

const STATUS_OPTIONS = ['In progress', 'Resolved', 'Cancelled'];

export default function AdminRequests({ requests, onUpdateRequests }) {
  const [selectedReqId, setSelectedReqId] = useState(null);
  const [status, setStatus] = useState('In progress');
  const [comment, setComment] = useState('');
  const [saving, setSaving] = useState(false);
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedReqId) return;
    setSaving(true);
    const updatedRequests = requests.map(req =>
      req.id === selectedReqId
        ? { ...req, status, latestUpdate: comment.trim() }
        : req
    );
    await onUpdateRequests(updatedRequests);
    setSaving(false);
    setSelectedReqId(null);
    triggerSuccess('Support request updated successfully!');
  };

  return (
    <div className="space-y-5 lg:space-y-7 max-w-5xl">

      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Manage Support Requests</h1>
        <p className="text-slate-400 mt-1 text-xs sm:text-sm">Review active support tickets, update statuses, and log developer comments.</p>
      </div>

      {successMsg && (
        <div className="p-3 sm:p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold flex items-start sm:items-center gap-2.5 animate-fadeIn">
          <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5 sm:mt-0" strokeWidth={2} />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

        {/* Table */}
        <div className="lg:col-span-2 bg-white rounded-lg sm:rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2.5">
            <MessageSquare className="h-4 w-4 text-slate-400" strokeWidth={2} />
            <h2 className="text-xs sm:text-sm font-bold text-slate-800">Submitted Tickets</h2>
            <span className="ml-auto text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
              {requests.length}
            </span>
          </div>

          {requests.length === 0 ? (
            <EmptyState
              icon={MessageSquare}
              title="No tickets submitted yet."
              desc="Support tickets from the client will appear here once submitted."
              compact
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/20">
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Ticket</th>
                    <th className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {requests.map((req) => (
                    <tr key={req.id} className={`hover:bg-slate-50/50 transition-colors ${selectedReqId === req.id ? 'bg-blue-50/30' : ''}`}>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="font-semibold text-slate-900 text-xs sm:text-sm">{req.title}</div>
                        <div className="text-xs text-slate-400 mt-0.5 font-semibold uppercase tracking-wider">{req.type}</div>
                      </td>
                      <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-slate-400">{req.submittedDate}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <Badge>{req.status}</Badge>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                        <button
                          onClick={() => handleSelectRequest(req)}
                          className={`
                            h-9 sm:h-11
                            px-3 sm:px-10
                            inline-flex
                            items-center
                            justify-center
                            rounded-full
                            font-semibold
                            text-xs sm:text-sm
                            transition-all
                            duration-300
                            shadow-md
                            whitespace-nowrap
                            ${selectedReqId === req.id
                              ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl'
                              : 'bg-blue-100 text-blue-600 hover:bg-blue-200 hover:shadow-md'
                            }
                          `}
                        >
                          {selectedReqId === req.id ? 'Editing' : 'Manage'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Update Form Sidebar */}
        <div className="bg-white rounded-lg sm:rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Update Ticket</h2>

          {!selectedReqId ? (
            <div className="py-8 text-center space-y-2">
              <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center mx-auto">
                <MessageSquare className="h-5 w-5 text-slate-300" strokeWidth={1.5} />
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Select a ticket from the table to update its status and comments.
              </p>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Ticket ID</span>
                  <span className="block font-semibold text-slate-900 mt-0.5 text-sm font-mono">{selectedReqId}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedReqId(null)}
                  className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
              </div>

              <div>
                <label htmlFor="status-select" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Update Status
                </label>
                <select
                  id="status-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                >
                  {STATUS_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="tracking-comment-input" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Progress Comment
                </label>
                <textarea
                  id="tracking-comment-input"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Provide details about the current progress..."
                  rows={4}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="
                  w-full
                  h-12 sm:h-14
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-blue-600
                  text-white
                  font-semibold
                  text-sm sm:text-lg
                  shadow-lg
                  shadow-blue-200
                  hover:bg-blue-700
                  hover:shadow-xl
                  disabled:bg-blue-400
                  disabled:cursor-not-allowed
                  transition-all
                  duration-300
                "
              >
                <Save className="h-4 w-4" strokeWidth={2} />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}