export abstract class CoreDTO<T> {
    id?: T | null = null;
    createdAt: Date | null = null;
    updatedAt: Date | null = null;
}
