import styled from "styled-components";

export const Container = styled.div`
  box-sizing: border-box;
  display: grid;
  max-width: 1200px;
  grid-template-columns: 1fr 1fr;
  align-content: center;
  justify-content: center;
  padding: 0px 20px;
  margin: 2.25rem auto;
  @media (max-width: 768px) {
    margin: 0 auto 2.25rem;
    grid-template-columns: 1fr;
  }
`;

export const HeadingContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 85%;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Heading = styled.h1`
  color: rgb(32, 33, 36);
  font-size: 42px;
  font-weight: 800;
  line-height: 50px;
  letter-spacing -2.88px;
   font-family: GeistBold, sans-serif;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 28px;
    line-height: 36px;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    font-size: 32px;
    line-height: 40px;
    font-weight: 700;
  }
`;

export const HeroText = styled.p`
  color: rgb(95, 99, 104);
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5;
  font-family: GeistMedium, sans-serif;
  margin-bottom: 1.5rem;
  @media (max-width: 768px) {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }
`;

export const ImageContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const StyledImage = styled.img`
  width: 85%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const FeatureSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
`;

export const FlexItem = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  text-align: center;
`;

export const HeadingHero = styled.h2`
  font-size: 20px;
  font-weight: 600;
  font-family: GeistSemiBold, sans-serif;
  margin-bottom: 1rem;
`;

export const FooterContainer = styled.div`
  text-align: center;
  padding: 20px;
`;
