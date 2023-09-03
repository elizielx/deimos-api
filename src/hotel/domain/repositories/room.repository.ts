import { Room } from "../models/room.model";

export interface RoomRepository {
    newId: () => Promise<string>;
    save: (room: Room | Room[]) => Promise<void>;
}
