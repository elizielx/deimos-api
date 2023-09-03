import { Inject, forwardRef } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { InjectionToken } from "../../injection-token";
import { FindRoomQuery } from "../../contracts/queries/find-room.query";
import { FindRoomResult } from "../../contracts/queries/find-room.result";
import { RoomQuery } from "../../contracts/queries/room-query";
import { WrapperType } from "@/utils/wrapper-type.helper";

@QueryHandler(FindRoomQuery)
export class FindRoomHandler implements IQueryHandler<FindRoomQuery, FindRoomResult> {
    @Inject(forwardRef(() => InjectionToken.ROOM_QUERY)) readonly roomQuery: WrapperType<RoomQuery>;

    public async execute(query: FindRoomQuery): Promise<FindRoomResult> {
        return this.roomQuery.find(query);
    }
}
