import { FindRoomResult } from "@/hotel/application/contracts/queries/find-room.result";

class Rooms {
    readonly id: string;
    readonly number: number;
    readonly type: string;
    readonly rate: number;
    readonly status: string;
}

export class FindRoomsResponseDto extends FindRoomResult {
    rooms: Rooms[];
}
