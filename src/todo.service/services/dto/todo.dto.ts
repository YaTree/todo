import {CoreDTO} from '../../../core/core.dto';

export class ToDoDTO extends CoreDTO<string> {
    deadlineAt?: string | null = null;
    title?: string | null = null;
    description?: string | null = null;
}
