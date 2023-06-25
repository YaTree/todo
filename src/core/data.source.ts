import {DataSource} from 'typeorm';
import {ToDoEntity} from '../todo.service/entities/todo.entity';
import {NotificationEntity} from '../notification.service/entities/notification.entity';


export const AppDataSource = new DataSource({
    type: 'mongodb',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'todos',
    synchronize: true,
    logging: true,
    entities: [ToDoEntity, NotificationEntity],
    subscribers: [],
    migrations: [],
})
