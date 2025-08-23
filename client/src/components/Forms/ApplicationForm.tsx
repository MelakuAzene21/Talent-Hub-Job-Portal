import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateApplicationMutation } from "../../features/applications/applicationsApi";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../ui/Button";
import { toast } from "react-hot-toast";


export default function ApplicationForm() {
  const { jobId } = useParams();
  const { user } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const [createApplication, { isLoading }] = useCreateApplicationMutation();
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const coverLetter = watch("coverLetter");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload a PDF, DOC, or DOCX file');
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      
      setResumeFile(file);
    }
  };

  const uploadResume = async (file: File): Promise<string> => {
    // For now, we'll simulate file upload
    // In production, you'd upload to Cloudinary or similar service
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`https://example.com/resumes/${file.name}`);
      }, 1000);
    });
  };

  const onSubmit = async (data: any) => {
    if (!resumeFile) {
      alert('Please upload your resume');
      return;
    }

    if (!user) {
      navigate('/auth');
      return;
    }

    try {
      setIsUploading(true);
      
      // Upload resume
      const resumeUrl = await uploadResume(resumeFile);
      
      // Create application
      const applicationData = {
        jobId,
        applicantId: user.id,
        coverLetter: data.coverLetter,
        resumeUrl,
      };

      await createApplication(applicationData).unwrap();
      
      toast.success('Application submitted successfully!');
      
      // Redirect to success page or dashboard
      navigate('/applicant?tab=applications');
    } catch (error) {
      console.error('Application submission failed:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">Please sign in to apply</h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">You need to be logged in to submit an application</p>
        <Button onClick={() => navigate('/auth')} className="bg-primary hover:bg-blue-700 text-white">
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
            Submit Your Application
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Complete the form below to apply for this position
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Cover Letter *
            </label>
            <textarea
              {...register("coverLetter", { 
                required: "Cover letter is required",
                minLength: { value: 100, message: "Cover letter must be at least 100 characters" }
              })}
              rows={8}
              className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-zinc-800 dark:text-white resize-none"
              placeholder="Introduce yourself and explain why you're interested in this position. Highlight your relevant experience and skills..."
            />
                         {errors.coverLetter && (
               <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                 {errors.coverLetter.message?.toString()}
               </p>
             )}
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Minimum 100 characters
              </span>
              <span className={`text-xs ${coverLetter?.length >= 100 ? 'text-green-600' : 'text-zinc-500 dark:text-zinc-400'}`}>
                {coverLetter?.length || 0} characters
              </span>
            </div>
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Resume/CV *
            </label>
            <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-lg p-6 text-center hover:border-primary dark:hover:border-primary transition-colors">
              <input
          type="file"
          accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                {resumeFile ? (
                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">
                      {resumeFile.name}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
          <button
            type="button"
                      onClick={() => setResumeFile(null)}
                      className="text-red-600 dark:text-red-400 text-sm hover:text-red-700 dark:hover:text-red-300"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-6 h-6 text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">
                      Click to upload resume
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      PDF, DOC, or DOCX (max 5MB)
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Application Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              💡 Application Tips
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Customize your cover letter for this specific position</li>
              <li>• Highlight relevant experience and skills</li>
              <li>• Keep your resume updated and professional</li>
              <li>• Proofread before submitting</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isLoading || isUploading || !resumeFile}
              className="flex-1 bg-primary hover:bg-blue-700 text-white py-3"
            >
              {isLoading || isUploading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {isUploading ? 'Uploading...' : 'Submitting...'}
                </div>
              ) : (
                'Submit Application'
              )}
            </Button>
            <Button
              type="button"
              onClick={() => navigate(-1)}
              variant="outline"
              className="flex-1 border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 py-3"
          >
            Cancel
            </Button>
        </div>
      </form>
      </div>
    </div>
  );
}
