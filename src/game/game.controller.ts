import { Controller, UseGuards, Get, Res, HttpStatus } from '@nestjs/common';
import { GameService } from './game.service';
import { ApiSecurity, ApiOkResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { Game } from '../interfaces/game.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TokenGuard } from '../auth/token.guard';

@ApiSecurity('bearer')
@Controller('api/game')
export class GameController {

    constructor(
        private readonly service: GameService
    ) {}

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Get()
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async allGames(@Res() res): Promise<Game[]> {
        try {
            const r = await this.service.getGames();
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
