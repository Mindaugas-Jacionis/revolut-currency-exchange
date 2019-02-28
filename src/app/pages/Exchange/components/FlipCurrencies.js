import React from 'react';
import { MdSwapVert } from 'react-icons/md';
import styled from 'styled-components';

const Button = styled.button`
  background: ${props => props.theme.colors.white};
  position: absolute;
  display: flex;
  height: 30px;
  width: 30px;
  font-size: 27px;
  text-align: center;
  border-radius: 100%;
  border: 1px solid ${props => props.theme.colors.pink};
  left: 30px;
  bottom: -15px;
  z-index: 2;
  transform: translateX(-50%);
  color: ${props => props.theme.colors.blue};
`;

function FlipCurrencies(props) {
  return (
    <Button {...props}>
      <MdSwapVert />
    </Button>
  );
}

FlipCurrencies.defaultProps = {
  type: 'button',
};

export default FlipCurrencies;
