import React from 'react';

const BMI = ({ bodyMetrics, bmi }) => {
  const toCM = (feet, inches) =>
    Math.floor(feet * 30.48 + inches * 2.54);
  const toKG = lbs => Math.floor(lbs / 2.205);

  return (
    <>
      <h1>BMI (Body Mass Index) = {bmi} kg/m^2</h1>
      <p>
        <span>BMI</span> ={' '}
        <span>
          {bodyMetrics.weight === ''
            ? 'mass'
            : toKG(bodyMetrics.weight)}
          (kg)
        </span>{' '}
        ÷{' '}
        <span>
          {bodyMetrics.feet === '' &&
          bodyMetrics.inches === ''
            ? 'height^2'
            : toCM(bodyMetrics.feet, bodyMetrics.inches)}
          (kg)
        </span>
        <span>{bmi === 0 ? '' : ` = ${bmi} kg/m^2`}</span>
      </p>
    </>
  );
};

export default BMI;
