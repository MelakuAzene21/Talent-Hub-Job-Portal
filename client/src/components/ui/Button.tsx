import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary";
  className?: string;
}

export default function Button({ variant = "default", className, ...props }: ButtonProps) {
  const baseClasses = "px-4 py-2 rounded-2xl font-medium transition-colors disabled:opacity-50";
  
  const variantClasses = {
    default: "bg-primary text-white hover:bg-blue-700",
    outline: "border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800",
    secondary: "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
  };

  return (
    <button
      className={twMerge(
        baseClasses,
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
