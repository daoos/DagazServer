import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Game {

    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    filename: string;

    @ApiProperty()
    players_total: number;

    @ApiProperty()
    created: Date;

    @ApiPropertyOptional()
    main_time: number;

    @ApiPropertyOptional()
    additional_time: number;
}