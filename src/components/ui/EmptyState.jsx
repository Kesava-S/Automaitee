import { clsx } from 'clsx';

/**
 * EmptyState — centered empty-page / empty-section indicator.
 *
 * Props:
 *   icon     – Lucide icon component
 *   title    – short heading
 *   desc     – optional supporting text
 *   action   – optional React node (usually a <Button>)
 *   compact  – smaller padding for inline use inside cards
 */
export default function EmptyState({
  icon: Icon,
  title,
  desc,
  action,
  compact = false,
  className = '',
}) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center text-center',
        compact ? 'py-8 px-4' : 'py-14 px-6',
        className
      )}
    >
      {Icon && (
        <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
          <Icon className="h-6 w-6 text-slate-300" strokeWidth={1.5} />
        </div>
      )}
      <p className="font-semibold text-slate-500 text-sm">{title}</p>
      {desc && (
        <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">{desc}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
