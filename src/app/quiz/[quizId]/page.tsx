"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { quizData, questionData, QuizResultData, userData } from "@/lib/data";
import { Answer, Question, QuizResult } from "@/types";
import React from 'react';
import { set, useForm } from 'react-hook-form';
import Link from "next/link";
import { Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Quiz } from "@/types";

export default function AttemptQuizPage({
    params,
}: Readonly<{ params: { quizId: string } }>) {
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [cQuestion, setCQuestion] = useState(useSearchParams().get("question"));
    const [isFirstInitialize, setIsFirstInitialize] = useState(true);
    const [routes, setRoutes] = useState(useRouter());

    if (cQuestion === null || cQuestion === "") {
        return routes.push(`/quiz/${params.quizId}?question=1`);
    }

    const idQuiz = parseInt(params.quizId);
    const [quiz, setQuiz] = useState<Quiz | undefined>(quizData.find((quiz) => quiz.id === idQuiz));

    if (quiz === undefined) {
        return (
            <main className="container h-screen pt-16 dark:bg-zinc-950 bg-zinc-50 overflow-hidden min-h-screen w-full flex flex-col gap-6 justify-center items-center">
                <h1 className="text-zinc-950 dark:text-zinc-50 font-bold text-xl">Data not found</h1>
                <Link href={"/quiz/"}>
                    <Button>Back</Button>
                </Link>
            </main>
        );
    }

    const questions = quiz.questions as Question[];
    const question = questions.find((question) => questions.indexOf(question) === parseInt(cQuestion) - 1);
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    // useEffect(() => {
    //     console.log(answers);
    // }, [answers]);

    const saveAnswerToSessionStorage = () => {
        sessionStorage.setItem('quizAnswers', JSON.stringify(answers));
    };

    useEffect(() => {
        const storedAnswers = sessionStorage.getItem('quizAnswers');
        if (storedAnswers) {
            setAnswers(JSON.parse(storedAnswers));
        }
    }, []);

    useEffect(() => {
        if (!isFirstInitialize) {
            saveAnswerToSessionStorage();
        }
        setIsFirstInitialize(false);
    }, [answers]);

    const storeLocalValue = (questionId: string, selectedOption: string) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: selectedOption,
        }));
    };

    const nextQuestion = () => {
        routes.push(`/quiz/${params.quizId}?question=${parseInt(cQuestion) + 1}`);
        setCQuestion((prev) => {
            const next = parseInt(prev ?? "") + 1;
            return next.toString();
        });
    }

    const prevQuestion = () => {
        routes.push(`/quiz/${params.quizId}?question=${parseInt(cQuestion) - 1}`);
        setCQuestion((prev) => {
            const next = parseInt(prev ?? "") - 1;
            return next.toString();
        });
    }

    const onSubmit = () => {
        const correctQuestions: Question[] = []
        const wrongQuestions: Question[] = []
        const chosenAnswers: Answer[] = []
        Object.entries(answers).forEach(([key, value]) => {
            let question = questions.find((question) => question.id.toString() === key);
            if (question?.correct_answer.id.toString() === value) {
                correctQuestions.push(question);
            } else if (question) {
                wrongQuestions.push(question);
            }
            const thisAnswer = question?.answers.find((answer) => answer.id.toString() === value);
            chosenAnswers.push(thisAnswer as Answer);
        });

        const result: QuizResult = {
            id: QuizResultData.length + 1,
            grade: (correctQuestions.length / questions.length) * 100,
            correct_questions: correctQuestions,
            wrong_questions: wrongQuestions,
            chosen_answers: chosenAnswers,
            quiz_id: quiz,
            user_id: userData[0],
        };
        // post to server
        QuizResultData.push(result);

        sessionStorage.removeItem('quizAnswers');
        routes.push(`/quiz/${params.quizId}/result`);
    }

    return (
        <>
            <nav className="container fixed top-0 w-screen h-12 z-50">
                <div className="flex items-center justify-between py-2 backdrop-blur-xl">
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight truncate max-w-64">
                        {quiz.name}
                    </h4>

                    <QuestionsSheet />
                </div>
            </nav>

            <main className="container h-screen pt-16 dark:bg-zinc-950 bg-zinc-50 overflow-hidden gap-4 grid grid-rows-6">
                <div className="row-span-5 flex gap-4">
                    <ScrollArea className="w-1/6">
                        <div className="space-y-4">
                            <div className="w-full aspect-square bg-pink-600 flex items-center justify-center rounded">
                                CAMERA
                            </div>

                            <div className="w-full h-16 bg-violet-600 flex items-center justify-center rounded">
                                TIMER
                            </div>
                        </div>
                    </ScrollArea>

                    <Separator orientation="vertical" />

                    <ScrollArea className="w-5/6">
                        <div className="space-y-4">
                            <p className="leading-7 [&:not(:first-child)]:mt-6 pr-4">
                                <span className="inline-block w-7 aspect-square rounded-full bg-primary text-primary-foreground mr-2 text-center font-bold">
                                    {question && questions.indexOf(question) + 1}
                                </span>
                                {question?.text}
                            </p>

                            <RadioGroup
                                value={question && answers[question.id]}
                                onValueChange={(value) => { question && storeLocalValue(question.id.toString(), value) }}
                            >
                                {question?.answers.map((answer, i) =>
                                    <div className="flex items-center space-x-2" key={answer.id}>
                                        <RadioGroupItem value={answer.id.toString()} id={answer.id.toString()} />
                                        <Label htmlFor={answer.id.toString()}>{alphabet[i]}. {answer.text}</Label>
                                    </div>
                                )}
                            </RadioGroup>
                        </div>
                    </ScrollArea>
                </div>

                <div className="flex justify-between items-center">
                    <Button variant="outline" onClick={prevQuestion} disabled={cQuestion === "1"}>
                        <ChevronLeft />
                        Previous
                    </Button>
                    {parseInt(cQuestion) === questions.length ?
                        <Button variant="outline" onClick={onSubmit}>
                            Submit
                            <ChevronRight />
                        </Button>
                        :
                        <Button variant="outline" onClick={nextQuestion}>
                            Next
                            <ChevronRight />
                        </Button>
                    }
                </div>
            </main>
        </>
    );
}

function QuestionsSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full">
                <SheetHeader>
                    <SheetTitle>Quiz 1</SheetTitle>
                </SheetHeader>
                <div className="grid grid-cols-4 sm:grid-cols-5 align-middle gap-4 mt-4">
                    <Button>1</Button>
                    <Button variant="secondary">2</Button>
                    <Button variant="secondary">3</Button>
                    <Button variant="secondary">3</Button>
                    <Button>45</Button>
                    <Button>113</Button>
                    <Button>11</Button>
                    <Button>1</Button>
                    <Button variant="secondary">3</Button>
                    <Button variant="secondary">3</Button>
                    <Button variant="secondary">3</Button>
                    <Button variant="secondary">3</Button>
                </div>
                <SheetFooter></SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
