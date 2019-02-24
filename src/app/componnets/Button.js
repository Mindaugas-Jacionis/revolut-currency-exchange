import styled from 'styled-components';

const Button = styled.button`
  padding: 5px 15px;
  font-size: 22px;
  line-height: 26px;
  color: #fff;
  border-radius: 20px;
  background: #eb008d;
  border: none;
  cursor: pointer;

  &:hover {
    background: #d2007e;
  }
`;

Button.defaultProps = {
  type: 'button',
};

export default Button;
