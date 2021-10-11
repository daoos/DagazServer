import { ApiProperty } from "@nestjs/swagger";

export class AiFit {

    @ApiProperty()
    setup: string;

    @ApiProperty()
    move: number;
}