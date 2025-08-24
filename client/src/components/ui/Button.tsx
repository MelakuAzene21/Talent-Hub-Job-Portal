import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "link";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Button({ variant = "default", size = "md", className, ...props }: ButtonProps) {
  const baseClasses = "rounded-2xl font-medium transition-colors disabled:opacity-50";
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };
  
  const variantClasses = {
    default: "bg-primary text-white hover:bg-blue-700",
    outline: "border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800",
    secondary: "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700",
    link: "bg-transparent text-primary hover:text-blue-700 underline-offset-4 hover:underline"
  };

  // Link variant doesn't need size classes
  const finalSizeClasses = variant === "link" ? "" : sizeClasses[size];

  return (
    <button
      className={twMerge(
        baseClasses,
        finalSizeClasses,
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
