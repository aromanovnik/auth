import { Column, Entity, Index } from 'typeorm';
import { IsDate, IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';
import { GenderEnum, BaseEntity } from '../../core';

@Entity()
export class User extends BaseEntity {
  @Column({
    length: 256,
    type: 'varchar',
    default: '',
  })
  firstName = '';

  @Column({
    length: 256,
    type: 'varchar',
    default: '',
  })
  lastName = '';

  // @OneToMany(type => Photo, photo => photo.user)
  // photos: Photo[];

  @Column({
    type: 'text',
    default: '',
  })
  description = '';

  @Column({
    type: 'text',
    default: '',
  })
  salt = '';

  @Column({
    type: 'enum',
    enum: GenderEnum,
    default: GenderEnum.Empty,
  })
  @IsOptional()
  gender: GenderEnum = GenderEnum.Empty;

  @Column({
    type: 'date',
    nullable: true,
    default: null,
  })
  @IsOptional()
  @IsDate()
  birthdate: string | null = null;

  @Column({
    type: 'integer',
    unique: true,
    nullable: true,
    default: null,
  })
  @IsOptional()
  @IsPhoneNumber()
  phone: number | null = null;

  @Index()
  @Column({
    type: 'varchar',
    length: 250,
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({
    length: 256,
    type: 'varchar',
  })
  password: string;

  @Column({
    length: 256,
    type: 'varchar',
    default: null,
  })
  verifyEmailToken: string;

  @Column({ type: 'boolean', default: false })
  verifiedEmail: boolean;

  @Column({
    type: 'jsonb',
    default: null,
  })
  verifiedEmailsHistory: { date: Date; email: string }[];
}
