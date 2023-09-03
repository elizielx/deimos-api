import { Test, TestingModule } from "@nestjs/testing";
import { QueryBus } from "@nestjs/cqrs";
import { RoomController } from "./room.controller";
import { FindRoomQuery } from "../application/contracts/queries/find-room.query";
import { FindRoomsRequestQueryString } from "./dto/requests/find-room.querystring";
import { FindRoomsResponseDto } from "./dto/responses/find-room-response.dto";

describe("RoomController", () => {
    let controller: RoomController;
    let queryBus: QueryBus;

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
            ],
        }).compile();

        controller = module.get<RoomController>(RoomController);
        queryBus = module.get<QueryBus>(QueryBus);
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

            const result = await controller.findRooms(queryString);

            expect(result).toEqual(expectedResult);
            expect(queryBus.execute).toHaveBeenCalledWith(query);
        });
    });
});
