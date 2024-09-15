import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Header,
  InfoText,
  LoadingText,
  Question,
  QuestionText,
  Section,
  SectionTitle,
  StatusText,
} from "./styles/TestAnalysis";
import { getTestAnalysis } from "./utils/api";

const TestAnalysis = () => {
  const [testResult, setTestResult] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTestAnalysis(id);
        console.log(data);
        setTestResult(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!testResult) {
    return <LoadingText>Loading...</LoadingText>;
  }

  return (
    <Card>
      <Header>Test Performance Report</Header>
      <InfoText>Test ID: {testResult.testId._id}</InfoText>
      <InfoText>
        Start Time: {new Date(testResult.startTime).toLocaleString()}
      </InfoText>
      <InfoText>
        End Time: {new Date(testResult.endTime).toLocaleString()}
      </InfoText>
      {testResult.testId.sections.map((section, sectionIndex) => (
        <Section key={sectionIndex}>
          <SectionTitle>{section.title}</SectionTitle>
          {section.questions.map((question, questionIndex) => (
            <Question key={questionIndex}>
              <QuestionText>
                Question {questionIndex + 1}: {question.text}
              </QuestionText>
              {testResult.questionStatuses.map((status) =>
                status.sectionId === section._id &&
                status.questions.find((q) => q.questionId === question._id) ? (
                  <StatusText
                    key={status._id}
                    status={
                      status.questions.find(
                        (q) => q.questionId === question._id
                      ).status
                    }
                  >
                    Status:{" "}
                    {
                      status.questions.find(
                        (q) => q.questionId === question._id
                      ).status
                    }
                  </StatusText>
                ) : null
              )}
            </Question>
          ))}
        </Section>
      ))}
    </Card>
  );
};

export default TestAnalysis;
