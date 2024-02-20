"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 dark:bg-zinc-950 bg-zinc-50">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-5xl font-bold text-center dark:text-zinc-50">
          Welcome to Quiz App
        </h1>
      </div>
      <div className="flex gap-3">
        <Button onClick={() => router.push("/quiz")}>
          Attempt Quiz
        </Button>
        <Button variant={"secondary"} onClick={() => router.push("/dashboard")}>
          Go to Dashboard
        </Button>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <p className="text-xl text-center dark:text-zinc-50">
          Quiz App is a platform to create and manage quizzes.
        </p>
        <p className="text-xl text-center dark:text-zinc-50">
          Get started by creating a new quiz or taking a quiz.
        </p>
      </div>
    </main>
  );
}
