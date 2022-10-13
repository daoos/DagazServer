import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class AiRequest {

    @ApiProperty()
    sid: number;

    @ApiPropertyOptional()
    variant_id: number;

    @ApiPropertyOptional()
    setup: string;

    @ApiPropertyOptional()
    coeff: number;

    @ApiPropertyOptional()
    completed: Date;

    @ApiPropertyOptional()
    level: number;
}