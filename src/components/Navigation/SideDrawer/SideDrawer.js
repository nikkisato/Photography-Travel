import React from 'react';
import styled from 'styled-components';
import NavItems from '../NavItems/NavItems';

import Hamburger from './Hamburger/Hamburger';
import Logo from '../../Logo/Logo';

const FixedWrapper = styled.div`
  position: fixed;
  background-color: var(--color-main);
  padding: 0rem 2rem;
  top: 0;
  left: 0;
  width: 100%;
  height: 6rem;
  display: none;
  @media ${props => props.theme.mediaQueries.smallest} {
    display: flex;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const SideDrawer = () => {
  return (
    <FixedWrapper>
      <Wrapper>
        <Logo />
        <Hamburger />
      </Wrapper>
    </FixedWrapper>
  );
};

export default SideDrawer;
