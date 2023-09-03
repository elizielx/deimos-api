import { Test, TestingModule } from "@nestjs/testing";
import { EventPublisher } from "@nestjs/cqrs";
import { RoomFactory } from "./room.factory";

describe("RoomFactory", () => {
    let roomFactory: RoomFactory;
    let eventPublisher: EventPublisher;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RoomFactory,
                {
                    provide: EventPublisher,
                    useValue: {
                        mergeObjectContext: jest.fn((object) => {
                            return object;
                        }),
                    },
                },
            ],
        }).compile();

        roomFactory = module.get<RoomFactory>(RoomFactory);
        eventPublisher = module.get<EventPublisher>(EventPublisher);
    });

    describe("create", () => {
        it("should create a new room with the given options", () => {
            const options = {
                id: "1",
                number: 101,
                type: "single",
                rate: 100,
                status: "available",
            };

            const room = roomFactory.create(options);

            expect(eventPublisher.mergeObjectContext).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: options.id,
                    number: options.number,
                    type: options.type,
                    rate: options.rate,
                    status: options.status,
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date),
                    deletedAt: null,
                })
            );
            expect(room).toBeDefined();
        });
    });

    describe("reconstitute", () => {
        it("should reconstitute a room with the given properties", () => {
            const properties = {
                id: "1",
                number: 101,
                type: "single",
                rate: 100,
                status: "available",
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            };

            const room = roomFactory.reconstitute(properties);

            expect(eventPublisher.mergeObjectContext).toHaveBeenCalledWith(expect.objectContaining(properties));
            expect(room).toBeDefined();
        });
    });
});
