import { Config } from "./config";

describe("Configuration", () => {
    it("should validate the configuration", () => {
        expect(Config).toBeDefined();
    });

    it("should have a boolean DATABASE_LOGGING", () => {
        expect(typeof Config.DATABASE_LOGGING).toBe("boolean");
    });

    it("should have a string DATABASE_HOST", () => {
        expect(typeof Config.DATABASE_HOST).toBe("string");
    });

    it("should have an integer DATABASE_PORT", () => {
        expect(Number.isInteger(Config.DATABASE_PORT)).toBe(true);
    });

    it("should have a string DATABASE_NAME", () => {
        expect(typeof Config.DATABASE_NAME).toBe("string");
    });

    it("should have a string DATABASE_USER", () => {
        expect(typeof Config.DATABASE_USER).toBe("string");
    });

    it("should have a string DATABASE_PASSWORD", () => {
        expect(typeof Config.DATABASE_PASSWORD).toBe("string");
    });

    it("should have a boolean DATABASE_SYNC", () => {
        expect(typeof Config.DATABASE_SYNC).toBe("boolean");
    });

    it("should have an integer PORT", () => {
        expect(Number.isInteger(Config.PORT)).toBe(true);
    });

    it("should have a string NODE_ENV", () => {
        expect(typeof Config.NODE_ENV).toBe("string");
    });

    it("should have NODE_ENV equal to 'test'", () => {
        expect(Config.NODE_ENV).toBe("test");
    });

    it("should have a string KAFKA_CLIENT_ID", () => {
        expect(typeof Config.KAFKA_CLIENT_ID).toBe("string");
    });

    it("should have an array KAFKA_BROKERS", () => {
        expect(Array.isArray(Config.KAFKA_BROKERS)).toBe(true);
    });

    it("should have a string KAFKA_CONSUMER_GROUP_ID", () => {
        expect(typeof Config.KAFKA_CONSUMER_GROUP_ID).toBe("string");
    });
});
