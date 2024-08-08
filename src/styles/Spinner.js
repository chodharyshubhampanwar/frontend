import styled, { css } from "styled-components";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Spinner = styled(AiOutlineLoading3Quarters)`
  animation: spin 2s linear infinite;
  height: ${(props) => props.size || "48px"};
  width: ${(props) => props.size || "48px"};
  color: blue;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  ${Spinner} {
    ${(props) =>
      props.size &&
      css`
        height: ${props.size};
        width: ${props.size};
      `}
  }
`;

export const LoadingSpinner = ({ size }) => (
  <SpinnerContainer size={size}>
    <Spinner />
  </SpinnerContainer>
);
