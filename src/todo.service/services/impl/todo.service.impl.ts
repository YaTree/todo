import {ToDoDTO} from '../dto/todo.dto';
import {TodoService} from '../todo.service';
import CoreServiceImpl from '../../../core/impl/core.service.impl';
import {ToDoEntity} from '../../entities/todo.entity';
import {agenda} from '../../service';
import {ObjectId} from 'mongodb';

const moment = require('moment-timezone');

class TodoServiceImpl extends CoreServiceImpl<ToDoDTO, ToDoEntity, string> implements TodoService {
    getDTOClass(): { new(): ToDoDTO } {
        return ToDoDTO;
    }

    getEntityClass(): { new(): ToDoEntity } {
        return ToDoEntity;
    }


    async delete(id: string): Promise<void> {
        await agenda.jobs({'data.id': new ObjectId(id)});
        await agenda.cancel({'data.id': new ObjectId(id)});
        
        return super.delete(id);
    }

    async update(data: ToDoDTO): Promise<ToDoDTO> {
        const result = await super.update(data);
       
        await agenda.cancel({'data.id': new ObjectId(result.id!)});
        await agenda.schedule(data.deadlineAt, 'send-notification', result);

        return result;
    }

    async create(data: ToDoDTO): Promise<ToDoDTO> {
        const result = await super.create(data);
        await agenda.schedule(data.deadlineAt, 'send-notification', result);

        return result;
    }

    public async sendNotification(data: ToDoDTO) {
        const resp = await fetch(`${process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:30001/notifications'} `, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: `Reminder for: ${data.title}`,
                body: `Full Description: ${data.description}`,
                sentAt: Date()
            })
        })
    }
}

export const todoService: TodoService = new TodoServiceImpl();
