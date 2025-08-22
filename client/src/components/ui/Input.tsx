import { twMerge } from "tailwind-merge";
export default function Input(props: any) {
  return (
    <input
      {...props}
      className={twMerge(
        "w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900",
        props.className
      )}
    />
  );
}
