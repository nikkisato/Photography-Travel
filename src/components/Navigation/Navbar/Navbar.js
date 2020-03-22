import React from 'react';
import styled from 'styled-components';
import NavItems from '../NavItems/NavItems';

import Logo from '../../Logo/Logo';
import { Container } from '../../../hoc/layouts/elements';

const FixedWrapper = styled.div`
  position: fixed;

  background-color: var(--color-main);
  padding: 0rem 2rem;
  top: 0;
  left: 0;
  width: 100%;
  height: 6rem;

  @media ${props => props.theme.mediaQueries.smallest} {
    display: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Navbar = ({loggedIn}) => {
  return (
    <FixedWrapper>
      <Container>
        <Wrapper>
          <Logo />
          <NavItems loggedIn={loggedIn} />
        </Wrapper>
      </Container>
    </FixedWrapper>
  );
};

export default Navbar;
