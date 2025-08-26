import { useState } from "react";
import { Link } from "react-router-dom";

export default function ResumeBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState("modern");

  const templates = [
    {
      id: "modern",
      name: "Modern Professional",
      description: "Clean and contemporary design perfect for tech professionals",
      image: "modern-template",
      category: "Professional"
    },
    {
      id: "creative",
      name: "Creative Portfolio",
      description: "Stand out with a creative design that showcases your personality",
      image: "creative-template",
      category: "Creative"
    },
    {
      id: "minimal",
      name: "Minimal Clean",
      description: "Simple and elegant design that focuses on content",
      image: "minimal-template",
      category: "Minimal"
    },
    {
      id: "executive",
      name: "Executive",
      description: "Sophisticated design for senior-level positions",
      image: "executive-template",
      category: "Executive"
    }
  ];

  const resumeSections = [
    {
      title: "Personal Information",
      icon: "👤",
      description: "Add your contact details and professional summary"
    },
    {
      title: "Work Experience",
      icon: "💼",
      description: "List your relevant work experience and achievements"
    },
    {
      title: "Education",
      icon: "🎓",
      description: "Include your educational background and certifications"
    },
    {
      title: "Skills",
      icon: "🛠️",
      description: "Highlight your technical and soft skills"
    },
    {
      title: "Projects",
      icon: "🚀",
      description: "Showcase your portfolio and notable projects"
    },
    {
      title: "Certifications",
      icon: "🏆",
      description: "Add relevant certifications and achievements"
    }
  ];

  const tips = [
    "Use action verbs to describe your achievements",
    "Quantify your accomplishments with specific numbers",
    "Tailor your resume to each job application",
    "Keep your resume to 1-2 pages maximum",
    "Use bullet points for easy scanning",
    "Include relevant keywords from job descriptions"
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Resume Builder
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Create a standout resume with our professional templates and expert guidance. Stand out to employers and land your dream job.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Template Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Choose Your Template</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`bg-white dark:bg-gray-800 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                  selectedTemplate === template.id
                    ? "border-blue-500 shadow-lg"
                    : "border-gray-200 dark:border-gray-700"
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="p-6">
                  <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-4xl">📄</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{template.description}</p>
                  <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                    {template.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Sections */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Resume Sections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumeSections.map((section, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{section.icon}</span>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{section.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{section.description}</p>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                  Add Section →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Tips */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Resume Writing Tips</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Why Choose Our Resume Builder?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">ATS Optimized</h3>
              <p className="text-gray-600 dark:text-gray-300">Our templates are designed to pass Applicant Tracking Systems and get your resume noticed.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Professional Templates</h3>
              <p className="text-gray-600 dark:text-gray-300">Choose from a variety of professionally designed templates that suit your industry and experience level.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Easy Export</h3>
              <p className="text-gray-600 dark:text-gray-300">Download your resume in PDF format, ready to send to employers or upload to job boards.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Create Your Professional Resume?</h2>
            <p className="text-xl mb-8 opacity-90">
              Start building your resume today and take the first step towards your dream career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Building Resume
              </button>
              <Link
                to="/career-advice"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Resume Writing Tips
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
