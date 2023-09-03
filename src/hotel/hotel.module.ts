import { Module, Provider } from "@nestjs/common";
import { RoomFactory } from "./domain/factories/room.factory";
import { InjectionToken } from "./application/injection-token";
import { RoomRepositoryImplement } from "./infrastructure/repositories/room-repository.implement";
import { CqrsModule } from "@nestjs/cqrs";
import { RoomController } from "./interfaces/room.controller";
import { RoomQueryImplement } from "./infrastructure/queries/room-query.implement";
import { FindRoomHandler } from "./application/handlers/query-handlers/find-room.handler";

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
const application = [FindRoomHandler];
const domain = [RoomFactory];
const controllers = [RoomController];

@Module({
    imports: [CqrsModule],
    controllers: [...controllers],
    providers: [...infrastructure, ...application, ...domain],
})
export class HotelModule {}
