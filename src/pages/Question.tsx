import React from "react";
import { useParams } from "react-router-dom";
import { useQuestion } from "@/hooks/useQuestion";
import { useQuestionStore } from "@/store/questionStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookmarkIcon, BookOpen } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

export const QuestionView: React.FC = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const { data: question, isLoading } = useQuestion(questionId);
  const { setAnswer, toggleMarkQuestion } = useQuestionStore();

  const breadcrumbItems = [
    {
      label: "Questions",
      href: "/questions",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      label: question?.subject || "",
      href: `/questions/subject/${question?.subject}`,
    },
    {
      label: question?.topic || "",
      href: `/questions/topic/${question?.topic}`,
    },
  ];

  if (isLoading || !question) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <Breadcrumbs
        items={breadcrumbItems}
        className="bg-white/60 backdrop-blur-sm p-2 rounded-lg shadow-sm"
      />
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-x-2">
            <Badge variant="outline">{question.subject}</Badge>
            <Badge variant="outline">{question.topic}</Badge>
            <Badge
              className={
                question.difficulty === "Easy"
                  ? "bg-green-100 text-green-800"
                  : question.difficulty === "Medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }
            >
              {question.difficulty}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleMarkQuestion(question.id)}
            className={"text-yellow-500"}
          >
            <BookmarkIcon className="h-5 w-5" />
          </Button>
        </div>
        <CardTitle className="text-xl font-semibold">
          {question.content}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(question.options).map(([key, value]) => (
            <Button
              key={key}
              variant={"outline"}
              className="w-full p-4 h-auto text-left justify-start"
              onClick={() => setAnswer(question.id, key)}
            >
              <span className="mr-4">{key}.</span>
              {value}
            </Button>
          ))}
        </div>

        {question.explanation && (
          <div className="mt-4 space-y-2">
            <h3 className="text-lg font-semibold">Explanation:</h3>
            <p className="text-sm text-gray-600">{question.explanation}</p>
          </div>
        )}

        {question.steps && question.steps.length > 0 && (
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold">Solution Steps:</h3>
            {question.steps.map((step) => (
              <div key={step.id} className="space-y-2">
                <p className="text-sm text-gray-600">Step {step.order}</p>
                <p>{step.content}</p>
                {step.imageUrl && (
                  <img
                    src={step.imageUrl}
                    alt={`Step ${step.order}`}
                    className="rounded-lg max-w-full h-auto"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-500">
            Marks: {question.marks} | Negative Marks: {question.negativeMarks}
          </div>
          <div className="space-x-2">
            <Button variant="outline">Previous</Button>
            <Button>Next</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionView;
