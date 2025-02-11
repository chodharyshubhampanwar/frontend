import SignIn from "../components/SignIn";
import Paths from "../components/Paths";
import NavBar from "../components/Navbar";

export const Landing = () => {
  return (
    <div>
      <NavBar />
      <Paths />
      <SignIn />
    </div>
  );
};
