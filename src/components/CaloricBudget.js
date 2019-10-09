import React from 'react';
import { FormulaCard } from '../styled-components/App-Styles';

const CaloricBudget = ({ tdee, weeklyGoal, expenditureVariance, caloricBudget }) => {
  return (
    <FormulaCard>
      <h1>Daily Caloric Budget = {caloricBudget} cal</h1>
      <p>
        <span>Budget </span> = <span>{tdee === 0 ? 'TDEE' : `${tdee} cal`}</span>{' '}
        {weeklyGoal === 'lose'
          ? `- ${expenditureVariance}`
          : weeklyGoal === 'maintain'
          ? ''
          : `+ ${expenditureVariance}`}{' '}
        <span>{caloricBudget === 0 ? '' : ` = ${caloricBudget} cal`}</span>
      </p>
    </FormulaCard>
  );
};

export default CaloricBudget;
