import JobForm from "../components/Forms/JobForm";
export default function Employer() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Add Job</h2>
        <JobForm />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Your Jobs</h2>
        {/* For brevity, reuse JobList (would normally filter by createdBy) */}
      </div>
    </div>
  );
}
