import { Injectable } from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { DeepPartial } from 'typeorm/common/DeepPartial';

@Injectable()
export abstract class BaseService<T extends ObjectLiteral> {
  protected repository: Repository<T>;

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  // protected async findOne(id: T['id']): Promise<T | null> {
  async findOne(where: FindOptionsWhere<T>): Promise<T | null> {
    return this.repository.findOneBy(where);
  }

  async create(createDto: DeepPartial<T>): Promise<T> {
    const entity: T = this.repository.create(createDto);
    return this.repository.save(entity);
  }

  async update(id: T['id'], updateDto: Partial<T>): Promise<T | null> {
    await this.repository.update(id, updateDto);
    return this.findOne({ id });
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
