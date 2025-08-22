export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-10">
      <div className="container mx-auto px-4 py-6 text-sm text-zinc-500">
        © {new Date().getFullYear()} TalentHub
      </div>
    </footer>
  );
}
