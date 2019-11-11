import * as C from './constants';

export const validate = async (values: C.PostCreateData) => {
   const errors: C.PostCreateDataErrors = {};

   C.requiedFields.forEach((requiredField) => {
      if (!values[requiredField]) {
         errors[requiredField] = `${requiredField} is required.`;
      }
   });

   if (values.body && values.body.length >= C.MaxLength.Body) {
      errors.body = C.PostCreateErrors.bodyTooLong;
   }
   if (values.title && values.title.length >= C.MaxLength.Title) {
      errors.title = C.PostCreateErrors.titleTooLong;
   }

   return errors;
};
