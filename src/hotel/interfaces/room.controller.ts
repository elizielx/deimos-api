import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";

import { CreateRoomCommand } from "../application/contracts/commands/create-room.command";
import { FindRoomQuery } from "../application/contracts/queries/find-room.query";
import { CreateRoomRequestDto } from "./dto/requests/create-room-request.dto";
import { FindRoomsRequestQueryString } from "./dto/requests/find-room.querystring";
import { FindRoomsResponseDto } from "./dto/responses/find-room-response.dto";

@Controller("rooms")
export class RoomController {
    constructor(
        readonly commandBus: CommandBus,
        readonly queryBus: QueryBus
    ) {}

    @Get()
    public async findRooms(@Query() queryString: FindRoomsRequestQueryString): Promise<FindRoomsResponseDto> {
        const query = new FindRoomQuery(queryString);
        return await this.queryBus.execute(query);
    }

    @Post()
    public async createRoom(@Body() body: CreateRoomRequestDto): Promise<void> {
        const command = new CreateRoomCommand(body.number, body.type, body.rate, body.status);
        return await this.commandBus.execute(command);
    }
}
