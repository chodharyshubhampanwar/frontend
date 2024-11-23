import React, { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

// MathDisplay Component for rendering LaTeX equations using KaTeX
const MathDisplay = ({ math, displayMode = false }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      katex.render(math, containerRef.current, {
        throwOnError: false,
        displayMode: displayMode,
      });
    }
  }, [math, displayMode]);

  return <div ref={containerRef} />;
};

// MathEquation Component for rendering LaTeX equations with displayMode set dynamically
const MathEquation = ({ equation, inline = false }) => {
  // Use MathDisplay for rendering the LaTeX math
  return <MathDisplay math={equation} displayMode={!inline} />;
};

// Export MathEquation as the default export
export default MathEquation;
