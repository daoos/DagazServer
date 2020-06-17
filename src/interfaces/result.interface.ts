import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Move {

    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    session_id: number;

    @ApiProperty()
    user_id: number;

    @ApiProperty()
    result_id: number;

    @ApiPropertyOptional()
    score: number;
}