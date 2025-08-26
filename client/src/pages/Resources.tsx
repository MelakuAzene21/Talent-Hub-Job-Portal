import { Link } from "react-router-dom";

export default function Resources() {
  const resources = [
    {
      category: "For Employers",
      items: [
        {
          title: "Hiring Best Practices Guide",
          description: "Learn the latest strategies for attracting and retaining top tech talent",
          type: "Guide",
          readTime: "15 min read",
          icon: "📋"
        },
        {
          title: "Interview Questions Database",
          description: "Curated technical and behavioral interview questions for different roles",
          type: "Database",
          readTime: "Interactive",
          icon: "❓"
        },
        {
          title: "Employer Branding Toolkit",
          description: "Templates and resources to build a strong employer brand",
          type: "Toolkit",
          readTime: "Download",
          icon: "🎨"
        },
        {
          title: "Remote Hiring Guide",
          description: "Complete guide to hiring and managing remote teams effectively",
          type: "Guide",
          readTime: "20 min read",
          icon: "🏠"
        }
      ]
    },
    {
      category: "For Job Seekers",
      items: [
        {
          title: "Resume Writing Masterclass",
          description: "Step-by-step guide to creating a compelling tech resume",
          type: "Video",
          duration: "45 min",
          icon: "📹"
        },
        {
          title: "Technical Interview Prep",
          description: "Practice coding challenges and system design questions",
          type: "Interactive",
          readTime: "Practice",
          icon: "💻"
        },
        {
          title: "Salary Negotiation Guide",
          description: "Strategies and scripts for negotiating better compensation",
          type: "Guide",
          readTime: "12 min read",
          icon: "💰"
        },
        {
          title: "Career Development Roadmap",
          description: "Plan your tech career progression with our interactive roadmap",
          type: "Interactive",
          readTime: "Tool",
          icon: "🗺️"
        }
      ]
    },
    {
      category: "Industry Insights",
      items: [
        {
          title: "Tech Salary Report 2024",
          description: "Comprehensive salary data across different tech roles and locations",
          type: "Report",
          readTime: "30 min read",
          icon: "📊"
        },
        {
          title: "Emerging Tech Trends",
          description: "Analysis of the latest technologies and their impact on hiring",
          type: "Analysis",
          readTime: "18 min read",
          icon: "🚀"
        },
        {
          title: "Diversity in Tech Report",
          description: "Insights on building diverse and inclusive tech teams",
          type: "Report",
          readTime: "25 min read",
          icon: "🤝"
        },
        {
          title: "Remote Work Statistics",
          description: "Data and trends on remote work adoption in the tech industry",
          type: "Statistics",
          readTime: "10 min read",
          icon: "📈"
        }
      ]
    }
  ];

  const tools = [
    {
      name: "Resume Builder",
      description: "Create professional resumes with our easy-to-use builder",
      icon: "📝",
      link: "/resume-builder"
    },
    {
      name: "Salary Calculator",
      description: "Calculate your market value based on role, experience, and location",
      icon: "🧮",
      link: "/salary-guide"
    },
    {
      name: "Interview Simulator",
      description: "Practice technical interviews with AI-powered feedback",
      icon: "🎯",
      link: "/career-advice"
    },
    {
      name: "Job Search Tracker",
      description: "Organize your job search with our tracking tool",
      icon: "📋",
      link: "/applicant"
    }
  ];

  const events = [
    {
      title: "Tech Hiring Summit 2024",
      date: "March 15-16, 2024",
      type: "Virtual Conference",
      description: "Join industry leaders for insights on the future of tech hiring"
    },
    {
      title: "Resume Review Workshop",
      date: "Every Tuesday",
      type: "Live Workshop",
      description: "Get your resume reviewed by hiring managers and career coaches"
    },
    {
      title: "Networking Mixer",
      date: "Monthly",
      type: "In-Person Event",
      description: "Connect with tech professionals and potential employers"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Resources & Tools
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive resources to help employers hire better and job seekers advance their careers. From guides and tools to industry insights.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Tools */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Quick Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <Link
                key={index}
                to={tool.link}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="text-3xl mb-4">{tool.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{tool.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Resources by Category */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Resources by Category</h2>
          <div className="space-y-12">
            {resources.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{category.category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
                      <div className="text-2xl mb-4">{item.icon}</div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full">
                          {item.type}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {item.readTime || item.duration}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{item.description}</p>
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                        Access Resource →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs px-2 py-1 rounded-full">
                    {event.type}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{event.date}</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{event.description}</p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-xl mb-8 opacity-90">
                Get the latest hiring insights, career tips, and industry news delivered to your inbox.
              </p>
              <div className="max-w-md mx-auto">
                <div className="flex gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Subscribe
                  </button>
                </div>
                <p className="text-sm opacity-75 mt-2">
                  No spam, unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Need More Help?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Our team is here to support you with personalized guidance and resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Contact Support
              </Link>
              <Link
                to="/career-advice"
                className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                Browse Articles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
