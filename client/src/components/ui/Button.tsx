import { twMerge } from "tailwind-merge";
export default function Button({ className, ...props }: any) {
  return (
    <button
      className={twMerge(
        "px-4 py-2 rounded-2xl bg-primary text-white hover:opacity-90 disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
