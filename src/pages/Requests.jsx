import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MessageSquare, X, Clock } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import EmptyState from '../components/ui/EmptyState';

export default function Requests({ requests }) {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="space-y-5 lg:space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900">All Requests</h1>
          <p className="text-sm text-gray-400 mt-0.5 hidden sm:block">Review active updates and support resolutions</p>
        </div>
        <button
          onClick={() => navigate('/requests/new')}
          className="
            group
            relative
            h-12 sm:h-13
            px-12 sm:px-24
            py-3 sm:py-3.5
            inline-flex
            items-center
            justify-center
            gap-2.5
            rounded-full
            bg-gradient-to-r
            from-blue-600
            to-blue-700
            text-white
            font-semibold
            text-sm sm:text-base
            leading-tight
            shadow-lg
            shadow-blue-200
            hover:shadow-xl
            hover:shadow-blue-300
            hover:from-blue-700
            hover:to-blue-800
            focus:outline-none
            focus:ring-4
            focus:ring-blue-300
            focus:ring-opacity-50
            active:scale-95
            transition-all
            duration-200
            ease-out
            whitespace-nowrap
          "
          style={{ minWidth: '200px', paddingLeft: '32px', paddingRight: '32px' }}
        >
          <Plus
            className="h-5 w-5 flex-shrink-0 transition-transform group-hover:rotate-90 duration-300"
            strokeWidth={2.5}
          />
          <span>New request</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {requests.length === 0 ? (
          <EmptyState
            icon={MessageSquare}
            title="No requests submitted yet."
            desc="Submit a request and our team will respond within 1 business day."
            action={
              <Button variant="outline" size="sm" onClick={() => navigate('/requests/new')}>
                Submit your first request
              </Button>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider w-1/4">
                    Subject
                  </th>
                  <th className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider w-1/5 text-center">
                    Type
                  </th>
                  <th className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider w-1/5">
                    Submitted
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider w-1/5 text-center">
                    Status
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider w-1/5 text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {requests.map(req => (
                  <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">

                    {/* Subject - 1/4 width */}
                    <td className="px-3 sm:px-6 py-3 sm:py-4 w-1/4">
                      <div className="font-semibold text-gray-900 text-sm">
                        {req.title}
                      </div>
                      {req.details && (
                        <p className="text-xs text-gray-400 mt-0.5 max-w-xs truncate">
                          {req.details}
                        </p>
                      )}
                    </td>

                    {/* Type - 1/5 width - Hidden on Mobile */}
                    <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 w-1/5">
                      <span className="inline-flex text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                        {req.type}
                      </span>
                    </td>

                    {/* Submitted - 1/5 width - Hidden on Mobile */}
                    <td className="hidden sm:table-cell px-3 sm:px-6 py-3 sm:py-4 w-1/5 text-sm text-gray-600">
                      {new Date(req.submittedDate).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>

                    {/* Status Badge - 1/5 width */}
                    <td className="px-3 sm:px-6 py-3 sm:py-4 w-1/5">
                      <div className="flex items-center justify-center h-full">
                        <Badge>{req.status}</Badge>
                      </div>
                    </td>

                    {/* Track Button - 1/5 width */}
                    <td className="px-3 sm:px-6 py-3 sm:py-4 w-1/5">
                      <div className="flex items-center justify-end h-full pr-2">
                        <button
                          onClick={() => setSelected(req)}
                          className="
                  h-10
                  px-5
                  sm:px-6
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
                  hover:border-blue-400
                  hover:text-blue-600
                  hover:bg-blue-50
                  hover:shadow-lg
                  active:scale-95
                  transition-all
                  duration-200
                  whitespace-nowrap
                  flex-shrink-0
                "
                          style={{ minWidth: '100px' }}
                        >
                          <Clock className="h-4 w-4" strokeWidth={2} />
                          <span>Track</span>
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
      {selected && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-slideUp">
            <div className="p-6 border-b border-slate-100 flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Track Progress</h3>
                <p className="text-xs text-slate-400 mt-0.5 max-w-xs truncate">{selected.title}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="h-8 w-8 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all flex-shrink-0"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Current Status</span>
                <Badge size="md">{selected.status}</Badge>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Latest Comment from Automaitee
                </span>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {selected.latestUpdate ||
                    'No comments posted yet. We will review your request and update this status shortly.'}
                </p>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-end">
              <Button variant="secondary" size="sm" onClick={() => setSelected(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
