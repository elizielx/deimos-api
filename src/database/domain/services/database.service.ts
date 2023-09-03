import { Config } from "@/config";
import { RoomEntity } from "@/rooms/infrastructure/entities/room.entity";
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import {
    DataSource,
    EntityManager,
    EntityTarget,
    ObjectLiteral,
    QueryRunner,
    Repository,
    SelectQueryBuilder,
} from "typeorm";

interface WriteConnection {
    readonly startTransaction: (
        level?: "READ UNCOMMITTED" | "READ COMMITTED" | "REPEATABLE READ" | "SERIALIZABLE"
    ) => Promise<void>;
    readonly commitTransaction: () => Promise<void>;
    readonly rollbackTransaction: () => Promise<void>;
    readonly isTransactionActive: boolean;
    readonly manager: EntityManager;
}

interface ReadConnection {
    readonly getRepository: <T extends ObjectLiteral>(target: EntityTarget<T>) => Repository<T>;
    readonly query: (query: string) => Promise<void>;
    readonly createQueryBuilder: <Entity extends ObjectLiteral>(
        entityClass: EntityTarget<Entity>,
        alias: string,
        queryRunner?: QueryRunner
    ) => SelectQueryBuilder<Entity>;
}

export let writeConnection = {} as WriteConnection;
export let readConnection = {} as ReadConnection;

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private readonly dataSource = new DataSource({
        type: "postgres",
        entities: [RoomEntity],
        logging: Config.DATABASE_LOGGING,
        host: Config.DATABASE_HOST,
        port: Config.DATABASE_PORT,
        database: Config.DATABASE_NAME,
        username: Config.DATABASE_USER,
        password: Config.DATABASE_PASSWORD,
        synchronize: Config.DATABASE_SYNC,
        ssl: false,
    });

    migrate = this.dataSource.runMigrations.bind(this.dataSource);

    async onModuleInit() {
        await this.dataSource.initialize();

        if (!this.dataSource.isInitialized) {
            throw new Error("Datasource is not initialized.");
        }

        writeConnection = this.dataSource.createQueryRunner();
        readConnection = this.dataSource.manager;
    }

    async onModuleDestroy() {
        await this.dataSource.destroy();
    }
}
