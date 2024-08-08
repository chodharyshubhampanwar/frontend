import styled from "styled-components";

export const QuestionForm = styled.form`
  box-sizing: border-box;
  box-shadow: 0 0.25rem 1rem 0 #282e3e14;
  background-color: #161b26;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 52.5rem;
  min-height: 29.25rem;
  padding: 1.5rem 2rem 1rem;
  transition: all 0.5s ease;
  width: 100%;
  @media (max-width: 768px) {
    width: 100%;
    border-radius: 0;
  }
`;

export const QuestionText = styled.p`
  font-size: 1.5em;
  color: #fff;
  margin-bottom: 20px;
`;

export const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: #edeff4;
`;

export const OptionInput = styled.input`
  margin-right: 10px;
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 1.2em;
  color: #fff;
  background-color: #0070f3;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
  &:hover {
    background-color: #0051bb;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
