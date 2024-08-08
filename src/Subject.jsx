import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const Subjects = () => {
  const [subject, setSubject] = useState({});
  const { id } = useParams();
  console.log(subject);

  useEffect(() => {
    const fetchSubject = async () => {
      const response = await axios.get(
        `https://vgbxpn1xza.execute-api.us-east-1.amazonaws.com/dev/api/subjects/${id}`
      );
      setSubject(response.data);
    };

    fetchSubject();
  }, [id]);

  return (
    <div>
      <h1>Units</h1>
      {subject.units &&
        subject.units.map((unit) => (
          <div key={unit._id}>
            <Link key={unit._id} to={`/units/${unit._id}`}>
              {unit.name}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Subjects;
