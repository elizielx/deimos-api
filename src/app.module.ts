import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { RoomsModule } from "./rooms/rooms.module";

@Module({
    imports: [RoomsModule, DatabaseModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
