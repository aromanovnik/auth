import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, Length } from 'class-validator';
import { ErrorMessages } from '../../../core';

export class PasswordResetDto {
  @ApiProperty({ example: 'user@mail.com', description: 'Email' })
  @IsString({ message: ErrorMessages.NotString })
  @IsEmail({}, { message: ErrorMessages.IncorrectEmail })
  readonly email: string;

  @ApiProperty({ example: '1234', description: 'Secret code' })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: ErrorMessages.NotNumber },
  )
  @Length(4, 4, { message: ErrorMessages.IncorrectSecretCode })
  readonly secretCode: number;
}
