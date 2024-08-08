// import React, { useState } from "react";
// import axios from "axios";

// const Analysis = () => {
//   const [analysis, setAnalysis] = useState(null);

//   console.log(analysis);

//   const getAnalysis = async () => {
//     try {
//       const testName = "SampleTest";
//       const id = "nko5DL1SZ7cJK36PdO9rLkH3DjQ2";
//       const response = await axios.get(`/api/tests/stats/${testName}/${id}`);
//       setAnalysis(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={getAnalysis}>Show Analysis</button>
//       {analysis && (
//         <div>
//           <p>Average Time: {analysis.avgTime}</p>
//           <p>Fastest Time: {analysis.fastestTime}</p>
//           <p>Rankings: {JSON.stringify(analysis.rankings)}</p>
//           <p>Max Score: {analysis.maxScore}</p>
//           <p>Average Score: {analysis.avgScore}</p>
//           <p>Rank Fraction: {analysis.rankFraction}</p>
//           <p>Percentile: {analysis.percentile}</p>
//           <p>Score: {analysis.userScore}</p>
//           <p>Attempts: {analysis.userAttempts} </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Analysis;
