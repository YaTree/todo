import CoreServiceImpl from '../../core/impl/core.service.impl';
import {ToDoDTO} from './dto/todo.dto';
import {ToDoEntity} from '../entities/todo.entity';

export interface TodoService extends CoreServiceImpl<ToDoDTO, ToDoEntity, string> {
    sendNotification(data: ToDoDTO): Promise<void>;
}
