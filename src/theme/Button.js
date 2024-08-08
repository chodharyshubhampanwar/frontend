import styled from "styled-components";

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.button};
  color: white;
  padding: ${(props) => {
    switch (props.size) {
      case "small":
        return "5px 10px";
      case "medium":
        return "10px 20px";
      case "large":
        return "15px 30px";
      default:
        return "10px 20px";
    }
  }};
  border: none;
  border-radius: 5px;
  font-size: ${(props) => {
    switch (props.size) {
      case "small":
        return "12px";
      case "medium":
        return "16px";
      case "large":
        return "20px";
      default:
        return "16px";
    }
  }};
`;

export default Button;
