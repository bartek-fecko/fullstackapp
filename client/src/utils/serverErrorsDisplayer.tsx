import { Chip } from '@material-ui/core';
import * as React from 'react';

export type ServerErrors = Array<{
   value: string;
   msg: string;
   param: string;
}>;

export const serverErrorsDisplayer = (errors: ServerErrors) => (
   errors.map(({ msg }, i) => (
      <Chip
         key={i}
         label={msg}
         color="secondary"
      />
   ))
);
