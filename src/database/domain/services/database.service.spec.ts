import { Test, TestingModule } from "@nestjs/testing";

import { DatabaseService, readConnection, writeConnection } from "./database.service";

describe("DatabaseService", () => {
    let databaseService: DatabaseService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DatabaseService],
        }).compile();

        databaseService = module.get<DatabaseService>(DatabaseService);
    });

    it("should be defined", () => {
        expect(databaseService).toBeDefined();
    });

    it("should initialize write and read connections", async () => {
        await databaseService.onModuleInit();

        expect(writeConnection).toBeDefined();
        expect(readConnection).toBeDefined();
    });

    it("should destroy the data source on module destroy", async () => {
        const destroySpy = jest.spyOn(databaseService["dataSource"], "destroy");

        await databaseService.onModuleDestroy();

        expect(destroySpy).toHaveBeenCalled();
    });
});
