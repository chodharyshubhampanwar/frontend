import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getTopics } from "./utils/api";

const Topic = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await getTopics(id);
      setTopic(response);
    };

    fetchSubjects();
  }, [id]);

  return (
    <div>
      <h1>Topic</h1>
      {topic.name}
    </div>
  );
};

export default Topic;
