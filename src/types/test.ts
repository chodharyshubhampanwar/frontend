export interface Option {
  a: string;
  b: string;
  c: string;
  d: string;
}

export interface Question {
  id: string;
  content: string;
  options: Option;
  correctAnswer: keyof Option;
  explanation: string;
  marks: number;
  negativeMarks: number;
  sectionId: string;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface MockTest {
  id: string;
  title: string;
  description: string;
  duration: number;
  sections: Section[];
  createdAt: string;
  updatedAt: string;
}

export interface UserAnswer {
  questionId: string;
  selectedOption?: keyof Option;
  isMarked: boolean;
}

export interface TestResult {
  correct: number;
  incorrect: number;
  unanswered: number;
  totalMarks: number;
  negativeMarks: number;
  finalScore: number;
}
