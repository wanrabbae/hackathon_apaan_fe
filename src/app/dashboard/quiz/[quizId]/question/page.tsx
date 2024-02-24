"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Trash, Pencil, Plus } from "lucide-react";
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
// import { quizData, questionData } from "@/lib/data";
import { Answer } from "@/types";
import { createQuestion, deleteQuestion, getQuizById } from "@/api/quiz_api";

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
  const [quiz, setQuiz] = useState<any>();
  const [questions, setQuestions] = useState<any>([]);

  const inAwait = async () => {
    const quizData = await getQuizById(params.quizId);
    setQuiz(quizData.data);
    setQuestions(quizData.data.questions);
  };

  useEffect(() => {
    inAwait();
  }, []);

  const handleCreate = async (newQuestionRaw: any) => {
   try {
    newQuestionRaw.quiz_id = params.quizId;
    const response = await createQuestion(newQuestionRaw);
    const newQuestion = response.data.question;
    setQuestions([...questions, newQuestion]);
   } catch (error) {
      console.log(error);
      alert("Ups something went wrong")
    }
  };

  const handleEdit = (
    editedQuestionRaw: z.infer<typeof QuestionFormSchema>,
    correctAnswerRaw: string,
    prevQuestion: any
  ) => {
    console.log("edit");
    
  };

  const handleDelete = async (question: any) => {
    try {
      const response = await deleteQuestion(question.id);
      const newQuestions = questions.filter((q: any) => q.id !== response.data.question.id);
      setQuestions(newQuestions);
    } catch (error) {
      console.log(error);
      alert("Ups something went wrong")
    }
  };

  return (
    <main className="mt-12 flex min-h-screen flex-col px-24 py-6 dark:bg-zinc-950 bg-zinc-50">
      <div className="flex justify-between border-b pb-2 mt-3">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          { quiz ? quiz.name : "Quiz not found"}
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
          {questions.map((question: any) => (
            <TableRow key={question.id}>
              <TableCell>{question.id}</TableCell>
              <TableCell>{question.text}</TableCell>
              <TableCell>
                <div className="flex gap-3 justify-end">
                  {/* <QuestionEditDialog
                    handleEdit={handleEdit}
                    question={question}
                  /> */}
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
  });
  const [open, setOpen] = useState(false);
  const [answersList, setAnswersList] = useState<any>([]);

  const onSubmit = (data: any, answersList: any) => {
    data.answers = answersList;
    handleCreate(data);
    setOpen(false);
  };

  const addAnswerList = () => {
    setAnswersList([...answersList, { text: "" }]);
  }

  const deleteAnswerList = (index: any) => {
    const newAnswersList = answersList.filter((_: any, i: any) => i !== index);
    setAnswersList(newAnswersList);
  }

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
            onSubmit={(e) => {e.preventDefault(); onSubmit(form.getValues(), answersList)}}
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
                        <Input required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4">
                    {answersList.map((answer: any, index: any) => (
                       <div className="flex w-full align-middle items-end">
                        <div className="flex-grow">
                        <FormField
                       control={form.control}
                       name={`answers.${index}.text`}
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>
                             <Badge className="rounded-full" variant="secondary">
                               Option {index + 1}
                             </Badge>
                           </FormLabel>
                           <FormControl>
                             <Input required {...field} value={answer.text} onChange={
                            (e) => {
                              const newAnswersList = [...answersList];
                              newAnswersList[index].text = e.target.value;
                              setAnswersList(newAnswersList);
                            }} />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                        </div>
                     {/* button trash */}
                      <Button size={"sm"} type="button" className="ml-2" variant="destructive" onClick={() => deleteAnswerList(index)}><Trash /></Button>
                       </div>
                    ))}
              <Button size={"sm"} type="button" onClick={() => addAnswerList()}><Plus /> Add Answer</Button>
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
                        defaultValue={`${field.value ?? ""}`}
                      >
                        <SelectTrigger id="select-correct-answer">
                          <SelectValue placeholder="Select correct answer" />
                        </SelectTrigger>
                        <SelectContent>
                          {answersList.length > 0 && answersList.filter((answer: any) => answer.text !== "").map((answer: any, index: number) => (
                            <SelectItem key={index} value={answer.text}>
                              {answer.text}
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
            Create question
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// (ALWAN) SUMPAH DAH GABISA BANGET INI KALO MAU PKE FITUR EDIT, MENDING DI HIDE AJA DAH
function QuestionEditDialog({
  handleEdit,
  question,
}: Readonly<{
  handleEdit: (
    data: z.infer<typeof QuestionFormSchema>,
    correctAnswer: string,
    prevQuestion: any
  ) => void;
  question: any;
}>) {
  const answers = question.answers;
  const correctAnswer = question.correct_answer;
  const form = useForm<z.infer<typeof QuestionFormSchema>>({
    resolver: zodResolver(QuestionFormSchema),
  });
  const [open, setOpen] = useState(false);
  const [answersList, setAnswersList] = useState<any>(answers);
  const [correctAnswerState, setCorrectAnswer] = useState<any>(correctAnswer);

  useEffect(() => {
    setAnswersList(question.answers);
    setCorrectAnswer(question.correct_answer);
  }, [question]);  

  const onSubmit = (data: any) => {
    console.log(data);
      
    // handleEdit(data, correctAnswer, question);
    // setOpen(false);
  };

  const addAnswerList = () => {
    setAnswersList([...answersList, { text: "" }]);
  }

  const deleteAnswerList = (index: any) => {
    const newAnswersList = answersList.filter((_: any, i: any) => i !== index);
    setAnswersList(newAnswersList);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipCustom content="Edit question">
        <DialogTrigger asChild>
          <Button size="icon" variant="default">
            <Pencil size={18} strokeWidth={2.25} />
          </Button>
        </DialogTrigger>
      </TooltipCustom>
      <DialogContent className="overflow-y-auto max-h-screen min-w-[75vw] lg:min-w-[50vw]">
        <DialogHeader>
          <DialogTitle>Edit Question</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form id="edit-question-form" onSubmit={(e) => {e.preventDefault(); onSubmit(form.getValues())}}>
            <div className="grid gap-8 py-4">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question</FormLabel>
                      <FormControl>
                        <Input {...field} defaultValue={question.text} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4">
               
               {
                  answersList.map((answer: any, index: any) => (
                    <div className="flex w-full align-middle items-end">
                      <div className="flex-grow">
                      <FormField
                    control={form.control}
                    name={`answers.${index}.text`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <Badge className="rounded-full" variant="secondary">
                            Option {index + 1}
                          </Badge>
                        </FormLabel>
                        <FormControl>
                          <Input required {...field} value={answer.text} onChange={
                          (e) => {
                            const newAnswersList = [...answersList];
                            newAnswersList[index].text = e.target.value;
                            setAnswersList(newAnswersList);
                          }} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                      </div>
                  {/* button trash */}
                    <Button size={"sm"} type="button" className="ml-2" variant="destructive" onClick={() => deleteAnswerList(index)}><Trash /></Button>
                    </div>
                  ))
               }

              </div>
                {/* button for add more answer */}
                <Button size={"sm"} onClick={() => addAnswerList()} type="button"><Plus /> Add Answer</Button>

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
                        defaultValue={answersList.find((answer: any) => answer.id === correctAnswerState)?.text ?? ""}
                      >
                        <SelectTrigger id="select-correct-answer">
                          <SelectValue placeholder="Select correct answer" />
                        </SelectTrigger>
                        <SelectContent>
                          {answersList.length > 0 && answersList.filter((answer: any) => answer.text !== "").map((answer: any, index: number) => (
                            <SelectItem key={index} value={answer.text}>
                              {answer.text}
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

          <Button form="edit-question-form" type="submit">
            Save changes
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
  handleDelete: (question: any) => void;
  question: any;
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
