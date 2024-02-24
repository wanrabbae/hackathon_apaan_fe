/**
 * Quiz
 */
export interface Quiz {
  description?: string;
  id?: number;
  name?: string;
  questions?: number | Question[];
  /**
   * Active / Inactive
   */
  status?: "Active" | "Inactive";
  [property: string]: any;
}

/**
 * Answer
 */
export interface Answer {
  id: number;
  question_id: number | Question;
  text: string;
  [property: string]: any;
}

/**
 * Question
 */
export interface Question {
  answers: Answer[];
  correct_answer: Answer;
  id: number;
  quiz_id: string | Quiz;
  text: string;
  [property: string]: any;
}

export interface User {
  email: string;
  fullname: string;
  id: number;
  password: string;
  role: number;
  [property: string]: any;
}

export interface QuizResult {
  id: number;
  grade: number;
  correct_questions?: Question[];
  wrong_questions?: Question[];
  chosen_answers?: Answer[];
  quiz_id: Quiz;
  user_id: User;
  [property: string]: any;
}
