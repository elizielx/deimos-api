import { FindRoomQuery } from "./find-room.query";

describe("FindRoomQuery", () => {
    it("should create a new instance of FindRoomQuery", () => {
        const query = new FindRoomQuery({ skip: 0, take: 10 });
        expect(query).toBeDefined();
        expect(query.skip).toBe(0);
        expect(query.take).toBe(10);
    });
});
