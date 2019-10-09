import React from 'react';
import { FormulaCard } from '../styled-components/App-Styles';

const TDEE = ({ bodyMetrics, ree, tdee }) => {
  return (
    <FormulaCard>
      <h1>TDEE (Total Daily Energy Expendeture) = {tdee} cal</h1>
      <p>
        <span>TDEE </span> = <span>{ree === 0 ? 'REE' : `${ree} cal`}</span> x{' '}
        <span>
          {bodyMetrics.activityFactor === '' ? 'Activity Factor' : bodyMetrics.activityFactor}
        </span>{' '}
        <span>{tdee === 0 ? '' : ` = ${tdee} cal`}</span>
      </p>
    </FormulaCard>
  );
};

export default TDEE;
