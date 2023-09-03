import { EntityIdTransformer } from "../../domain/transformers/entity-id.transformer";

export class EntityIdTransformerImplement implements EntityIdTransformer {
    from(dbData: Buffer): string {
        return Buffer.from(dbData.toString("binary"), "ascii").toString("hex");
    }

    to(entityData: string): Buffer {
        return Buffer.from(entityData, "hex");
    }
}
