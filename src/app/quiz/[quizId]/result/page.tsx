"use client";

import { useState } from "react";
import { quizData, questionData } from "@/lib/data";



export default function ResultQuizPage({ params, }: Readonly<{ params: { quizId: string }; }>) {
    const [quizzes, setQuizzes] = useState(quizData);
    const [quiz, setQuiz] = useState(quizzes.find((quiz) => quiz.id === parseInt(params.quizId)));

    return (
        <main className="mt-12 flex min-h-screen flex-col px-24 py-6 dark:bg-zinc-950 bg-zinc-50">
            <div className="flex justify-between border-b pb-2 mt-3 mb-8">
                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                    Result Quiz
                </h2>
            </div>
            <div className="flex flex-col gap-6">
                <h3 className="text-2xl text-zinc-950 dark:text-zinc-50 font-semibold">{quiz.name}</h3>
            </div>
        </main>
    );
}