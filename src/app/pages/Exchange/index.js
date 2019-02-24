import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import fx from '~/fx';
import { polling, convert } from '~/utils';
import { MAJOR_CURRENCIES } from '~/constants';
import {
  Input as InputConmponent,
  Select,
  Button as ButtonComponent,
} from 'components';
import { Rate, Title, Card } from './components';

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

const Input = styled(InputConmponent)`
  margin-left: 50px;
`;

const Button = styled(ButtonComponent)`
  margin-top: 20px;
`;

class Exchange extends React.Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      amount: 0,
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

  setAmount = e => {
    const { value } = e.target;
    this.setState({ amount: value > 0 ? value * -1 : value });
  };

  setExchangeTo = e => {
    const { value } = e.target;
    this.setState({ exchangeTo: value });
  };

  setBaseCurrency = e => {
    const { setBaseCurrency } = this.props;
    const { value } = e.target;

    setBaseCurrency(value);
  };

  normalizeSelectData = (data, exclude) =>
    data.reduce(
      (list, value) => (!exclude.includes(value) ? [...list, { value }] : list),
      []
    );

  render() {
    const { fetching, rates, base, currencyList } = this.props;
    const { amount, exchangeTo } = this.state;
    const rate = rates[exchangeTo];

    if (fetching && !Object.entries(rates).length) {
      return <div>Loading...</div>;
    }

    return (
      <Container>
        <Card>
          <Title>From</Title>
          <Select
            value={base}
            onChange={this.setBaseCurrency}
            options={this.normalizeSelectData(currencyList, [exchangeTo])}
          />
          <Input type="number" value={amount} onChange={this.setAmount} />
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
          <Input type="number" value={convert({ amount, rate })} disabled />
        </Card>
        <Button onClick={() => alert('I will update wallets')}>Exchange</Button>
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
  }),
  dispatch => ({
    getRates: bindActionCreators(fx.actions.getRates, dispatch),
    setBaseCurrency: bindActionCreators(fx.actions.setBaseCurrency, dispatch),
  })
);

export default enhance(Exchange);
