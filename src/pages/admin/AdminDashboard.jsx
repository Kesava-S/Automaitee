import { useNavigate } from 'react-router-dom';
import {
  Users, MessageSquare, CreditCard, Megaphone,
  Receipt, FileEdit, ArrowRight, UserCheck, UserX, UserMinus,
  Activity,
} from 'lucide-react';
import Badge from '../../components/ui/Badge';

export default function AdminDashboard({ clientData, requests, invoices, announcements }) {
  const navigate = useNavigate();

  const openRequestsCount = requests.filter(r => r.status === 'In progress').length;
  const dueInvoices = invoices.filter(inv => inv.status === 'Due');
  const dueBillsCount = dueInvoices.length;
  const outstandingAmount = dueInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const accountStatus = clientData.accountStatus || 'active';

  const statusMeta = {
    active: { icon: UserCheck, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-500', label: 'Active Clients' },
    suspended: { icon: UserMinus, iconBg: 'bg-amber-50', iconColor: 'text-amber-500', label: 'Suspended Clients' },
    cancelled: { icon: UserX, iconBg: 'bg-red-50', iconColor: 'text-red-500', label: 'Cancelled Clients' },
  };
  const sm = statusMeta[accountStatus] || statusMeta.active;

  const metrics = [
    {
      label: sm.label,
      value: 1,
      sub: `${clientData.company} · ${clientData.name}`,
      icon: sm.icon,
      iconBg: sm.iconBg,
      iconColor: sm.iconColor,
    },
    {
      label: 'Open Requests',
      value: openRequestsCount,
      sub: 'Awaiting updates or resolutions',
      icon: MessageSquare,
      iconBg: openRequestsCount > 0 ? 'bg-amber-50' : 'bg-gray-50',
      iconColor: openRequestsCount > 0 ? 'text-amber-500' : 'text-gray-400',
      valueColor: openRequestsCount > 0 ? 'text-amber-600' : '',
    },
    {
      label: 'Unpaid Bills',
      value: dueBillsCount,
      sub: `Outstanding: £${outstandingAmount.toFixed(2)}`,
      icon: CreditCard,
      iconBg: dueBillsCount > 0 ? 'bg-red-50' : 'bg-gray-50',
      iconColor: dueBillsCount > 0 ? 'text-red-500' : 'text-gray-400',
      valueColor: dueBillsCount > 0 ? 'text-red-600' : '',
    },
    {
      label: 'Announcements',
      value: announcements.length,
      sub: 'Active global broadcasts',
      icon: Megaphone,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-500',
    },
  ];

  const quickOps = [
    {
      title: 'Issue New Bill',
      desc: 'Generate a recurring monthly invoice for client review.',
      icon: Receipt,
      path: '/admin/billing',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500',
    },
    {
      title: 'Post Announcement',
      desc: 'Broadcast an update to all onboarding clients at once.',
      icon: Megaphone,
      path: '/admin/announcements',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-500',
    },
    {
      title: 'Manage Client',
      desc: 'Edit contract, account status, alerts, and service addendums.',
      icon: FileEdit,
      path: '/admin/clients',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-500',
    },
    {
      title: 'Manage Requests',
      desc: 'Update support ticket statuses and log progress comments.',
      icon: MessageSquare,
      path: '/admin/requests',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-500',
    },
  ];



  return (
    <div className="space-y-5 lg:space-y-7">

      <div>
        <h1 className="text-xl lg:text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-400 mt-1 text-sm">
          Overview of customer integrations, request statuses, and billing logs.
        </p>
      </div>

      {/* Account Status Alert */}
      {accountStatus !== 'active' && (
        <div className={`p-4 rounded-xl lg:rounded-2xl flex items-start gap-3 text-sm font-medium animate-fadeIn ${accountStatus === 'cancelled'
          ? 'bg-red-50 border border-red-200 text-red-900'
          : 'bg-amber-50 border border-amber-200 text-amber-900'
          }`}>
          <Activity className="h-4 w-4 mt-0.5 flex-shrink-0" strokeWidth={2} />
          <div>
            <strong className="block font-bold mb-0.5">
              Client Account: {accountStatus === 'cancelled' ? 'Cancelled' : 'Suspended'}
            </strong>
            <span className="text-sm">
              {accountStatus === 'cancelled'
                ? `${clientData.company}'s account is cancelled. The client has been logged out.`
                : `${clientData.company}'s account is suspended. Client has read-only access.`}
            </span>
          </div>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div key={i} className="bg-white rounded-xl lg:rounded-2xl border border-slate-200 p-4 lg:p-6 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider leading-tight">{metric.label}</h3>
                  <p className={`text-2xl lg:text-3xl font-bold mt-1.5 lg:mt-2 leading-none  text-slate-900`}>
                    {metric.value}
                  </p>
                  <span className="text-xs text-slate-400 mt-1 block truncate">{metric.sub}</span>
                </div>
              
              </div>
            </div>
          );
        })}
      </div>

      {/* Lower grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Quick Operations */}
        <div className="
  w-full
  lg:col-span-3
  bg-white
  rounded-2xl
  border
  border-slate-200
  shadow-sm
  p-6
  lg:p-8
">
          <div className="mb-8">
            <h2 className="
      text-2xl
      lg:text-3xl
      font-bold
      text-slate-900
    ">
              Quick Operations
            </h2>

            <p className="
      mt-2
      text-slate-500
      text-sm
      lg:text-base
      leading-relaxed
    ">
              Select an action below to update client profiles, contracts,
              announcements or billing state.
            </p>
          </div>

          <div className="
    grid
    grid-cols-1
    sm:grid-cols-2
    xl:grid-cols-4
    gap-4
    lg:gap-6
  ">
            {quickOps.map((op, i) => {
              const OpIcon = op.icon;
              return (
                <button
                  key={i}
                  onClick={() => navigate(op.path)}
                  className="text-left p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all duration-200"
                >

                  <h3 className="text-base lg:text-lg font-bold text-slate-900 mb-1.5 px-3 py-2 rounded-lg inline-flex items-center gap-2" style={{ backgroundColor: op.iconBg, color: op.iconColor }}>
                    {op.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed px-3 py-2">
                    {op.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>


      </div>
    </div>
  );
}
