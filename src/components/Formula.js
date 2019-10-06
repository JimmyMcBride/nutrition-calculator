import React, { useEffect } from 'react';
import { FormulaContainer } from '../styled-components/App-Styles';

const Formula = ({
  form,
  ree,
  tdee,
  weeklyGoal,
  expenditureVariance,
  caloricBudget
}) => {
  const toCM = (feet, inches) => {
    return Math.floor(feet * 30.48 + inches * 2.54);
  };

  const toKG = lbs => {
    return Math.floor(lbs / 2.205);
  };

  return (
    <FormulaContainer>
      <h1>REE (Resting Energy Expendeture) = {ree} cal</h1>
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
        {form.sex === 'male' ? '+ 5' : '- 161'}
        <span>{ree === 0 ? '' : ` = ${ree} cal`}</span>
      </p>
      <h1>TDEE (Total Daily Energy Expendeture) = {tdee} cal</h1>
      <p>
        <span>TDEE </span> = <span>{ree === 0 ? 'REE' : `${ree} cal`}</span> x{' '}
        <span>
          {form.activityFactor === '' ? 'Activity Factor' : form.activityFactor}
        </span>{' '}
        <span>{tdee === 0 ? '' : ` = ${tdee} cal`}</span>
      </p>
      <h1>Daily Caloric Budget = {caloricBudget} cal</h1>
      <p>
        <span>Budget </span> ={' '}
        <span>{tdee === 0 ? 'TDEE' : `${tdee} cal`}</span>{' '}
        {weeklyGoal === 'lose'
          ? `- ${expenditureVariance}`
          : weeklyGoal === 'maintain'
          ? ''
          : `+ ${expenditureVariance}`}{' '}
        <span>{caloricBudget === 0 ? '' : ` = ${caloricBudget} cal`}</span>
      </p>
    </FormulaContainer>
  );
};

export default Formula;
