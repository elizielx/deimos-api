import { IQueryResult } from "@nestjs/cqrs";

export class FindRoomResult implements IQueryResult {
    constructor(
        readonly rooms: Readonly<{
            id: string;
            number: number;
            type: string;
            rate: number;
            status: string;
        }>[]
    ) {}
}
