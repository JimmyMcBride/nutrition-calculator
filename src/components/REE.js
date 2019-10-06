import React from 'react';

const REE = ({ bodyMetrics, ree }) => {
  const toCM = (feet, inches) => Math.floor(feet * 30.48 + inches * 2.54);
  const toKG = lbs => Math.floor(lbs / 2.205);

  return (
    <>
      <h1>REE (Resting Energy Expendeture) = {ree} cal</h1>
      <p>
        <span>REE</span> = 10 x{' '}
        <span>{bodyMetrics.weight === '' ? 'weight' : toKG(bodyMetrics.weight)}(kg)</span> + 6.25 x{' '}
        <span>
          {bodyMetrics.feet === '' || bodyMetrics.inches === ''
            ? 'height'
            : toCM(bodyMetrics.feet, bodyMetrics.inches)}
          (cm)
        </span>{' '}
        - 5 x <span>{bodyMetrics.age === '' ? 'age' : bodyMetrics.age}(yrs) </span>
        {bodyMetrics.sex === 'male' ? '+ 5' : '- 161'}
        <span>{ree === 0 ? '' : ` = ${ree} cal`}</span>
      </p>
    </>
  );
};

export default REE;
