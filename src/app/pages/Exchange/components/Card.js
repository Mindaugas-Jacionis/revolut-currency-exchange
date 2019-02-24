import styled from 'styled-components';

const Card = styled.div`
  position: relative;
  background: ${props => props.theme.colors.blue};
  display: inline-block;
  padding: 30px 20px;
  border-radius: 5px;
  margin-bottom: 5px;
`;

export default Card;
