// import React, { useEffect, useState, createRef } from "react";
// import { useParams } from "react-router-dom";
// import { convertToTimeFormat } from "./utils/time.js";
// import { LoadingSpinner } from "./styles/Spinner.js";
// import {
//   Wrapper,
//   ExamAnalysisContainer,
//   SectionAnalysisContainer,
//   Section,
// } from "./styles/ExamAnalysis.js";

// import SectionSummary from "./components/Exam/SectionSummary.jsx";
// import SectionQuestions from "./components/Exam/SectionQuestions.jsx";
// import { getExamAnalysis } from "./utils/api.js";

// const ExamAnalysis = () => {
//   const [exam, setExam] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchAnalysis = async () => {
//       try {
//         const data = await getExamAnalysis(id);
//         setExam(data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchAnalysis();
//   }, [id]);

//   const sectionRefs = Array(5)
//     .fill()
//     .map(() => createRef());

//   const buttons = [
//     { section: "exam-summary", text: "Exam Summary" },
//     { section: "sectional-summary", text: "Sectional Summary" },
//     { section: "sections", text: "Sections" },
//   ];

//   const handleButtonClick = (sectionName) => {
//     const indexMap = {
//       "exam-summary": 0,
//       "sectional-summary": 1,
//       sections: 2,
//     };
//     const index = indexMap[sectionName];
//     if (index !== undefined) {
//       sectionRefs[index].current.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   };

//   if (isLoading) {
//     return <LoadingSpinner size="48px" />;
//   }

//   console.log(JSON.stringify(exam, null, 2), "exam");

//   return (
//     <Wrapper>
//       <ExamAnalysisContainer>
//         {buttons.map((button, index) => (
//           <button key={index} onClick={() => handleButtonClick(button.section)}>
//             {button.text}
//           </button>
//         ))}
//       </ExamAnalysisContainer>

//       <SectionAnalysisContainer>
//         {exam && (
//           <>
//             <Section ref={sectionRefs[0]}>Exam Summary</Section>
//             <Section ref={sectionRefs[1]}>
//               Sections Summary
//               <SectionSummary sections={exam.analysis.sections} />
//             </Section>
//             <Section ref={sectionRefs[2]}>
//               Sections
//               {exam && <SectionQuestions data={exam} />}
//             </Section>
//           </>
//         )}
//       </SectionAnalysisContainer>
//     </Wrapper>
//   );
// };

// export default ExamAnalysis;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { convertToTimeFormat } from "./utils/time.js";
import { getExamAnalysis } from "./utils/api.js";

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const ExamAnalysisContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const NavButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }

  &:focus {
    outline: none;
  }
`;

const Section = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  color: #333;
  border-bottom: 2px solid #4caf50;
  padding-bottom: 10px;
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ExamAnalysis = () => {
  const [exam, setExam] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("exam-summary");
  const { id } = useParams();

  console.log(exam);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const data = await getExamAnalysis(id);
        setExam(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAnalysis();
  }, [id]);

  const buttons = [
    { section: "exam-summary", text: "Exam Summary" },
    { section: "sectional-summary", text: "Sectional Summary" },
    { section: "sections", text: "Sections" },
  ];

  const handleButtonClick = (sectionName) => {
    setActiveSection(sectionName);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Wrapper>
      <ExamAnalysisContainer>
        {buttons.map((button, index) => (
          <NavButton
            key={index}
            onClick={() => handleButtonClick(button.section)}
            style={{
              backgroundColor:
                activeSection === button.section ? "#45a049" : "#4CAF50",
            }}
          >
            {button.text}
          </NavButton>
        ))}
      </ExamAnalysisContainer>
      {exam && (
        <>
          {activeSection === "exam-summary" && (
            <Section>
              <SectionTitle>Exam Summary</SectionTitle>
              <p>Exam ID: {exam._id}</p>
              <p>Total Questions: {exam.totalQuestions}</p>
              <p>Duration: {convertToTimeFormat(exam.duration)}</p>
            </Section>
          )}
          {activeSection === "sectional-summary" && (
            <Section>
              <SectionTitle>Sectional Summary</SectionTitle>
              {exam.analysis.sections.map((section, index) => (
                <div key={index}>
                  <h3>{section.name}</h3>
                  <p>Correct: {section.correctAnswers}</p>
                  <p>Incorrect: {section.incorrectAnswers}</p>
                  <p>Unattempted: {section.skippedQuestions}</p>
                </div>
              ))}
            </Section>
          )}
          {activeSection === "sections" && (
            <Section>
              <SectionTitle>Sections</SectionTitle>
              {exam.analysis.sections.map((section, index) => (
                <div key={index}>
                  <h3>{section.name}</h3>
                  {section.questions.map((question, qIndex) => (
                    <div key={qIndex}>
                      <p>
                        Question {qIndex + 1}: {question.question.text}
                      </p>
                      <p>Status: {question.userAnswer}</p>
                    </div>
                  ))}
                </div>
              ))}
            </Section>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default ExamAnalysis;
