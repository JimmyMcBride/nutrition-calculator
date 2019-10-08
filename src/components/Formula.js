import React from 'react';
import { FormulaContainer } from '../styled-components/App-Styles';
import REE from './REE';
import TDEE from './TDEE';
import CaloricBudget from './CaloricBudget';
import BMI from './BMI';

const Formulas = ({
  bodyMetrics,
  ree,
  tdee,
  weeklyGoal,
  expenditureVariance,
  caloricBudget,
  bmi
}) => {
  return (
    <FormulaContainer>
      <REE bodyMetrics={bodyMetrics} ree={ree} />
      <TDEE
        bodyMetrics={bodyMetrics}
        ree={ree}
        tdee={tdee}
      />
      <CaloricBudget
        tdee={tdee}
        weeklyGoal={weeklyGoal}
        expenditureVariance={expenditureVariance}
        caloricBudget={caloricBudget}
      />
      <BMI bodyMetrics={bodyMetrics} bmi={bmi} />
    </FormulaContainer>
  );
};

export default Formulas;
