import {
  Column,
  CreateDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseEntity {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    default: '',
  })
  comment = '';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
