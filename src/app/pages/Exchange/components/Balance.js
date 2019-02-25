import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getCurrencySymbol from 'currency-symbol-map';

const StyledBalance = styled.p`
  color: ${({ theme, error }) =>
    error ? theme.colors.pink : theme.colors.white};
  opacity: ${({ error }) => (error ? 0.7 : 1)};
  line-height: 22px;
  padding: 10px 0;
`;

function Balance({ balance, currency, error }) {
  const currencySymbol = getCurrencySymbol(currency);

  return (
    <StyledBalance error={error}>
      {`Balance: ${balance}${currencySymbol}`}
    </StyledBalance>
  );
}

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
  currency: PropTypes.string,
  error: PropTypes.bool,
};

Balance.defaultProps = {
  currency: undefined,
  error: false,
};

export default Balance;
