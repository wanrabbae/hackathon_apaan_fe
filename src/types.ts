/**
 * Quiz
 */
export interface Quiz {
  description?: string;
  id: number;
  name: string;
  questions?: number | Question[];
  /**
   * Active / Inactive
   */
  status: "Active" | "Inactive";
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
  answers?: number[] | Answer[];
  correct_answer?: number | Answer;
  id: number;
  quiz_id: number | Quiz;
  text: string;
  [property: string]: any;
}

export interface User {
  email: string;
  fullname: string;
  /**
   * ID
   */
  id: number;
  password: string;
  role: number;
  [property: string]: any;
}

export interface QuizResult {
  chosen_answers?: Answer[];
  correct_questions?: Question[];
  grade: number;
  id: number;
  quiz_id: Quiz;
  user_id: User;
  wrong_questions?: Question[];
  [property: string]: any;
}