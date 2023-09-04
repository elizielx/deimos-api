import { WrapperType } from "@/utils/wrapper-type.helper";

import { Inject, Injectable, Logger, forwardRef } from "@nestjs/common";
import { IEvent } from "@nestjs/cqrs";

import { KafkaNotificationMessagePublisher } from "./kafka-notification.publisher";

export enum Topic {
    ROOM_CREATED = "RoomCreated",
}

export const INTEGRATION_EVENT_PUBLISHER = "IntegrationEventPublisher";

export class RoomCreated {
    constructor(
        readonly id: string,
        readonly number: number
    ) {}
}

export interface IntegrationEventPublisher {
    publish: (name: Topic, body: IEvent) => Promise<void>;
}

@Injectable()
export class IntegrationEventPublisherImplement implements IntegrationEventPublisher {
    @Inject(forwardRef(() => KafkaNotificationMessagePublisher))
    private readonly kafkaNotificationPublisher: WrapperType<KafkaNotificationMessagePublisher>;

    async publish(name: Topic, body: IEvent): Promise<void> {
        Logger.log(`IntegrationEventPublisherImplement - ${name}`);
        await this.kafkaNotificationPublisher.publish(name, {
            name,
            body,
        });
    }
}
