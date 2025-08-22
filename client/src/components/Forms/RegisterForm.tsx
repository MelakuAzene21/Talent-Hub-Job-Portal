import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useAuthEndpoints } from "./LoginForm";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
export default function RegisterForm() {
  const { register, handleSubmit } = useForm();
  const { useRegisterMutation } = useAuthEndpoints();
  const [registerUser] = useRegisterMutation();
  const dispatch = useDispatch();
  const onSubmit = async (data: any) => {
    const res = await registerUser(data).unwrap();
    dispatch(setCredentials(res));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
      <Input placeholder="Name" {...register("name", { required: true })} />
      <Input placeholder="Email" {...register("email", { required: true })} />
      <Input
        placeholder="Password"
        type="password"
        {...register("password", { required: true })}
      />
      <select
        className="px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700"
        {...register("role")}
      >
        <option value="applicant">Applicant</option>
        <option value="employer">Employer</option>
      </select>
      <Button type="submit">Create Account</Button>
    </form>
  );
}
