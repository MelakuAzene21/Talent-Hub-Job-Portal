import { useAdminStatsQuery } from "../features/applications/applicationsApi";
export default function Admin() {
  const { data } = useAdminStatsQuery();
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Analytics</h2>
      <pre className="text-sm bg-zinc-100 dark:bg-zinc-900 p-4 rounded-2xl overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
