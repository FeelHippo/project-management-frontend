import * as z from 'zod';
import { TextInput } from '@/lib/interfaces/authentication';

export const registrationFormSchema = z
  .object<{ [key in TextInput]: z.ZodString }>({
    FIRSTNAME: z
      .string()
      .max(64, 'First Name should be at most 64 characters.'),
    LASTNAME: z.string().max(128, 'Last Name should be at most 64 characters.'),
    EMAIL: z
      .string()
      .refine(
        (value) =>
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value ?? ''),
        'Should be a valid email.',
      ),
    PASSWORD: z
      .string()
      .refine(
        (value) =>
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
            value ?? '',
          ),
        'Password not strong enough.',
      ),
    PASSWORD_CONFIRM: z
      .string()
      .refine(
        (value) =>
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
            value,
          ),
        'Password not strong enough.',
      ),
  })
  .refine(
    (data) =>
      !!data.PASSWORD.length &&
      !!data.PASSWORD_CONFIRM.length &&
      data.PASSWORD == data.PASSWORD_CONFIRM,
    {
      message: 'Invalid Password',
      path: ['PASSWORD_CONFIRM'],
    },
  );

export const loginFormSchema = z
  .object<{ [key in TextInput.email | TextInput.password]: z.ZodString }>({
    EMAIL: z
      .string()
      .refine(
        (value) =>
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value ?? ''),
        'Should be a valid email.',
      ),
    PASSWORD: z
      .string()
      .refine(
        (value) =>
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
            value,
          ),
        'Password not strong enough.',
      ),
  })
  .refine((data) => !!data.PASSWORD.length, {
    message: 'Invalid Password',
    path: ['PASSWORD'],
  });
