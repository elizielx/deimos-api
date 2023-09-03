import { Module, Provider } from "@nestjs/common";
import { RoomFactory } from "./domain/factories/room.factory";
import { InjectionToken } from "./application/injection-token";
import { RoomRepositoryImplement } from "./infrastructure/repositories/room-repository.implement";
import { CqrsModule } from "@nestjs/cqrs";

const infrastructure: Provider[] = [
    {
        provide: InjectionToken.ROOM_REPOSITORY,
        useClass: RoomRepositoryImplement,
    },
];
const application = [];
const domain = [RoomFactory];

@Module({
    imports: [CqrsModule],
    controllers: [],
    providers: [...infrastructure, ...application, ...domain],
})
export class HotelModule {}
