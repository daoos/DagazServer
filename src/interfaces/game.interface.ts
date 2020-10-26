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

    @ApiPropertyOptional()
    created: Date;

    @ApiPropertyOptional()
    main_time: number;

    @ApiPropertyOptional()
    additional_time: number;

    @ApiPropertyOptional()
    realm_id: number;

    @ApiProperty()
    max_selector: number;
}