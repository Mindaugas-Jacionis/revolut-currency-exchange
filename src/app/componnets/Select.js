import React from 'react';
import styled from 'styled-components';

const HEIGHT = '36px';
const ARROW_SIZE = '12px';

const Container = styled.div`
  position: relative;
  display: inline-flex;

  &:before {
    position: absolute;
    right: 0px;
    top: calc(${HEIGHT} / 2 - ${ARROW_SIZE} / 10);
    content: ' ';
    border: solid transparent;
    border-top-color: ${props => props.theme.colors.white};
    border-width: calc(${ARROW_SIZE} / 2);
    margin-left: calc(-${ARROW_SIZE} / 2);
    pointer-events: none;
  }
`;

const StyledSelect = styled.select`
  border: none;
  color: ${props => props.theme.colors.white};
  background: transparent;
  height: ${HEIGHT};
  font-size: 16px;
  padding: 9px 15px 9px 0;
  box-shadow: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:focus {
    box-shadow: none;
  }
`;

function Select({ options, ...props }) {
  return (
    <Container>
      <StyledSelect {...props}>
        {options.map(({ value, label }, index) => (
          <option value={value} key={index}>
            {label || value}
          </option>
        ))}
      </StyledSelect>
    </Container>
  );
}

export default Select;
