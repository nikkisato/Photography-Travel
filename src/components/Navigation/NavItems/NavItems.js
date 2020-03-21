import React from 'react';
import styled from 'styled-components';

import NavItem from './NavItem/NavItem';

const Nav = styled.nav`
  display: flex;
  margin-top: ${props => (props.mobile ? '-6rem' : null)};
`;

const Ul = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;
  flex-direction: ${props => (props.mobile ? 'column' : 'row')};
`;

const NavItems = ({ mobile, clicked }) => {
  return (
    <Nav mobile={mobile}>
      <Ul mobile={mobile}>
        <NavItem clicked={clicked} mobile={mobile} link='/'>
          Home
        </NavItem>
        <NavItem clicked={clicked} mobile={mobile} link='/todos'>
          Todos
        </NavItem>
        <NavItem clicked={clicked} mobile={mobile} link='/login'>
          Login
        </NavItem>
        <NavItem clicked={clicked} mobile={mobile} link='/signup'>
          Sign Up
        </NavItem>
      </Ul>
    </Nav>
  );
};

export default NavItems;
