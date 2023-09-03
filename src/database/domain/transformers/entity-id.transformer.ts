export const ENTITY_ID_TRANSFORMER = "EntityIdTransformer";

export interface EntityIdTransformer {
    from: (dbData: Buffer) => string;
    to: (stringId: string) => Buffer;
}
