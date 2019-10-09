import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

import { Input, Button } from 'reactstrap'

export const Container = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100vw;
  // height: 100vh;
`;

export const BodyMetrics = styled(Paper)`
  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
    text-decoration: underline;
  }

  display: flex;
  flex-direction: column;

  width: 500px;

  // border: 1px solid black;
  padding: 10px;

  font-size: 1.6rem;

  div {
    margin-bottom: 10px;

    display: flex;
    align-items: center;
  }
`;

export const RadioGroup = styled.div`
  justify-content: flex-start;

  input,
  label {
    margin-right: 5px;
  }

  label:first-of-type {
    width: 100px;
  }
`;

export const InputContainer = styled.div`
  input,
  label {
    margin-right: 5px;
  }

  label {
    width: 100px;
  }
`;

export const FormulaContainer = styled(Paper)`
  display: flex;
  flex-direction: column;

  width: 500px;

  // border: 1px solid black;
  padding: 10px;

  h1 {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 20px;
  }

  p {
    display: none;
    font-size: 1.6rem;
    font-weight: lighter;
    font-style: italic;

    margin-bottom: 20px;
    margin-left: 10px;
  }
  span {
    font-weight: bold;
  }
`;

export const FormulaCard = styled(Paper)`
  margin: 1rem 0;
  padding: .5rem;
`;

export const FormInput = styled(Input)`
  border-radius: .3rem;
  height: 2.2rem;
`;

export const FormButton = styled(Button)`
  border-radius: .3rem;
  height: 2.2rem;
`;