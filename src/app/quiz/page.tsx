"use client";

import { useRouter, useSearchParams } from "next/navigation";
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

import { quizData } from "@/lib/data";

const QuizCodeSchema = z.object({
    QuizCode: z.string(),
});

export default function AttemptQuizPage() {
    const router = useRouter();
    const [quizCode, setQuizCode] = useState('');

    const inAwait = async () => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
    
        if (token) {
          if(role == "1") {
            router.push("/dashboard");
          }else {
            return;
          }
        }else {
          router.push("/login");
        }
      }
    
      useEffect(() => {
        inAwait();
      }, []);

    const form = useForm<z.infer<typeof QuizCodeSchema>>({
        resolver: zodResolver(QuizCodeSchema),
        defaultValues: {
            QuizCode: ''
        },
    });


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { QuizCode } = form.getValues();
        sessionStorage.removeItem('quizAnswers');
        if (quizData.find((quiz) => quiz.id === parseInt(QuizCode))) {
            // router.push(`/quiz/${QuizCode}`);
            window.location.href = `/quiz/${QuizCode}?question=1`;
        } else {
            alert('Quiz not found');
        }

    };

    return (
        <main className="mt-12 flex min-h-screen items-center justify-center px-24 py-6 dark:bg-zinc-950 bg-zinc-50" >
            <div className="max-w-lg border border-zinc-500 px-8 py-8 rounded-lg">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Attempt Quiz {quizCode}
                </h2>
                <p className="mb-8">
                    Input your quiz code to attempt the quiz.
                </p>
                <div className="">
                    <Form {...form}>
                        <form className="flex flex-col gap-6" id="create-quiz-form" onSubmit={handleSubmit}>
                            <div className="">
                                <FormField
                                    control={form.control}
                                    name="QuizCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Quiz Code</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button form="create-quiz-form" type="submit">
                                Attempt quiz
                            </Button>

                            {/* logout button */}
                                <Button onClick={() => {
                                localStorage.clear();
                                router.push("/login");
                            }} form="logout-form" className="bg-red-500 text-white" type="submit">
                                    Logout
                                </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </main >
    );
}
