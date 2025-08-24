import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetJobsQuery } from "../features/jobs/jobsApi";
import { useSaveJobMutation, useUnsaveJobMutation, useGetSavedJobsQuery } from "../features/applications/applicationsApi";
import Button from "../components/ui/Button";
import { toast } from "react-hot-toast";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: jobs, isLoading, error } = useGetJobsQuery();
  const job = jobs?.find((j: any) => j._id === id);

  const [saveJob] = useSaveJobMutation();
  const [unsaveJob] = useUnsaveJobMutation();
  const { data: savedJobs } = useGetSavedJobsQuery(user?.id || "", {
    skip: !user?.id
  });

  const isSaved = savedJobs?.some((saved: any) => saved.jobId === id);
  const isEmployer = user?.role === 'employer';
  const isApplicant = user?.role === 'applicant';

  const handleSaveJob = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    try {
      if (isSaved) {
        await unsaveJob({ jobId: id!, applicantId: user.id }).unwrap();
        toast.success('Job removed from saved jobs');
      } else {
        await saveJob({ jobId: id!, applicantId: user.id }).unwrap();
        toast.success('Job saved successfully!');
      }
    } catch (error) {
      console.error('Failed to save/unsave job:', error);
      toast.error('Failed to save/unsave job. Please try again.');
    }
  };

  const handleApply = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate(`/jobs/${id}/apply`);
  };

  const formatSalary = (min: number, max: number) => {
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  };

  const getJobTypeColor = (type: string) => {
    const colors = {
      'full-time': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'part-time': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'contract': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'internship': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    };
    return colors[type as keyof typeof colors] || 'bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200';
  };

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const jobDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - jobDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">Job not found</h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">The job you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/jobs')} className="bg-primary hover:bg-blue-700 text-white">
          Back to Jobs
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.jobType)}`}>
                {job.jobType}
              </span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                Posted {getTimeAgo(job.createdAt)}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
              {job.title}
            </h1>
            
            <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400 mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{job.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092c.938-.177 1.791-.604 2.353-1.253a1 1 0 10-1.51-1.31c.163.187.452.377.843.504v-1.941c-.622-.117-1.196-.342-1.676-.662C8.602 9.235 8 8.46 8 8c0-.99.602-1.765 1.324-2.246.48-.32 1.054-.545 1.676-.662V5z" clipRule="evenodd" />
                </svg>
                <span>{formatSalary(job.minSalary, job.maxSalary)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            {isApplicant && (
              <>
                <Button
                  onClick={handleApply}
                  className="bg-primary hover:bg-blue-700 text-white px-6 py-3"
                >
                  Apply Now
                </Button>
                <Button
                  onClick={handleSaveJob}
                  variant={isSaved ? "secondary" : "outline"}
                  className="px-6 py-3"
                >
                  {isSaved ? 'Saved' : 'Save Job'}
                </Button>
              </>
            )}
            {isEmployer && job.createdBy === user?.id && (
              <Button
                onClick={() => navigate(`/employer`)}
                variant="outline"
                className="px-6 py-3"
              >
                View Applications
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-8">
        <div className="space-y-8">
          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Job Description</h2>
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {isExpanded ? job.description : `${job.description.substring(0, 300)}...`}
              </p>
              {job.description.length > 300 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-primary hover:text-blue-700 font-medium mt-2"
                >
                  {isExpanded ? 'Show less' : 'Read more'}
                </button>
              )}
            </div>
          </div>

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Requirements</h2>
              <ul className="space-y-2">
                {job.requirements.map((req: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-zinc-700 dark:text-zinc-300">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills */}
          {job.skills && job.skills.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
