import { connectDB } from "../db/connect";
import User from "../models/User";
import Job from "../models/Job";
import { env } from "../config/env";

const seedJobs = [
  {
    title: "Senior React Developer",
    description: "We're looking for an experienced React developer to join our team. You'll be working on cutting-edge web applications using modern technologies like TypeScript, Redux, and Tailwind CSS. The ideal candidate should have 3+ years of experience with React and a strong understanding of frontend architecture.",
    skills: ["React", "TypeScript", "Redux", "Tailwind CSS", "JavaScript"],
  },
  {
    title: "Full Stack Node.js Engineer",
    description: "Join our growing team as a Full Stack Engineer. You'll be responsible for developing both frontend and backend features, working with Node.js, Express, MongoDB, and React. Experience with REST APIs, authentication, and database design is required.",
    skills: ["Node.js", "Express", "MongoDB", "React", "JavaScript", "REST APIs"],
  },
  {
    title: "Frontend Developer (Vue.js)",
    description: "We're seeking a Vue.js developer to help build beautiful, responsive user interfaces. You'll work closely with our design team to implement pixel-perfect designs and ensure excellent user experience. Experience with Vue 3, Composition API, and modern CSS is preferred.",
    skills: ["Vue.js", "JavaScript", "CSS3", "HTML5", "Composition API"],
  },
  {
    title: "DevOps Engineer",
    description: "Help us scale our infrastructure and deployment processes. You'll be responsible for CI/CD pipelines, cloud infrastructure management, and ensuring high availability of our services. Experience with Docker, Kubernetes, and cloud platforms (AWS/GCP/Azure) is required.",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux", "Bash"],
  },
  {
    title: "Mobile App Developer (React Native)",
    description: "Join our mobile team to build cross-platform applications using React Native. You'll work on both iOS and Android platforms, implementing new features and maintaining existing functionality. Experience with React Native, TypeScript, and mobile development best practices is essential.",
    skills: ["React Native", "TypeScript", "iOS", "Android", "Mobile Development"],
  },
  {
    title: "Backend Python Developer",
    description: "We're looking for a Python developer to build robust backend services. You'll work with Django or FastAPI, design database schemas, and implement RESTful APIs. Experience with Python, databases, and API development is required.",
    skills: ["Python", "Django", "FastAPI", "PostgreSQL", "REST APIs"],
  },
  {
    title: "UI/UX Designer",
    description: "Help us create amazing user experiences. You'll be responsible for designing user interfaces, conducting user research, and creating wireframes and prototypes. Experience with Figma, Adobe Creative Suite, and user-centered design principles is required.",
    skills: ["Figma", "Adobe Creative Suite", "UI/UX Design", "Prototyping", "User Research"],
  },
  {
    title: "Data Scientist",
    description: "Join our data team to extract insights from large datasets and build machine learning models. You'll work with Python, pandas, scikit-learn, and various data visualization tools. Experience with statistical analysis and machine learning algorithms is required.",
    skills: ["Python", "Pandas", "Scikit-learn", "Machine Learning", "Statistics", "SQL"],
  },
];

const seedEmployers = [
  {
    name: "TechCorp Solutions",
    email: "hr@techcorp.com",
    password: "password123",
    role: "employer" as const,
  },
  {
    name: "Innovate Labs",
    email: "careers@innovatelabs.com",
    password: "password123",
    role: "employer" as const,
  },
  {
    name: "Digital Dynamics",
    email: "jobs@digitaldynamics.com",
    password: "password123",
    role: "employer" as const,
  },
  {
    name: "Future Systems",
    email: "recruiting@futuresystems.com",
    password: "password123",
    role: "employer" as const,
  },
];

async function seed() {
  try {
    await connectDB();
    
    // Clear existing data
    await User.deleteMany({});
    await Job.deleteMany({});
    
    console.log("Cleared existing data");
    
    // Create employers
    const employers = await User.create(seedEmployers);
    console.log(`Created ${employers.length} employers`);
    
    // Create jobs with random employers
    const jobs = [];
    for (const jobData of seedJobs) {
      const randomEmployer = employers[Math.floor(Math.random() * employers.length)];
      const job = await Job.create({
        ...jobData,
        createdBy: randomEmployer._id,
      });
      jobs.push(job);
    }
    
    console.log(`Created ${jobs.length} jobs`);
    
    // Create a sample admin user
    const admin = await User.create({
      name: "Admin User",
      email: "admin@talenthub.com",
      password: "admin123",
      role: "admin",
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
