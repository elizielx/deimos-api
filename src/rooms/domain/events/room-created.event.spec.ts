import { RoomCreatedEvent } from "./room-created.event";

describe("RoomCreatedEvent", () => {
    it("should create a new RoomCreatedEvent instance", () => {
        const id = "1";
        const number = 101;
        const type = "single";
        const rate = 100;
        const status = "available";

        const event = new RoomCreatedEvent(id, number, type, rate, status);

        expect(event).toBeDefined();
        expect(event.id).toEqual(id);
        expect(event.number).toEqual(number);
        expect(event.type).toEqual(type);
        expect(event.rate).toEqual(rate);
        expect(event.status).toEqual(status);
    });
});
