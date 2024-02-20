"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <main className="mt-12 flex min-h-screen flex-col px-24 py-6 dark:bg-zinc-950 bg-zinc-50">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Dashboard
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Welcome to the dashboard. From here you can manage your quiz.
      </p>
      <div className="mt-6">
        <Button onClick={() => router.push("/dashboard/quiz")}>
          Manage Quiz
        </Button>
      </div>
    </main>
  );
}
