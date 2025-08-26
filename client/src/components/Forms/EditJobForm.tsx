import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useUpdateJobMutation } from "../../features/jobs/jobsApi";

export default function EditJobForm({
  job,
  onClose,
}: {
  job: any;
  onClose: () => void;
}) {
  const { register, handleSubmit } = useForm({ defaultValues: job });
  const [updateJob] = useUpdateJobMutation();
  const onSubmit = async (data: any) => {
    data.skills = String(data.skills)
      .split(",")
      .map((s: string) => s.trim());
    await updateJob({ id: job._id, ...data }).unwrap();
    onClose();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
      <Input placeholder="Title" {...register("title", { required: true })} />
      <textarea
        className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
        {...register("description", { required: true })}
      />
      <Input placeholder="Skills (comma separated)" {...register("skills")} />
      <div className="flex gap-2 justify-end">
        <Button type="button" className="bg-gray-500" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
