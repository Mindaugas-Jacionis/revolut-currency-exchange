import React from 'react';
import { Provider } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';

import store from './state';
import routes from './routes';

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GlobalStyles = createGlobalStyle`
  body, input, option, select {
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,700');
    font-family: 'Roboto', sans-serif;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance:textfield;
  }
`;

function App() {
  return (
    <React.Fragment>
      <GlobalStyles />
      <Provider store={store}>
        <Container>
          <Router>{routes}</Router>
        </Container>
      </Provider>
    </React.Fragment>
  );
}

export default App;
