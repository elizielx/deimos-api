import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";

import { AppModule } from "./app.module";
import { Config } from "./config";
import { otelSDK } from "./tracing";

async function bootstrap() {
    otelSDK.start();
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
    await app.listen(Config.PORT);
}
bootstrap();
