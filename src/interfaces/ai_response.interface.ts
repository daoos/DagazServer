import { ApiProperty } from "@nestjs/swagger";

export class AiResponse {

    @ApiProperty()
    sid: number;

    @ApiProperty()
    move: string;

    @ApiProperty()
    weight: number;
}