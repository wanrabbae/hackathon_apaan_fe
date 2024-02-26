"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { login } from "@/api/auth_api";

const LoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export default function AttemptQuizPage() {
  const router = useRouter();
  const [quizCode, setQuizCode] = useState("");

  const inAwait = async () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      if(role == "1") {
        router.push("/dashboard");
      }else {
        router.push("/quiz");
      }
    }else {
      return;
    }
  }

  useEffect(() => {
    inAwait();
  }, []);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = form.getValues();
    
    try {
      const response = await login(email, password);

      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.user.role);

      if (response.role === 1) {
        router.push("/dashboard");
      } else {
        router.push("/quiz");
      }
    }catch (error) {
      console.error(error);
      alert("Email or password is incorrect")
    }
  };

  return (
    <main className="mt-12 flex min-h-screen items-center justify-center px-24 py-6 dark:bg-zinc-950 bg-zinc-50">
      <div className="max-w-lg border border-zinc-500 px-8 py-8 rounded-lg">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Login
        </h2>
        <p className="mb-8">Input your email and password</p>
        <div className="">
          <Form {...form}>
            <form
              className="flex flex-col gap-6"
              id="login-form"
              onSubmit={handleSubmit}
            >
              <div className="">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button form="login-form" type="submit">
                Login
              </Button>

              <a
                href="#"
                className="text-center text-blue-500 hover:underline"
                onClick={() => router.push("/register")}
              >
                Don't have an account? Register
              </a>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
