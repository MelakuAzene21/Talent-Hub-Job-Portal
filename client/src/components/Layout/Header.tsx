import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";
export default function Header() {
  const { user } = useAppSelector((s) => s.auth as any);
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl text-primary">
          TalentHub
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/jobs" className="hover:underline">
            Jobs
          </Link>
          <Link to="/employer" className="hover:underline">
            Employer
          </Link>
          <Link to="/applicant" className="hover:underline">
            Applicant
          </Link>
          {user?.role === "admin" && (
            <Link to="/admin" className="hover:underline">
              Admin
            </Link>
          )}
          <button
            className="px-3 py-1 rounded bg-secondary/10"
            onClick={() => setDark((v) => !v)}
          >
            {dark ? "Light" : "Dark"}
          </button>
          {user ? (
            <button
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
              className="px-3 py-1 rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth"
              className="px-3 py-1 rounded bg-primary text-white"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
