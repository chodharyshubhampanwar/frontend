import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Navbar from "./Nabvar.jsx";

const LayoutWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  background-color: #fff;
`;

const Layout = () => {
  return (
    <LayoutWrapper>
      <Navbar />
      <Outlet />
    </LayoutWrapper>
  );
};

export default Layout;
