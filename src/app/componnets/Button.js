import styled from 'styled-components';

const Button = styled.button`
  padding: 5px 15px;
  font-size: 22px;
  line-height: 26px;
  color: ${props => props.theme.colors.white};
  border-radius: 20px;
  background: ${props => props.theme.colors.pink};
  border: none;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.pinkDarker};
  }
`;

Button.defaultProps = {
  type: 'button',
};

export default Button;
