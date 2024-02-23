"use client";

import { useState } from "react";
import { quizData, questionData, QuizResultData } from "@/lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";



export default function ResultQuizPage({ params, }: Readonly<{ params: { quizId: string }; }>) {
    const [quizzes, setQuizzes] = useState(quizData);
    const [quiz, setQuiz] = useState(quizzes.find((quiz) => quiz.id === parseInt(params.quizId)));
    const [quizResult, setQuizResult] = useState(QuizResultData.find((quizResult) => quizResult.quizId === parseInt(params.quizId)));

    return (
        <main className="mt-12 flex min-h-screen flex-col px-24 py-6 gap-8 dark:bg-zinc-950 bg-zinc-50">
            <div className="flex justify-between border-b pb-2 mt-3">
                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                    Result Quiz
                </h2>
            </div>
            <div className="flex flex-col gap-2 text-zinc-950 dark:text-zinc-50">
                <h3 className="text-2xl font-semibold">{quiz?.name}</h3>
                <p className="text-lg">You have a score of {quizResult?.grade}%</p>
                <p className="text-lg">3 out of 5 answers are correct</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="col-span-4">
                    <h3 className="text-2xl font-semibold">Number of Violation</h3>
                </div>
                <div className="rounded-lg border border-zinc-950 dark:border-zinc-50 px-8 py-4">
                    <h4 className="text-xl font-semibold">Missing Eye Contact</h4>
                    <p className="text-lg">3 time</p>
                </div>
                <div className="rounded-lg border border-zinc-950 dark:border-zinc-50 px-8 py-4">
                    <h4 className="text-xl font-semibold">Missing Participant</h4>
                    <p className="text-lg">3 time</p>
                </div>
                <div className="rounded-lg border border-zinc-950 dark:border-zinc-50 px-8 py-4">
                    <h4 className="text-xl font-semibold">Multiple Participant</h4>
                    <p className="text-lg">3 time</p>
                </div>
                <div className="rounded-lg border border-zinc-950 dark:border-zinc-50 px-8 py-4">
                    <h4 className="text-xl font-semibold">Unvisible State</h4>
                    <p className="text-lg">3 time</p>
                </div>
            </div>
            <div className="flex justify-end">
                <Link href={`/`}>
                    <Button>Back To Homepage</Button>
                </Link>
            </div>
        </main>
    );
}