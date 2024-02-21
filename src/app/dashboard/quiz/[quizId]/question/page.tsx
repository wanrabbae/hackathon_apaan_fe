"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Trash, Pencil } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { quizData, questionData } from "@/lib/data";
import { Question, Answer } from "@/types";

const QuestionFormSchema = z.object({
  text: z.string().min(3),
  answers: z.array(
    z.object({
      text: z.string().min(3),
      label: z.string().min(1),
    })
  ),
  correctAnswer: z.string(),
});

export default function DashboardQuestionPage({
  params,
}: Readonly<{
  params: { quizId: string };
}>) {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState(quizData);
  const [quiz, setQuiz] = useState(
    quizzes.find((quiz) => quiz.id === parseInt(params.quizId))
  );
  const [questions, setQuestions] = useState(
    questionData.filter(
      (question) => question.quiz_id === parseInt(params.quizId)
    )
  );

  const handleCreate = (newQuestionRaw: z.infer<typeof QuestionFormSchema>) => {
    const questionId = questions.length + 1;

    const newAnswers: Answer[] = newQuestionRaw.answers.map(
      (answer, index) => ({
        id: index,
        text: answer.text,
        question_id: questionId,
      })
    );

    const correctAnswer = newQuestionRaw.answers.find(
      (answer) => answer.label === newQuestionRaw.correctAnswer
    );

    const newQuestion: Question = {
      id: questionId,
      quiz_id: parseInt(params.quizId),
      text: newQuestionRaw.text,
      answers: newAnswers,
      correctAnswer: correctAnswer,
    };

    setQuestions((prev) => [...prev, newQuestion]);
  };

  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <main className="mt-12 flex min-h-screen flex-col px-24 py-6 dark:bg-zinc-950 bg-zinc-50">
      <div className="flex justify-between border-b pb-2 mt-3">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          {quiz?.name ?? "Quiz not found"}
        </h2>
        <QuestionCreateDialog handleCreate={handleCreate} />
      </div>
      <Table className="mt-3">
        <TableCaption>
          {`${questions.length || 0} questions`}
          {questions.length > 0 && " found"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-32">No</TableHead>
            <TableHead>Question</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.map((question) => (
            <TableRow key={question.id}>
              <TableCell>{question.id}</TableCell>
              <TableCell>{question.text}</TableCell>
              <TableCell>
                <div className="flex gap-3 justify-end">
                  <TooltipCustom content="Edit question">
                    <Button size="icon" variant="default">
                      <Pencil size={18} strokeWidth={2.25} />
                    </Button>
                  </TooltipCustom>
                  <QuestionDeleteAlertDialog
                    handleDelete={handleDelete}
                    question={question}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}

function QuestionCreateDialog({
  handleCreate,
}: Readonly<{
  handleCreate: (question: z.infer<typeof QuestionFormSchema>) => void;
}>) {
  const form = useForm<z.infer<typeof QuestionFormSchema>>({
    resolver: zodResolver(QuestionFormSchema),
    defaultValues: {
      text: "",
      answers: [
        { label: "A", text: "A" },
        { label: "B", text: "B" },
        { label: "C", text: "C" },
        { label: "D", text: "D" },
      ],
      correctAnswer: "A",
    },
  });
  const [open, setOpen] = useState(false);

  const onSubmit = (data: z.infer<typeof QuestionFormSchema>) => {
    handleCreate(data);
    form.reset({
      text: "",
      answers: [
        { label: "A", text: "A" },
        { label: "B", text: "B" },
        { label: "C", text: "C" },
        { label: "D", text: "D" },
      ],
      correctAnswer: "A",
    });
    setOpen(false);
  };

  useEffect(() => {
    console.log(form.getValues());
  }, [form.getValues()]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New Question</Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto max-h-screen min-w-[75vw] lg:min-w-[50vw]">
        <DialogHeader>
          <DialogTitle>Create New Question</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            id="create-question-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid gap-8 py-4">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="answers.0.text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Badge className="rounded-full" variant="secondary">
                          Option A
                        </Badge>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="answers.1.text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Badge className="rounded-full" variant="secondary">
                          Option B
                        </Badge>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="answers.2.text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Badge className="rounded-full" variant="secondary">
                          Option C
                        </Badge>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="answers.3.text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Badge className="rounded-full" variant="secondary">
                          Option D
                        </Badge>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="correctAnswer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="select-correct-answer">
                      <Badge className="rounded-full">Correct Answer</Badge>
                    </FormLabel>
                    <FormControl>
                      <Select
                        required
                        onValueChange={field.onChange}
                        defaultValue={field.value.toString()}
                      >
                        <SelectTrigger id="select-correct-answer">
                          <SelectValue placeholder="Select correct answer" />
                        </SelectTrigger>
                        <SelectContent>
                          {form.watch("answers").map((answer) => (
                            <SelectItem key={answer.label} value={answer.label}>
                              {`${answer.label}. ${answer.text}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>

          <Button form="create-question-form" type="submit">
            Create quiz
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function QuestionDeleteAlertDialog({
  handleDelete,
  question,
}: Readonly<{
  handleDelete: (question: Question) => void;
  question: Question;
}>) {
  return (
    <AlertDialog>
      <TooltipCustom content="Delete question">
        <AlertDialogTrigger asChild>
          <Button size="icon" variant="destructive">
            <Trash size={18} strokeWidth={2.25} />
          </Button>
        </AlertDialogTrigger>
      </TooltipCustom>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            <span>
              {`This action cannot be undone. This will permanently delete `}
            </span>
            <span className="underline">{`${question.text}`}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(question)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function TooltipCustom({
  content,
  children,
}: Readonly<{ content: string; children: React.ReactNode }>) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
