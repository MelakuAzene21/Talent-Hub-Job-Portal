import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import LoginForm from "../components/Forms/LoginForm";
import RegisterForm from "../components/Forms/RegisterForm";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);

  // Check URL params for initial state
  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'register') {
      setIsLogin(false);
    } else if (mode === 'login') {
      setIsLogin(true);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            {isLogin 
              ? "Sign in to your account to continue" 
              : "Join TalentHub to find your dream job"
            }
          </p>
        </div>

        {isLogin ? <LoginForm /> : <RegisterForm />}

        <div className="text-center mt-6">
          <p className="text-zinc-600 dark:text-zinc-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:text-blue-700 font-medium transition-colors"
            >
              {isLogin ? "Create Account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
