import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { api } from "../../app/api";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
export function useAuthEndpoints() {
  return api.injectEndpoints({
    endpoints: (builder) => ({
      login: builder.mutation<any, { email: string; password: string }>({
        query: (b) => ({ url: "/auth/login", method: "POST", body: b }),
      }),
      register: builder.mutation<
        any,
        { name: string; email: string; password: string; role: string }
      >({ query: (b) => ({ url: "/auth/register", method: "POST", body: b }) }),
    }),
  });
}
export default function LoginForm() {
  const { register: r, handleSubmit } = useForm();
  const { useLoginMutation } = useAuthEndpoints();
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const onSubmit = async (data: any) => {
    const res = await login(data).unwrap();
    dispatch(setCredentials(res));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
      <Input placeholder="Email" {...r("email", { required: true })} />
      <Input
        placeholder="Password"
        type="password"
        {...r("password", { required: true })}
      />
      <Button type="submit">Login</Button>
    </form>
  );
}
