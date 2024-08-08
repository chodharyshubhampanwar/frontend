// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const TestAnalysis = () => {
//   const [testResult, setTestResult] = useState(null);

//   const { id } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `https://vgbxpn1xza.execute-api.us-east-1.amazonaws.com/dev/api/testanalysis/${id}`
//         );
//         setTestResult(response.data.testResult);
//         console.log(response.data.testResult);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchData();
//   }, [id]);

//   console.log(testResult);

//   if (!testResult) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Test ID: {testResult.testId._id}</h2>
//       <p>Start Time: {new Date(testResult.startTime).toLocaleString()}</p>
//       <p>End Time: {new Date(testResult.endTime).toLocaleString()}</p>
//       {testResult.testId.sections.map((section, index) => (
//         <div key={index}>
//           <h3>Section: {section.title}</h3>
//           {section.questions.map((question, index) => (
//             <div key={index}>
//               <p>
//                 Question {index + 1}: {question.text}
//               </p>
//               {testResult.questionStatuses.map((status) =>
//                 status.sectionId === section._id &&
//                 status.questions.find((q) => q.questionId === question._id) ? (
//                   <p>
//                     Status:{" "}
//                     {
//                       status.questions.find(
//                         (q) => q.questionId === question._id
//                       ).status
//                     }
//                   </p>
//                 ) : null
//               )}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TestAnalysis;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
  max-width: 800px;
  margin: 32px auto;
`;

const Header = styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 16px;
`;

const InfoText = styled.p`
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
`;

const Section = styled.div`
  margin-top: 24px;
`;

const SectionTitle = styled.h3`
  color: #444;
  font-size: 18px;
  margin-bottom: 12px;
`;

const Question = styled.div`
  margin-bottom: 16px;
`;

const QuestionText = styled.p`
  color: #555;
  font-size: 16px;
  margin-bottom: 4px;
`;

const StatusText = styled.p`
  color: ${(props) =>
    props.status === "correct"
      ? "#4caf50"
      : props.status === "incorrect"
      ? "#f44336"
      : "#ff9800"};
  font-weight: bold;
  font-size: 14px;
`;

const LoadingText = styled.div`
  text-align: center;
  font-size: 18px;
  color: #666;
  margin-top: 32px;
`;

const TestAnalysis = () => {
  const [testResult, setTestResult] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://vgbxpn1xza.execute-api.us-east-1.amazonaws.com/dev/api/testanalysis/${id}`
        );
        setTestResult(response.data.testResult);
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
