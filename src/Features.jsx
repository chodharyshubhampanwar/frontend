import React from "react";
import styled from "styled-components";
import {
  PiQuestionBold,
  PiExamBold,
  PiPencilFill,
  PiNoteBold,
} from "react-icons/pi";

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const Grid = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  max-width: 1200px;
  padding: 0 20px;
`;

const Box = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  text-align: center;
  background: ${({ gradient }) => gradient};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledIcon = styled.div`
  font-size: 36px;
  margin-top: 8px;
`;

const Features = () => {
  const items = [
    {
      text: "Mock Test",
      icon: <PiExamBold />,
      gradient: "linear-gradient(to bottom right, #4285F4,#4285F4)",
    },
    {
      text: "Quiz",
      icon: <PiQuestionBold />,
      gradient: "linear-gradient(to bottom right,#A50E0E,#EA4335)",
    },
    {
      text: "PYQP'S",
      icon: <PiPencilFill />,
      gradient: "linear-gradient(to bottom right, #E37400, #FBBC04)",
    },
    {
      text: "Notes",
      icon: <PiNoteBold />,
      gradient: "linear-gradient(to bottom right, #0D652D, #34A853)",
    },
  ];

  return (
    <Grid>
      {items.map((item, index) => (
        <Box key={index} gradient={item.gradient}>
          {item.text}
          <StyledIcon>{item.icon}</StyledIcon>
        </Box>
      ))}
    </Grid>
  );
};

export default Features;
