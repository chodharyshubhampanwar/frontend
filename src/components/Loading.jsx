import styled from "styled-components";
import { TbLoader } from "react-icons/tb";

const LoadingIcon = styled(TbLoader)`
  display: block;
  margin: 0 auto;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loading = () => {
  return <LoadingIcon size={"2rem"} />;
};
export default Loading;
