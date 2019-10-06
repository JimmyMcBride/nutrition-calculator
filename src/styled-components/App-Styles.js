import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;
`;

export const Form = styled.form`
  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
    text-decoration: underline;
  }

  display: flex;
  flex-direction: column;

  width: 500px;

  border: 1px solid black;
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

export const TextInput = styled.div`
  input,
  label {
    margin-right: 5px;
  }

  label {
    width: 100px;
  }
`;

export const FormulaContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 500px;

  border: 1px solid black;
  padding: 10px;

  h1 {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 20px;
  }

  p {
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
