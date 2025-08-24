import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/store";
import "./styles/tailwind.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
    ],
    errorElement: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
