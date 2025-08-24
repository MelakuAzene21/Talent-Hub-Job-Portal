import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetApplicantsForJobQuery, useUpdateStatusMutation, useDeleteApplicationMutation } from "../../features/applications/applicationsApi";
import { useSelector } from "react-redux";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { toast } from "react-hot-toast";

export default function JobApplicants() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  
  const { data: applicants, isLoading, error } = useGetApplicantsForJobQuery(jobId!);
  const [updateStatus] = useUpdateStatusMutation();
  const [deleteApplication] = useDeleteApplicationMutation();

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

  const handleStatusUpdate = async (applicationId: string, status: string) => {
    try {
      await updateStatus({ id: applicationId, status }).unwrap();
      toast.success(`Application ${status} successfully`);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update status');
    }
  };

  const handleDeleteApplication = async (applicationId: string) => {
    try {
      await deleteApplication(applicationId).unwrap();
      toast.success('Application deleted successfully');
      setShowDeleteConfirm(null);
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to delete application');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'shortlisted': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'hired': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300';
    }
  };

  const getStatusBadge = (status: string) => {
    const statusText = status.charAt(0).toUpperCase() + status.slice(1);
    return <Badge className={getStatusColor(status)}>{statusText}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">Loading applicants...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">
          Error Loading Applicants
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400">
          Failed to load applicants. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
              Job Applicants
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Review and manage applications for this position
            </p>
          </div>
          <Button
            onClick={() => navigate('/employer')}
            variant="outline"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>

      {applicants && applicants.length > 0 ? (
        <div className="space-y-6">
          {applicants.map((application) => (
            <div
              key={application._id}
              className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                      {application.applicantId.name}
                    </h3>
                    {getStatusBadge(application.status)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                    <span>{application.applicantId.email}</span>
                    {application.applicantId.phone && (
                      <>
                        <span>•</span>
                        <span>{application.applicantId.phone}</span>
                      </>
                    )}
                    {application.applicantId.location && (
                      <>
                        <span>•</span>
                        <span>{application.applicantId.location}</span>
                      </>
                    )}
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Applied on {new Date(application.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Cover Letter Preview */}
              <div className="mb-4">
                <h4 className="font-medium text-zinc-900 dark:text-white mb-2">
                  Cover Letter
                </h4>
                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
                  <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
                    {application.coverLetter.length > 200
                      ? `${application.coverLetter.substring(0, 200)}...`
                      : application.coverLetter}
                  </p>
                  {application.coverLetter.length > 200 && (
                    <Button
                      onClick={() => setSelectedApplication(selectedApplication === application._id ? null : application._id)}
                      variant="link"
                      className="text-primary hover:text-blue-700 p-0 h-auto mt-2"
                    >
                      {selectedApplication === application._id ? 'Show less' : 'Read more'}
                    </Button>
                  )}
                </div>
                {selectedApplication === application._id && (
                  <div className="mt-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
                    <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
                      {application.coverLetter}
                    </p>
                  </div>
                )}
              </div>

              {/* Resume */}
              <div className="mb-4">
                <h4 className="font-medium text-zinc-900 dark:text-white mb-2">
                  Resume
                </h4>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-blue-600 dark:text-blue-400">Resume uploaded</span>
                  </div>
                  <Button
                    onClick={() => window.open(application.resumeUrl, '_blank')}
                    variant="outline"
                    size="sm"
                  >
                    View Resume
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {application.status === 'applied' && (
                  <>
                    <Button
                      onClick={() => handleStatusUpdate(application._id, 'shortlisted')}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white"
                    >
                      Shortlist
                    </Button>
                    <Button
                      onClick={() => handleStatusUpdate(application._id, 'rejected')}
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      Reject
                    </Button>
                  </>
                )}
                {application.status === 'shortlisted' && (
                  <>
                    <Button
                      onClick={() => handleStatusUpdate(application._id, 'hired')}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Hire
                    </Button>
                    <Button
                      onClick={() => handleStatusUpdate(application._id, 'rejected')}
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      Reject
                    </Button>
                  </>
                )}
                {application.status === 'rejected' && (
                  <Button
                    onClick={() => handleStatusUpdate(application._id, 'applied')}
                    variant="outline"
                  >
                    Reconsider
                  </Button>
                )}
                <Button
                  onClick={() => setShowDeleteConfirm(application._id)}
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 ml-auto"
                >
                  Delete
                </Button>
              </div>

              {/* Delete Confirmation */}
              {showDeleteConfirm === application._id && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-800 dark:text-red-200 text-sm mb-3">
                    Are you sure you want to delete this application? This action cannot be undone.
                  </p>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleDeleteApplication(application._id)}
                      className="bg-red-600 hover:bg-red-700 text-white"
                      size="sm"
                    >
                      Delete Application
                    </Button>
                    <Button
                      onClick={() => setShowDeleteConfirm(null)}
                      variant="outline"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
            No Applications Yet
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            This job hasn't received any applications yet. Check back later!
          </p>
        </div>
      )}
    </div>
  );
}
