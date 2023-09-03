import { Module, Provider } from "@nestjs/common";
import { RoomFactory } from "./domain/factories/room.factory";
import { InjectionToken } from "./application/injection-token";
import { RoomsRepositoryImplement } from "./infrastructure/repositories/room-repository.implement";
import { CqrsModule } from "@nestjs/cqrs";

const infrastructure: Provider[] = [
    {
        provide: InjectionToken.ROOMS_REPOSITORY,
        useClass: RoomsRepositoryImplement,
    },
];
const application = [];
const domain = [RoomFactory];

@Module({
    imports: [CqrsModule],
    controllers: [],
    providers: [...infrastructure, ...application, ...domain],
})
export class RoomsModule {}
