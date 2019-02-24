import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledRate = styled.div`
  background: ${props => props.theme.colors.white};
  position: absolute;
  line-height: 26px;
  padding: 0 10px;
  border-radius: 15px;
  border: 1px solid ${props => props.theme.colors.pink};
  left: 50%;
  bottom: -15px;
  z-index: 2;
  transform: translateX(-50%);
  color: ${props => props.theme.colors.blue};
`;

function Rate({ value }) {
  return <StyledRate>Rate: {value}</StyledRate>;
}

Rate.propTypes = {
  value: PropTypes.number,
};

Rate.defaultProps = {
  value: undefined,
};

export default Rate;
