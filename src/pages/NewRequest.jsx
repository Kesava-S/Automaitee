import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewRequest({ onSubmitRequest }) {
  const navigate = useNavigate();
  const [type, setType] = useState('Service update');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // On submit: validate subject and details are not empty
    if (!subject.trim() || !details.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    const newRequest = {
      id: `req-${Date.now()}`,
      title: subject.trim(),
      type: type,
      details: details.trim(),
      status: "In progress",
      submittedDate: new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
    };

    // TODO: Replace with API call to save request to database
    // TODO: Send email notification to admin on new request
    onSubmitRequest(newRequest);
    
    // Redirect to requests list
    navigate('/requests');
  };

  return (
    <div className="max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Submit a request</h1>
        <p className="text-sm text-gray-500 mt-1">Our team will verify and resolve your request within 1 business day.</p>
      </div>

      {/* Form Area */}
      <div className="p-6">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start space-x-3 text-red-600 text-sm">
            <span className="text-base mt-0.5">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Request Type */}
          <div>
            <label htmlFor="req-type" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Request Type
            </label>
            <select
              id="req-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-950 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
            >
              <option value="Service update">Service update</option>
              <option value="Bug report">Bug report</option>
              <option value="New automation request">New automation request</option>
              <option value="Cancellation request">Cancellation request</option>
              <option value="Billing query">Billing query</option>
            </select>
          </div>

          {/* Cancellation Notice Warning */}
          {type === 'Cancellation request' && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start space-x-3 text-red-700 text-sm animate-fadeIn">
              <span className="text-lg mt-0.5">⚠️</span>
              <div>
                <strong className="block font-semibold">Contract notice warning</strong>
                <span className="text-red-600">Cancellation requires 30 days notice as per your contract. We will confirm receipt within 1 business day.</span>
              </div>
            </div>
          )}

          {/* Subject */}
          <div>
            <label htmlFor="req-subject" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Subject
            </label>
            <input
              id="req-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Zendesk integration sync error"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-950 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
            />
          </div>

          {/* Details */}
          <div>
            <label htmlFor="req-details" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Details
            </label>
            <textarea
              id="req-details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Provide a detailed description of your request or issue..."
              rows={5}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-950 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
            ></textarea>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate('/requests')}
              className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold text-sm rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all active:scale-[0.98]"
            >
              Submit request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
