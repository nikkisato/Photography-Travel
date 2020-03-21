import React from 'react';
import styled from 'styled-components';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import NavBar from '../../components/Navigation/Navbar/Navbar';

const MainWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 6rem);
  margin-top: 6rem;
`;

const Layout = ({ children }) => (
  <>
    <NavBar />
    <SideDrawer />
    <MainWrapper>{children}</MainWrapper>
  </>
);
export default Layout;
