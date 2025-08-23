import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-zinc-900 dark:to-zinc-800 px-4">
      <div className="text-center max-w-md mx-auto">
        {/* 404 Icon */}
        <div className="w-32 h-32 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
          <div className="text-6xl font-bold text-primary">404</div>
        </div>
        
        {/* Error Message */}
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
          Page Not Found
        </h1>
        
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="px-6 py-3"
          >
            Go Back
          </Button>
          
          <Button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-primary hover:bg-blue-700 text-white"
          >
            Go Home
          </Button>
        </div>
        
        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-700">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
            You might be looking for:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/jobs')}
              className="text-primary hover:text-blue-700 text-sm font-medium hover:underline"
            >
              Browse Jobs
            </button>
            <button
              onClick={() => navigate('/about')}
              className="text-primary hover:text-blue-700 text-sm font-medium hover:underline"
            >
              About Us
            </button>
            <button
              onClick={() => navigate('/auth')}
              className="text-primary hover:text-blue-700 text-sm font-medium hover:underline"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
