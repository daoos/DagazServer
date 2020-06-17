import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Move {

    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    session_id: number;

    @ApiProperty()
    user_id: number;

    @ApiProperty()
    turn_num: number;

    @ApiProperty()
    move_str: string;

    @ApiProperty()
    setup_str: string;

    @ApiPropertyOptional()
    note: string;
}