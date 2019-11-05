import { UserProfileData } from '../constants';
import * as C from './constants';

export const validate = async (values: UserProfileData) => {
   const errors: C.UserProfileDataErrors = {};

   C.requiedFields.forEach((requiredField) => {
      if (!values[requiredField]) {
         errors[requiredField] = `${requiredField} is required.`;
      }
   });

   return errors;
};
