import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Form,
  RadioGroup,
  TextInput,
  FormulaContainer
} from './styled-components/App-Styles';

const defaultFormState = {
  sex: 'male',
  weight: '',
  feet: '',
  inches: '',
  age: '',
  activityFactor: ''
};

function App() {
  const [form, setForm] = useState(defaultFormState);
  const [ree, setREE] = useState(0);
  const [tdee, setTDEE] = useState(0);

  const radioMale = useRef(null);
  const radioFemale = useRef(null);
  const radioActivityFactor1 = useRef(null);
  const radioActivityFactor2 = useRef(null);
  const radioActivityFactor3 = useRef(null);
  const radioActivityFactor4 = useRef(null);
  const radioActivityFactor5 = useRef(null);

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
    radioMale.current.checked = false;
    radioFemale.current.checked = false;
    radioActivityFactor1.current.checked = false;
    radioActivityFactor2.current.checked = false;
    radioActivityFactor3.current.checked = false;
    radioActivityFactor4.current.checked = false;
    radioActivityFactor5.current.checked = false;
  };

  useEffect(() => {
    let { sex, weight, feet, inches, age, activityFactor } = form;

    if (sex && weight && feet && inches && age) {
      setREE(
        10 * toKG(weight) +
          6.25 * toCM(feet, inches) -
          5 * age +
          (sex === 'male' ? 5 : -161)
      );

      if (activityFactor) {
        setTDEE(ree * activityFactor);
      }
    } else {
      setREE(0);
      setTDEE(0);
    }
  }, [form, ree]);

  return (
    <Container>
      <Form>
        <h1>Body/Activity Metrics:</h1>
        <RadioGroup>
          <label>Sex:</label>
          <input type='radio' name='sex' value='male' onChange={handleChange} />
          <label>Male</label>
          <input
            type='radio'
            name='sex'
            value='female'
            onInput={handleChange}
            ref={radioMale}
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
            ref={radioFemale}
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
        <button type='button' onClick={reset}>
          Reset
        </button>
      </Form>
      <FormulaContainer>
        <h1>Resting Energy Expendeture (REE) = {ree} cal</h1>
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
          {form.sex === 'male' ? '+ 5' : '- 161'} = <span>{ree}cal</span>
        </p>
        <h1>Total Daily Energy Expendeture (TDEE) = {tdee} cal</h1>
        <p>
          <span>TDEE </span> = <span>{ree === 0 ? 'REE' : `${ree} cal`}</span> x{' '}
          <span>
            {form.activityFactor === ''
              ? 'Activity Factor'
              : form.activityFactor}
          </span>{' '}
          = <span>{tdee}cal</span>
        </p>
      </FormulaContainer>
    </Container>
  );
}

export default App;
