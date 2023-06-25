export abstract class CoreControllerDTO<T> {
    id?: T | null = null;
    createdAt: Date | null = null;
    updatedAt: Date | null = null;
}
