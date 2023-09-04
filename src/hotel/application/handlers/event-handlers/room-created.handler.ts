import { RoomCreatedEvent } from "@/hotel/domain/events/room-created.event";
import {
    INTEGRATION_EVENT_PUBLISHER,
    IntegrationEventPublisher,
    RoomCreated,
    Topic,
} from "@/kafka/domain/publishers/integration-event.publisher";
import { WrapperType } from "@/utils/wrapper-type.helper";

import { Inject, forwardRef } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

@EventsHandler(RoomCreatedEvent)
export class RoomCreatedHandler implements IEventHandler<RoomCreatedEvent> {
    @Inject(forwardRef(() => INTEGRATION_EVENT_PUBLISHER))
    private readonly integrationEventPublisher: WrapperType<IntegrationEventPublisher>;

    public async handle(event: RoomCreatedEvent): Promise<void> {
        await this.integrationEventPublisher.publish(Topic.ROOM_CREATED, new RoomCreated(event.id, event.number));
    }
}
