import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { RoomFactory } from "../../domain/factories/room.factory";
import { RoomRepository } from "../../domain/repositories/room.repository";
import { RoomEntity } from "../entities/room.entity";
import { RoomsRepositoryImplement } from "./room-repository.implement";
import { EventPublisher } from "@nestjs/cqrs";
import { DatabaseService } from "@/database/domain/services/database.service";

describe("RoomsRepositoryImplement", () => {
    let roomFactory: RoomFactory;
    let roomRepository: RoomRepository;
    let databaseService: DatabaseService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DatabaseService,
                RoomsRepositoryImplement,
                RoomFactory,
                {
                    provide: EventPublisher,
                    useValue: {
                        mergeObjectContext: jest.fn((object) => {
                            return object;
                        }),
                    },
                },
                {
                    provide: getRepositoryToken(RoomEntity),
                    useValue: {
                        save: jest.fn(),
                    },
                },
            ],
        }).compile();

        roomFactory = module.get<RoomFactory>(RoomFactory);
        roomRepository = module.get<RoomsRepositoryImplement>(RoomsRepositoryImplement);
        databaseService = module.get<DatabaseService>(DatabaseService);

        await databaseService.onModuleInit();
    });

    afterEach(async () => {
        await databaseService.onModuleDestroy();
    });

    describe("newId", () => {
        it("should return a new EntityId", async () => {
            const id = await roomRepository.newId();
            expect(id).toBeDefined();
        });
    });

    describe("save", () => {
        it("should save a single room", async () => {
            const room = roomFactory.create({
                id: await roomRepository.newId(),
                number: 101,
                rate: 100,
                status: "available",
                type: "standard",
            });

            jest.spyOn(roomRepository, "save").mockReturnValue(Promise.resolve());

            room.create();
            await roomRepository.save(room);
            room.commit();

            expect(roomRepository.save).toBeCalledTimes(1);
        });
    });
});
