import { Controller, Get, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";

import { FindRoomQuery } from "../application/contracts/queries/find-room.query";
import { FindRoomsRequestQueryString } from "./dto/requests/find-room.querystring";
import { FindRoomsResponseDto } from "./dto/responses/find-room-response.dto";

@Controller("rooms")
export class RoomController {
    constructor(readonly queryBus: QueryBus) {}

    @Get()
    public async findRooms(@Query() queryString: FindRoomsRequestQueryString): Promise<FindRoomsResponseDto> {
        const query = new FindRoomQuery(queryString);
        return await this.queryBus.execute(query);
    }
}
