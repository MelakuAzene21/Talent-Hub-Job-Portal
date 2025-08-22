import {
  useGetJobsQuery,
  useDeleteJobMutation,
} from "../../features/jobs/jobsApi";
import JobCard from "./JobCard";
import { useAppSelector } from "../../utils/helpers";
export default function JobList() {
  const { data: jobs } = useGetJobsQuery();
  const [del] = useDeleteJobMutation();
  const { user } = useAppSelector((s) => s.auth as any);
  return (
    <div className="grid gap-4">
      {jobs?.map((j) => (
        <JobCard
          key={j._id}
          job={j}
          canDelete={
            user && (user.role === "admin" || j.createdBy?._id === user.id)
          }
          onDelete={() => del(j._id)}
          onApply={
            user?.role === "applicant"
              ? () =>
                  window.dispatchEvent(
                    new CustomEvent("open-apply", { detail: j })
                  )
              : undefined
          }
        />
      ))}
    </div>
  );
}
