import CoreServiceImpl from '../../core/impl/core.service.impl';
import {NotificationDTO} from './dto/notification.dto';
import {NotificationEntity} from '../entities/notification.entity';

export interface NotificationService extends CoreServiceImpl<NotificationDTO, NotificationEntity, string> {

}
