import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useSaveJobMutation, useUnsaveJobMutation, useGetSavedJobsQuery, useCheckIfAppliedQuery } from "../../features/applications/applicationsApi";
import { toast } from "react-hot-toast";

interface JobCardProps {
  job: any;
  showActions?: boolean;
}

export default function JobCard({ job, showActions = true }: JobCardProps) {
  const { user } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const [saveJob] = useSaveJobMutation();
  const [unsaveJob] = useUnsaveJobMutation();
    const { data: savedJobs } = useGetSavedJobsQuery(user?.id || "", {
    skip: !user?.id
  });
  
  // Check if user has already applied to this job
  const { data: hasApplied } = useCheckIfAppliedQuery(
    { jobId: job._id, applicantId: user?.id || "" },
    { skip: !user?.id }
  );
  
  const isSaved = savedJobs?.some((saved: any) => saved.jobId === job._id);
  const isEmployer = user?.role === 'employer';
  const isApplicant = user?.role === 'applicant';

  const handleSaveJob = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    try {
      if (isSaved) {
        await unsaveJob({ jobId: job._id, applicantId: user.id }).unwrap();
        toast.success('Job removed from saved jobs');
      } else {
        await saveJob({ jobId: job._id, applicantId: user.id }).unwrap();
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
    
    if (isApplicant) {
      navigate(`/jobs/${job._id}/apply`);
    }
  };

  const handleViewDetails = () => {
    navigate(`/jobs/${job._id}`);
  };

  const formatSalary = (min: number, max: number) => {
    if (min === max) return `$${min.toLocaleString()}`;
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'part-time': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'contract': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'internship': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300';
    }
  };

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const posted = new Date(date);
    const diffTime = Math.abs(now.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 cursor-pointer hover:text-primary transition-colors" onClick={handleViewDetails}>
            {job.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400 mb-3">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
              <span>{job.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{job.location}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getJobTypeColor(job.jobType)}`}>
            {job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)}
          </span>
        </div>
      </div>

      {/* Salary and Posted Time */}
      <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400 mb-4">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.196v2.034a.75.75 0 01-1.5 0V7.418zM11 12a1 1 0 11-2 0 1 1 0 012 0z" />
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.002 4.002 0 00-3.9 3.8A1.1 1.1 0 006 10.5a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1v-1a1 1 0 00.1-.2A2.002 2.002 0 0110 9.092V5z" clipRule="evenodd" />
          </svg>
          <span>{formatSalary(job.minSalary, job.maxSalary)}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span>{getTimeAgo(job.createdAt)}</span>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
          {isExpanded ? job.description : `${job.description.substring(0, 150)}...`}
        </p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary hover:text-blue-700 text-sm font-medium mt-2"
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </button>
      </div>

      {/* Skills */}
      {job.skills && job.skills.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {job.skills.slice(0, 4).map((skill: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full text-xs"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 4 && (
              <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full text-xs">
                +{job.skills.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {showActions && (
        <div className="flex gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-700">
          {isApplicant && (
            <>
              {hasApplied ? (
                <div className="flex-1">
                  <Button
                    className="w-full bg-green-600 text-white font-medium cursor-not-allowed"
                    disabled
                  >
                    ✓ Applied
                  </Button>
                  <p className="text-xs text-green-600 dark:text-green-400 text-center mt-1">
                    Application submitted
                  </p>
                </div>
              ) : (
                <Button
                  onClick={handleApply}
                  className="flex-1 bg-primary hover:bg-blue-700 text-white font-medium"
                >
                  Apply Now
                </Button>
              )}
              <Button
                onClick={handleSaveJob}
                variant={isSaved ? "outline" : "secondary"}
                className={`flex-1 ${isSaved ? 'border-primary text-primary hover:bg-primary hover:text-white' : ''}`}
              >
                {isSaved ? 'Saved' : 'Save'}
              </Button>
            </>
          )}
          {!isEmployer && !isApplicant && (
            <Button
              onClick={() => navigate('/auth')}
              className="flex-1 bg-primary hover:bg-blue-700 text-white font-medium"
            >
              Sign in to Apply
            </Button>
          )}
          <Button
            onClick={handleViewDetails}
            variant="outline"
            className="flex-1 border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            View Details
          </Button>
        </div>
      )}
      </div>
  );
}
