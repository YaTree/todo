import {Column, Entity, ObjectIdColumn} from 'typeorm';
import {CoreEntity} from '../../core/core.entity';

@Entity()
export class ToDoEntity extends CoreEntity<string> {
    @ObjectIdColumn()
    id?: string | null = null;

    @Column()
    title?: string | null = null;

    @Column()
    description?: string | null = null;

    @Column()
    deadlineAt?: string | null = null;
}
