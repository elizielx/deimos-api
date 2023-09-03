import { AggregateRoot } from "@nestjs/cqrs";

import { RoomCreatedEvent } from "../events/room-created.event";

export type RoomEssentialProperties = Readonly<
    Required<{
        id: string;
        number: number;
        type: string;
        rate: number;
        status: string;
    }>
>;

export type RoomOptionalProperties = Readonly<
    Partial<{
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>
>;

export type RoomProperties = RoomEssentialProperties & Required<RoomOptionalProperties>;

export interface Room {
    create: () => void;
    commit: () => void;
}

export class RoomImplement extends AggregateRoot implements Room {
    private readonly id: string;
    private readonly number: number;
    private readonly type: string;
    private readonly rate: number;
    private readonly status: string;
    private readonly createdAt: Date;
    private updatedAt: Date;
    private deletedAt: Date | null;

    constructor(properties: RoomProperties) {
        super();

        Object.assign(this, properties);
    }

    getId(): string {
        return this.id;
    }

    getNumber(): number {
        return this.number;
    }

    getType(): string {
        return this.type;
    }

    getRate(): number {
        return this.rate;
    }

    getStatus(): string {
        return this.status;
    }

    create(): void {
        this.apply(new RoomCreatedEvent(this.id, this.number, this.type, this.rate, this.status));
    }
}
