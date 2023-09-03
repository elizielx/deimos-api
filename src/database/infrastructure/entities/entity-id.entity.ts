import { v4 } from "uuid";

export class EntityId extends String {
    constructor() {
        super(v4().split("-").join(""));
    }
}
