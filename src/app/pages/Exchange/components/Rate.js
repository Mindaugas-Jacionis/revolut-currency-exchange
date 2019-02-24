import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledRate = styled.div`
  background: #fff;
  position: absolute;
  line-height: 26px;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid #eb008d;
  left: 50%;
  top: calc(50% - 15px);
  transform: translate(-50%);
  color: #018ff0;
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