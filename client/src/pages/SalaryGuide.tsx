import { useState } from "react";
import { Link } from "react-router-dom";

export default function SalaryGuide() {
  const [selectedRole, setSelectedRole] = useState("frontend-developer");

  const roles = [
    {
      id: "frontend-developer",
      title: "Frontend Developer",
      avgSalary: "$85,000",
      range: "$60,000 - $120,000",
      demand: "High",
      skills: ["React", "JavaScript", "CSS", "HTML", "TypeScript"]
    },
    {
      id: "backend-developer",
      title: "Backend Developer",
      avgSalary: "$95,000",
      range: "$70,000 - $140,000",
      demand: "Very High",
      skills: ["Node.js", "Python", "Java", "SQL", "AWS"]
    },
    {
      id: "fullstack-developer",
      title: "Full Stack Developer",
      avgSalary: "$105,000",
      range: "$80,000 - $150,000",
      demand: "Very High",
      skills: ["React", "Node.js", "MongoDB", "Express", "TypeScript"]
    },
    {
      id: "data-scientist",
      title: "Data Scientist",
      avgSalary: "$110,000",
      range: "$85,000 - $160,000",
      demand: "High",
      skills: ["Python", "R", "SQL", "Machine Learning", "Statistics"]
    },
    {
      id: "devops-engineer",
      title: "DevOps Engineer",
      avgSalary: "$100,000",
      range: "$75,000 - $145,000",
      demand: "High",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"]
    },
    {
      id: "ui-ux-designer",
      title: "UI/UX Designer",
      avgSalary: "$80,000",
      range: "$55,000 - $115,000",
      demand: "Medium",
      skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"]
    }
  ];

  const experienceLevels = [
    {
      level: "Entry Level (0-2 years)",
      multiplier: 0.7,
      description: "Junior positions with basic responsibilities"
    },
    {
      level: "Mid Level (3-5 years)",
      multiplier: 1.0,
      description: "Standard positions with moderate experience"
    },
    {
      level: "Senior Level (6-8 years)",
      multiplier: 1.3,
      description: "Advanced positions with significant experience"
    },
    {
      level: "Lead/Principal (8+ years)",
      multiplier: 1.6,
      description: "Leadership positions with extensive experience"
    }
  ];

  const locations = [
    { city: "San Francisco", multiplier: 1.4, cost: "Very High" },
    { city: "New York", multiplier: 1.3, cost: "Very High" },
    { city: "Seattle", multiplier: 1.2, cost: "High" },
    { city: "Austin", multiplier: 1.1, cost: "Medium" },
    { city: "Denver", multiplier: 1.0, cost: "Medium" },
    { city: "Remote", multiplier: 0.9, cost: "Low" }
  ];

  const selectedRoleData = roles.find(role => role.id === selectedRole);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tech Salary Guide 2024
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive salary data and insights for tech professionals. Understand your market value and negotiate better compensation.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Role Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Select Your Role</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role) => (
              <div
                key={role.id}
                className={`bg-white dark:bg-gray-800 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                  selectedRole === role.id
                    ? "border-blue-500 shadow-lg"
                    : "border-gray-200 dark:border-gray-700"
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{role.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Average Salary:</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">{role.avgSalary}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Range:</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{role.range}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Demand:</span>
                      <span className={`text-sm font-medium ${
                        role.demand === "Very High" ? "text-green-600 dark:text-green-400" :
                        role.demand === "High" ? "text-blue-600 dark:text-blue-400" :
                        "text-yellow-600 dark:text-yellow-400"
                      }`}>
                        {role.demand}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {role.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                    {role.skills.length > 3 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">+{role.skills.length - 3} more</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Salary Details */}
        {selectedRoleData && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Salary Details for {selectedRoleData.title}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Experience Levels */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Salary by Experience Level</h3>
                <div className="space-y-4">
                  {experienceLevels.map((level, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{level.level}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{level.description}</p>
                        </div>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          ${Math.round(parseInt(selectedRoleData.avgSalary.replace(/[$,]/g, '')) * level.multiplier).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Adjustments */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Salary by Location</h3>
                <div className="space-y-4">
                  {locations.map((location, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{location.city}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Cost of Living: {location.cost}</p>
                        </div>
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          ${Math.round(parseInt(selectedRoleData.avgSalary.replace(/[$,]/g, '')) * location.multiplier).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Salary Negotiation Tips */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Salary Negotiation Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Research Market Rates</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Understand the salary range for your role, experience level, and location before negotiations.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Highlight Your Value</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Focus on your achievements, skills, and the value you bring to the company during negotiations.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Consider Total Compensation</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Look beyond base salary to include benefits, equity, bonuses, and other perks in your evaluation.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Negotiate Your Salary?</h2>
            <p className="text-xl mb-8 opacity-90">
              Use our salary data to confidently negotiate better compensation and advance your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/jobs"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse Jobs
              </Link>
              <Link
                to="/career-advice"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                Career Advice
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
