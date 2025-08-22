import Card from "../ui/Card";
import Button from "../ui/Button";
export default function JobCard({ job, onApply, onDelete, canDelete }: any) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
            {job.description}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {job.skills?.map((s: string) => (
              <span
                key={s}
                className="text-xs px-2 py-0.5 rounded-full bg-secondary/20"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          {onApply && <Button onClick={onApply}>Apply</Button>}
          {canDelete && (
            <Button className="bg-red-600" onClick={onDelete}>
              Delete
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
