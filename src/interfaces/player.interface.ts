import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Player {

    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    session_id: number;

    @ApiPropertyOptional()
    player_num: number;

    @ApiPropertyOptional()
    is_ai: number;
}