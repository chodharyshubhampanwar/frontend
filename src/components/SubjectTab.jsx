import React from "react";
import styled from "styled-components";
import { FaCalculator, FaMicroscope, FaBookReader } from "react-icons/fa";
import { Link } from "react-router-dom";

const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  grid-column-gap: 16px;
  justify-items: center;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 2.25rem;
  overflow-y: hidden;
  overflow-x: auto;
`;

const Tab = styled(Link)`
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 20px 0;
  text-decoration: none;
`;

const IconWrapper = styled.img`
  width: 25px;
  margin-bottom: 10px;
`;

const TabTitle = styled.span`
  display: flex;
  color: #687b8c;
  font-weight: 700;
  font-size: 14px;
  font-family: GeistRegular, sans-serif;
  text-align: center;
  text-decoration: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover {
    text-decoration: underline;
  }
`;

const SubjectTabs = () => {
  const subjects = [
    {
      name: "All",
      link: "/subject/all",
      icon: "https://d3ndsbvbnbtbm9.cloudfront.net/all-subjects-icon.svg",
    },
    {
      name: "Math",
      link: "/math",
      icon: "https://d3ndsbvbnbtbm9.cloudfront.net/maths-subject-icon.svg",
    },
    {
      name: "Science",
      icon: "https://d3ndsbvbnbtbm9.cloudfront.net/sciences-icon.svg",
      link: "/english",
    },
    {
      name: "English",
      icon: "https://d3ndsbvbnbtbm9.cloudfront.net/english-subject-icon.svg",
      link: "/subject/english",
    },
    {
      name: "Computer",
      icon: "https://d3ndsbvbnbtbm9.cloudfront.net/programming-ai-icon.svg",
      link: "/subject/cs",
    },
    {
      name: "Social",
      icon: "https://d3ndsbvbnbtbm9.cloudfront.net/social-sc-icon.svg",
      link: "/english",
    },
    {
      name: "Humanities",
      icon: "https://d3ndsbvbnbtbm9.cloudfront.net/humanities-icon.svg",
      link: "/subject/cs",
    },
    {
      name: "Engineering",
      icon: "https://d3ndsbvbnbtbm9.cloudfront.net/engineering-icon.svg",
      link: "/english",
    },
    {
      name: "Business",
      icon: "https://d3ndsbvbnbtbm9.cloudfront.net/business-icon.svg",
      link: "/subject/cs",
    },
    {
      name: "Creative",
      icon: "https://d3ndsbvbnbtbm9.cloudfront.net/arts-icon.svg",
      link: "/english",
    },
    {
      name: "Lifestyle",
      icon: "https://d3ndsbvbnbtbm9.cloudfront.net/personality-icon.svg",
      link: "/subject/cs",
    },
  ];

  return (
    <Container>
      {subjects.map((subject, index) => (
        <Tab to={subject.link} key={index}>
          <IconWrapper src={subject.icon} alt="subject icon" />
          <TabTitle>{subject.name}</TabTitle>
        </Tab>
      ))}
    </Container>
  );
};

export default SubjectTabs;

//  &:hover {
//     background-color: #e0e0e0;
//   }
