import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Tourn {

    @ApiPropertyOptional()
    id: number;
    
    @ApiProperty()
    game_id: number;

    @ApiPropertyOptional()
    variant_id: number;

    @ApiPropertyOptional()
    selector_value: number;

    @ApiPropertyOptional()
    game: string;

    @ApiPropertyOptional()
    main_time: number;

    @ApiPropertyOptional()
    additional_time: number;

    @ApiProperty()
    is_hidden: boolean;

    @ApiPropertyOptional()
    created: Date;

    @ApiPropertyOptional()
    closed: Date;

    @ApiPropertyOptional()
    user_id: number;

    @ApiPropertyOptional()
    creator: string;

    @ApiPropertyOptional()
    all: number;

    @ApiPropertyOptional()
    completed: number;
}