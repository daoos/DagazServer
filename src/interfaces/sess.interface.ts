import { ApiPropertyOptional } from "@nestjs/swagger";

export class Sess {

    @ApiPropertyOptional()
    id: number;

    @ApiPropertyOptional()
    status: number;

    @ApiPropertyOptional()
    game_id: number;

    @ApiPropertyOptional()
    game: string;

    @ApiPropertyOptional()
    var_num: number;

    @ApiPropertyOptional()
    variant_id: number;

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
    winner: number;

    @ApiPropertyOptional()
    loser: number;

    @ApiPropertyOptional()
    score: number;

    @ApiPropertyOptional()
    last_setup: string;

    @ApiPropertyOptional()
    player_num: number;

    @ApiPropertyOptional()
    player_name: string;

    @ApiPropertyOptional()
    selector_value: number;

    @ApiPropertyOptional()
    uid: number;
}