import { s4 } from './s4';

export const generatePassword = (): string => {
  return `${s4()}${s4()}${s4()}${s4()}${s4()}`;
};
