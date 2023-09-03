import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { InjectionToken } from "../../injection-token";
import { FindRoomQuery } from "../../contracts/queries/find-room.query";
import { FindRoomResult } from "../../contracts/queries/find-room.result";
import { RoomQuery } from "../../contracts/queries/room-query";

@QueryHandler(FindRoomQuery)
export class FindRoomHandler implements IQueryHandler<FindRoomQuery, FindRoomResult> {
    @Inject(InjectionToken.ROOM_QUERY) readonly roomQuery: RoomQuery;

    public async execute(query: FindRoomQuery): Promise<FindRoomResult> {
        return this.roomQuery.find(query);
    }
}
