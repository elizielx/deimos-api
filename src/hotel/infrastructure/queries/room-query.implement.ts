import { readConnection } from "@/database/domain/services/database.service";

import { Injectable } from "@nestjs/common";

import { RoomEntity } from "../entities/room.entity";
import { FindRoomQuery } from "@/hotel/application/contracts/queries/find-room.query";
import { FindRoomResult } from "@/hotel/application/contracts/queries/find-room.result";
import { RoomQuery } from "@/hotel/application/contracts/queries/room-query";

@Injectable()
export class RoomQueryImplement implements RoomQuery {
    public async find(query: FindRoomQuery): Promise<FindRoomResult> {
        return readConnection
            .getRepository(RoomEntity)
            .find({
                skip: query.skip,
                take: query.skip,
            })
            .then((entities) => ({
                rooms: entities.map((entity) => ({
                    id: entity.id,
                    number: entity.number,
                    type: entity.type,
                    rate: entity.rate,
                    status: entity.status,
                })),
            }));
    }
}
