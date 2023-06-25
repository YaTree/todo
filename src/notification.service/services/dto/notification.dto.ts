import {CoreDTO} from '../../../core/core.dto';

export class NotificationDTO extends CoreDTO<string> {
    sentAt?: string | null = null;
    title?: string | null = null;
    body?: string | null = null;
}
