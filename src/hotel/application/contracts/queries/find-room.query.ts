import { IQuery } from "@nestjs/cqrs";

export class FindRoomQuery implements IQuery {
    readonly skip: number;
    readonly take: number;

    constructor(options: FindRoomQuery) {
        Object.assign(this, options);
    }
}
