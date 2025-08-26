import { Link } from "react-router-dom";

export default function CareerAdvice() {
  const articles = [
    {
      id: 1,
      title: "How to Write a Standout Resume",
      excerpt: "Learn the essential tips and tricks to create a resume that gets you noticed by top employers.",
      category: "Resume Tips",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Acing Your Technical Interview",
      excerpt: "Master the art of technical interviews with our comprehensive guide and practice resources.",
      category: "Interview Prep",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "Building Your Professional Network",
      excerpt: "Discover effective strategies to grow your professional network and advance your career.",
      category: "Networking",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Negotiating Your Salary Like a Pro",
      excerpt: "Get the compensation you deserve with proven negotiation techniques and strategies.",
      category: "Salary",
      readTime: "7 min read"
    },
    {
      id: 5,
      title: "Switching Careers in Tech",
      excerpt: "Navigate the transition to a tech career with confidence and strategic planning.",
      category: "Career Change",
      readTime: "10 min read"
    },
    {
      id: 6,
      title: "Remote Work Best Practices",
      excerpt: "Thrive in remote work environments with productivity tips and work-life balance strategies.",
      category: "Remote Work",
      readTime: "6 min read"
    }
  ];

  const categories = ["All", "Resume Tips", "Interview Prep", "Networking", "Salary", "Career Change", "Remote Work"];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Career Advice & Resources
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Expert insights, tips, and strategies to help you advance your career and land your dream job in tech.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-300 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <div className="h-64 md:h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="md:w-2/3 p-8">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded-full">
                    Featured
                  </span>
                  <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">10 min read</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  The Complete Guide to Landing Your First Tech Job
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  From building your portfolio to acing interviews, this comprehensive guide covers everything you need to know to break into the tech industry and start your dream career.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Sarah Johnson</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Career Coach</p>
                    </div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{article.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {article.excerpt}
                </p>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">
                  Read Article →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Take Your Career to the Next Level?</h2>
            <p className="text-xl mb-8 opacity-90">
              Start applying to top tech jobs and connect with leading companies today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/jobs"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse Jobs
              </Link>
              <Link
                to="/resume-builder"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Build Resume
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
