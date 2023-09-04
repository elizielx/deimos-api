import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Test, TestingModule } from "@nestjs/testing";

import { FindRoomQuery } from "../application/contracts/queries/find-room.query";
import { FindRoomsRequestQueryString } from "./dto/requests/find-room.querystring";
import { FindRoomsResponseDto } from "./dto/responses/find-room-response.dto";
import { RoomController } from "./room.controller";

describe("RoomController", () => {
    let controller: RoomController;
    let queryBus: QueryBus;
    let commandBus: CommandBus;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RoomController],
            providers: [
                {
                    provide: QueryBus,
                    useValue: {
                        execute: jest.fn(),
                    },
                },
                {
                    provide: CommandBus,
                    useValue: {
                        execute: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<RoomController>(RoomController);
        queryBus = module.get<QueryBus>(QueryBus);
        commandBus = module.get<CommandBus>(CommandBus);
    });

    describe("findRooms", () => {
        it("should return a FindRoomsResponseDto", async () => {
            const queryString: FindRoomsRequestQueryString = {
                skip: 0,
                take: 10,
            };
            const query = new FindRoomQuery(queryString);
            const expectedResult: FindRoomsResponseDto = {
                rooms: [
                    {
                        id: "1",
                        number: 101,
                        type: "single",
                        rate: 100,
                        status: "available",
                    },
                ],
            };
            jest.spyOn(queryBus, "execute").mockImplementationOnce(() => Promise.resolve(expectedResult));
            jest.spyOn(commandBus, "execute").mockImplementationOnce(() => Promise.resolve());

            const result = await controller.findRooms(queryString);

            expect(result).toEqual(expectedResult);
            expect(queryBus.execute).toHaveBeenCalledWith(query);
        });
    });
});
