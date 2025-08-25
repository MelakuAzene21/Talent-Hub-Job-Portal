import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import JobForm from "../components/Forms/JobForm";
import { useGetJobsQuery, useDeleteJobMutation } from "../features/jobs/jobsApi";
import { useGetEmployerJobsWithApplicantsQuery } from "../features/applications/applicationsApi";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function Employer() {
  const { user } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  
  const { data: allJobs, refetch } = useGetJobsQuery();
  const [deleteJob] = useDeleteJobMutation();
  
  // Get employer jobs with applicant counts
  const { data: employerJobsData, refetch: refetchEmployerJobs } = useGetEmployerJobsWithApplicantsQuery(undefined, {
    skip: !user?.id
  });
  
  // Filter jobs created by this employer
  const myJobs = allJobs?.filter(job => job.createdBy?._id === user?.id) || [];

  const filteredJobs = myJobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteJob = async (jobId: string) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      await deleteJob(jobId);
      refetch();
      refetchEmployerJobs();
    }
  };

  const handleEditJob = (job: any) => {
    setEditingJob(job);
    setShowJobForm(true);
  };

  const handleCloseForm = () => {
    setShowJobForm(false);
    setEditingJob(null);
  };

  const getApplicantCount = (jobId: string) => {
    if (!employerJobsData) return 0;
    const jobData = employerJobsData.find(job => job._id === jobId);
    return jobData?.applicantCount || 0;
  };

  if (!user || (user.role !== 'employer' && user.role !== 'admin')) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-zinc-900 dark:to-zinc-800 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Manage your job postings and track applications
            </p>
          </div>
          <Button
            onClick={() => setShowJobForm(true)}
            className="bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            + Post New Job
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <div className="flex border-b border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === "dashboard"
                ? "text-primary border-b-2 border-primary"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("jobs")}
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === "jobs"
                ? "text-primary border-b-2 border-primary"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            Job Management
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="p-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">Total Jobs Posted</p>
                    <p className="text-3xl font-bold text-zinc-900 dark:text-white">{myJobs.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">Total Applications</p>
                    <p className="text-3xl font-bold text-zinc-900 dark:text-white">
                      {employerJobsData?.reduce((total, job) => total + (job.applicantCount || 0), 0) || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">Active Jobs</p>
                    <p className="text-3xl font-bold text-zinc-900 dark:text-white">
                      {myJobs.filter(job => job.isActive !== false).length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Jobs */}
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Recent Job Postings</h3>
              <div className="space-y-4">
                {myJobs.slice(0, 3).map((job) => (
                  <div key={job._id} className="flex items-center justify-between p-4 bg-white dark:bg-zinc-700 rounded-lg border border-zinc-200 dark:border-zinc-600">
                    <div>
                      <h4 className="font-medium text-zinc-900 dark:text-white">{job.title}</h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{job.company}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {getApplicantCount(job._id)} applicants
                      </span>
                      <Button
                        onClick={() => navigate(`/employer/applicants/${job._id}`)}
                        className="bg-primary hover:bg-blue-700 text-white text-sm px-3 py-1"
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
                {myJobs.length === 0 && (
                  <p className="text-center text-zinc-600 dark:text-zinc-400 py-8">
                    No jobs posted yet
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === "jobs" && (
          <div className="p-6">
            {/* Search and Filter */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">My Job Postings</h2>
                <div className="flex gap-4">
                  <Input
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                  <Button
                    onClick={() => {
                      refetch();
                      refetchEmployerJobs();
                    }}
                    className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  >
                    Refresh
                  </Button>
                </div>
              </div>
            </div>

            {/* Job Listings */}
            <div className="space-y-4">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">No jobs posted yet</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">Start by posting your first job to attract talented candidates</p>
                  <Button onClick={() => setShowJobForm(true)} className="bg-primary hover:bg-blue-700 text-white">
                    Post Your First Job
                  </Button>
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <div key={job._id} className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                              {job.title}
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400 mb-3 line-clamp-2">
                              {job.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {job.skills?.map((skill: string, index: number) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-full text-sm"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                              <span>Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
                              <span>•</span>
                              <span className="text-primary font-medium">
                                {getApplicantCount(job._id)} applicants
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 min-w-fit">
                        <Button
                          onClick={() => handleEditJob(job)}
                          className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                        >
                          Edit Job
                        </Button>
                        <Button
                          onClick={() => navigate(`/employer/applicants/${job._id}`)}
                          className="bg-primary hover:bg-blue-700 text-white"
                        >
                          View Applicants ({getApplicantCount(job._id)})
                        </Button>
                        <Button
                          onClick={() => handleDeleteJob(job._id)}
                          className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800"
                        >
                          Delete Job
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Job Form Modal */}
      {showJobForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                {editingJob ? "Edit Job" : "Post New Job"}
              </h2>
              <button
                onClick={handleCloseForm}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <JobForm 
              job={editingJob} 
              onSuccess={() => {
                handleCloseForm();
                refetch();
                refetchEmployerJobs();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
