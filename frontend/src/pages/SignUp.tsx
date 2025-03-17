import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log("Sign Up:", data);
  };

  return (
    <div className="p-6 max-w-sm mx-auto space-y-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input {...register("username")} placeholder="Username" />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </div>
        <div>
          <Input {...register("password")} type="password" placeholder="Password" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <div>
          <Input {...register("confirmPassword")} type="password" placeholder="Confirm Password" />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
        </div>
        <Button type="submit" className="w-full">Sign Up</Button>
      </form>
      <p className="text-center text-sm">
        If you already have an account, <Link to="/sign-in" className="text-blue-500">sign in</Link>.
      </p>
    </div>
  );
}
