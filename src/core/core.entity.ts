import {CreateDateColumn, UpdateDateColumn} from 'typeorm';

export abstract class CoreEntity<T> {
    abstract id?: T | null;

    @CreateDateColumn({
        nullable: true
    })
    createdAt?: Date | null = new Date();

    @UpdateDateColumn()
    updatedAt?: Date | null = new Date();
}
