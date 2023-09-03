import { RoomEntity } from "./room.entity";

describe("RoomEntity", () => {
    let roomEntity: RoomEntity;

    beforeEach(() => {
        roomEntity = new RoomEntity();
    });

    it("should create an instance of RoomEntity", () => {
        expect(roomEntity).toBeTruthy();
    });
});
