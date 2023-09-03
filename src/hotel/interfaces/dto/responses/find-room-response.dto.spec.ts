import { FindRoomsResponseDTO } from "./find-room-response.dto";

describe("FindRoomsResponseDTO", () => {
    it("should create a new instance of FindRoomsResponseDTO", () => {
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
                status: "booked",
            },
        ];

        const findRoomsResponseDTO = new FindRoomsResponseDTO(rooms);

        expect(findRoomsResponseDTO.rooms).toEqual(rooms);
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
                status: "booked",
            },
        ];

        const findRoomsResponseDTO = new FindRoomsResponseDTO(rooms);

        expect(findRoomsResponseDTO).toMatchSnapshot();
    });
});
