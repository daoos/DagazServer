import { ApiProperty } from "@nestjs/swagger";

export class Debut {

    @ApiProperty()
    setup_prefix: string;

    @ApiProperty()
    move_list: string;
}