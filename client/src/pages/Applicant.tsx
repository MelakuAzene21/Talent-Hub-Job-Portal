import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ApplicationForm from "../components/Forms/ApplicationForm";
import JobList from "../components/Job/JobList";
import { useAppSelector } from "../utils/helpers";
import { useMyApplicationsQuery } from "../features/applications/applicationsApi";
import { useGetJobsQuery } from "../features/jobs/jobsApi";

import Button from "../components/ui/Button";

export default function Applicant() {
  const { user } = useSelector((state: any) => state.auth);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  
  const { data: applications } = useMyApplicationsQuery(user?.id || "");
  const { data: allJobs } = useGetJobsQuery();

  if (!user || user.role !== 'applicant') {
    return <Navigate to="/" replace />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'shortlisted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'shortlisted':
        return '✅';
      case 'rejected':
        return '❌';
      default:
        return '⏳';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-100 dark:from-zinc-900 dark:to-zinc-800 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Track your applications and discover new opportunities
            </p>
          </div>
          <Button
            onClick={() => setShowApplicationForm(true)}
            className="bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Browse Jobs
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">Total Applications</p>
              <p className="text-3xl font-bold text-zinc-900 dark:text-white">
                {applications?.length || 0}
              </p>
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
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">Shortlisted</p>
              <p className="text-3xl font-bold text-zinc-900 dark:text-white">
                {applications?.filter(app => app.status === 'shortlisted').length || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">Available Jobs</p>
              <p className="text-3xl font-bold text-zinc-900 dark:text-white">
                {allJobs?.length || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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
              onClick={() => setActiveTab("dashboard")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "dashboard"
                  ? "border-primary text-primary"
                  : "border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300"
              }`}
            >
              My Dashboard
            </button>
            <button
              onClick={() => setActiveTab("applications")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "applications"
                  ? "border-primary text-primary"
                  : "border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300"
              }`}
            >
              My Applications
            </button>
            <button
              onClick={() => setActiveTab("jobs")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "jobs"
                  ? "border-primary text-primary"
                  : "border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300"
              }`}
            >
              Browse Jobs
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Application Overview</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recent Applications */}
                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
                  <h4 className="font-medium text-zinc-900 dark:text-white mb-3">Recent Applications</h4>
                  <div className="space-y-3">
                    {applications?.slice(0, 5).map((app) => (
                      <div key={app._id} className="flex items-center justify-between p-3 bg-white dark:bg-zinc-700 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-zinc-900 dark:text-white text-sm">
                            {app.jobId?.title || 'Unknown Job'}
                          </p>
                          <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                            Applied: {new Date(app.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                          {getStatusIcon(app.status)} {app.status}
                        </span>
                      </div>
                    ))}
                    {(!applications || applications.length === 0) && (
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm text-center py-4">
                        No applications yet. Start browsing jobs!
                      </p>
                    )}
                  </div>
                </div>

                {/* Application Status Breakdown */}
                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
                  <h4 className="font-medium text-zinc-900 dark:text-white mb-3">Application Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400 text-sm">Applied</span>
                      <span className="font-medium text-zinc-900 dark:text-white">
                        {applications?.filter(app => app.status === 'applied').length || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400 text-sm">Shortlisted</span>
                      <span className="font-medium text-zinc-900 dark:text-white">
                        {applications?.filter(app => app.status === 'shortlisted').length || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400 text-sm">Rejected</span>
                      <span className="font-medium text-zinc-900 dark:text-white">
                        {applications?.filter(app => app.status === 'rejected').length || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Applications Tab */}
          {activeTab === "applications" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">My Applications</h3>
              
              <div className="space-y-4">
                {applications && applications.length > 0 ? (
                  applications.map((app) => (
                    <div key={app._id} className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-6">
                      <div className="flex flex-col lg:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="text-lg font-semibold text-zinc-900 dark:text-white">
                              {app.jobId?.title || 'Unknown Job'}
                            </h4>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                              {getStatusIcon(app.status)} {app.status}
                            </span>
                          </div>
                          
                          <p className="text-zinc-600 dark:text-zinc-400 mb-3">
                            {app.jobId?.description || 'No description available'}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {app.jobId?.skills?.map((skill: string, index: number) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-full text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-500">
                            <span>Company: {app.jobId?.createdBy?.name || 'Unknown'}</span>
                            <span>•</span>
                            <span>Applied: {new Date(app.createdAt).toLocaleDateString()}</span>
                            {app.resumeUrl && (
                              <>
                                <span>•</span>
                                <span className="text-primary">Resume uploaded</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">No applications yet</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-4">Start applying to jobs to see your applications here</p>
                    <Button onClick={() => setActiveTab("jobs")} className="bg-primary hover:bg-blue-700 text-white">
                      Browse Jobs
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Jobs Tab */}
          {activeTab === "jobs" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Available Jobs</h3>
              <JobList />
            </div>
          )}
        </div>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Apply to Jobs</h3>
              <button
                onClick={() => setShowApplicationForm(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Click on any job card to apply. You can upload your resume and submit your application.
            </p>
            <Button
              onClick={() => setShowApplicationForm(false)}
              className="w-full bg-primary hover:bg-blue-700 text-white"
            >
              Got it!
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}