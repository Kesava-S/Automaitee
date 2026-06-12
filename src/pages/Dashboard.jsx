import { useNavigate } from 'react-router-dom';
import {
  MessageSquare, AlertCircle, FileCheck,
  Building2, Briefcase, Mail, Calendar,
  Plus, FileText, Megaphone,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export default function Dashboard({ clientData, requests, invoices, announcements = [] }) {
  const navigate = useNavigate();

  const openRequestsCount = requests.filter(r => r.status === 'In progress').length;
  const pendingBillsCount = invoices.filter(inv => inv.status === 'Due').length;
  const isContractSigned = clientData.tcAccepted;

  // Account suspended/cancelled notice
  const isSuspended = clientData.accountStatus === 'suspended';
  const isCancelled = clientData.accountStatus === 'cancelled';

  const metrics = [
    {
      label: 'Open Requests',
      value: openRequestsCount,
      icon: MessageSquare,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500',
      valueColor: 'text-gray-900',
    },
    {
      label: 'Pending Bills',
      value: pendingBillsCount,
      icon: AlertCircle,
      iconBg: pendingBillsCount > 0 ? 'bg-amber-50' : 'bg-gray-50',
      iconColor: pendingBillsCount > 0 ? 'text-amber-500' : 'text-gray-400',
      valueColor: pendingBillsCount > 0 ? 'text-amber-600' : 'text-gray-900',
    },
    {
      label: 'Contract Status',
      value: isContractSigned ? 'Signed' : 'Not Signed',
      isText: true,
      icon: FileCheck,
      iconBg: isContractSigned ? 'bg-emerald-50' : 'bg-red-50',
      iconColor: isContractSigned ? 'text-emerald-500' : 'text-red-500',
      valueColor: isContractSigned ? 'text-emerald-600' : 'text-red-600',
      sub: isContractSigned && clientData.contractExpiryDate
        ? `Expires: ${new Date(clientData.contractExpiryDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`
        : null,
    },
  ];

  const profileFields = [
    { label: 'Company Name', value: clientData.company, Icon: Building2 },
    { label: 'Service Plan', value: clientData.plan, Icon: Briefcase },
    { label: 'Contact Email', value: clientData.email, Icon: Mail },
    { label: 'Account Created', value: new Date(clientData.createdAt).toLocaleDateString(), Icon: Calendar },
  ];

  return (
    <div className="space-y-5 lg:space-y-7">

      {/* Account status alert (suspended / cancelled) */}
      {(isSuspended || isCancelled) && (
        <div className={`p-4 rounded-2xl flex items-start gap-3 text-sm font-medium animate-fadeIn ${isCancelled ? 'bg-red-50 border border-red-200 text-red-900' : 'bg-amber-50 border border-amber-200 text-amber-900'
          }`}>
          <span className="text-lg mt-0.5 flex-shrink-0">{isCancelled ? '🚫' : '⚠️'}</span>
          <div>
            <strong className="block font-bold mb-0.5">
              {isCancelled ? 'Account Cancelled' : 'Account Suspended'}
            </strong>
            <span>
              {isCancelled
                ? 'Your account has been cancelled. Please contact support to resolve.'
                : 'Your account is currently suspended. Read-only access is active. Contact support to restore.'}
            </span>
          </div>
        </div>
      )}

      {/* Due notification banner */}
      {clientData.dueNotification && (
        <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl flex items-start gap-3 text-sm font-medium shadow-sm animate-fadeIn">
          <span className="text-lg mt-0.5 flex-shrink-0">🔔</span>
          <div>
            <strong className="block font-bold mb-0.5">Important Notice</strong>
            <span className="text-amber-800">{clientData.dueNotification}</span>
          </div>
        </div>
      )}

      {/* Announcements */}
      {announcements.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4 animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Megaphone className="h-3.5 w-3.5 text-blue-500" strokeWidth={2} />
            </div>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Company Announcements</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {announcements.map(ann => (
              <div key={ann.id} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-bold text-gray-900 text-sm">{ann.title}</h3>
                  <span className="text-xs text-gray-400 font-medium whitespace-nowrap flex-shrink-0">
                    {new Date(ann.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-wrap">{ann.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Welcome Banner */}
      <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-200 p-5 lg:p-7 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1 flex-wrap">
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Welcome back, {clientData.name}!</h1>
            <Badge variant={clientData.accountStatus} dot>{clientData.accountStatus}</Badge>
          </div>
          <p className="text-gray-400 text-sm">Overview of your active plan and operational updates.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
          <button
            onClick={() => navigate('/requests/new')}
            disabled={isCancelled}
            className="
                group
                h-12
                px-8
                py-3
                inline-flex
                items-center
                justify-center
                gap-3
                rounded-full
                bg-blue-600
                text-white
                font-semibold
                text-base
                shadow-lg
                shadow-blue-200
                hover:bg-blue-700
                hover:shadow-xl
                disabled:bg-slate-400
                disabled:cursor-not-allowed
                disabled:opacity-60
                active:scale-95
                transition-all
                duration-200
                whitespace-nowrap
                w-full sm:w-auto
              "
            style={{ paddingLeft: '32px', paddingRight: '32px' }}
          >
            <Plus
              className="h-5 w-5 flex-shrink-0"
              strokeWidth={2.5}
            />
            <span>New request</span>
          </button>

          <button
            onClick={() => navigate('/contract')}
            className="
                group
                h-12
                px-8
                py-3
                inline-flex
                items-center
                justify-center
                gap-3
                rounded-full
                bg-white
                border-2
                border-slate-200
                text-slate-700
                font-semibold
                text-base
                shadow-md
                hover:bg-blue-50
                hover:border-blue-300
                hover:text-blue-600
                hover:shadow-lg
                active:scale-95
                transition-all
                duration-200
                whitespace-nowrap
                w-full sm:w-auto
              "
            style={{ paddingLeft: '32px', paddingRight: '32px' }}
          >
            <FileText
              className="h-5 w-5 flex-shrink-0"
              strokeWidth={2}
            />
            <span>View contract</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div key={i} className="bg-white rounded-xl lg:rounded-2xl border border-gray-200 p-5 lg:p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{metric.label}</h3>
                  <p className={`font-bold mt-2 leading-none ${metric.isText ? 'text-xl' : 'text-3xl'} ${metric.valueColor}`}>
                    {metric.value}
                  </p>
                  {metric.sub && <p className="text-xs text-gray-400 mt-1.5 font-medium">{metric.sub}</p>}
                </div>
                <div className={`h-10 w-10 rounded-xl ${metric.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`h-5 w-5 ${metric.iconColor}`} strokeWidth={1.75} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Company Profile */}
      <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 lg:px-6 py-4 lg:py-5 border-b border-gray-200">
          <h2 className="text-base font-bold text-gray-900">Company Profile</h2>
          <p className="text-xs text-gray-400 mt-0.5">Registered corporate credentials</p>
        </div>
        <div className="p-5 lg:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {profileFields.map(({ label, value, Icon }, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="h-4 w-4 text-gray-400" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</span>
                <span className="block font-semibold text-gray-900 mt-0.5 text-sm truncate">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
