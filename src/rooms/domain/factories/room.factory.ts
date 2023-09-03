import { Inject } from "@nestjs/common";
import { EventPublisher } from "@nestjs/cqrs";

import { Room, RoomImplement, RoomProperties } from "../models/room.model";

type CreateRoomOptions = Readonly<{
    id: string;
    number: number;
    type: string;
    rate: number;
    status: string;
}>;

export class RoomFactory {
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

    public create(options: CreateRoomOptions): Room {
        return this.eventPublisher.mergeObjectContext(
            new RoomImplement({
                ...options,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            })
        );
    }

    public reconstitute(properties: RoomProperties): Room {
        return this.eventPublisher.mergeObjectContext(new RoomImplement(properties));
    }
}
