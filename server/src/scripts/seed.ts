import { connectDB } from "../db/connect";
import User from "../models/User";
import Job from "../models/Job";
import { env } from "../config/env";

const seedJobs = [
  {
    title: "Senior React Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    jobType: "full-time",
    minSalary: 120000,
    maxSalary: 150000,
    description: "We are looking for a Senior React Developer to join our dynamic team. You will be responsible for building scalable web applications and mentoring junior developers.",
    requirements: [
      "5+ years of experience with React and modern JavaScript",
      "Strong understanding of state management (Redux, Context API)",
      "Experience with TypeScript and modern build tools",
      "Knowledge of testing frameworks (Jest, React Testing Library)",
      "Bachelor's degree in Computer Science or related field"
    ],
    skills: ["React", "TypeScript", "Node.js", "Redux", "Jest"]
  },
  {
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "Remote",
    jobType: "full-time",
    minSalary: 90000,
    maxSalary: 120000,
    description: "Join our fast-growing startup as a Full Stack Engineer. You'll work on cutting-edge projects and have the opportunity to shape our technology stack.",
    requirements: [
      "3+ years of full-stack development experience",
      "Proficiency in JavaScript/TypeScript and Python",
      "Experience with modern databases (PostgreSQL, MongoDB)",
      "Knowledge of cloud platforms (AWS, GCP)",
      "Strong problem-solving skills"
    ],
    skills: ["JavaScript", "Python", "PostgreSQL", "AWS", "Docker"]
  },
  {
    title: "Frontend Developer",
    company: "Design Studio",
    location: "New York, NY",
    jobType: "contract",
    minSalary: 80,
    maxSalary: 100,
    description: "We need a talented Frontend Developer for our client projects. You'll work on beautiful, responsive interfaces and collaborate with our design team.",
    requirements: [
      "2+ years of frontend development experience",
      "Strong CSS and JavaScript skills",
      "Experience with modern frameworks (Vue.js, React)",
      "Understanding of design principles and UX",
      "Portfolio of previous work"
    ],
    skills: ["Vue.js", "CSS", "Figma", "JavaScript", "Responsive Design"]
  },
  {
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Austin, TX",
    jobType: "full-time",
    minSalary: 110000,
    maxSalary: 140000,
    description: "Join our DevOps team to build and maintain our cloud infrastructure. You'll work on automation, monitoring, and scaling our systems.",
    requirements: [
      "4+ years of DevOps experience",
      "Strong knowledge of AWS or Azure",
      "Experience with Docker and Kubernetes",
      "Knowledge of CI/CD pipelines",
      "Scripting skills (Python, Bash)"
    ],
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Python"]
  },
  {
    title: "Data Scientist",
    company: "Analytics Corp",
    location: "Boston, MA",
    jobType: "full-time",
    minSalary: 100000,
    maxSalary: 130000,
    description: "Help us turn data into insights! You'll work on machine learning models and data analysis to drive business decisions.",
    requirements: [
      "Master's degree in Statistics, Computer Science, or related field",
      "3+ years of experience in data science",
      "Proficiency in Python and R",
      "Experience with ML frameworks (TensorFlow, PyTorch)",
      "Strong statistical background"
    ],
    skills: ["Python", "R", "TensorFlow", "SQL", "Statistics"]
  },
  {
    title: "Product Manager",
    company: "Innovation Labs",
    location: "Seattle, WA",
    jobType: "full-time",
    minSalary: 130000,
    maxSalary: 160000,
    description: "Lead product strategy and development for our innovative products. You'll work closely with engineering and design teams.",
    requirements: [
      "5+ years of product management experience",
      "Experience in SaaS or tech products",
      "Strong analytical and communication skills",
      "Knowledge of agile methodologies",
      "MBA or equivalent experience"
    ],
    skills: ["Product Strategy", "Agile", "Analytics", "User Research", "Roadmapping"]
  },
  {
    title: "UX Designer",
    company: "Creative Agency",
    location: "Los Angeles, CA",
    jobType: "contract",
    minSalary: 70,
    maxSalary: 90,
    description: "Create amazing user experiences for our clients. You'll work on user research, wireframing, and prototyping.",
    requirements: [
      "3+ years of UX design experience",
      "Portfolio showcasing user-centered design",
      "Experience with design tools (Figma, Sketch)",
      "Knowledge of user research methods",
      "Understanding of accessibility principles"
    ],
    skills: ["Figma", "User Research", "Wireframing", "Prototyping", "Accessibility"]
  },
  {
    title: "Software Engineer Intern",
    company: "Tech Startup",
    location: "Remote",
    jobType: "internship",
    minSalary: 25,
    maxSalary: 35,
    description: "Gain hands-on experience in a fast-paced startup environment. You'll work on real projects and learn from experienced developers.",
    requirements: [
      "Currently pursuing Computer Science degree",
      "Basic programming knowledge (Python, JavaScript)",
      "Strong problem-solving skills",
      "Eagerness to learn and grow",
      "Available for 3-6 months"
    ],
    skills: ["Python", "JavaScript", "Git", "Problem Solving", "Learning"]
  }
];

const seedEmployers = [
  {
    name: "John Smith",
    email: "john@techcorp.com",
    password: "password123",
    role: "employer"
  },
  {
    name: "Sarah Johnson",
    email: "sarah@startupxyz.com",
    password: "password123",
    role: "employer"
  },
  {
    name: "Mike Chen",
    email: "mike@designstudio.com",
    password: "password123",
    role: "employer"
  },
  {
    name: "Emily Davis",
    email: "emily@cloudtech.com",
    password: "password123",
    role: "employer"
  }
];

async function seed() {
  try {
    await connectDB();
    
    // Clear existing data
    await User.deleteMany({});
    await Job.deleteMany({});
    
    // Create employers
    const employers = await User.create(seedEmployers);
    console.log(`Created ${employers.length} employers`);
    
    // Create jobs
    const jobs = [];
    for (const jobData of seedJobs) {
      const randomEmployer = employers[Math.floor(Math.random() * employers.length)];
      const job = await Job.create({
        ...jobData,
        createdBy: randomEmployer._id
      });
      jobs.push(job);
    }
    console.log(`Created ${jobs.length} jobs`);
    
    // Create admin user
    const admin = await User.create({
      name: "Admin User",
      email: "admin@talenthub.com",
      password: "admin123",
      role: "admin"
    });
    console.log("Created admin user");
    
    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
