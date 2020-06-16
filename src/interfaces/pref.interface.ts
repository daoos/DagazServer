import { ApiProperty } from "@nestjs/swagger";

export class Pref {

    @ApiProperty()
    id: number;

    @ApiProperty()
    user_id: number;

    @ApiProperty()
    game_id: number;

    @ApiProperty()
    created: Date;
}