import { CreateRoomCommand } from "./create-room.command";

describe("CreateRoomCommand", () => {
    it("should create a new instance of CreateRoomCommand", () => {
        const command = new CreateRoomCommand(101, "single", 50, "available");
        expect(command).toBeDefined();
        expect(command.number).toEqual(101);
        expect(command.type).toEqual("single");
        expect(command.rate).toEqual(50);
        expect(command.status).toEqual("available");
    });
});
