import styled from 'styled-components';

const Button = styled.button`
  padding: 5px 15px;
  font-size: 22px;
  line-height: 26px;
  color: ${props => props.theme.colors.white};
  border-radius: 20px;
  background: ${({ theme, disabled }) =>
    disabled ? theme.colors.grey : theme.colors.pink}
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background: ${({ theme, disabled }) =>
      disabled ? theme.colors.grey : theme.colors.pinkDarker};
  }
`;

Button.defaultProps = {
  type: 'button',
};

export default Button;
