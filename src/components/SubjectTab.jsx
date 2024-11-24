import React from "react";
import styled from "styled-components";
import { TbSettings } from "react-icons/tb";
import {
  PiDnaBold,
  PiMathOperationsBold,
  PiChatCircleDotsBold,
  PiComputerTowerBold,
  PiDotsNineBold,
  PiHeartbeatBold,
  PiPaintBrushBold,
  PiSuitcaseSimpleBold,
} from "react-icons/pi";
import { ImAccessibility } from "react-icons/im";
import { RiGovernmentLine } from "react-icons/ri";

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

// const IconWrapper = styled.img`
//   width: 25px;
//   margin-bottom: 10px;
// `;

const IconWrapper = styled.div`
  font-size: 32px; /* Adjust the size of the icon */
  margin-bottom: 10px;
  color: #687b8c;
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
      icon: <PiDotsNineBold />,
    },
    {
      name: "Math",
      link: "/math",
      icon: <PiMathOperationsBold />,
    },
    {
      name: "Science",
      icon: <PiDnaBold />,
      link: "/english",
    },
    {
      name: "English",
      icon: <PiChatCircleDotsBold />,
      link: "/subject/english",
    },
    {
      name: "Computer",
      icon: <PiComputerTowerBold />,
      link: "/subject/cs",
    },
    {
      name: "Social",
      icon: <RiGovernmentLine />,
      link: "/social-science",
    },
    {
      name: "Humanities",
      icon: <ImAccessibility />,
      link: "/subject/cs",
    },
    {
      name: "Engineering",
      icon: <TbSettings />,
      link: "/english",
    },
    {
      name: "Business",
      icon: <PiSuitcaseSimpleBold />,
      link: "/subject/cs",
    },
    {
      name: "Creative",
      icon: <PiPaintBrushBold />,
      link: "/english",
    },
    {
      name: "Lifestyle",
      icon: <PiHeartbeatBold />,
      link: "/subject/cs",
    },
  ];

  return (
    <Container>
      {subjects.map((subject, index) => (
        <Tab to={subject.link} key={index}>
          {/* <IconWrapper src={subject.icon} alt="subject icon" />
           */}
          <IconWrapper>{subject.icon}</IconWrapper>
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
