import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Select({ children, className = "", ...props }: SelectProps) {
  return (
    <select
      className={`w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-800 dark:text-white ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}     

