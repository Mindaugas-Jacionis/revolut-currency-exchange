import styled from 'styled-components';

const Input = styled.input`
  background: rgba(255, 255, 255, 0.3);
  border: none;
  border-bottom: 1px solid #f3f4f5;
  border-radius: 5px 5px 0 0;
  padding: 5px 15px;
  font-size: 22px;
  text-align: right;
  color: #fff;
`;

Input.defaultProps = {
  type: 'text',
};

export default Input;
