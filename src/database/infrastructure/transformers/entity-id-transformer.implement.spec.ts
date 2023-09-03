import { EntityIdTransformerImplement } from "./entity-id-transformer.implement";

describe("EntityIdTransformerImplement", () => {
    const entityIdTransformer = new EntityIdTransformerImplement();

    describe("from", () => {
        it("should convert a buffer to a hex string", () => {
            const buffer = Buffer.from("hello world", "ascii");
            const expected = "68656c6c6f20776f726c64";
            const result = entityIdTransformer.from(buffer);
            expect(result).toEqual(expected);
        });
    });

    describe("to", () => {
        it("should convert a hex string to a buffer", () => {
            const hexString = "68656c6c6f20776f726c64";
            const expected = Buffer.from("hello world", "ascii");
            const result = entityIdTransformer.to(hexString);
            expect(result).toEqual(expected);
        });
    });
});
