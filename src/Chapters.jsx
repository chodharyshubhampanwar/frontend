import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Quiz from "./Quiz";

const Chapters = () => {
  const { id } = useParams();
  const [unit, setUnit] = useState([]);

  console.log(unit);

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/chapters/${id}`
      );
      setUnit(response.data);
    };

    fetchSubjects();
  }, [id]);

  const isQuizCompleted =
    unit.quiz && unit.quiz.completed && unit.quiz.chapter === id;

  return (
    <div>
      <h1>Chapters</h1>
      <p>
        {unit.name} {isQuizCompleted ? "(Completed)" : "Not Completed"}
      </p>
      {unit.topics && (
        <div>
          <h2>Topics</h2>
          {unit.topics.map((topic) => (
            <Link key={topic._id} to={`/topics/${topic._id}`}>
              {topic.name}
            </Link>
          ))}
        </div>
      )}
      {unit && unit.quiz && <Quiz quiz={unit.quiz} />}
    </div>
  );
};

export default Chapters;
