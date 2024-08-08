import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useParams } from "react-router-dom";
import { getTest } from "./utils/api.js";
import LoadingIcon from "./components/Loading.jsx";
import Test from "./Test.jsx";
import useFullscreen from "./utils/fullScreen.js";
import { toTitleCase } from "./utils/stringCase.js";

import Assessment from "./components/Assessment.jsx";

const TestHome = () => {
  const { currentUser } = useContext(AuthContext);
  const [test, setTest] = useState([]);
  const [istestStarted, setIstestStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { requestFullscreen } = useFullscreen();
  const { id } = useParams();
  const userId = currentUser.uid;

  useEffect(() => {
    const fetchtest = async () => {
      const test = await getTest(id);
      setTest(test);
      setIsLoading(false);
    };

    fetchtest();
  }, [id]);

  if (isLoading) {
    return <LoadingIcon />;
  }

  if (istestStarted) {
    return (
      <Test
        sections={test.sections}
        testId={id}
        userId={userId}
        duration={test.duration}
        test={test}
      />
    );
  }

  function countQuestionTypes(sections) {
    const counts = {};
    sections.forEach((section) => {
      section.questions.forEach((question) => {
        const type = toTitleCase(question.type);
        if (!counts[type]) {
          counts[type] = 1;
        } else {
          counts[type]++;
        }
      });
    });
    return counts;
  }

  const questionCounts = countQuestionTypes(test.sections);

  return (
    <Assessment
      item={test}
      onStart={() => {
        setIstestStarted(true);
        requestFullscreen();
      }}
      questionCounts={questionCounts}
    />
  );
};

export default TestHome;
