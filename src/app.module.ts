import { Module } from "@nestjs/common";

import { DatabaseModule } from "./database/database.module";
import { HotelModule } from "./hotel/hotel.module";

@Module({
    imports: [HotelModule, DatabaseModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
