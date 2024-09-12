import React from 'react';
import styled from 'styled-components';

const NavBarContainer = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: #131926;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: white;
  font-size: 36px;
  font-weight: bold;
`;

const NavBar: React.FC = () => {
  return (
    <NavBarContainer>
      <NavLink href="/">
        Tamboon React
      </NavLink>
    </NavBarContainer>
  );
}

export default NavBar;
