import {CoreControllerDTO} from '../../../core/core.controller.dto';

export class NotificationsControllerDTO extends CoreControllerDTO<string> {
    sentAt?: string | null = null;
    title?: string | null = null;
    body?: string | null = null;
}
