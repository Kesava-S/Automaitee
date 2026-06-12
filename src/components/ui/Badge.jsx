import { clsx } from 'clsx';

/**
 * StatusBadge — renders a coloured pill for any status/label.
 *
 * variant: active | suspended | cancelled | pending | in-review |
 *          approved | rejected | completed | in-progress | resolved | due | paid
 */

const VARIANTS = {
  // Account statuses
  active:      'bg-emerald-50 text-emerald-700 border-emerald-100',
  suspended:   'bg-amber-50  text-amber-700  border-amber-100',
  cancelled:   'bg-red-50    text-red-700    border-red-100',

  // Request / ticket statuses
  pending:      'bg-slate-50   text-slate-600   border-slate-200',
  'in-review':  'bg-blue-50    text-blue-700    border-blue-100',
  'in progress':'bg-blue-50    text-blue-700    border-blue-100',
  approved:     'bg-emerald-50 text-emerald-700 border-emerald-100',
  rejected:     'bg-red-50     text-red-700     border-red-100',
  completed:    'bg-emerald-50 text-emerald-700 border-emerald-100',
  resolved:     'bg-emerald-50 text-emerald-700 border-emerald-100',
  'in-progress':'bg-blue-50    text-blue-700    border-blue-100',

  // Billing statuses
  due:  'bg-amber-50  text-amber-700  border-amber-100',
  paid: 'bg-emerald-50 text-emerald-700 border-emerald-100',

  // Generic
  online: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  admin:  'bg-blue-50    text-blue-600    border-blue-100',
};

const SIZES = {
  sm: 'text-xs px-2   py-0.5',
  md: 'text-xs px-2.5 py-1',
  lg: 'text-xs px-3   py-1.5',
};

export default function Badge({
  children,
  variant = 'pending',
  size = 'md',
  dot = false,
  className = '',
}) {
  const key = (children?.toString() ?? variant).toLowerCase().trim();
  const colorClass = VARIANTS[key] ?? VARIANTS[variant] ?? VARIANTS.pending;

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 font-semibold rounded-lg border',
        colorClass,
        SIZES[size] ?? SIZES.md,
        className
      )}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />}
      {children}
    </span>
  );
}
