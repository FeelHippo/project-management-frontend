import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import AuthenticationForm, {
  uniqueTextInputs,
} from '../../src/app/components/authentication_form';

const USER_INPUT = 'user input';

describe('AuthenticationForm', () => {
  beforeEach(() => {
    render(<AuthenticationForm text={'Sign Up'} width={400} />);
  });
  it('renders a form', () => {
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
  });
  uniqueTextInputs.forEach(({ name, type, placeholder }) => {
    it(`renders an input with testId: ${name}`, () => {
      const input = screen.getByTestId(name);
      expect(input).toBeInTheDocument();
    });
    it(`renders an input with placeholder: ${placeholder}`, () => {
      const input = screen.getByPlaceholderText(placeholder);
      expect(input).toBeInTheDocument();
    });
    it('handles user input', async () => {
      const input = screen.getByTestId(name);
      await userEvent.type(input, USER_INPUT);
      // @ts-ignore
      expect(input.value).toBe(USER_INPUT);
    });
  });
});
