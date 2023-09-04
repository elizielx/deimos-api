import { Module } from "@nestjs/common";

import { DatabaseModule } from "./database/database.module";
import { HotelModule } from "./hotel/hotel.module";
import { KafkaModule } from "./kafka/kafka.module";

@Module({
    imports: [HotelModule, DatabaseModule, KafkaModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
