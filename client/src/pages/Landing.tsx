import JobList from "../components/Job/JobList";
export default function Landing() {
  return (
    <section className="grid gap-6">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold">
          Find your next role on <span className="text-primary">TalentHub</span>
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Browse jobs, apply with your resume, and track applications.
        </p>
      </div>
      <JobList />
    </section>
  );
}
