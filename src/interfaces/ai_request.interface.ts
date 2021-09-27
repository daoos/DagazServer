import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class AiRequest {

    @ApiProperty()
    sid: number;

    @ApiProperty()
    variant_id: number;

    @ApiProperty()
    setup: string;

    @ApiPropertyOptional()
    coeff: number;

    @ApiPropertyOptional()
    completed: Date;
}