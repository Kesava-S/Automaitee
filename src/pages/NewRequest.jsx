import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, AlertTriangle, ChevronLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const REQUEST_TYPES = [
  'Service update',
  'Bug report',
  'New automation request',
  'Cancellation request',
  'Billing query',
];

export default function NewRequest({ onSubmitRequest }) {
  const navigate = useNavigate();
  const [type, setType] = useState('Service update');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!subject.trim() || !details.trim()) {
      setError('Please fill in all fields before submitting.');
      return;
    }
    setLoading(true);
    const newRequest = {
      id: `req-${Date.now()}`,
      title: subject.trim(),
      type,
      details: details.trim(),
      status: 'In progress',
      submittedDate: new Date().toISOString().split('T')[0],
      latestUpdate: 'We have received your request and our engineering team is reviewing it. We will post an update within 1 business day.',
    };
    await onSubmitRequest(newRequest);
    navigate('/requests');
  };

  return (
    <div className="max-w-2xl">
      <button
        onClick={() => navigate('/requests')}
        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 font-medium mb-5 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={2} />
        Back to requests
      </button>

      <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 lg:px-7 py-5 lg:py-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Submit a Request</h1>
          <p className="text-sm text-gray-400 mt-0.5">Our team responds within 1 business day.</p>
        </div>

        <div className="px-5 lg:px-7 py-5 lg:py-6">
          {error && (
            <div className="mb-5 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm flex items-start gap-2.5 animate-fadeIn">
              <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" strokeWidth={2} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="req-type" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Request Type
              </label>
              <select
                id="req-type"
                value={type}
                onChange={e => setType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
              >
                {REQUEST_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {type === 'Cancellation request' && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-sm flex items-start gap-3 animate-fadeIn">
                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0 text-red-400" strokeWidth={2} />
                <div>
                  <strong className="block font-semibold">Contract Notice Warning</strong>
                  <span className="text-red-600">Cancellation requires 30 days notice as per your contract.</span>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="req-subject" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Subject
              </label>
              <input
                id="req-subject"
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="e.g. Zendesk integration sync error"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>

            <div>
              <label htmlFor="req-details" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Details
              </label>
              <textarea
                id="req-details"
                value={details}
                onChange={e => setDetails(e.target.value)}
                placeholder="Provide a detailed description of your request or issue..."
                rows={5}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => navigate('/requests')}
                className="
                  h-12
                  px-10
                  inline-flex
                  items-center
                  justify-center
                  gap-2.5
                  rounded-full
                  bg-white
                  border-2
                  border-slate-200
                  text-slate-700
                  font-semibold
                  text-base
                  shadow-md
                  hover:border-slate-300
                  hover:bg-slate-50
                  hover:shadow-lg
                  active:scale-95
                  transition-all
                  duration-200
                  whitespace-nowrap
                "
                style={{ minWidth: '150px' }}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="
                  group
                  h-12
                  px-10
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-gradient-to-r
                  from-blue-600
                  to-blue-700
                  text-white
                  font-semibold
                  text-base
                  shadow-lg
                  shadow-blue-200
                  hover:shadow-xl
                  hover:shadow-blue-300
                  hover:from-blue-700
                  hover:to-blue-800
                  disabled:from-slate-400
                  disabled:to-slate-500
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  disabled:shadow-none
                  active:scale-95
                  transition-all
                  duration-200
                  whitespace-nowrap
                "
                style={{ minWidth: '160px', paddingLeft: '28px', paddingRight: '28px' }}
              >
                <Send className="h-5 w-5 flex-shrink-0" strokeWidth={2} />
                <span>{loading ? 'Submitting...' : 'Submit request'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
