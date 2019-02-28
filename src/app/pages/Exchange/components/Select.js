import React from 'react';
import styled from 'styled-components';
import { Select as SelectComponent } from 'components';

const Container = styled.div`
  margin-right: 50px;
  display: inline-block;
`;

export default function Select(props) {
  return (
    <Container>
      <SelectComponent {...props} />
    </Container>
  );
}
