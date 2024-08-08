import styled from "styled-components";

const Text = styled.div`
  font-family: "Inter", sans-serif;
  font-size: ${(props) => props.style.size}px;
  font-weight: ${(props) => props.style.weight};
  color: ${(props) => props.theme.colors[props.color]};
`;

export { Text };
