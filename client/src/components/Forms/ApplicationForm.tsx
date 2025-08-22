import Button from "../ui/Button";
import Input from "../ui/Input";
import { useApplyMutation } from "../../features/applications/applicationsApi";
import { useEffect, useState } from "react";
export default function ApplicationForm() {
  const [apply] = useApplyMutation();
  const [job, setJob] = useState<any>(null);
  useEffect(() => {
    const handler = (e: any) => setJob(e.detail);
    window.addEventListener("open-apply", handler);
    return () => window.removeEventListener("open-apply", handler);
  }, []);
  if (!job) return null;
  const [file, setFile] = useState<File | null>(null);
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const form = new FormData();
    form.append("jobId", job._id);
    if (file) form.append("resume", file);
    await apply(form).unwrap();
    setJob(null);
  };
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <form
        onSubmit={onSubmit}
        className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-full max-w-md grid gap-3"
      >
        <h3 className="text-lg font-semibold">Apply to {job.title}</h3>
        <Input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e: any) => setFile(e.target.files?.[0] || null)}
        />
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={() => setJob(null)}
            className="px-3 py-2"
          >
            Cancel
          </button>
          <Button type="submit">Submit Application</Button>
        </div>
      </form>
    </div>
  );
}
