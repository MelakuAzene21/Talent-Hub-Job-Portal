export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
          About TalentHub
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          Connecting talented professionals with amazing opportunities
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 mb-8">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">Our Mission</h2>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
          TalentHub is dedicated to bridging the gap between exceptional talent and innovative companies. 
          We believe that every individual deserves the opportunity to find meaningful work that aligns with 
          their skills, passions, and career goals.
        </p>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          Our platform simplifies the job search and recruitment process, making it easier for job seekers 
          to discover opportunities and for employers to find the perfect candidates for their teams.
        </p>
      </div>

      {/* What We Offer Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* For Job Seekers */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">For Job Seekers</h3>
          <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>• Browse thousands of job opportunities</li>
            <li>• Advanced search and filtering options</li>
            <li>• Save interesting jobs for later</li>
            <li>• Easy application process with cover letters</li>
            <li>• Track your application status</li>
            <li>• Professional profile management</li>
          </ul>
        </div>

        {/* For Employers */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">For Employers</h3>
          <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>• Post detailed job listings</li>
            <li>• Reach qualified candidates</li>
            <li>• Manage applications efficiently</li>
            <li>• Track applicant statistics</li>
            <li>• Streamlined hiring process</li>
            <li>• Professional company branding</li>
          </ul>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-8 mb-8">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-6">Platform Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Smart Search</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Advanced filtering by job type, location, salary, and skills
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Easy Applications</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Simple application process with cover letters and resume uploads
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Job Management</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Comprehensive tools for posting and managing job listings
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-8">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">Get in Touch</h2>
        <p className="text-zinc-700 dark:text-zinc-300 mb-6">
          Have questions or need support? We're here to help you succeed in your career journey.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Support</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Email: support@talenthub.com<br />
              Response time: Within 24 hours
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Partnership</h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Email: partnerships@talenthub.com<br />
              For business inquiries and collaborations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
