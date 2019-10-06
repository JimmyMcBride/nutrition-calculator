import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Form,
  RadioGroup,
  TextInput
} from './styled-components/App-Styles';
import Formula from './components/Formula';

const defaultFormState = {
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
  const [form, setForm] = useState(defaultFormState);
  const [ree, setREE] = useState(0);
  const [tdee, setTDEE] = useState(0);
  const [expenditureVariance, setExpenditureVariance] = useState(0);
  const [caloricBudget, setCaloricBudget] = useState(0);

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

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  console.log(form);

  const toCM = (feet, inches) => {
    return Math.floor(feet * 30.48 + inches * 2.54);
  };

  const toKG = lbs => {
    return Math.floor(lbs / 2.205);
  };

  const reset = () => {
    setForm(defaultFormState);
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

  useEffect(() => {
    let {
      sex,
      weight,
      feet,
      inches,
      age,
      activityFactor,
      weeklyGoal,
      weeklyPounds
    } = form;

    if (sex && weight && feet && inches && age) {
      setREE(
        (
          10 * toKG(weight) +
          6.25 * toCM(feet, inches) -
          5 * age +
          (sex === 'male' ? 5 : -161)
        ).toFixed(0)
      );

      if (activityFactor) {
        setTDEE((ree * activityFactor).toFixed(0));
      }

      if (activityFactor && tdee && weeklyGoal && weeklyPounds) {
        setExpenditureVariance((weeklyPounds * 3500) / 7);
        console.log('tdee', tdee);
        console.log('expeditureVariance', expenditureVariance);

        if (weeklyGoal === 'lose') {
          setCaloricBudget(tdee - expenditureVariance);
        } else if (weeklyGoal === 'maintain') {
          setExpenditureVariance(0);
          setCaloricBudget(tdee);
        } else {
          setCaloricBudget(Number(tdee) + Number(expenditureVariance));
        }
      }
    } else {
      setREE(0);
      setTDEE(0);
    }
  }, [form, ree, tdee, expenditureVariance]);

  useEffect(() => {
    radioMale.current.checked = true;
    maintainGoal.current.checked = true;
  }, []);

  return (
    <Container>
      <Form>
        <h1>Body/Activity Metrics:</h1>
        <RadioGroup>
          <label>Sex:</label>
          <input
            type='radio'
            name='sex'
            value='male'
            onChange={handleChange}
            ref={radioMale}
          />
          <label>Male</label>
          <input
            type='radio'
            name='sex'
            value='female'
            onChange={handleChange}
            ref={radioFemale}
          />
          <label>Female</label>
        </RadioGroup>

        <TextInput>
          <label>Weight:</label>
          <input
            type='number'
            name='weight'
            value={form.weight}
            placeholder='lbs.'
            onChange={handleChange}
          />
          <span>{form.weight ? `${toKG(form.weight)} kg` : ''}</span>
        </TextInput>

        <TextInput>
          <label>Height:</label>
          <input
            type='number'
            name='feet'
            value={form.feet}
            placeholder='ft.'
            onChange={handleChange}
          />
          <input
            type='number'
            name='inches'
            value={form.inches}
            placeholder='in.'
            onChange={handleChange}
            min={0}
            max={12}
          />
          <span>
            {form.feet && form.inches
              ? `${toCM(form.feet, form.inches)} cm`
              : ''}
          </span>
        </TextInput>

        <TextInput>
          <label>Age (yrs):</label>
          <input
            type='number'
            name='age'
            value={form.age}
            placeholder='Age'
            onChange={handleChange}
          />
        </TextInput>

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
            value={form.weeklyPounds}
            min={0}
            max={2}
            step={0.5}
            placeholder='0'
            onChange={handleChange}
          />
          <label>lbs.</label>
        </RadioGroup>
        <button type='button' onClick={reset}>
          Reset
        </button>
      </Form>
      <Formula
        form={form}
        ree={ree}
        tdee={tdee}
        weeklyGoal={form.weeklyGoal}
        expenditureVariance={expenditureVariance}
        caloricBudget={caloricBudget}
      />
    </Container>
  );
}

export default App;
