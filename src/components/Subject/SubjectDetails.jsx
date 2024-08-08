// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";

// const SubjectDetails = ({ id }) => {
//   const [subject, setSubject] = useState(null);

//   console.log(subject);

//   useEffect(() => {
//     const fetchSubject = async () => {
//       const response = await axios.get(
//         `http://localhost:5000/api/subjects/${id}`
//       );
//       setSubject(response.data);
//     };

//     fetchSubject();
//   }, [id]);

//   return (
//     <div>
//       <h1>Units</h1>
//       {subject.units &&
//         subject.units.map((unit) => (
//           <div key={unit._id}>
//             {/* <Link key={unit._id} to={`/units/${unit._id}`}>
//               {unit.name}
//             </Link> */}
//           </div>
//         ))}
//     </div>
//   );
// };

// export default SubjectDetails;

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const SubjectDetails = ({ id }) => {
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/subjects/${id}`
        );
        setSubject(response.data);
      } catch (error) {
        console.error("Error fetching subject:", error);
      }
    };

    fetchSubject();
  }, [id]);

  return (
    <div>
      {subject ? (
        <div>
          <h2>Units</h2>
          {subject.units &&
            subject.units.map((unit) => (
              <div key={unit._id}>
                <Link key={unit._id} to={`/unit/${unit._id}`}>
                  {unit.name}
                </Link>
              </div>
            ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SubjectDetails;
