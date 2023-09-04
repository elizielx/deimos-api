import { RoomFactory } from "@/hotel/domain/factories/room.factory";
import { RoomRepository } from "@/hotel/domain/repositories/room.repository";

import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CreateRoomCommand } from "../../contracts/commands/create-room.command";
import { InjectionToken } from "../../injection-token";

@CommandHandler(CreateRoomCommand)
export class CreateRoomHandler implements ICommandHandler<CreateRoomCommand, void> {
    @Inject(InjectionToken.ROOM_REPOSITORY) private readonly roomsRepository: RoomRepository;
    @Inject() private readonly roomFactory: RoomFactory;

    public async execute(command: CreateRoomCommand): Promise<void> {
        const room = this.roomFactory.create({
            ...command,
            id: await this.roomsRepository.newId(),
        });

        room.create();
        await this.roomsRepository.save(room);
        room.commit();
    }
}
