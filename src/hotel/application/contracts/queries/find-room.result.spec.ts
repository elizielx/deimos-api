import { FindRoomResult } from "./find-room.result";

describe("FindRoomResult", () => {
    it("should create an instance of FindRoomResult", () => {
        const rooms = [
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
        ];
        const result = new FindRoomResult(rooms);
        expect(result).toBeInstanceOf(FindRoomResult);
    });

    it("should have the correct properties", () => {
        const rooms = [
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
        ];
        const result = new FindRoomResult(rooms);
        expect(result.rooms).toEqual(rooms);
    });
});
