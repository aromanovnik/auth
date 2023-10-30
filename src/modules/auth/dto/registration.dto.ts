import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { ErrorMessages, GenderEnum } from '../../../core';

export class RegistrationDto {
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

  @ApiProperty({ example: 'Ivan', description: 'First name', required: false })
  @IsOptional()
  @IsString({ message: ErrorMessages.NotString })
  readonly firstname?: string;

  @ApiProperty({ example: 'Ivanov', description: 'Last name', required: false })
  @IsOptional()
  @IsString({ message: ErrorMessages.NotString })
  readonly lastname?: string;

  @ApiProperty({
    example: GenderEnum.Male,
    description: 'Gender',
    enum: GenderEnum,
    required: false,
  })
  @IsOptional()
  @IsEnum(GenderEnum, { message: ErrorMessages.InvalidUserGender })
  readonly gender?: GenderEnum;
}
