import { ApiProperty } from "@nestjs/swagger";

export class AiFit {

    @ApiProperty()
    variant_id: number;

    @ApiProperty()
    setup: string;

    @ApiProperty()
    move: number;
}