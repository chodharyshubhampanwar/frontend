import React from "react";
import data from "./data.json";
import SocialLogin from "./SocialLogin";
import SubjectTabs from "./components/SubjectTab.jsx";
import {
  Container,
  HeadingContainer,
  Heading,
  HeroText,
  ImageContainer,
  StyledImage,
  FooterContainer,
} from "../src/styles/Landing.js";
import Features from "./Features.jsx";

const Landing = () => {
  return (
    <>
      <Container>
        <ImageContainer>
          <StyledImage src={data.heroImage} alt="Hero Illustration" />
        </ImageContainer>
        <HeadingContainer>
          <Heading>{data.header.title}</Heading>
          <HeroText>{data.header.description}</HeroText>
          <SocialLogin />
        </HeadingContainer>
      </Container>

      <SubjectTabs />
      <Features />
      <footer>
        <FooterContainer>
          <p>{data.footer}</p>
        </FooterContainer>
      </footer>
    </>
  );
};

export default Landing;
