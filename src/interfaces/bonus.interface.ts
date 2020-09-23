import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";

export class Bonus {

    @ApiPropertyOptional()
    id: number;

    @ApiProperty()
    uid: number;

    @ApiProperty()
    digest: string;

    @ApiPropertyOptional()
    bonus: string;

    @ApiPropertyOptional()
    created: Date;

    @ApiPropertyOptional()
    expired: Date;
}