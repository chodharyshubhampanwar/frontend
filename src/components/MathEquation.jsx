import React, { useEffect } from "react";

const MathJaxRenderer = ({ equation, inline = false }) => {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise();
    }
  }, [equation]);

  return (
    <span>
      {inline ? (
        <span>{`\\(${equation}\\)`}</span>
      ) : (
        <div>{`\\[${equation}\\]`}</div>
      )}
    </span>
  );
};

export default MathJaxRenderer;
