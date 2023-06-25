import {CoreDTO} from './core.dto';

export interface CoreCrudService<T extends CoreDTO<D>, D> {
    getAll(): Promise<T[]>;

    getById(id: D): Promise<T>;

    update(data: T): Promise<T>;

    create(data: T): Promise<T>;

    delete(id: D): Promise<void>;
}
