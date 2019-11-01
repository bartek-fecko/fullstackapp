import * as ValidationConstants from '#/modules/SignUp/constants';
import { validateEmail } from '#/utils/validators';
import * as C from './constants';

export const validate = async (values: C.UserLoginData) => {
   const errors: ValidationConstants.UserReqisterDataErrors = {};

   C.requiedFields.forEach((requiredField) => {
      if (!values[requiredField]) {
         errors[requiredField] = `${requiredField} is required.`;
      }
   });

   if (values.email && !validateEmail(values.email)) {
      errors.email = ValidationConstants.UserValidationErrors.EmailIncorrect;
   }

   if (values.password && values.password.length < 4) {
      errors.password = `Your password must be between ${ValidationConstants.PasswordValidation.MinLength} and ${ValidationConstants.PasswordValidation.MaxLength} characters.`;
   }
   return errors;
};
