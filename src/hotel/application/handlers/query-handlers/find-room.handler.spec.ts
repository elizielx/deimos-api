import { Test } from "@nestjs/testing";

import { FindRoomQuery } from "../../contracts/queries/find-room.query";
import { FindRoomResult } from "../../contracts/queries/find-room.result";
import { InjectionToken } from "../../injection-token";
import { FindRoomHandler } from "./find-room.handler";

describe("FindRoomHandler", () => {
    let handler: FindRoomHandler;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                FindRoomHandler,
                {
                    provide: InjectionToken.ROOM_QUERY,
                    useValue: {
                        find: jest.fn(),
                    },
                },
            ],
        }).compile();

        handler = moduleRef.get<FindRoomHandler>(FindRoomHandler);
    });

    describe("execute", () => {
        it("should call roomQuery.find with the correct arguments", async () => {
            const query: FindRoomQuery = { skip: 0, take: 10 };
            const rooms = new FindRoomResult([
                {
                    id: "1",
                    number: 101,
                    type: "single",
                    rate: 100,
                    status: "available",
                },
            ]);
            jest.spyOn(handler, "execute").mockResolvedValue(rooms);

            const result: FindRoomResult = await handler.execute(query);

            expect(result).toEqual(rooms);
        });
    });
});
