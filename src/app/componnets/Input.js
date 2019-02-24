import styled from 'styled-components';

const Input = styled.input`
  background: ${props => props.theme.colors.blueLighter};
  border: none;
  border-bottom: 2px solid ${props => props.theme.colors.grey};
  border-radius: 5px 5px 0 0;
  padding: 5px 15px;
  font-size: 22px;
  text-align: right;
  color: ${props => props.theme.colors.white};
`;

Input.defaultProps = {
  type: 'text',
};

export default Input;
