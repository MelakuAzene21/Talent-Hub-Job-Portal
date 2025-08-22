import { useForm } from "react-hook-form";
import { useCreateJobMutation, useUpdateJobMutation } from "../../features/jobs/jobsApi";
import Input from "../ui/Input";
import Button from "../ui/Button"; 
import Select from "../ui/Select";
import { useEffect } from "react";

interface JobFormProps {
  job?: any;
  onSuccess?: () => void;
}

export default function JobForm({ job, onSuccess }: JobFormProps) {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [createJob, { isLoading: isCreating }] = useCreateJobMutation();
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();



  useEffect(() => {
    if (job) {
      setValue("title", job.title);
      setValue("company", job.company);
      setValue("location", job.location);
      setValue("jobType", job.jobType);
      setValue("minSalary", job.minSalary);
      setValue("maxSalary", job.maxSalary);
      setValue("description", job.description);
      setValue("requirements", job.requirements?.join("\n"));
      setValue("skills", job.skills?.join(", "));
    }
  }, [job, setValue]);

  const onSubmit = async (data: any) => {
    try {
      const jobData = {
        ...data,
        requirements: data.requirements.split("\n").filter((req: string) => req.trim()),
        skills: data.skills.split(",").map((skill: string) => skill.trim()).filter(Boolean),
        minSalary: parseInt(data.minSalary),
        maxSalary: parseInt(data.maxSalary),
      };

      if (job) {
        await updateJob({ id: job._id, ...jobData }).unwrap();
      } else {
        await createJob(jobData).unwrap();
      }
      reset();
      onSuccess?.();
    } catch (error) {
      console.error("Job submission failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Job Title *
          </label>
          <Input
            {...register("title", { required: "Job title is required" })}
            placeholder="e.g., Senior React Developer"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Company *
          </label>
          <Input
            {...register("company", { required: "Company name is required" })}
            placeholder="e.g., TechCorp Inc."
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Location *
          </label>
          <Input
            {...register("location", { required: "Location is required" })}
            placeholder="e.g., San Francisco, CA or Remote"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Job Type *
          </label>
          <Select
            {...register("jobType", { required: "Job type is required" })}
            className="w-full"
          >
            <option value="">Select job type</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Minimum Salary *
          </label>
          <Input
            {...register("minSalary", { 
              required: "Minimum salary is required",
              min: { value: 0, message: "Salary must be positive" }
            })}
            type="number"
            placeholder="e.g., 50000"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Maximum Salary *
          </label>
          <Input
            {...register("maxSalary", { 
              required: "Maximum salary is required",
              min: { value: 0, message: "Salary must be positive" }
            })}
            type="number"
            placeholder="e.g., 80000"
            className="w-full"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Job Description *
        </label>
        <textarea
          {...register("description", { required: "Job description is required" })}
          rows={4}
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-800 dark:text-white"
          placeholder="Provide a detailed description of the role, responsibilities, and what makes this position exciting..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Requirements * (one per line)
        </label>
        <textarea
          {...register("requirements", { required: "Requirements are required" })}
          rows={4}
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-800 dark:text-white"
          placeholder="• 3+ years of experience in React&#10;• Strong TypeScript skills&#10;• Experience with Node.js&#10;• Bachelor's degree in Computer Science"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Skills (comma-separated)
        </label>
        <Input
          {...register("skills")}
          placeholder="e.g., React, TypeScript, Node.js, MongoDB"
          className="w-full"
        />
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          disabled={isCreating || isUpdating}
          className="flex-1 bg-primary hover:bg-blue-700 text-white py-3"
        >
          {isCreating || isUpdating ? "Saving..." : (job ? "Update Job" : "Post Job")}
        </Button>
        <Button
          type="button"
          onClick={() => reset()}
          className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 py-3"
        >
          Reset
        </Button>
      </div>
    </form>
  );
}
