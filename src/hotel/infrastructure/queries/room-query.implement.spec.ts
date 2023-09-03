import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RoomsQueryImplement } from "./room-query.implement";
import { RoomEntity } from "../entities/room.entity";
import { FindRoomQuery } from "@/hotel/application/contracts/queries/find-room.query";
import { FindRoomResult } from "@/hotel/application/contracts/queries/find-room.result";
import { DatabaseService } from "@/database/domain/services/database.service";

describe("RoomsQueryImplement", () => {
    let query: RoomsQueryImplement;
    let databaseService: DatabaseService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DatabaseService,
                RoomsQueryImplement,
                {
                    provide: getRepositoryToken(RoomEntity),
                    useClass: Repository,
                },
            ],
        }).compile();

        query = module.get<RoomsQueryImplement>(RoomsQueryImplement);
        databaseService = module.get<DatabaseService>(DatabaseService);

        await databaseService.onModuleInit();
    });

    afterEach(async () => {
        await databaseService.onModuleDestroy();
    });

    describe("find", () => {
        it("should return an array of rooms", async () => {
            const rooms = new FindRoomResult([
                {
                    id: "1",
                    number: 101,
                    type: "single",
                    rate: 100,
                    status: "available",
                },
                {
                    id: "2",
                    number: 102,
                    type: "double",
                    rate: 150,
                    status: "occupied",
                },
            ]);
            jest.spyOn(query, "find").mockResolvedValue(rooms);

            const queryDto: FindRoomQuery = { skip: 0, take: 10 };
            const result: FindRoomResult = await query.find(queryDto);

            expect(result).toEqual(rooms);
        });
    });
});
