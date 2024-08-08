import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getUnit } from "./utils/api";

const Unit = () => {
  const { id } = useParams();
  const [unit, setUnit] = useState([]);

  console.log(unit);

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await getUnit(id);
      setUnit(response);
    };

    fetchSubjects();
  }, [id]);

  return (
    <div>
      <h1>Chapters</h1>
      <p>{unit.name}</p>
      {unit.chapters && (
        <div>
          {unit.chapters.map((chapter) => (
            <Link key={chapter._id} to={`/chapters/${chapter._id}`}>
              {chapter.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Unit;
