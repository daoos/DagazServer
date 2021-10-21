import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class AiStat {

    @ApiProperty()
    batch_size: number;

    @ApiProperty()
    epoch_count: number;

    @ApiProperty()
    validation_split: number;

    @ApiProperty()
    time_delta: number;

    @ApiProperty()
    result: JSON;

    @ApiPropertyOptional()
    model: string;
}