import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/store";
import "./styles/tailwind.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import App from "./App";
import Landing from "./pages/Landing";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import ApplicationForm from "./components/Forms/ApplicationForm";
import About from "./pages/About";
import Employer from "./pages/Employer";
import Applicant from "./pages/Applicant";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import JobApplicants from "./components/Employer/JobApplicants";
import CareerAdvice from "./pages/CareerAdvice";
import ResumeBuilder from "./pages/ResumeBuilder";
import SalaryGuide from "./pages/SalaryGuide";
import FindTalent from "./pages/FindTalent";
import Pricing from "./pages/Pricing";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Landing /> },
      { path: "jobs", element: <Jobs /> },
      { path: "jobs/:id", element: <JobDetails /> },
      { path: "jobs/:id/apply", element: <ApplicationForm /> },
      { path: "about", element: <About /> },
      { path: "employer", element: <Employer /> },
      { path: "employer/applicants/:jobId", element: <JobApplicants /> },
      { path: "applicant", element: <Applicant /> },
      { path: "admin", element: <Admin /> },
      { path: "auth", element: <Auth /> },
      // Footer pages
      { path: "career-advice", element: <CareerAdvice /> },
      { path: "resume-builder", element: <ResumeBuilder /> },
      { path: "salary-guide", element: <SalaryGuide /> },
      { path: "find-talent", element: <FindTalent /> },
      { path: "pricing", element: <Pricing /> },
      { path: "resources", element: <Resources /> },
      { path: "contact", element: <Contact /> },
      { path: "privacy", element: <Privacy /> },
      { path: "terms", element: <Terms /> },
    ],
    errorElement: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
