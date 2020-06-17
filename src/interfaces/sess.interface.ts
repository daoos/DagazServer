import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Sess {

    @ApiProperty()
    id: number;

    @ApiProperty()
    status: number;

    @ApiProperty()
    game_id: number;

    @ApiProperty()
    game: string;

    @ApiProperty()
    filename: string;

    @ApiProperty()
    created: Date;

    @ApiProperty()
    creator: string;

    @ApiProperty()
    players_total: number;

    @ApiProperty()
    player_num: number;

    @ApiPropertyOptional()
    last_setup: string;

    @ApiPropertyOptional()
    last_turn: number;
}