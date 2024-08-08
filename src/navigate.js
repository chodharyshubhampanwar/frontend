import { useNavigate } from "react-router-dom";

export function useNavigation() {
  const navigate = useNavigate();

  const goToPaths = () => {
    navigate("/paths");
  };

  return {
    goToPaths,
  };
}
