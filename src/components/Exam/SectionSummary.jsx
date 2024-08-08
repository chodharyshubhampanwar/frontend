import React from "react";

// const SectionSummary = ({ section }) => (
//   <table>
//     <thead>
//       <tr>
//         <th>Section Name</th>
//         <th>Score</th>
//         <th>Attempted</th>
//         <th>Accuracy</th>
//         <th>Time</th>
//       </tr>
//     </thead>
//     <tbody>
//       <tr>
//         <td>{section.name}</td>
//         <td>{section.totalScore}</td>
//         <td>
//           {section.attemptedQuestions}/{section.totalQuestions}
//         </td>
//         <td>{`${section.accuracy}%`}</td>
//         <td>{section.totalTimeTaken}</td>
//       </tr>
//     </tbody>
//   </table>
// );

// export default SectionSummary;

const SectionSummary = ({ sections }) => {
  const overallData = sections.reduce(
    (acc, section) => {
      acc.totalScore += section.totalScore;
      acc.totalAttemptedQuestions += section.attemptedQuestions;
      acc.totalQuestions += section.totalQuestions;
      acc.totalAccuracy += section.accuracy;
      acc.totalTimeTaken += section.totalTimeTaken;
      return acc;
    },
    {
      totalScore: 0,
      totalAttemptedQuestions: 0,
      totalQuestions: 0,
      totalAccuracy: 0,
      totalTimeTaken: 0,
    }
  );

  overallData.averageAccuracy = overallData.totalAccuracy / sections.length;

  return (
    <table>
      <thead>
        <tr>
          <th>Section Name</th>
          <th>Score</th>
          <th>Attempted</th>
          <th>Accuracy</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {sections.map((section, index) => (
          <tr key={index}>
            <td>{section.name}</td>
            <td>{section.totalScore}</td>
            <td>
              {section.attemptedQuestions}/{section.totalQuestions}
            </td>
            <td>{`${section.accuracy}%`}</td>
            <td>{section.totalTimeTaken}</td>
          </tr>
        ))}
        <tr>
          <td>Overall</td>
          <td>{overallData.totalScore}</td>
          <td>
            {overallData.totalAttemptedQuestions}/{overallData.totalQuestions}
          </td>
          <td>{`${overallData.averageAccuracy}%`}</td>
          <td>{overallData.totalTimeTaken}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default SectionSummary;
