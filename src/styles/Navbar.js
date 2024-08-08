import { Link } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineClose } from "react-icons/md";
import { HiMenu } from "react-icons/hi";

export const NavbarContainer = styled.nav`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Hamburger = styled(HiMenu).attrs({ size: 30 })`
  cursor: pointer;
`;

export const Sidebar = styled.div`
  box-sizing: border-box;
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 300px;
  background-color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); // Added box-shadow
`;

export const CloseButton = styled(MdOutlineClose).attrs({ size: 30 })`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

export const Logo = styled.img`
  height: 25px;
  margin: 0px 10px;
  @media (max-width: 768px) {
    height: 25px;
  }
`;

// Additional Styles
export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #f5f5f5;
  }
`;
