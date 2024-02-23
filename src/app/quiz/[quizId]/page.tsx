"use client";

import { useEffect, useState } from "react";
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
