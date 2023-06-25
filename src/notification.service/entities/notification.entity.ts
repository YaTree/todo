import {Column, Entity, ObjectIdColumn} from 'typeorm';
import {CoreEntity} from '../../core/core.entity';

@Entity()
export class NotificationEntity extends CoreEntity<string> {
    @ObjectIdColumn()
    id?: string | null = null;

    @Column()
    title?: string | null = null;

    @Column()
    body?: string | null = null;

    @Column()
    sentAt?: string | null = null;
}
