"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { quizData, questionData, QuizResultData, userData } from "@/lib/data";
import { Answer, Question, QuizResult } from "@/types";
import React from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

export default function AttemptQuizPage({
  params,
}: Readonly<{ params: { quizId: string } }>) {
  return (
    <main className="mt-12 flex min-h-screen flex-col px-24 py-6 dark:bg-zinc-950 bg-zinc-50"></main>
  );
}

// export default function AttemptQuizPage({ params, }: Readonly<{ params: { quizId: string }; }>) {
//     const [user, setUser] = useState(userData[0]);
//     const [quizzes, setQuizzes] = useState(quizData);
//     const [quiz, setQuiz] = useState(quizzes.find((quiz) => quiz.id === parseInt(params.quizId)));
//     const [questions, setQuestions] = useState(questionData.filter((question) => question.quiz_id === parseInt(params.quizId)));
//     const [quizResults, setQuizResults] = useState(QuizResultData);
//     const { register, handleSubmit, formState: { errors } } = useForm();

//     const router = useRouter();

//     if (Object.keys(errors).length) {
//         console.log(errors);
//     }
//     const onSubmit = (data: any) => {
//         if (quiz) {
//             const entries: [string, string][] = Object.entries(data);
//             const correct_questions: Question[] = [];
//             const wrong_questions: Question[] = [];
//             const chosen_answers: Answer[] = [];

//             for (const [key, value] of entries) {
//                 const question = questions.find((question) => question.id === parseInt(key));

//                 if (typeof question?.correct_answer == "object") {
//                     if (question?.correct_answer?.id === parseInt(value)) {
//                         correct_questions.push(question);
//                     } else {
//                         wrong_questions.push(question);
//                     }
//                     question.answers?.find((answer) => {
//                         if (typeof answer == "object" && answer.id === parseInt(value)) {
//                             chosen_answers.push(answer as Answer)
//                         }
//                     });
//                 }
//             }
//             const result: QuizResult = {
//                 id: Math.floor(Math.random() * 100000) + 1,
//                 grade: correct_questions.length / questions.length * 100,
//                 correct_questions: correct_questions,
//                 wrong_questions: wrong_questions,
//                 chosen_answers: chosen_answers,
//                 quiz_id: quiz,
//                 user_id: user,
//             }

//             setQuizResults([...quizResults, result]);
//             router.push(`/quiz/${quiz.id}/result`);
//         }
//     };

//     return (
//         <main className="mt-12 flex min-h-screen flex-col px-24 py-6 dark:bg-zinc-950 bg-zinc-50">
//             <div className="flex justify-between border-b pb-2 mt-3 mb-8">
//                 <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
//                     {quiz?.name ?? "Quiz not found"}
//                 </h2>
//             </div>
//             <div className="flex flex-col">
//                 {/* {Object.keys(errors).length && <p>{errors.}</p>} */}
//                 <form id="quiz-form" className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
//                     {questions.map((question, index) => (
//                         <div key={question.id} className="w-full">
//                             <div className="flex items-center gap-4 mb-4">
//                                 <div className="w-8 text-zinc-950 font-bold aspect-square rounded-full bg-zinc-50 flex items-center justify-center">{index + 1}</div>
//                                 <h3 className="font-semibold">{question.text}</h3>
//                             </div>
//                             <div className="flex flex-col gap-4 px-12">
//                                 {question.answers?.map((answer) => (
//                                     <div key={typeof answer === "number" ? answer : answer.id}>
//                                         {typeof answer === "number" ? null : <div className="flex items-center gap-2">
//                                             <input {...register("" + question.id.toString(), { required: true })} type="radio" value={answer.id} id={answer.id.toString()} className="accent-zinc-800 dark:accent-zinc-50 w-5 h-5" />
//                                             <label htmlFor={answer.id.toString()} className="text-zinc-950 dark:text-zinc-50">{answer.text}</label>
//                                         </div>}
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     ))}

//                     <div className="flex justify-end w-full">
//                         <Button type="submit">Finish Quiz</Button>
//                     </div>
//                 </form>
//             </div>
//         </main>
//     );
// }
