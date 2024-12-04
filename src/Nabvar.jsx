import React, { useState } from "react";
import { FaBars, FaTimes, FaAngleDown } from "react-icons/fa";
import styled from "styled-components";
import DiscordButton from "./components/DiscordButton.jsx";
import MobileNavbar from "../src/components/Navbar.jsx";

const menuItems = [
  {
    name: "K-12",
    path: "/school",
    subItems: [
      { name: "9-10", path: "/foundations" },
      { name: "Commerce", path: "/commerce" },
      { name: "Science", path: "/science" },
      { name: "Humanities", path: "/humanities" },
    ],
  },
  {
    name: "Competitive",
    path: "/competitive",
    subItems: [
      { name: "IIT-JEE", path: "/iit-jee" },
      { name: "NEET", path: "/neet" },
      { name: "CUET", path: "/cuet" },
    ],
  },
  {
    name: "Govt",
    path: "/jobs",
    subItems: [
      { name: "Bank", path: "/bank" },
      { name: "Railways", path: "/questions" },
      { name: "UPSC", path: "/solutions" },
    ],
  },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const logo =
    "https://res.cloudinary.com/melenqli/image/upload/v1732365564/eo651wwkxskcscjkzq9r.svg";

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleMouseEnter = (index) => {
    setActiveItem(index);
  };

  const handleMouseLeave = () => {
    setActiveItem(null);
  };

  const renderMenuItems = () => {
    return menuItems.map((item, index) => (
      <NavItem
        key={item.name}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
      >
        <NavLink href={item.path}>
          {item.name}
          {item.subItems && <FaAngleDown style={{ marginLeft: "0.5rem" }} />}
        </NavLink>
        {item.subItems && index === activeItem && (
          <Dropdown>
            {item.subItems.map((subItem) => (
              <DropdownItem key={subItem.name}>
                <DropdownLink href={subItem.path}>{subItem.name}</DropdownLink>
              </DropdownItem>
            ))}
          </Dropdown>
        )}
      </NavItem>
    ));
  };

  return (
    <NavbarContainer>
      <Desktop>
        <a href="/">
          <Logo src={logo} alt="logo" />
        </a>
        <NavItems>{renderMenuItems()}</NavItems>
        <DiscordButton />

        <MenuIcon onClick={handleMenuClick}>
          {showMenu ? <FaTimes /> : <FaBars />}
        </MenuIcon>
      </Desktop>

      <Mobile>
        <MobileNavbar />
      </Mobile>
    </NavbarContainer>
  );
};

export default Navbar;

const NavbarContainer = styled.nav`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 1fr;
  color: #303030;
  margin: auto;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
`;

const Desktop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Mobile = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;

const Logo = styled.img`
  height: 25px;
  @media (max-width: 768px) {
    height: 25px;
  }
`;

const NavItems = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  list-style-type: none;
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #303030;
  padding: 0.5rem;
`;

const NavItem = styled.li`
  position: relative;
  margin: 0 1rem;
  list-style-type: none;
  &:hover > ul {
    display: flex;
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  display: none;
  flex-direction: column;
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: #333;

  &:hover {
    display: flex;
  }

  transition: display 0.3s ease;
`;

const DropdownItem = styled.li`
  margin: 0;
`;

const DropdownLink = styled.a`
  display: block;
  text-decoration: none;
  color: #fff;
  padding: 0.5rem;
`;

const MenuIcon = styled.div`
  display: none;
  font-size: 2rem;

  @media (max-width: 768px) {
    display: block;
  }
`;
