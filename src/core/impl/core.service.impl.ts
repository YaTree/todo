import _ from 'underscore';
import {AppDataSource} from '../data.source';
import {CoreDTO} from '../core.dto';
import {CoreEntity} from '../core.entity';
import {CoreCrudService} from '../core.crud.service';
import {FindOptionsOrder, FindOptionsWhere} from 'typeorm';
import HttpException from '../exceptions/http.exception';
import {Mapper} from './core.mapper.impl';
import {ObjectId} from 'mongodb';

export default abstract class CoreServiceImpl<T extends CoreDTO<D>, E extends CoreEntity<D>, D> implements CoreCrudService<T, D> {
    abstract getEntityClass(): new () => E;

    abstract getDTOClass(): new () => T;

    async create(data: T): Promise<T> {
        let entity = Mapper.convert<E>(data, this.getEntityClass());
        entity.createdAt = new Date();
        const newObject = await AppDataSource.manager.save(entity);

        return Mapper.convert<T>(newObject, this.getDTOClass());
    }


    async update(data: T): Promise<T> {
        let currentData = await this.getById(data.id as any);
        let id = currentData.id;
        let createdAt = currentData.createdAt;

        currentData = data;
        currentData.id = id;
        currentData.createdAt = createdAt;
        currentData.updatedAt = new Date();

        const newObject = await AppDataSource.getRepository(this.getEntityClass()).save(Mapper.convert<E>(currentData, this.getEntityClass()));

        return Mapper.convert<T>(newObject, this.getDTOClass());
    }

    async delete(id: D): Promise<void> {
        //here id works just fine
        await AppDataSource.getRepository(this.getEntityClass()).delete({id: id} as unknown as FindOptionsWhere<E>);
        return Promise.resolve();
    }

    async getAll(whereOptions: FindOptionsWhere<any> | null = null, orderOptions: FindOptionsOrder<any> | null = null): Promise<T[]> {
        let data: any;
        if (whereOptions == null && orderOptions == null) {
            data = await AppDataSource.getRepository(this.getEntityClass()).find();
        } else if (orderOptions == null && whereOptions != null) {
            data = AppDataSource.getRepository(this.getEntityClass()).findBy(whereOptions);
        } else {
            data = AppDataSource.getRepository(this.getEntityClass()).find({
                where: whereOptions!,
                order: orderOptions!
            });
        }

        return Mapper.convertList<T>(data, this.getDTOClass());
    }

    async getById(id: D): Promise<T> {
        //_id/ObjectId is a bug: https://github.com/typeorm/typeorm/issues/3964
        const data = await AppDataSource.getRepository(this.getEntityClass()).findOne({where: {_id: new ObjectId(id as string)} as unknown as FindOptionsWhere<E>});
        if (_.isNull(data)) {
            throw new HttpException(400, 'Not found');
        }

        return Mapper.convert<T>(data, this.getDTOClass());
    }
}
