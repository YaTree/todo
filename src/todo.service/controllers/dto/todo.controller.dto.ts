import {CoreControllerDTO} from '../../../core/core.controller.dto';

export class ToDoControllerDTO extends CoreControllerDTO<string> {
    deadlineAt?: string | null = null;
    title?: string | null = null;
    description?: string | null = null;
}
