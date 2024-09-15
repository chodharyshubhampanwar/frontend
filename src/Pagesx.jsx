import React from "react";
import styled from "styled-components";

const LandingPage = () => {
  const features = [
    {
      title: "Learn a new language",
      description: "Start your language journey with fun, bite-sized lessons.",
      image: "https://d3ndsbvbnbtbm9.cloudfront.net/landing-graphic-hero.svg",
    },
    {
      title: "Practice speaking",
      description:
        "Improve your pronunciation with our advanced speech recognition.",
      image: "/api/placeholder/500/300",
    },
    {
      title: "Track your progress",
      description: "See your improvement over time with detailed statistics.",
      image: "/api/placeholder/500/300",
    },
  ];

  return (
    <Container>
      <Hero>
        <HeroContent>
          <h1>Learn a language for free. Forever.</h1>
          <p>The free, fun, and effective way to learn a language!</p>
          <Button>Get started</Button>
        </HeroContent>
      </Hero>
      {features.map((feature, index) => (
        <FeatureSection key={index} reverse={index % 2 !== 0}>
          <FeatureContent>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </FeatureContent>
          <FeatureImage src={feature.image} alt={feature.title} />
        </FeatureSection>
      ))}
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Hero = styled.div`
  background-color: #100f3e;
  color: white;
  padding: 60px 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 600px;
  margin: 0 auto;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 30px;
  }
`;

const Button = styled.button`
  background-color: white;
  color: #100f3e;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const FeatureSection = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.reverse ? "row-reverse" : "row")};
  align-items: center;
  padding: 80px 0;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FeatureContent = styled.div`
  flex: 1;

  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #4b4b4b;
  }

  p {
    font-size: 1.1rem;
    color: #6f6f6f;
  }
`;

const FeatureImage = styled.img`
  flex: 1;
  max-width: 100%;
  height: auto;
  border-radius: 8px;
`;

export default LandingPage;
