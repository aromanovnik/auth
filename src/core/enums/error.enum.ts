export enum ErrorMessages {
  IncorrectEmail = 'INCORRECT_EMAIL',
  IncorrectPassword = 'INCORRECT_PASSWORD',
  IncorrectNewPassword = 'INCORRECT_NEW_PASSWORD',
  IncorrectSecretCode = 'INCORRECT_SECRET_CODE',
  IncorrectEmailOrPassword = 'INCORRECT_EMAIL_OR_PASSWORD',
  NotString = 'NOT_STRING',
  NotNumber = 'NOT_NUMBER',
  NotDate = 'NOT_DATE',
  UserNotFound = 'USER_NOT_FOUND',
  Forbidden = 'FORBIDDEN',
  EmailExists = 'EMAIL_EXISTS',
  InternalServerError = 'INTERNAL_SERVER_ERROR',
  BadRequest = 'BAD_REQUEST',
  NotFound = 'NOT_FOUND',
  OnlyImageFilesAreAllowed = 'ONLY_IMAGE_FILES_ARE_ALLOWED',
  InvalidUserGender = 'INVALID_USER_GENDER',
}

export type ErrorType = keyof typeof ErrorMessages;

export const errorMessageDescription: Record<ErrorType, string> = {
  IncorrectEmail: 'The email is incorrect',
  IncorrectPassword: 'The password is incorrect',
  IncorrectNewPassword: 'The new password is incorrect',
  IncorrectSecretCode: 'The secret code is incorrect',
  IncorrectEmailOrPassword: 'The email or password is incorrect',
  NotString: 'Value is not a string',
  NotNumber: 'Value is not a number',
  NotDate: 'Value is not a date',
  UserNotFound: 'User not found',
  Forbidden: 'Access is forbidden',
  EmailExists: 'Email already exists',
  InternalServerError: 'Internal server error',
  BadRequest: 'Bad request',
  NotFound: 'Resource not found',
  OnlyImageFilesAreAllowed: 'Only image files are allowed',
  InvalidUserGender: 'Invalid user gender',
};
