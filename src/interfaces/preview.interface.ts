import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Preview {

    @ApiProperty()
    id: number;

    @ApiProperty()
    filename: string;

    @ApiPropertyOptional()
    selector_value: number;

    @ApiPropertyOptional()
    style: number;

    @ApiProperty()
    preview: string;
}