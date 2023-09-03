import { RoomImplement } from "./room.model";

describe("RoomImplement", () => {
    const roomProperties = {
        id: "1",
        number: 101,
        type: "single",
        rate: 100,
        status: "available",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
    };

    it("should create a new room", () => {
        const room = new RoomImplement(roomProperties);

        expect(room.getId()).toEqual(roomProperties.id);
        expect(room.getNumber()).toEqual(roomProperties.number);
        expect(room.getType()).toEqual(roomProperties.type);
        expect(room.getRate()).toEqual(roomProperties.rate);
        expect(room.getStatus()).toEqual(roomProperties.status);
    });

    it("should apply a RoomCreatedEvent when create() is called", () => {
        const room = new RoomImplement(roomProperties);
        const spy = jest.spyOn(room, "apply");

        room.create();

        expect(spy).toHaveBeenCalledWith({
            id: roomProperties.id,
            number: roomProperties.number,
            type: roomProperties.type,
            rate: roomProperties.rate,
            status: roomProperties.status,
        });
    });
});
