import { ICommand } from "@nestjs/cqrs";

export class CreateRoomCommand implements ICommand {
    constructor(
        readonly number: number,
        readonly type: string,
        readonly rate: number,
        readonly status: string
    ) {}
}
