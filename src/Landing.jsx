import React from "react";
import data from "./data.json";
import landingPageContent from "./services/landingPageContent.json";
import SocialLogin from "./SocialLogin";
import { learn, assessment, resources } from "../src/services/CourseContent.js";
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
import CourseDetails from "../src/components/CourseDetails.jsx";

const { learning, assessments, tools } = landingPageContent;

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

      <CourseDetails
        heading="Learn"
        viewAllLink="/learn"
        cardData={learn}
        description={learning.description}
        icon={learning.iconImage}
      />

      <CourseDetails
        heading="Practice"
        viewAllLink="/test"
        cardData={assessment}
        description={assessments.description}
        icon={assessments.iconImage}
      />
      <CourseDetails
        heading="Improve"
        viewAllLink="/practice"
        cardData={resources}
        description={tools.description}
        icon={tools.iconImage}
      />
      <footer>
        <FooterContainer>
          <p>{data.footer}</p>
        </FooterContainer>
      </footer>
    </>
  );
};

export default Landing;
