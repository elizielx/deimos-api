import { WrapperType } from "@/utils/wrapper-type.helper";

import { Inject, Injectable, Logger, forwardRef } from "@nestjs/common";
import { IEvent } from "@nestjs/cqrs";
import { ClientKafka } from "@nestjs/microservices";

import { Topic } from "./integration-event.publisher";

type Message = Readonly<{ name: string; body: IEvent; requestId?: string }>;

@Injectable()
export class KafkaNotificationMessagePublisher {
    @Inject(forwardRef(() => "KAFKA_CLIENT")) private readonly kafkaClient: WrapperType<ClientKafka>;

    public async publish(Name: Topic, Message: Message): Promise<void> {
        Logger.log(`KafkaNotificationMessagePublisher - ${Name}`);
        this.kafkaClient.emit<string>(Name, Message);
    }
}
