import { IsNumber, IsString } from "class-validator";

export class CreateRoomRequestDto {
    @IsNumber()
    number: number;

    @IsString()
    type: string;

    @IsNumber()
    rate: number;

    @IsString()
    status: string;
}
