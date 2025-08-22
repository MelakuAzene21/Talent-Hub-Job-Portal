import ApplicationForm from "../components/Forms/ApplicationForm";
import { useAppSelector } from "../utils/helpers";
import { useMyApplicationsQuery } from "../features/applications/applicationsApi";
export default function Applicant() {
  const { user } = useAppSelector((s) => s.auth as any);
  const { data } = useMyApplicationsQuery(user?.id || "");
  return (
    <div className="grid gap-4">
      <h2 className="text-xl font-semibold">My Applications</h2>
      <ul className="grid gap-2">
        {data?.map((a: any) => (
          <li
            key={a._id}
            className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800"
          >
            {a.jobId?.title} – <span className="capitalize">{a.status}</span>
          </li>
        ))}
      </ul>
      <ApplicationForm />
    </div>
  );
}
