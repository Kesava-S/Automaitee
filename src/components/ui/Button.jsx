import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

/**
 * Reusable Button component.
 *
 * Variants : primary | secondary | outline | ghost | success | warning | danger | danger-ghost | dark
 * Sizes    : xs | sm | md | lg | xl
 * Props    : loading, disabled, fullWidth, iconLeft, iconRight, className, ...rest
 */

const VARIANTS = {
  primary:
    'bg-gradient-to-br from-blue-500 to-blue-600 text-white ' +
    'shadow-sm shadow-blue-500/20 ' +
    'hover:shadow-md hover:shadow-blue-500/30 hover:brightness-110 ' +
    'active:scale-[0.97] ' +
    'focus-visible:ring-blue-500 ' +
    'disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:shadow-none',

  secondary:
    'bg-white border border-slate-200 text-slate-700 shadow-sm ' +
    'hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-px ' +
    'active:scale-[0.97] active:bg-slate-100 ' +
    'focus-visible:ring-slate-400 ' +
    'disabled:bg-slate-50 disabled:text-slate-300 disabled:border-slate-100 disabled:shadow-none',

  outline:
    'border border-blue-200 text-blue-600 ' +
    'hover:bg-blue-50 hover:border-blue-300 hover:-translate-y-px ' +
    'active:scale-[0.97] active:bg-blue-100 ' +
    'focus-visible:ring-blue-500 ' +
    'disabled:text-slate-300 disabled:border-slate-200',

  ghost:
    'text-slate-600 ' +
    'hover:bg-slate-100 hover:text-slate-900 ' +
    'active:scale-[0.97] active:bg-slate-200 ' +
    'focus-visible:ring-slate-400 ' +
    'disabled:text-slate-300',

  success:
    'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white ' +
    'shadow-sm shadow-emerald-500/20 ' +
    'hover:shadow-md hover:shadow-emerald-500/30 hover:brightness-110 ' +
    'active:scale-[0.97] ' +
    'focus-visible:ring-emerald-500 ' +
    'disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:shadow-none',

  warning:
    'bg-gradient-to-br from-amber-400 to-amber-500 text-white ' +
    'shadow-sm shadow-amber-400/20 ' +
    'hover:shadow-md hover:shadow-amber-400/30 hover:brightness-110 ' +
    'active:scale-[0.97] ' +
    'focus-visible:ring-amber-400 ' +
    'disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:shadow-none',

  danger:
    'bg-gradient-to-br from-red-500 to-red-600 text-white ' +
    'shadow-sm shadow-red-500/20 ' +
    'hover:shadow-md hover:shadow-red-500/30 hover:brightness-110 ' +
    'active:scale-[0.97] ' +
    'focus-visible:ring-red-500 ' +
    'disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:shadow-none',

  'danger-ghost':
    'text-red-500 ' +
    'hover:bg-red-50 hover:text-red-600 ' +
    'active:scale-[0.97] active:bg-red-100 ' +
    'focus-visible:ring-red-400 ' +
    'disabled:text-slate-300',

  dark:
    'bg-slate-900 text-white shadow-sm shadow-slate-900/20 ' +
    'hover:bg-slate-800 hover:-translate-y-px hover:shadow-md hover:shadow-slate-900/30 ' +
    'active:scale-[0.97] ' +
    'focus-visible:ring-slate-700 ' +
    'disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none',
};

const SIZES = {
  xs: 'h-7  px-2.5 text-xs  gap-1.5 rounded-lg',
  sm: 'h-8  px-3.5 text-xs  gap-1.5 rounded-xl',
  md: 'h-10 px-5   text-sm  gap-2   rounded-xl',
  lg: 'h-11 px-6   text-sm  gap-2   rounded-xl',
  xl: 'h-12 px-7   text-base gap-2.5 rounded-xl',
};

const Button = forwardRef(function Button(
  {
    children,
    variant  = 'primary',
    size     = 'md',
    loading  = false,
    disabled = false,
    fullWidth = false,
    iconLeft,
    iconRight,
    className = '',
    type = 'button',
    ...rest
  },
  ref
) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={clsx(
        // base
        'inline-flex items-center justify-center font-semibold',
        'transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'select-none',
        isDisabled && 'cursor-not-allowed',
        // variant
        VARIANTS[variant] ?? VARIANTS.primary,
        // size
        SIZES[size]  ?? SIZES.md,
        // full width
        fullWidth && 'w-full',
        className
      )}
      {...rest}
    >
      {/* Left slot: spinner replaces icon when loading */}
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin flex-shrink-0" />
      ) : iconLeft ? (
        <span className="flex-shrink-0 flex items-center">{iconLeft}</span>
      ) : null}

      {/* Label */}
      {children !== undefined && children !== null && (
        <span className="truncate">{children}</span>
      )}

      {/* Right icon (hidden when loading) */}
      {!loading && iconRight && (
        <span className="flex-shrink-0 flex items-center">{iconRight}</span>
      )}
    </button>
  );
});

export default Button;
