"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash, Pencil, Settings, Save, Copy } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Quiz } from "@/types";
import { quizData } from "@/lib/data";
import { createQuiz, deleteQuiz, getQuiz, updateQuiz } from "@/api/quiz_api";

const EditFormSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(255, {
      message: "Name must be at most 255 characters.",
    }),
  description: z.string().optional(),
  status: z.enum(["Active", "Inactive"]),
});

export default function DashboardQuizPage() {
  const [quizzes, setQuizzes] = useState(quizData);
  const router = useRouter();

  const inAwait = async () => {
    const quizData = await getQuiz();
    setQuizzes(quizData.data);
  };

  useEffect(() => {
    inAwait();
  }, []);

  const handleCreate = async (newQuiz: Quiz) => {
    delete newQuiz["id"];
    try {
      const response = await createQuiz(newQuiz);
      setQuizzes((prevState) => [response.data.quiz, ...prevState]);
    } catch (error) {
      alert("Ups something went wrong!")
    }
  };

  const handleSave = async (selectedQuiz: Quiz) => {
    // (ALWAN) ENTAH KENAPA KLO console.log(selectedQuiz) JADI KOSONG (KOCAKK)
    const quizID = `${selectedQuiz.id}`;
    delete selectedQuiz["id"];

    try {
      const response = await updateQuiz(quizID, selectedQuiz);
      setQuizzes((prevState) =>
        prevState.map((q) => (q.id === selectedQuiz.id ? response.data?.quiz : q))
      );
    } catch (error) {
      alert("Ups something went wrong!")
    }
  };

  const handleDelete = async (selectedQuiz: Quiz) => {
    try {
      await deleteQuiz(`${selectedQuiz.id}`);
      setQuizzes((prevState) =>
        prevState.filter((q) => q.id !== selectedQuiz.id)
      );
    } catch (error) {
      alert("Ups something went wrong!")
    }
  };

  return (
    <main className="mt-12 flex min-h-screen flex-col px-24 py-6 dark:bg-zinc-950 bg-zinc-50">
      <div className="flex justify-between border-b pb-2 mt-3">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          Quiz
        </h2>
        <QuizCreateDialog handleCreate={handleCreate} />
      </div>
      <Table className="mt-3">
        <TableCaption>
          {`${quizzes ? quizzes.length || 0 : 0} Quizzes`}
          {quizzes && quizzes.length > 0 ? " found" : ""}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-32">Status</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Quiz Code</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quizzes?.map((quiz) => (
            <TableRow key={quiz.id}>
              <TableCell>{quiz.status}</TableCell>
              <TableCell>{quiz.name}</TableCell>
              <TableCell>{ quiz.id} <Button size={"sm"} onClick={() => navigator.clipboard.writeText(`${quiz.id}`)}><Copy size={14} strokeWidth={2.25} /></Button></TableCell>
              <TableCell>
                <div className="flex gap-3 justify-end">
                  <TooltipCustom content="Manage Questions">
                    <Button
                      size="icon"
                      variant="default"
                      onClick={() =>
                        router.push(`/dashboard/quiz/${quiz.id}/question`)
                      }
                    >
                      <Pencil size={18} strokeWidth={2.25} />
                    </Button>
                  </TooltipCustom>
                  <QuizEditDialog handleSave={handleSave} quiz={quiz} />
                  <QuizDeleteAlertDialog
                    handleDelete={handleDelete}
                    quiz={quiz}
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

function QuizCreateDialog({
  handleCreate,
}: Readonly<{
  handleCreate: (quiz: Quiz) => void;
}>) {
  const form = useForm<z.infer<typeof EditFormSchema>>({
    resolver: zodResolver(EditFormSchema),
    defaultValues: {
      id: Math.floor(Math.random() * 100000) + 1,
      status: "Active",
    },
  });
  const [open, setOpen] = useState(false);

  const onSubmit = (data: z.infer<typeof EditFormSchema>) => {
    handleCreate(data);
    form.reset({
      id: Math.floor(Math.random() * 100000) + 1,
      name: "",
      description: "",
      status: "Active",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New Quiz</Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle>Create New Quiz</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form id="create-quiz-form" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-8 py-4">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>

          <Button form="create-quiz-form" type="submit">
            Create quiz
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function QuizEditDialog({
  handleSave,
  quiz,
}: Readonly<{
  handleSave: (quiz: Quiz) => void;
  quiz: Quiz;
}>) {
  const form = useForm<z.infer<typeof EditFormSchema>>({
    resolver: zodResolver(EditFormSchema),
    defaultValues: {
      id: quiz.id,
      name: quiz.name,
      description: quiz.description,
      status: quiz.status,
    },
  });
  const [open, setOpen] = useState(false);

  const onSubmit = (data: z.infer<typeof EditFormSchema>) => {
    handleSave(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipCustom content="Edit Quiz">
        <DialogTrigger asChild>
          <Button size="icon" variant="secondary">
            <Settings size={18} strokeWidth={2.25} />
          </Button>
        </DialogTrigger>
      </TooltipCustom>
      <DialogContent className="overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle>Edit Quiz</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form id="edit-quiz-form" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-8 py-4">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>

          <Button form="edit-quiz-form" type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function QuizDeleteAlertDialog({
  handleDelete,
  quiz,
}: Readonly<{
  handleDelete: (quiz: Quiz) => void;
  quiz: Quiz;
}>) {
  return (
    <AlertDialog>
      <TooltipCustom content="Delete Quiz">
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
            <span className="underline">{`${quiz.name}`}</span>
            <span>{` and all of its related questions.`}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(quiz)}>
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
