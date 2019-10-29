import { validateEmail } from './../../utils/validate';
import * as C from './constants';

export const validate = (values: C.UserReqisterData) => {
   const errors: C.UserReqisterDataErrors = {};
   C.requiedFields.forEach((requiredField) => (
      errors[requiredField] = values[requiredField] && `${requiredField} is required.`
   ));

   if (values.email && !validateEmail(values.email)) {
      errors.email = C.UserValidationErrors.EmailIncorrect;
   }

   if (values.password && values.password.length < 4) {
      errors.password = `Your password must be between ${C.PasswordValidation.MinLength} and ${C.PasswordValidation.MaxLength} characters.`;
   }

   return errors;
};
