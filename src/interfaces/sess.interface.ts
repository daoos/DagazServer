import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Sess {

    @ApiPropertyOptional()
    id: number;

    @ApiPropertyOptional()
    status: number;

    @ApiProperty()
    game_id: number;

    @ApiPropertyOptional()
    game: string;

    @ApiPropertyOptional()
    filename: string;

    @ApiPropertyOptional()
    created: Date;

    @ApiPropertyOptional()
    creator: string;

    @ApiPropertyOptional()
    changed: Date;

    @ApiPropertyOptional()
    closed: Date;

    @ApiPropertyOptional()
    players_total: number;

    @ApiPropertyOptional()
    player_num: number;

    @ApiPropertyOptional()
    last_setup: string;

    @ApiPropertyOptional()
    last_turn: number;
}