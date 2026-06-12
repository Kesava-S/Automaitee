import { clsx } from 'clsx';

/** Animated shimmer skeleton block */
export function Skeleton({ className = '', ...props }) {
  return (
    <div
      className={clsx(
        'animate-pulse rounded-xl bg-slate-100',
        className
      )}
      {...props}
    />
  );
}

/** Full metric card skeleton */
export function MetricCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-3">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="h-10 w-10 rounded-xl flex-shrink-0" />
      </div>
    </div>
  );
}

/** Table row skeleton */
export function TableRowSkeleton({ cols = 4 }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <Skeleton className="h-4 w-full max-w-[160px]" />
        </td>
      ))}
    </tr>
  );
}

/** Page header skeleton */
export function PageHeaderSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-7 w-48" />
      <Skeleton className="h-4 w-72" />
    </div>
  );
}

/** Card skeleton with lines */
export function CardSkeleton({ lines = 3, className = '' }) {
  return (
    <div className={clsx('bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-3', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={clsx('h-4', i === 0 ? 'w-3/4' : i % 2 === 0 ? 'w-1/2' : 'w-full')}
        />
      ))}
    </div>
  );
}

export default Skeleton;
