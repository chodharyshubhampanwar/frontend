import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  NavbarContainer,
  Hamburger,
  Sidebar,
  CloseButton,
  Logo,
  StyledLink,
} from "./../styles/Navbar.js";
import DiscordButton from "./DiscordButton.jsx";

const MobileNavbar = () => {
  const [open, setOpen] = useState(false);
  const logo = "https://d3ndsbvbnbtbm9.cloudfront.net/leikhub-web-logo.svg";

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <NavbarContainer>
      <Hamburger onClick={() => setOpen(!open)} />
      <Link to="/">
        <Logo src={logo} alt="logo" />
      </Link>
      <DiscordButton />
      <Sidebar open={open}>
        <CloseButton onClick={() => setOpen(false)} />
        <StyledLink to="/courses" onClick={handleLinkClick}>
          Courses
        </StyledLink>
        <StyledLink to="/exams" onClick={handleLinkClick}>
          Exams
        </StyledLink>
        <StyledLink to="/tests" onClick={handleLinkClick}>
          Tests
        </StyledLink>
        <StyledLink to="/quizzes" onClick={handleLinkClick}>
          Quizzes
        </StyledLink>
      </Sidebar>
    </NavbarContainer>
  );
};

export default MobileNavbar;
