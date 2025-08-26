import { useState } from "react";
import { Link } from "react-router-dom";

export default function FindTalent() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Talent", count: 1250 },
    { id: "frontend", name: "Frontend Developers", count: 320 },
    { id: "backend", name: "Backend Developers", count: 280 },
    { id: "fullstack", name: "Full Stack Developers", count: 450 },
    { id: "mobile", name: "Mobile Developers", count: 180 },
    { id: "data", name: "Data Scientists", count: 120 }
  ];

  const featuredCandidates = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Senior Full Stack Developer",
      experience: "8 years",
      skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"],
      location: "San Francisco, CA",
      availability: "Available",
      avatar: "SC",
      rating: 4.9,
      projects: 15
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      title: "Frontend Developer",
      experience: "5 years",
      skills: ["React", "Vue.js", "JavaScript", "CSS3", "Webpack"],
      location: "Remote",
      availability: "Available",
      avatar: "MR",
      rating: 4.8,
      projects: 12
    },
    {
      id: 3,
      name: "Emily Johnson",
      title: "Backend Engineer",
      experience: "6 years",
      skills: ["Python", "Django", "PostgreSQL", "Docker", "Kubernetes"],
      location: "New York, NY",
      availability: "Available",
      avatar: "EJ",
      rating: 4.9,
      projects: 18
    },
    {
      id: 4,
      name: "David Kim",
      title: "Mobile Developer",
      experience: "4 years",
      skills: ["React Native", "iOS", "Android", "Firebase", "Redux"],
      location: "Seattle, WA",
      availability: "Available",
      avatar: "DK",
      rating: 4.7,
      projects: 10
    }
  ];

  const hiringFeatures = [
    {
      icon: "🎯",
      title: "Smart Matching",
      description: "AI-powered candidate matching based on your job requirements and company culture."
    },
    {
      icon: "⚡",
      title: "Quick Hiring",
      description: "Streamlined hiring process with pre-screened candidates and automated workflows."
    },
    {
      icon: "🔍",
      title: "Detailed Profiles",
      description: "Comprehensive candidate profiles with skills, experience, and portfolio samples."
    },
    {
      icon: "💬",
      title: "Direct Communication",
      description: "Connect directly with candidates through our integrated messaging system."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Find Top Tech Talent
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Connect with skilled developers, designers, and tech professionals. Post jobs, browse profiles, and hire the perfect candidate for your team.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search Skills
                </label>
                <input
                  type="text"
                  placeholder="e.g., React, Python, AWS"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                  <option>Any Location</option>
                  <option>Remote</option>
                  <option>San Francisco</option>
                  <option>New York</option>
                  <option>Seattle</option>
                  <option>Austin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Experience Level
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                  <option>Any Level</option>
                  <option>Entry Level (0-2 years)</option>
                  <option>Mid Level (3-5 years)</option>
                  <option>Senior Level (6+ years)</option>
                </select>
              </div>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
              Search Talent
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                  selectedCategory === category.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{category.count} candidates</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Candidates */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Candidates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCandidates.map((candidate) => (
              <div key={candidate.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                    <span className="font-semibold text-blue-600 dark:text-blue-300">{candidate.avatar}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{candidate.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{candidate.title}</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <span className="mr-2">⭐</span>
                    <span>{candidate.rating} rating</span>
                    <span className="mx-2">•</span>
                    <span>{candidate.projects} projects</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    📍 {candidate.location}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    ⏱️ {candidate.experience} experience
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                    {candidate.skills.length > 3 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">+{candidate.skills.length - 3} more</span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                    View Profile
                  </button>
                  <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hiring Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Why Choose TalentHub for Hiring?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hiringFeatures.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">1,250+</div>
                <div className="text-blue-100">Active Candidates</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-blue-100">Companies Hiring</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-blue-100">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24h</div>
                <div className="text-blue-100">Average Response Time</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Find Your Next Hire?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Post a job, browse candidate profiles, and start building your dream team today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/employer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Post a Job
              </Link>
              <Link
                to="/pricing"
                className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
