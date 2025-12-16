'use client';

import Link from 'next/link';
import { useForm } from '@tanstack/react-form';
import { TextInput } from '@/lib/interfaces/registration';
import { registrationFormSchema } from '@/lib/validation/form';
import { toast } from 'sonner';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export interface AuthenticationFormInterface {
  text: string;
  width: number;
}

export const uniqueTextInputs = [
  { name: TextInput.firstname, type: 'text', placeholder: 'First Name' },
  { name: TextInput.lastname, type: 'text', placeholder: 'Last Name' },
  { name: TextInput.email, type: 'email', placeholder: 'Email' },
  {
    name: TextInput.password,
    type: 'password',
    placeholder: 'Choose a password',
  },
  {
    name: TextInput.passwordConfirm,
    type: 'password',
    placeholder: 'Repeat password',
  },
];

function RegistrationForm({ text, width }: AuthenticationFormInterface) {
  const form = useForm({
    defaultValues: uniqueTextInputs.reduce(
      (acc, { name }) => (acc = { ...acc, name: '' }),
      {},
    ),
    validators: {
      onSubmit: registrationFormSchema,
    },
    onSubmit: async ({ value }) => {
      toast.success('Registration Successful');
    },
  });

  return (
    <div className="registration-form">
      <form
        id="registration-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="my-[24]"
      >
        <FieldGroup>
          {uniqueTextInputs.map((textInput, index) => (
            <form.Field
              key={index}
              name={textInput.name}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid} style={{ width: width * 2 }}>
                    <Input
                      id={textInput.name}
                      name={textInput.name}
                      value={field.state.value as string}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      autoComplete="off"
                      aria-invalid={isInvalid}
                      placeholder={textInput.placeholder}
                      className="block h-[64px] border-[2px] rounded-[20px] text-gray-500 text-xl"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            ></form.Field>
          ))}
        </FieldGroup>
      </form>
      <Button
        type="submit"
        form="bug-report-form"
        style={{ width: width * 2 }}
        className="h-[64px] border-[2px] rounded-[20px] text-xl"
      >
        {text}
      </Button>
      <div className="text-center">
        Already have an account?{' '}
        <Link href="/login" className="underline">
          Login
        </Link>
      </div>
    </div>
  );
}

export default RegistrationForm;
