import LoginForm from "../components/Forms/LoginForm";
import RegisterForm from "../components/Forms/RegisterForm";
export default function Auth() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">Login</h2>
        <LoginForm />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Create Account</h2>
        <RegisterForm />
      </div>
    </div>
  );
}
