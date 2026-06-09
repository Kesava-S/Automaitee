import { useState } from 'react';

export default function AdminClients({ clientData, onUpdateClient }) {
  const [expiryDate, setExpiryDate] = useState(clientData.contractExpiryDate || '');
  const [newService, setNewService] = useState('');
  const [dueNotificationText, setDueNotificationText] = useState(clientData.dueNotification || '');
  const [showNotification, setShowNotification] = useState(!!clientData.dueNotification);
  
  const [successMsg, setSuccessMsg] = useState('');

  const triggerSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // Update Contract Expiry
  const handleUpdateExpiry = (e) => {
    e.preventDefault();
    const updated = {
      ...clientData,
      contractExpiryDate: expiryDate
    };
    onUpdateClient(updated);
    triggerSuccess('Contract expiry date updated successfully!');
  };

  // Add Service Addendum
  const handleAddService = (e) => {
    e.preventDefault();
    if (!newService.trim()) return;

    const updatedServices = [...(clientData.customServices || []), newService.trim()];
    const updated = {
      ...clientData,
      customServices: updatedServices
    };
    onUpdateClient(updated);
    setNewService('');
    triggerSuccess(`Added service addendum: "${newService.trim()}"`);
  };

  // Remove Service Addendum
  const handleRemoveService = (indexToRemove) => {
    const updatedServices = (clientData.customServices || []).filter((_, i) => i !== indexToRemove);
    const updated = {
      ...clientData,
      customServices: updatedServices
    };
    onUpdateClient(updated);
    triggerSuccess('Service addendum removed.');
  };

  // Update Notification Due Alert
  const handleUpdateNotification = (e) => {
    e.preventDefault();
    const textToSave = showNotification ? dueNotificationText.trim() : "";
    const updated = {
      ...clientData,
      dueNotification: textToSave
    };
    onUpdateClient(updated);
    triggerSuccess(showNotification ? 'Due alert activated on client dashboard.' : 'Client due alerts cleared.');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Manage Clients</h1>
        <p className="text-slate-500 mt-1">Configure client profiles, edit contract records, append services, and dispatch alerts.</p>
      </div>

      {/* Success Banner */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold animate-fadeIn">
          {successMsg}
        </div>
      )}

      {/* Client Overview Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Client Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Client Representative</span>
            <span className="block font-semibold text-slate-900 mt-1">{clientData.name}</span>
          </div>
          <div>
            <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Company Name</span>
            <span className="block font-semibold text-slate-900 mt-1">{clientData.company}</span>
          </div>
          <div>
            <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Account Plan</span>
            <span className="block font-semibold text-slate-900 mt-1">{clientData.plan}</span>
          </div>
          <div>
            <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Status</span>
            <span className="block font-semibold text-slate-900 mt-1 capitalize">{clientData.accountStatus}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card: Contract Expiry */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Edit Contract Expiry</h3>
            <p className="text-xs text-slate-500 mt-0.5">Extend or reduce the legal duration of the service contract.</p>
          </div>
          <form onSubmit={handleUpdateExpiry} className="space-y-4 pt-2">
            <div>
              <label htmlFor="expiry-input" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Expiry Date</label>
              <input
                id="expiry-input"
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
            <button
              type="submit"
              className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-md transition-all"
            >
              Update Expiry Date
            </button>
          </form>
        </div>

        {/* Card: Due Warning Alerts */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Notify due bills</h3>
            <p className="text-xs text-slate-500 mt-0.5">Push a banner warning to the client's dashboard regarding invoice deadlines.</p>
          </div>
          <form onSubmit={handleUpdateNotification} className="space-y-4 pt-2">
            <div className="flex items-center space-x-3 p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <input
                id="toggle-notice"
                type="checkbox"
                checked={showNotification}
                onChange={(e) => setShowNotification(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-slate-350 rounded focus:ring-blue-500"
              />
              <label htmlFor="toggle-notice" className="text-xs font-semibold text-slate-700">
                Display alert banner on client dashboard
              </label>
            </div>

            {showNotification && (
              <div className="animate-fadeIn">
                <label htmlFor="due-alert-msg" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Notice alert Message</label>
                <textarea
                  id="due-alert-msg"
                  value={dueNotificationText}
                  onChange={(e) => setDueNotificationText(e.target.value)}
                  placeholder="e.g. Your monthly invoice INV-2026-006 is due tomorrow. Please clear your statement."
                  rows={2}
                  required={showNotification}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                ></textarea>
              </div>
            )}

            <button
              type="submit"
              className="py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-md transition-all"
            >
              Save Alert configuration
            </button>
          </form>
        </div>
      </div>

      {/* Card: Contract Addendum Services */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Contract Services Addendums</h3>
          <p className="text-xs text-slate-500 mt-0.5">Append or remove specific add-on services from the client's official contract text.</p>
        </div>

        {/* Existing services listing */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Custom Contract Services</h4>
          {(!clientData.customServices || clientData.customServices.length === 0) ? (
            <p className="text-sm text-slate-500 italic">No additional services have been added to the base plan yet.</p>
          ) : (
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
              {clientData.customServices.map((svc, i) => (
                <div key={i} className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <span className="text-sm font-semibold text-slate-800">{svc}</span>
                  <button
                    onClick={() => handleRemoveService(i)}
                    className="text-xs font-bold text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1.5 rounded transition-all"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add new service form */}
        <form onSubmit={handleAddService} className="pt-4 border-t border-slate-100 flex items-end space-x-3">
          <div className="flex-1">
            <label htmlFor="new-svc-input" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Service Description</label>
            <input
              id="new-svc-input"
              type="text"
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              placeholder="e.g. SilentChurn integration for Salons - 2 feedback loops"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
            />
          </div>
          <button
            type="submit"
            className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-md transition-all h-[42px]"
          >
            Add Service
          </button>
        </form>
      </div>
    </div>
  );
}
