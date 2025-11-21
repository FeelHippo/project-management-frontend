'use client';

import React from 'react';
import useForm from '@/app/lib/utils/form';
import validate from '../lib/utils/validate_data';
import { textInputs } from '@/app/lib/interfaces/registration';

export interface AuthenticationFormInterface {
  text: string;
  width: number;
}

export const uniqueTextInputs = [
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

function AuthenticationForm({ text, width }: AuthenticationFormInterface) {
  const { handleChange, inputs, handleSubmit, errors } = useForm(validate);

  return (
    <div className="form">
      <form aria-label="form" onSubmit={handleSubmit}>
        <div>
          {uniqueTextInputs.map((textInput, index) => (
            <input
              key={index}
              data-testid={textInput.name}
              type={textInput.type}
              name={textInput.name.toString()}
              placeholder={textInput.placeholder}
              value={inputs[textInput.name]}
              onChange={handleChange}
              className={`block h-[64px] border-[2px] border-gray-500 rounded-[20px] font-sans text-gray-500 text-xl my-[16px] px-[24px] py-[16px] ${!!errors[textInput.name] ? errors[textInput.name] : null}`}
              style={{ width: width * 2 }}
              onBlur={handleSubmit}
              autoComplete="off"
              required
            />
          ))}
          <button
            className="block h-[64px] font-sans text-white text-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-[20px] my-[16px] px-[24px] py-[16px]"
            style={{ width: width * 2 }}
          >
            {text}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthenticationForm;
