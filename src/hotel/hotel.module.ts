import { KafkaModule } from "@/kafka/kafka.module";

import { Module, Provider } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { CreateRoomHandler } from "./application/handlers/command-handlers/create-room.handler";
import { RoomCreatedHandler } from "./application/handlers/event-handlers/room-created.handler";
import { FindRoomHandler } from "./application/handlers/query-handlers/find-room.handler";
import { InjectionToken } from "./application/injection-token";
import { RoomFactory } from "./domain/factories/room.factory";
import { RoomQueryImplement } from "./infrastructure/queries/room-query.implement";
import { RoomRepositoryImplement } from "./infrastructure/repositories/room-repository.implement";
import { RoomController } from "./interfaces/room.controller";

const infrastructure: Provider[] = [
    {
        provide: InjectionToken.ROOM_REPOSITORY,
        useClass: RoomRepositoryImplement,
    },
    {
        provide: InjectionToken.ROOM_QUERY,
        useClass: RoomQueryImplement,
    },
];
const application = [FindRoomHandler, RoomCreatedHandler, CreateRoomHandler];
const domain = [RoomFactory];
const controllers = [RoomController];

@Module({
    imports: [CqrsModule, KafkaModule],
    controllers: [...controllers],
    providers: [...infrastructure, ...application, ...domain],
})
export class HotelModule {}
