import { validate } from "class-validator";
import { CreateRoomRequestDto } from "./create-room-request.dto";

describe("CreateRoomRequestDto", () => {
    it("should pass validation with valid data", async () => {
        const dto = new CreateRoomRequestDto();
        dto.number = 101;
        dto.rate = 100;
        dto.type = "single";
        dto.status = "available";

        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it("matches the snapshot", () => {
        const dto = new CreateRoomRequestDto();
        dto.number = 101;
        dto.rate = 100;
        dto.type = "single";
        dto.status = "available";

        expect(dto).toMatchSnapshot();
    });
});
