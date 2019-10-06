import React from 'react';
import { FormulaContainer } from '../styled-components/App-Styles';

const Formula = ({ form, ree, tdee }) => {
  const toCM = (feet, inches) => {
    return Math.floor(feet * 30.48 + inches * 2.54);
  };

  const toKG = lbs => {
    return Math.floor(lbs / 2.205);
  };

  return (
    <FormulaContainer>
      <h1>Resting Energy Expendeture (REE) = {ree} cal</h1>
      <p>
        <span>REE</span> = 10 x{' '}
        <span>{form.weight === '' ? 'weight' : toKG(form.weight)}(kg)</span> +
        6.25 x{' '}
        <span>
          {form.feet === '' || form.inches === ''
            ? 'height'
            : toCM(form.feet, form.inches)}
          (cm)
        </span>{' '}
        - 5 x <span>{form.age === '' ? 'age' : form.age}(yrs) </span>
        {form.sex === 'male' ? '+ 5' : '- 161'} = <span>{ree}cal</span>
      </p>
      <h1>Total Daily Energy Expendeture (TDEE) = {tdee} cal</h1>
      <p>
        <span>TDEE </span> = <span>{ree === 0 ? 'REE' : `${ree} cal`}</span> x{' '}
        <span>
          {form.activityFactor === '' ? 'Activity Factor' : form.activityFactor}
        </span>{' '}
        = <span>{tdee}cal</span>
      </p>
    </FormulaContainer>
  );
};

export default Formula;
