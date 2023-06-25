import {NotificationDTO} from '../dto/notification.dto';
import {NotificationService} from '../notification.service';
import CoreServiceImpl from '../../../core/impl/core.service.impl';
import {NotificationEntity} from '../../entities/notification.entity';


class NotificationServiceImpl extends CoreServiceImpl<NotificationDTO, NotificationEntity, string> implements NotificationService {
    getDTOClass(): { new(): NotificationDTO } {
        return NotificationDTO;
    }

    getEntityClass(): { new(): NotificationEntity } {
        return NotificationEntity;
    }
}

export const notificationService: NotificationService = new NotificationServiceImpl();
