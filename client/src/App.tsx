import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeAuth } from "./features/auth/authSlice";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

export default function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);
  const location = useLocation();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  // Role-based routing logic
  const getRedirectPath = () => {
    if (!isAuthenticated) return null;
    
    const path = location.pathname;
    
    // If user is on a role-specific page, check if they have access
    if (path.startsWith('/employer') && user?.role !== 'employer' && user?.role !== 'admin') {
      return '/';
    }
    
    if (path.startsWith('/admin') && user?.role !== 'admin') {
      return '/';
    }
    
    return null;
  };

  const redirectPath = getRedirectPath();
  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
