import styled from 'styled-components';

export const AppContainer = styled.div`
  margin: 48px 96px;
`;

export const CardListLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 36px; 
  width: 100%;
  justify-content: center;
`;

export const Card = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
`;