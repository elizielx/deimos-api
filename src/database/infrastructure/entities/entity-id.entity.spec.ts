import { EntityId } from "./entity-id.entity";

describe("EntityId", () => {
    it("should create a new EntityId instance", () => {
        const entityId = new EntityId();
        expect(entityId).toBeDefined();
    });

    it("should be a object", () => {
        const entityId = new EntityId();
        expect(typeof entityId).toBe("object");
    });

    it("should have a length of 32", () => {
        const entityId = new EntityId();
        expect(entityId.length).toBe(32);
    });

    it("should not be equal to another EntityId instance", () => {
        const entityId1 = new EntityId();
        const entityId2 = new EntityId();
        expect(entityId1).not.toBe(entityId2);
    });
});
