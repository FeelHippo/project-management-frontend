'use client';

import React from 'react';
import useForm from '@/app/lib/utils/form';
import validate from '../lib/utils/validate_data';
import {
  textInputs,
  userRegistration,
} from '@/app/lib/interfaces/registration';

function AuthenticationForm() {
  const { handleChange, inputs, handleSubmit, errors } = useForm(validate);

  const uniqueTextInputs = [
    { name: textInputs.firstname, type: 'text', placeholder: 'First Name' },
    { name: textInputs.lastname, type: 'text', placeholder: 'Last Name' },
    { name: textInputs.email, type: 'email', placeholder: 'Email' },
    {
      name: textInputs.password,
      type: 'password',
      placeholder: 'Choose a password',
    },
    {
      name: textInputs.passwordConfirm,
      type: 'password',
      placeholder: 'Repeat password',
    },
  ];

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div>
          {uniqueTextInputs.map((textInput, index) => (
            <input
              key={index}
              type={textInput.type}
              name={textInput.name.toString()}
              placeholder={textInput.placeholder}
              value={inputs[textInput.name]}
              onChange={handleChange}
              className={
                !!errors[textInput.name] ? errors[textInput.name] : null
              }
              onBlur={handleSubmit}
              autoComplete="off"
            />
          ))}
          <button>SUBMIT</button>
        </div>
      </form>
    </div>
  );
}

export default AuthenticationForm;
