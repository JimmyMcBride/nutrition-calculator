import React, { useState, useEffect, useRef } from 'react';
import { Container, BodyMetrics, RadioGroup, InputContainer } from './styled-components/App-Styles';
import Formulas from './components/Formula';

const defaultBodyMetrics = {
  sex: 'male',
  weight: '',
  feet: '',
  inches: '',
  age: '',
  activityFactor: '',
  weeklyGoal: 'maintain',
  weeklyPounds: ''
};

function App() {
  /********************************************************
   *                   STATE VARIABLES                    *
   ********************************************************/
  const [bodyMetrics, setBodyMetrics] = useState(defaultBodyMetrics);
  // REE = Resting Energy Expediture
  const [ree, setREE] = useState(0);
  // TDEE = Total Daily Eneergy Expenditure
  const [tdee, setTDEE] = useState(0);
  // Expenditure Variance - fancy name for how much you add or subtract from your daily
  // caloric budget depending on your weight loss/gain goals
  const [expenditureVariance, setExpenditureVariance] = useState(0);
  const [caloricBudget, setCaloricBudget] = useState(0);

  /********************************************************
   *                         REFS                         *
   ********************************************************/
  // Refs below will point to DOM elements, used right now for resetting body metrics
  // They get assigned DOM elements in the JSX in the return statement
  const radioMale = useRef(null);
  const radioFemale = useRef(null);
  const radioActivityFactor1 = useRef(null);
  const radioActivityFactor2 = useRef(null);
  const radioActivityFactor3 = useRef(null);
  const radioActivityFactor4 = useRef(null);
  const radioActivityFactor5 = useRef(null);
  const loseGoal = useRef(null);
  const maintainGoal = useRef(null);
  const gainGoal = useRef(null);

  /********************************************************
   *                     SIDE-EFFECTS                     *
   ********************************************************/
  // Calculates REE (Resting Energy Expenditure)
  useEffect(() => {
    let { sex, weight, feet, inches, age } = bodyMetrics;

    if (sex && weight && feet && inches && age) {
      // Below is the Mifflin-St. Jeor calculation
      setREE(
        (
          10 * toKG(weight) +
          6.25 * toCM(feet, inches) -
          5 * age +
          (sex === 'male' ? 5 : -161)
        ).toFixed(0)
      );
    } else {
      // resets REE and TDEE if any of the dependent body metric fields are erased
      setREE(0);
      setTDEE(0);
    }
  }, [bodyMetrics, ree, tdee, expenditureVariance]);

  // Calculates TDEE (Total Daily Energy Expenditure)
  useEffect(() => {
    if (bodyMetrics.activityFactor) {
      setTDEE((ree * bodyMetrics.activityFactor).toFixed(0));
    }
  }, [bodyMetrics, ree]);

  // Calculats Daily Caloric Budget
  useEffect(() => {
    let { activityFactor, weeklyGoal, weeklyPounds } = bodyMetrics;
    if (activityFactor && tdee && weeklyGoal && weeklyPounds) {
      // calculates how many calories to subtract from daily caloric budget
      // based on how many pounds the user wants to lose a week
      setExpenditureVariance((weeklyPounds * 3500) / 7);

      switch (weeklyGoal) {
        case 'lose':
          setCaloricBudget(tdee - expenditureVariance);
          break;
        case 'maintain':
          setExpenditureVariance(0);
          setCaloricBudget(tdee);
          break;
        default:
          // 'gain'
          // need to type-caste here, input fields return back strings...
          setCaloricBudget(Number(tdee) + Number(expenditureVariance));
          break;
      }
    }
  }, [bodyMetrics, expenditureVariance, tdee]);

  // Runs once, only on initial render, and just sets default selections for two radio buttons
  useEffect(() => {
    radioMale.current.checked = true;
    maintainGoal.current.checked = true;
  }, []);

  /********************************************************
   *                       FUNCTIONS                      *
   ********************************************************/
  const handleChange = e => {
    setBodyMetrics({
      ...bodyMetrics,
      [e.target.name]: e.target.value
    });
  };

  // Functions to convert imperial to metric
  const toCM = (feet, inches) => Math.floor(feet * 30.48 + inches * 2.54);
  const toKG = lbs => Math.floor(lbs / 2.205);

  const resetBodyMetrics = () => {
    setBodyMetrics(defaultBodyMetrics);
    setExpenditureVariance(0);
    setCaloricBudget(0);
    radioMale.current.checked = true;
    radioFemale.current.checked = false;
    radioActivityFactor1.current.checked = false;
    radioActivityFactor2.current.checked = false;
    radioActivityFactor3.current.checked = false;
    radioActivityFactor4.current.checked = false;
    radioActivityFactor5.current.checked = false;
    loseGoal.current.checked = false;
    maintainGoal.current.checked = true;
    gainGoal.current.checked = false;
  };

  return (
    <Container>
      <BodyMetrics>
        <h1>Body/Activity Metrics:</h1>
        {/* INPUTS FOR REE (RESTING ENERGY EXPENDITURE) */}
        <RadioGroup>
          <label>Sex:</label>
          <input type='radio' name='sex' value='male' onChange={handleChange} ref={radioMale} />
          <label>Male</label>
          <input type='radio' name='sex' value='female' onChange={handleChange} ref={radioFemale} />
          <label>Female</label>
        </RadioGroup>

        <InputContainer>
          <label>Weight:</label>
          <input
            type='number'
            name='weight'
            value={bodyMetrics.weight}
            placeholder='lbs.'
            onChange={handleChange}
          />
          <span>{bodyMetrics.weight ? `${toKG(bodyMetrics.weight)} kg` : ''}</span>
        </InputContainer>

        <InputContainer>
          <label>Height:</label>
          <input
            type='number'
            name='feet'
            value={bodyMetrics.feet}
            placeholder='ft.'
            onChange={handleChange}
          />
          <input
            type='number'
            name='inches'
            value={bodyMetrics.inches}
            placeholder='in.'
            onChange={handleChange}
            min={0}
            max={11}
          />
          <span>
            {bodyMetrics.feet && bodyMetrics.inches
              ? `${toCM(bodyMetrics.feet, bodyMetrics.inches)} cm`
              : ''}
          </span>
        </InputContainer>

        <InputContainer>
          <label>Age (yrs):</label>
          <input
            type='number'
            name='age'
            value={bodyMetrics.age}
            placeholder='Age'
            onChange={handleChange}
          />
        </InputContainer>

        {/* INPUT FOR TDEE (TOTAL DAILY ENERGY EXPENDITURE) */}
        <RadioGroup>
          <label>Activity Level:</label>
          <input
            type='radio'
            name='activityFactor'
            value={1.2}
            onChange={handleChange}
            ref={radioActivityFactor1}
          />
          <label>Sedentary</label>
          <input
            type='radio'
            name='activityFactor'
            value={1.375}
            onChange={handleChange}
            ref={radioActivityFactor2}
          />
          <label>Light</label>
          <input
            type='radio'
            name='activityFactor'
            value={1.55}
            onChange={handleChange}
            ref={radioActivityFactor3}
          />
          <label>Moderate</label>
          <input
            type='radio'
            name='activityFactor'
            value={1.725}
            onChange={handleChange}
            ref={radioActivityFactor4}
          />
          <label>Very</label>
          <input
            type='radio'
            name='activityFactor'
            value={1.9}
            onChange={handleChange}
            ref={radioActivityFactor5}
          />
          <label>Extra</label>
        </RadioGroup>

        {/* INPUTS FOR DAILY CALORIC GOALS */}
        <RadioGroup>
          <label>Weekly Goal:</label>
          <input
            type='radio'
            name='weeklyGoal'
            value='lose'
            onChange={handleChange}
            ref={loseGoal}
          />
          <label>Lose</label>
          <input
            type='radio'
            name='weeklyGoal'
            value='maintain'
            onChange={handleChange}
            ref={maintainGoal}
          />
          <label>Maintain</label>
          <input
            type='radio'
            name='weeklyGoal'
            value='gain'
            onChange={handleChange}
            ref={gainGoal}
          />
          <label>Gain</label>
          <input
            type='number'
            name='weeklyPounds'
            value={bodyMetrics.weeklyPounds}
            min={0}
            max={2}
            step={0.5}
            placeholder='0'
            onChange={handleChange}
          />
          <label>lbs.</label>
        </RadioGroup>
        {/* RESET BUTTON */}
        <button type='button' onClick={resetBodyMetrics}>
          Reset
        </button>
      </BodyMetrics>

      <Formulas
        bodyMetrics={bodyMetrics}
        ree={ree}
        tdee={tdee}
        weeklyGoal={bodyMetrics.weeklyGoal}
        expenditureVariance={expenditureVariance}
        caloricBudget={caloricBudget}
      />
    </Container>
  );
}

export default App;
