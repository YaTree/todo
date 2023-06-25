import {Request, Response} from 'express';
import {Mapper} from '../../core/impl/core.mapper.impl';
import {NotificationsControllerDTO} from './dto/notifications.controller.dto';
import {NotificationDTO} from '../services/dto/notification.dto';
import {notificationService} from '../services/impl/notification.service.impl';


export function getNotifications(req: Request, res: Response, next: any) {
    notificationService.getAll().then(data => {
        res.status(200)
            .json({
                data: Mapper.convertList<NotificationsControllerDTO>(data, NotificationsControllerDTO)
            });
    }).catch(e => {
        res.status(400)
            .json({
                data: e.toString()
            });
    });
}

export function getNotification(req: Request, res: Response, next: any) {
    notificationService.getById(req.params['id']).then(data => {
        res.status(200)
            .json({
                data: Mapper.convert<NotificationsControllerDTO>(data, NotificationsControllerDTO)
            });
    }).catch(e => {
        res.status(400)
            .json({
                data: e.toString()
            });
    });
}

export function updateNotification(req: Request, res: Response, next: any) {

    notificationService.update(Mapper.convert(req.body, NotificationDTO)).then(data => {
        res.status(200)
            .json({
                data: Mapper.convert<NotificationsControllerDTO>(data, NotificationsControllerDTO)
            });
    }).catch(e => {
        res.status(400)
            .json({
                data: e.toString()
            });
    });
}

export function createNotification(req: Request, res: Response, next: any) {
    notificationService.create(Mapper.convert(req.body, NotificationDTO)).then(data => {
        res.status(200)
            .json({
                data: Mapper.convert<NotificationsControllerDTO>(data, NotificationsControllerDTO)
            });
    }).catch(e => {
        res.status(400)
            .json({
                data: e.toString()
            });
    });
}


