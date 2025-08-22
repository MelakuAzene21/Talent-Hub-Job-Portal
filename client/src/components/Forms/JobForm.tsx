import { useForm } from "react-hook-form";
import { useCreateJobMutation, useUpdateJobMutation } from "../../features/jobs/jobsApi";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useEffect } from "react";

interface JobFormProps {
  job?: any;
  onSuccess?: () => void;
}

export default function JobForm({ job, onSuccess }: JobFormProps) {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [createJob] = useCreateJobMutation();
  const [updateJob] = useUpdateJobMutation();

  // Pre-fill form if editing
  useEffect(() => {
    if (job) {
      setValue("title", job.title);
      setValue("description", job.description);
      setValue("skills", job.skills?.join(", ") || "");
    }
  }, [job, setValue]);

  const onSubmit = async (data: any) => {
    data.skills = data.skills
      ? String(data.skills)
          .split(",")
          .map((s: string) => s.trim())
      : [];
    
    try {
      if (job) {
        await updateJob({ id: job._id, ...data }).unwrap();
      } else {
        await createJob(data).unwrap();
      }
      reset();
      onSuccess?.();
    } catch (error) {
      console.error("Job operation failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Job Title
        </label>
        <Input
          placeholder="Enter job title"
          {...register("title", { required: "Job title is required" })}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Description
        </label>
        <textarea
          className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Enter job description"
          rows={4}
          {...register("description", { required: "Job description is required" })}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Skills (comma separated)
        </label>
        <Input 
          placeholder="e.g., React, TypeScript, Node.js"
          {...register("skills")}
        />
      </div>
      
      <Button type="submit" className="w-full py-3 text-lg font-semibold">
        {job ? "Update Job" : "Create Job"}
      </Button>
    </form>
  );
}
