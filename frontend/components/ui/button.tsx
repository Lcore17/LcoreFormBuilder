'use client';
import React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md';
};

export function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  const base = 'btn';
  const variants: Record<string, string> = {
    primary: 'btn-primary',
    outline: 'btn-outline',
    ghost: 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 rounded-md px-3 py-2',
  };
  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
  };
  return <button className={clsx(base, variants[variant], sizes[size], className)} {...props} />;
}

export default Button;
