import MathDisplay from "../Grade";

const MathEquation = ({ equation, inline = false }) => {
  return <MathDisplay math={equation} displayMode={!inline} />;
};

export default MathEquation;
