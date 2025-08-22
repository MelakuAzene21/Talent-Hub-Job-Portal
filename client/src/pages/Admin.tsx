import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useGetJobsQuery } from "../features/jobs/jobsApi";
import { useAdminStatsQuery } from "../features/applications/applicationsApi";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function Admin() {
  const { user } = useSelector((state: any) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  
  const { data: jobs, refetch: refetchJobs } = useGetJobsQuery();
  const { data: stats, refetch: refetchStats } = useAdminStatsQuery();

  // Filter jobs based on search
  const filteredJobs = jobs?.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.createdBy?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-100 dark:from-zinc-900 dark:to-zinc-800 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
              Admin Dashboard 🚀
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Monitor and manage the entire TalentHub platform
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => refetchJobs()}
              className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            >
              Refresh Data
            </Button>
            <Button
              onClick={() => refetchStats()}
              className="bg-primary hover:bg-blue-700 text-white"
            >
              Update Stats
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">Total Jobs</p>
              <p className="text-3xl font-bold text-zinc-900 dark:text-white">{jobs?.length || 0}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">Total Applications</p>
              <p className="text-3xl font-bold text-zinc-900 dark:text-white">
                {stats?.totalApplications || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">Active Employers</p>
              <p className="text-3xl font-bold text-zinc-900 dark:text-white">
                {jobs?.filter(job => job.createdBy).reduce((acc, job) => {
                  if (!acc.includes(job.createdBy._id)) acc.push(job.createdBy._id);
                  return acc;
                }, [] as string[]).length || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">Platform Users</p>
              <p className="text-3xl font-bold text-zinc-900 dark:text-white">
                {stats?.totalUsers || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <div className="border-b border-zinc-200 dark:border-zinc-800">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "border-primary text-primary"
                  : "border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("jobs")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "jobs"
                  ? "border-primary text-primary"
                  : "border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300"
              }`}
            >
              All Jobs
            </button>
            <button
              onClick={() => setActiveTab("applications")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "applications"
                  ? "border-primary text-primary"
                  : "border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300"
              }`}
            >
              Applications
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Platform Overview</h3>
              
              {/* Recent Activity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
                  <h4 className="font-medium text-zinc-900 dark:text-white mb-3">Recent Job Postings</h4>
                  <div className="space-y-2">
                    {jobs?.slice(0, 5).map((job) => (
                      <div key={job._id} className="flex items-center justify-between text-sm">
                        <span className="text-zinc-600 dark:text-zinc-400 truncate">{job.title}</span>
                        <span className="text-zinc-500 dark:text-zinc-500">
                          {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
                  <h4 className="font-medium text-zinc-900 dark:text-white mb-3">Top Employers</h4>
                  <div className="space-y-2">
                    {jobs?.reduce((acc, job) => {
                      const employerId = job.createdBy?._id;
                      if (employerId) {
                        const existing = acc.find(item => item.id === employerId);
                        if (existing) {
                          existing.count++;
                        } else {
                          acc.push({ id: employerId, name: job.createdBy?.name, count: 1 });
                        }
                      }
                      return acc;
                    }, [] as Array<{id: string, name: string, count: number}>)
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 5)
                    .map((employer) => (
                      <div key={employer.id} className="flex items-center justify-between text-sm">
                        <span className="text-zinc-600 dark:text-zinc-400">{employer.name}</span>
                        <span className="text-zinc-500 dark:text-zinc-500">{employer.count} jobs</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Jobs Tab */}
          {activeTab === "jobs" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">All Job Postings</h3>
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>

              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div key={job._id} className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
                    <div className="flex flex-col lg:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">{job.title}</h4>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-3 line-clamp-2">
                          {job.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-500">
                          <span>Posted by: {job.createdBy?.name}</span>
                          <span>•</span>
                          <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{job.skills?.length || 0} skills</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Applications Tab */}
          {activeTab === "applications" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Application Statistics</h3>
              
              {stats?.byJob && (
                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
                  <h4 className="font-medium text-zinc-900 dark:text-white mb-3">Applications per Job</h4>
                  <div className="space-y-2">
                    {stats.byJob.map((item: any) => (
                      <div key={item._id} className="flex items-center justify-between text-sm">
                        <span className="text-zinc-600 dark:text-zinc-400">
                          {jobs?.find(j => j._id === item._id)?.title || 'Unknown Job'}
                        </span>
                        <span className="text-zinc-500 dark:text-zinc-500">{item.count} applications</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
