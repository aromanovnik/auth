import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { ErrorMessages } from '../../../core';

export class ChangePasswordDto {
  @ApiProperty({
    example: 'user@mail.com',
    description: 'Email',
    required: true,
  })
  @IsString({ message: ErrorMessages.NotString })
  @IsEmail({}, { message: ErrorMessages.IncorrectEmail })
  readonly email: string;

  @ApiProperty({ example: 'Password', description: 'Password', required: true })
  @IsString({ message: ErrorMessages.NotString })
  @Length(6, 16, { message: ErrorMessages.IncorrectPassword })
  readonly password: string;

  @ApiProperty({
    example: 'Password',
    description: 'New password',
    required: true,
  })
  @IsString({ message: ErrorMessages.NotString })
  @Length(6, 16, { message: ErrorMessages.IncorrectNewPassword })
  readonly newPassword: string;
}
