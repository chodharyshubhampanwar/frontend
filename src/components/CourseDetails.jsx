import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaArrowRight, FaBookReader } from "react-icons/fa";

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  margin-bottom: 32px;
  padding: 0 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  width: 100%;
`;

const HeadingContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Heading = styled.h2`
  font-weight: 700;
  font-family: GeistBold, sans-serif;
  font-size: 24px;
  letter-spacing -2.88px;
  line-height: 40px;
`;

const HeadingText = styled.h3`
  font-weight: 400;
   margin-bottom: 24px;
  font-family: GeistRegular, sans-serif;
  font-size: 20px;
  letter-spacing -2.88px;
  line-height: 28px;
  color: #666;
`;

const ViewLink = styled(Link)`
  color: #000000;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-weight: 700;
  font-family: GeistBold, sans-serif;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;

const Card = styled(Link)`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  transition: box-shadow 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-decoration: none;
  color: inherit;
  gap: 20px;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  font-family: GeistSemiBold, sans-serif;
  letter-spacing: -0.018em;
  line-height: 28px;
`;

const StyledImage = styled.img`
  width: 50px;
  border-radius: 50%;
  border: 1px solid #cae7ff;
`;

export const StyledIcon = styled.img`
  width: 25px;
  margin-right: 15px;
`;

const CourseDetails = ({
  heading,
  viewAllLink,
  cardData,
  description,
  icon,
}) => {
  return (
    <Container>
      <HeaderContainer>
        <HeadingContainer>
          <StyledIcon src={icon} alt="HeroIcon" />
          <Heading>{heading}</Heading>
        </HeadingContainer>
        {/* <ViewLink to={viewAllLink}>
          <FaArrowRight style={{ marginRight: "0.5rem" }} /> {"View All"}
        </ViewLink> */}
      </HeaderContainer>
      <HeadingText>{description}</HeadingText>
      <CardContainer>
        {cardData.map((card, index) => (
          <Card to={card.link} key={index}>
            <StyledImage src={card.image} alt="Hero Illustration" />
            <CardTitle>{card.title}</CardTitle>
          </Card>
        ))}
      </CardContainer>
    </Container>
  );
};

export default CourseDetails;
