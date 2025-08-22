export default function Card({ children }: any) {
  return (
    <div className="rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900">
      {children}
    </div>
  );
}
