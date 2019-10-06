import React from 'react';

const CaloricBudget = ({ tdee, weeklyGoal, expenditureVariance, caloricBudget }) => {
  return (
    <>
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
    </>
  );
};

export default CaloricBudget;
