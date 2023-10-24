import { GenderEnum } from '../';

export const genderType = Object.values(GenderEnum);
export type GenderType = (typeof genderType)[number];
