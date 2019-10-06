import React from 'react';

const TDEE = ({ bodyMetrics, ree, tdee }) => {
  return (
    <>
      <h1>TDEE (Total Daily Energy Expendeture) = {tdee} cal</h1>
      <p>
        <span>TDEE </span> = <span>{ree === 0 ? 'REE' : `${ree} cal`}</span> x{' '}
        <span>
          {bodyMetrics.activityFactor === '' ? 'Activity Factor' : bodyMetrics.activityFactor}
        </span>{' '}
        <span>{tdee === 0 ? '' : ` = ${tdee} cal`}</span>
      </p>
    </>
  );
};

export default TDEE;
