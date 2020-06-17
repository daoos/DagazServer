import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Challenge {

    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    session_id: number;

    @ApiProperty()
    user_id: number;

    @ApiPropertyOptional()
    player_num: number;
}