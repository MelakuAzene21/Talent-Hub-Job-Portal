 
import { useGetEmployerJobsWithApplicantsQuery } from "../../features/applications/applicationsApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
 

export default function EmployerDashboard() {
  const { user } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
 
  
  const { data: jobs, isLoading, error } = useGetEmployerJobsWithApplicantsQuery();

  if (!user || user.role !== 'employer') {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
          Access Denied
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400">
          This page is only accessible to employers.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">Loading your jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">
          Error Loading Jobs
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400">
          Failed to load your jobs. Please try again.
        </p>
      </div>
    );
  }

  

  const getStatusCount = (job: any, status: string) => {
    return job.statusCounts?.[status] || 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          Employer Dashboard
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Manage your job postings and review applications
        </p>
      </div>

      {jobs && jobs.length > 0 ? (
        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                    <span className="font-medium">{job.company}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                    <span>•</span>
                    <Badge variant="outline">{job.jobType}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {job.applicantCount}
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    {job.applicantCount === 1 ? 'Applicant' : 'Applicants'}
                  </div>
                </div>
              </div>

              {/* Status Breakdown */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    {getStatusCount(job, 'applied')}
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">Applied</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">
                    {getStatusCount(job, 'shortlisted')}
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">Shortlisted</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-red-600 dark:text-red-400">
                    {getStatusCount(job, 'rejected')}
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">Rejected</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                    {getStatusCount(job, 'hired')}
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">Hired</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={() => navigate(`/employer/applicants/${job._id}`)}
                  className="flex-1 bg-primary hover:bg-blue-700 text-white"
                >
                  View Applicants ({job.applicantCount})
                </Button>
                <Button
                  onClick={() => navigate(`/jobs/${job._id}`)}
                  variant="outline"
                  className="px-6"
                >
                  View Job
                </Button>
                <Button
                  onClick={() => navigate(`/employer/jobs/${job._id}/edit`)}
                  variant="outline"
                  className="px-6"
                >
                  Edit Job
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
            No Jobs Posted Yet
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Start posting jobs to see applications from candidates.
          </p>
          <Button
            onClick={() => navigate('/employer/jobs/new')}
            className="bg-primary hover:bg-blue-700 text-white"
          >
            Post Your First Job
          </Button>
        </div>
      )}
    </div>
  );
}
