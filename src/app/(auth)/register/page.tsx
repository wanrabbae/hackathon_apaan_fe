"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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
import { register } from "@/api/auth_api";

const LoginSchema = z.object({
    fullname: z.string(),
    email: z.string(),
    password: z.string(),
});

export default function AttemptQuizPage() {
    const router = useRouter();
    const [quizCode, setQuizCode] = useState('');

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            fullname: '',
            email: '',
            password: '',
        },
    });


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { email, fullname, password } = form.getValues();

        try {
            const response = await register(email, password, fullname);
      
            router.push("/login");
          }catch (error) {
            console.error(error);
            alert("Ups something went wrong!")
          }
    };

    return (
        <main className="mt-12 flex min-h-screen items-center justify-center px-24 py-6 dark:bg-zinc-950 bg-zinc-50" >
            <div className="max-w-lg border border-zinc-500 px-8 py-8 rounded-lg min-w-96">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Register
                </h2>
                <p className="mb-8">
                    Input your data
                </p>
                <div className="">
                    <Form {...form}>
                        <form className="flex flex-col gap-6" id="login-form" onSubmit={handleSubmit}>
                            <div className="">
                                <FormField
                                    control={form.control}
                                    name="fullname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Fullname</FormLabel>
                                            <FormControl>
                                                <Input {...field} required />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} required />
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
                                                <Input {...field} required type="password" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button form="login-form" type="submit">
                                Register
                            </Button>

                            <a
                                href="#"
                                className="text-center text-blue-500 hover:underline"
                                onClick={() => router.push("/login")}
                            >
                                Already have an account? Login
                            </a>
                        </form>
                    </Form>
                </div>
            </div>
        </main >
    );
}
