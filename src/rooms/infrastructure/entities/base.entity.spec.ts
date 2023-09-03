import { BaseEntity } from "./base.entity";

describe("BaseEntity", () => {
    let baseEntity: BaseEntity;

    beforeEach(() => {
        baseEntity = new BaseEntity();
    });

    it("should create an instance of BaseEntity", () => {
        expect(baseEntity).toBeTruthy();
    });
});
