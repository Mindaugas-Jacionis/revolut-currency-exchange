import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import fx from '~/fx';
import user from '~/user';
import { polling, convert, toPositive, toNegative } from '~/utils';
import { MAJOR_CURRENCIES } from '~/constants';
import { Select } from 'components';
import {
  Rate,
  Title,
  Card,
  Balance,
  Button,
  Input,
  Container,
} from './components';

class Exchange extends React.Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      baseAmount: 0,
      exchangeAmount: 0,
      exchangeTo: undefined,
    };
  }

  componentDidMount() {
    const { getRates } = this.props;
    this.unsubscribe = polling.start(() => getRates(), { initial: true });
  }

  componentDidUpdate(prevProps) {
    const { base } = this.props;

    if (!prevProps.base && !!base) {
      const exchangeTo = MAJOR_CURRENCIES.filter(code => code !== base)[0];
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ exchangeTo });
    }
  }

  componentWillUnmount() {
    polling.stop(this.unsubscribe);
  }

  setBaseAmount = ({ target: { value } }) => {
    const numberValue = Number(value);

    this.setState(({ exchangeTo }, { rates }) => {
      const rate = rates[exchangeTo];
      const converted = convert({ amount: numberValue, rate });

      return {
        baseAmount: toPositive(numberValue),
        exchangeAmount: toPositive(converted),
      };
    });
  };

  setExchangeAmount = ({ target: { value } }) => {
    const numberValue = Number(value);

    this.setState(({ exchangeTo }, { rates }) => {
      const rate = rates[exchangeTo];

      return {
        baseAmount: convert({ amount: numberValue, rate, reverse: true }),
        exchangeAmount: numberValue,
      };
    });
  };

  checkInputValue = value => typeof value === 'number' && !!value;

  setExchangeTo = ({ target: { value } }) => {
    const { baseAmount } = this.state;

    this.setState({ exchangeTo: value });
    this.setBaseAmount({ target: { value: baseAmount } });
  };

  setBaseCurrency = e => {
    const { baseAmount } = this.state;
    const { setBaseCurrency } = this.props;
    const { value } = e.target;

    setBaseCurrency(value);
    this.setBaseAmount({ target: { value: baseAmount } });
  };

  normalizeSelectData = (data, exclude) =>
    data.reduce(
      (list, value) => (!exclude.includes(value) ? [...list, { value }] : list),
      []
    );

  onExchange = e => {
    const { base, addToWallet, removeFromWallet } = this.props;
    const { baseAmount, exchangeAmount, exchangeTo } = this.state;

    e.preventDefault();

    addToWallet({ currency: exchangeTo, amount: exchangeAmount });
    removeFromWallet({ currency: base, amount: baseAmount });
  };

  render() {
    const { fetching, rates, base, currencyList, wallets } = this.props;
    const { baseAmount, exchangeAmount, exchangeTo } = this.state;
    const rate = rates[exchangeTo];

    if (fetching && !Object.entries(rates).length) {
      return <div>Loading...</div>;
    }
    const baseBalance = wallets[base] || 0;
    const exchangeBalance = wallets[exchangeTo] || 0;
    const negativeBase = toNegative(baseAmount);
    const invalidExchange = baseAmount > baseBalance;

    return (
      <Container>
        <Card>
          <Title>From</Title>
          <Select
            value={base}
            onChange={this.setBaseCurrency}
            options={this.normalizeSelectData(currencyList, [exchangeTo])}
          />
          <Input
            type="number"
            value={negativeBase}
            onChange={this.setBaseAmount}
            name="amount"
          />
          <Balance
            error={invalidExchange}
            balance={baseBalance}
            currency={base}
          />
          <Rate value={rate} />
        </Card>
        <Card>
          <Title>To</Title>
          <Select
            value={exchangeTo}
            onChange={this.setExchangeTo}
            options={currencyList.reduce(
              (list, value) => (value !== base ? [...list, { value }] : list),
              []
            )}
          />
          <Input
            type="number"
            value={exchangeAmount}
            onChange={this.setExchangeAmount}
            name="exchange"
          />
          <Balance balance={exchangeBalance} currency={exchangeTo} />
        </Card>
        <Button
          disabled={invalidExchange}
          type="submit"
          onClick={this.onExchange}
        >
          Exchange
        </Button>
      </Container>
    );
  }
}

Exchange.propTypes = {
  rates: PropTypes.shape({}).isRequired,
  base: PropTypes.string,
  currencyList: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetching: PropTypes.bool.isRequired,
  getRates: PropTypes.func.isRequired,
  setBaseCurrency: PropTypes.func.isRequired,
  addToWallet: PropTypes.func.isRequired,
  removeFromWallet: PropTypes.func.isRequired,
  wallets: PropTypes.shape({}).isRequired,
};

Exchange.defaultProps = {
  base: undefined,
};

const enhance = connect(
  state => ({
    rates: fx.selectors.getRates(state),
    fetching: fx.selectors.isRatesFetching(state),
    currencyList: fx.selectors.getCurrencyList(state),
    base: fx.selectors.getRatesBase(state),
    wallets: user.selectors.getWallets(state),
  }),
  dispatch => ({
    getRates: bindActionCreators(fx.actions.getRates, dispatch),
    setBaseCurrency: bindActionCreators(fx.actions.setBaseCurrency, dispatch),
    addToWallet: bindActionCreators(user.actions.addToWallet, dispatch),
    removeFromWallet: bindActionCreators(
      user.actions.removeFromWallet,
      dispatch
    ),
  })
);

export default enhance(Exchange);
