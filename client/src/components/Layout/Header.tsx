import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";

export default function Header() {
  const { user } = useSelector((state: any) => state.auth);
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-zinc-900 dark:text-white">TalentHub</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/jobs" 
              className="text-zinc-700 dark:text-zinc-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              Find Jobs
            </Link>
            {user?.role === 'employer' && (
              <Link 
                to="/employer" 
                className="text-zinc-700 dark:text-zinc-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                Employer Dashboard
              </Link>
            )}
            {user?.role === 'applicant' && (
              <Link 
                to="/applicant" 
                className="text-zinc-700 dark:text-zinc-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                My Dashboard
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link 
                to="/admin" 
                className="text-zinc-700 dark:text-zinc-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                Admin Dashboard
              </Link>
            )}
            <Link 
              to="/about" 
              className="text-zinc-700 dark:text-zinc-300 hover:text-primary dark:hover:text-primary transition-colors"
            >
              About
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              onClick={() => setDark((v) => !v)}
            >
              {dark ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  Welcome, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/auth"
                  className="text-zinc-700 dark:text-zinc-300 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
