import { useForm } from "react-hook-form";
import { useCreateJobMutation } from "../../features/jobs/jobsApi";
import Input from "../ui/Input";
import Button from "../ui/Button";
export default function JobForm() {
  const { register, handleSubmit, reset } = useForm();
  const [createJob] = useCreateJobMutation();
  const onSubmit = async (data: any) => {
    data.skills = data.skills
      ? String(data.skills)
          .split(",")
          .map((s: string) => s.trim())
      : [];
    await createJob(data).unwrap();
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
      <Input
        placeholder="Job title"
        {...register("title", { required: true })}
      />
      <textarea
        className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
        placeholder="Description"
        {...register("description", { required: true })}
      />
      <Input placeholder="Skills (comma separated)" {...register("skills")} />
      <Button type="submit">Create Job</Button>
    </form>
  );
}
