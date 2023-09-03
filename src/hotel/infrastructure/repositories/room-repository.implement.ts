import { writeConnection } from "@/database/domain/services/database.service";
import { EntityId } from "@/database/infrastructure/entities/entity-id.entity";
import { WrapperType } from "@/utils/wrapper-type.helper";

import { Inject, forwardRef } from "@nestjs/common";

import { RoomFactory } from "../../domain/factories/room.factory";
import { Room, RoomProperties } from "../../domain/models/room.model";
import { RoomRepository } from "../../domain/repositories/room.repository";
import { RoomEntity } from "../entities/room.entity";

export class RoomRepositoryImplement implements RoomRepository {
    @Inject(forwardRef(() => RoomFactory)) private readonly roomFactory: WrapperType<RoomFactory>;

    public async newId(): Promise<string> {
        return new EntityId().toString();
    }

    public async save(data: Room | Room[]): Promise<void> {
        const models = Array.isArray(data) ? data : [data];
        const entities = models.map((model) => this.modelToEntity(model));
        await writeConnection.manager.getRepository(RoomEntity).save(entities);
    }

    private modelToEntity(model: Room): RoomEntity {
        const properties = JSON.parse(JSON.stringify(model)) as RoomProperties;
        return {
            ...properties,
            id: properties.id,
            number: properties.number,
            rate: properties.rate,
            status: properties.status,
            type: properties.type,
            createdAt: properties.createdAt,
            updateAt: properties.updatedAt,
            deletedAt: properties.deletedAt,
        };
    }

    private entityToModel(entity: RoomEntity): Room {
        return this.roomFactory.reconstitute({
            ...entity,
            id: entity.id,
            number: entity.number,
            rate: entity.rate,
            status: entity.status,
            type: entity.type,
            createdAt: entity.createdAt,
            updatedAt: entity.updateAt,
            deletedAt: entity.deletedAt,
        });
    }
}
