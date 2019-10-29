export enum Title {
   EmptyError = 'Please give me a title.',
   InvalidLengthError = 'Title must be between 4 and 100 characters length',
   MaxLength = 100,
   MinLength = 4,
}

export enum Body {
   EmptyError = 'Please give me a body.',
   InvalidLengthError = 'Body must be between 10 and 2000 characters length',
   MaxLength = 2500,
   MinLength = 10,
}
