import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
              </div>
              <span className="text-2xl font-bold">TalentHub</span>
            </div>
            <div className="space-y-2 text-zinc-300">
              <p>Connecting talented developers with innovative companies.</p>
              <p>Find your dream job or discover top talent with TalentHub.</p>
            </div>
          </div>

          {/* For Job Seekers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Job Seekers</h3>
            <ul className="space-y-2 text-zinc-300">
              <li>
                <Link to="/jobs" className="hover:text-white transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/career-advice" className="hover:text-white transition-colors">
                  Career Advice
                </Link>
              </li>
              <li>
                <Link to="/resume-builder" className="hover:text-white transition-colors">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link to="/salary-guide" className="hover:text-white transition-colors">
                  Salary Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Employers</h3>
            <ul className="space-y-2 text-zinc-300">
              <li>
                <Link to="/employer" className="hover:text-white transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/find-talent" className="hover:text-white transition-colors">
                  Find Talent
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-white transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-zinc-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-zinc-400 text-sm">
              © 2024 TalentHub. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-zinc-400">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
