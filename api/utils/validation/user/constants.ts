export enum Name  {
   EmptyError = 'Please give a name.',
   InvalidLengthError = 'Title must be between 2 and 50 characters length.',
   MaxLength = 50,
   MinLength = 2,
}

export enum Email  {
   InvalidEmail = 'This email is invalid.',
}

export enum Password  {
   InvalidPassword = 'Password must contain at least 4 characters!',
   MaxLength = 250,
   MinLength = 4,
}
