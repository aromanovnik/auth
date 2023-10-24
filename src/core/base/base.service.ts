import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseEntity } from './base.entity';

@Injectable()
export abstract class BaseService<T extends BaseEntity> {
  constructor(private readonly repository: Repository<T>) {}

  protected async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  protected async findOne(id: T['id']): Promise<T | null> {
    return this.repository.findOneBy({ id });
  }

  protected async create(createDto: Partial<T>): Promise<T> {
    const entity: T = this.repository.create(createDto as T);
    return this.repository.save(entity);
  }

  protected async update(id: number, updateDto: Partial<T>): Promise<T | null> {
    await this.repository.update(id, updateDto);
    return this.findOne(id);
  }

  protected async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
