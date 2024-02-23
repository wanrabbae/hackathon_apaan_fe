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

export default function AttemptQuizPage({
    params,
}: Readonly<{ params: { quizId: string } }>) {
    const [currentAnswer, setCurrentAnswer] = useState("");

    useEffect(() => {
        console.log(currentAnswer);
    }, [currentAnswer]);

    return (
        <>
            <nav className="container fixed top-0 w-screen h-12 z-50">
                <div className="flex items-center justify-between py-2 backdrop-blur-xl">
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight truncate max-w-64">
                        Quiz 1
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
                                    1
                                </span>
                                Lorem ipsum dolor, amet consectetur adipisicing elit. Eius vel
                                reiciendis perspiciatis enim magnam pariatur ea corporis minus
                                quod. Dignissimos recusandae qui iusto. Apa itu Pancasila?
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                Possimus, amet illum numquam maiores quo minima animi ab soluta
                                eum, sunt aspernatur aperiam ad provident molestias quia. Dicta
                                sit ea ut quasi. Fuga quas facilis ad maxime saepe aliquam
                                magnam, veritatis suscipit vitae, praesentium, tempora
                                architecto nobis. Labore, commodi! Necessitatibus magni ea
                                dolore earum dolores accusantium saepe pariatur itaque, quaerat
                                provident inv. Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Sapiente blanditiis iusto eius aliquid,
                                beatae, excepturi quo, praesentium odio illum quidem provident
                                libero. Beatae saepe pariatur voluptatum ad, magnam consequuntur
                                est magni eveniet aperiam libero amet nihil rerum perferendis
                                sunt consequatur quidem nesciunt ipsa, vero unde quas! Officia
                                autem illum maxime asperiores optio dignissimos iste aliquid
                                error esse veritatis sint cupiditate ipsa nulla ea omnis
                                temporibus recusandae accusantium praesentium, voluptatum,
                                numquam architecto perferendis eveniet. Accusantium earum
                                laboriosam atque perspiciatis modi quos doloremque recusandae
                                sit ullam blanditiis expedita fugiat esse molestiae ex sunt
                                impedit nisi, fuga ratione? Tenetur, aliquid sint quisquam hic
                                illum officiis aperiam cupiditate quos atque voluptatibus
                                consequuntur quaerat earum unde harum maiores aliquam, ipsam
                                voluptates eaque soluta ipsum, labore assumenda nemo. Harum
                                veniam aut deserunt minus debitis, perspiciatis obcaecati fuga
                                perferendis, libero iste laborum.
                            </p>

                            <RadioGroup
                                value={currentAnswer}
                                onValueChange={(value) => setCurrentAnswer(value)}
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="default" id="r1" />
                                    <Label htmlFor="r1">A. Default</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="comfortable" id="r2" />
                                    <Label htmlFor="r2">B. Comfortable</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="compact" id="r3" />
                                    <Label htmlFor="r3">C. Compact</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="d" id="r4" />
                                    <Label htmlFor="r4">D. Compact</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </ScrollArea>
                </div>

                <div className="flex justify-between items-center">
                    <Button variant="outline" disabled>
                        <ChevronLeft />
                        Previous
                    </Button>
                    <Button variant="outline">
                        Next
                        <ChevronRight />
                    </Button>
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
