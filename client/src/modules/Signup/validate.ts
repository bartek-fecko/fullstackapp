import { validateEmail } from '../../utils/validators';
import * as C from './constants';

export const checkEmailExists = async (email: string) => {
   try {
      const response = await fetch('/api/users/checkueserindatabase', {
         body: JSON.stringify({ email }),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
         },
         method: 'POST',
      });

      const data: string | { error: string } = response.ok ? await response.text() : await response.json();

      return typeof data === 'string' ? null : data.error;
   } catch (e) {
      // tslint:disable-next-line: no-console
      console.error(e);
   }
};

export const validate = async (values: C.UserReqisterData) => {
   const errors: C.UserReqisterDataErrors = {};

   C.requiedFields.forEach((requiredField) => {
      if (!values[requiredField]) {
         errors[requiredField] = `${requiredField} is required.`;
      }
   });

   if (values.email && !validateEmail(values.email)) {
      errors.email = C.UserValidationErrors.EmailIncorrect;
   }

   if (values.passwordConfirm !== values.password) {
      errors.passwordConfirm = 'Passwords don\'t match.';
   }

   if (values.password && values.password.length < 4) {
      errors.password = `Your password must be between ${C.PasswordValidation.MinLength} and ${C.PasswordValidation.MaxLength} characters.`;
   }
   return errors;
};
