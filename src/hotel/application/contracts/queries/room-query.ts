import { FindRoomQuery } from "./find-room.query";
import { FindRoomResult } from "./find-room.result";

export interface RoomQuery {
    find: (query: FindRoomQuery) => Promise<FindRoomResult>;
}
