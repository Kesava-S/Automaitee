import { useState } from 'react';
import {
  Users, Building2, Briefcase, Activity,
  CalendarDays, Bell, BellOff, Plus, Trash2, CheckCircle,
  UserCheck, UserMinus, UserX, ShieldAlert,
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const STATUS_OPTIONS = [
  {
    value: 'active',
    label: 'Active',
    desc: 'Full portal access. All features enabled.',
    icon: UserCheck,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    ring: 'ring-emerald-400',
  },
  {
    value: 'suspended',
    label: 'Suspended',
    desc: 'Read-only access. Client sees a warning banner.',
    icon: UserMinus,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
    ring: 'ring-amber-400',
  },
  {
    value: 'cancelled',
    label: 'Cancelled',
    desc: 'Client is force-logged out and portal access is disabled.',
    icon: UserX,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
    ring: 'ring-red-400',
  },
];

export default function AdminClients({ clientData, onUpdateClient }) {
  const [expiryDate, setExpiryDate] = useState(clientData.contractExpiryDate || '');
  const [newService, setNewService] = useState('');
  const [dueNotificationText, setDueNotificationText] = useState(clientData.dueNotification || '');
  const [showNotification, setShowNotification] = useState(!!clientData.dueNotification);
  const [pendingStatus, setPendingStatus] = useState(clientData.accountStatus || 'active');
  const [statusSaving, setStatusSaving] = useState(false);
  const [expirySaving, setExpirySaving] = useState(false);
  const [alertSaving, setAlertSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const triggerSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    setStatusSaving(true);
    await onUpdateClient({ ...clientData, accountStatus: pendingStatus });
    setStatusSaving(false);
    triggerSuccess(`Account status updated to "${pendingStatus}" successfully.`);
  };

  const handleUpdateExpiry = async (e) => {
    e.preventDefault();
    setExpirySaving(true);
    await onUpdateClient({ ...clientData, contractExpiryDate: expiryDate });
    setExpirySaving(false);
    triggerSuccess('Contract expiry date updated successfully!');
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    if (!newService.trim()) return;
    const updatedServices = [...(clientData.customServices || []), newService.trim()];
    await onUpdateClient({ ...clientData, customServices: updatedServices });
    setNewService('');
    triggerSuccess(`Added service addendum: "${newService.trim()}"`);
  };

  const handleRemoveService = async (indexToRemove) => {
    const updatedServices = (clientData.customServices || []).filter((_, i) => i !== indexToRemove);
    await onUpdateClient({ ...clientData, customServices: updatedServices });
    triggerSuccess('Service addendum removed.');
  };

  const handleUpdateNotification = async (e) => {
    e.preventDefault();
    setAlertSaving(true);
    const textToSave = showNotification ? dueNotificationText.trim() : '';
    await onUpdateClient({ ...clientData, dueNotification: textToSave });
    setAlertSaving(false);
    triggerSuccess(showNotification ? 'Due alert activated on client dashboard.' : 'Client due alerts cleared.');
  };

  const currentStatus = clientData.accountStatus || 'active';

  return (
    <div className="space-y-5 lg:space-y-7 max-w-4xl">

      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Manage Client</h1>
        <p className="text-slate-400 mt-1 text-xs sm:text-sm">
          Configure client profile, account status, contract, and alerts.
        </p>
      </div>

      {/* Success Banner */}
      {successMsg && (
        <div className="p-3 sm:p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold flex items-start sm:items-center gap-2.5 animate-fadeIn">
          <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5 sm:mt-0" strokeWidth={2} />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Client Overview */}
      <div className="bg-white rounded-lg sm:rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
        <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
          <div className="h-7 w-7 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
            <Users className="h-3.5 w-3.5 text-blue-500" strokeWidth={2} />
          </div>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Client Overview</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {[
            { label: 'Representative', value: clientData.name, Icon: Users },
            { label: 'Company', value: clientData.company, Icon: Building2 },
            { label: 'Plan', value: clientData.plan, Icon: Briefcase },
            {
              label: 'Status',
              value: null,
              Icon: Activity,
              custom: <Badge variant={currentStatus} dot size="md">{currentStatus}</Badge>,
            },
          ].map(({ label, value, Icon, custom }, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="h-3.5 w-3.5 text-slate-400" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
                {custom
                  ? <div className="mt-1">{custom}</div>
                  : <span className="block font-semibold text-slate-900 mt-0.5 text-sm truncate">{value}</span>
                }
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Two-column forms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Contract Expiry */}
        <div className="bg-white rounded-lg sm:rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CalendarDays className="h-4 w-4 text-slate-400" strokeWidth={2} />
              <h3 className="font-bold text-slate-900 text-sm">Edit Contract Expiry</h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">Extend or reduce the legal duration of the service contract.</p>
          </div>
          <form onSubmit={handleUpdateExpiry} className="space-y-4 pt-1">
            <div>
              <label htmlFor="expiry-input" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Expiry Date
              </label>
              <input
                id="expiry-input"
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
                className="w-full px-3 sm:px-4 py-2.5 rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
            </div>
            <button
              type="submit"
              className="
    w-full
    sm:w-auto
    sm:min-w-[240px]
    md:min-w-[280px]
    lg:min-w-[320px]
    h-12
    sm:h-14
    flex
    items-center
    justify-center
    rounded-full
    bg-blue-600
    text-white
    font-semibold
    text-sm
    sm:text-base
    lg:text-lg
    shadow-lg
    shadow-blue-200
    hover:bg-blue-700
    transition-all
    duration-300
  "
            >
              {expirySaving ? "Updating..." : "Update Expiry Date"}
            </button>
          </form>
        </div>

        {/* Due Warning Alerts */}
        <div className="bg-white rounded-lg sm:rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Bell className="h-4 w-4 text-slate-400" strokeWidth={2} />
              <h3 className="font-bold text-slate-900 text-sm">Notify Due Bills</h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">Push a banner warning to the client dashboard regarding invoice deadlines.</p>
          </div>
          <form onSubmit={handleUpdateNotification} className="space-y-4 pt-1">
            <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-lg sm:rounded-xl cursor-pointer hover:bg-slate-100/60 transition-colors">
              <input
                id="toggle-notice"
                type="checkbox"
                checked={showNotification}
                onChange={(e) => setShowNotification(e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-xs font-semibold text-slate-700">
                Display alert banner on client dashboard
              </span>
            </label>

            {showNotification && (
              <div className="animate-fadeIn">
                <label htmlFor="due-alert-msg" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Alert Message
                </label>
                <textarea
                  id="due-alert-msg"
                  value={dueNotificationText}
                  onChange={(e) => setDueNotificationText(e.target.value)}
                  placeholder="e.g. Your monthly invoice INV-2026-006 is due tomorrow."
                  rows={2}
                  required={showNotification}
                  className="w-full px-3 sm:px-4 py-2.5 rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>
            )}

            <Button
              type="submit"
              loading={alertSaving}
              className="
    w-full
    h-12 sm:h-14
    flex
    items-center
    justify-center
    rounded-full
    bg-blue-600
    text-white
    font-semibold
    text-sm sm:text-lg
    shadow-lg
    shadow-blue-200
    hover:bg-blue-700
    hover:shadow-xl
    transition-all
    duration-300
  "
              style={{ borderRadius: '9999px' }}
              iconLeft={
                showNotification ? (
                  <Bell className="h-5 w-5" strokeWidth={2.5} />
                ) : (
                  <BellOff className="h-5 w-5" strokeWidth={2.5} />
                )
              }
            >
              {showNotification ? 'Save Alert' : 'Clear Alert'}
            </Button>
          </form>
        </div>
      </div>

      {/* Contract Services Addendums */}
      <div className="bg-white rounded-lg sm:rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-5">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Contract Services Addendums</h3>
          <p className="text-xs text-slate-400 mt-0.5">Append or remove add-on services from the client's official contract text.</p>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Custom Contract Services</h4>
          {(!clientData.customServices || clientData.customServices.length === 0) ? (
            <p className="text-sm text-slate-400 italic">No additional services added to the base plan yet.</p>
          ) : (
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg sm:rounded-xl overflow-hidden">
              {clientData.customServices.map((svc, i) => (
                <div key={i} className="px-3 sm:px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors group">
                  <span className="text-sm font-medium text-slate-800 break-words">{svc}</span>
                  <Button
                    variant="danger-ghost"
                    size="xs"
                    iconLeft={<Trash2 className="h-3.5 w-3.5" strokeWidth={2} />}
                    onClick={() => handleRemoveService(i)}
                    className="opacity-60 group-hover:opacity-100 w-full sm:w-auto rounded-full"
                    style={{ borderRadius: '9999px' }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleAddService} className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
          <div className="flex-1">
            <label htmlFor="new-svc-input" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Service Description
            </label>
            <input
              id="new-svc-input"
              type="text"
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              placeholder="e.g. SilentChurn integration for Salons — 2 feedback loops"
              required
              className="w-full px-3 sm:px-4 py-2.5 rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="md"
            iconLeft={<Plus className="h-3.5 w-3.5" strokeWidth={2.5} />}
            className="w-full sm:w-auto rounded-full"
            style={{ borderRadius: '9999px' }}
          >
            Add
          </Button>
        </form>
      </div>

    </div>
  );
}