import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { FindRoomsRequestQueryString } from "./find-room.querystring";

describe("FindRoomsRequestQueryString", () => {
    it("should validate a valid request", async () => {
        const request = plainToClass(FindRoomsRequestQueryString, {
            skip: 5,
            take: 10,
        });
        const errors = await validate(request);
        expect(errors.length).toBe(0);
    });

    it("should validate a request with only skip", async () => {
        const request = plainToClass(FindRoomsRequestQueryString, {
            skip: 5,
        });
        const errors = await validate(request);
        expect(errors.length).toBe(0);
    });

    it("should validate a request with only take", async () => {
        const request = plainToClass(FindRoomsRequestQueryString, {
            take: 10,
        });
        const errors = await validate(request);
        expect(errors.length).toBe(0);
    });

    it("should not validate a request with negative skip", async () => {
        const request = plainToClass(FindRoomsRequestQueryString, {
            skip: -1,
            take: 10,
        });
        const errors = await validate(request);
        expect(errors.length).toBeGreaterThan(0);
    });

    it("should not validate a request with zero take", async () => {
        const request = plainToClass(FindRoomsRequestQueryString, {
            skip: 5,
            take: 0,
        });
        const errors = await validate(request);
        expect(errors.length).toBeGreaterThan(0);
    });

    it("should not validate a request with take greater than 20", async () => {
        const request = plainToClass(FindRoomsRequestQueryString, {
            skip: 5,
            take: 21,
        });
        const errors = await validate(request);
        expect(errors.length).toBeGreaterThan(0);
    });

    it("matches the snapshot", () => {
        const request = plainToClass(FindRoomsRequestQueryString, {
            skip: 5,
            take: 10,
        });
        expect(request).toMatchSnapshot();
    });
});
