import { Question, Quiz, QuizResult, User } from "@/types";

export const userData: User[] = [
  {
    id: 456,
    fullname: "ini akun user",
    email: "email@email.com",
    password: "pw",
    role: 2,
  }
]

export const questionData: Question[] = [
  {
    id: 1,
    quiz_id: 1,
    text: "Apa itu Pancasila?",
    answers: [
      {
        id: 1,
        text: "Pancasila adalah dasar negara Indonesia.",
        question_id: 1,
      },
      {
        id: 2,
        text: "Pancasila adalah dasar negara Indonesiaa.",
        question_id: 1,
      },
      {
        id: 3,
        text: "Pancasila adalah dasar negara Indonesiaaa.",
        question_id: 1,
      },
      {
        id: 4,
        text: "Pancasila adalah dasar negara Indonesiaaaa.",
        question_id: 1,
      },
    ],
    correct_answer: {
      id: 1,
      text: "Pancasila adalah dasar negara Indonesia.",
      question_id: 1,
    },
  },
  {
    id: 2,
    quiz_id: 1,
    text: "Kucing warna apa?",
    answers: [
      {
        id: 8,
        text: "Kucing itu warna nya biru",
        question_id: 1,
      },
      {
        id: 5,
        text: "Kucing itu warna nya merah",
        question_id: 1,
      },
      {
        id: 6,
        text: "Kucing itu warna nya kuning",
        question_id: 1,
      },
      {
        id: 7,
        text: "Kucing itu warna nya hijau",
        question_id: 1,
      },
    ],
    correct_answer: {
      id: 8,
      text: "Kucing itu warna nya biru",
      question_id: 2,
    },
  },
];

export const quizData: Quiz[] = [
  {
    id: 1,
    name: "Pendidikan Pancasila dan Kewarganegaraan",
    description:
      "Pendidikan Pancasila dan Kewarganegaraan (PPKn) adalah salah satu mata pelajaran yang wajib di Indonesia. PPKn bertujuan untuk membentuk warga negara yang memiliki pengetahuan, sikap, dan keterampilan yang baik dalam kehidupan bermasyarakat, berbangsa, dan bernegara.",
    status: "Active",
    questions: questionData,
  },
];

// export async function quizData(): Promise<Quiz[]> {
//   try {
//     const response = await fetch('https://apaan-be.000webhostapp.com/api/quiz');
//     console.log(response);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Failed to fetch quiz data', error);
//     return [];
//   }
// }

export const QuizResultData: QuizResult[] = [
]
