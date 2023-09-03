import { validate } from "class-validator";

import { FindRoomsResponseDto } from "./find-room-response.dto";

describe("FindRoomsResponseDto", () => {
    it("should pass validation with valid data", async () => {
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
        const dto = new FindRoomsResponseDto(rooms);
        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it("matches the snapshot", () => {
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
        const dto = new FindRoomsResponseDto(rooms);
        expect(dto).toMatchSnapshot();
    });
});
