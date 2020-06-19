import { Controller, UseGuards, Get, Res, Param, HttpStatus, Post, Body, Req } from '@nestjs/common';
import { ApiSecurity, ApiOkResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { MoveService } from './move.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Move } from '../interfaces/move.interface';
import { Request } from 'express';

@ApiSecurity('bearer')
@Controller('api/move')
export class MoveController {

    constructor(
        private readonly service: MoveService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async getMoves(@Res() res, @Param('id') id): Promise<Move> {
        try {
            const r = await this.service.getMovesBySession(id);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiBody({ type: [Move] })
    @ApiCreatedResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async update(@Req() request: Request, @Res() res, @Body() x: Move): Promise<Move> {
        const user: any = request.user;
        try {
            const r = await this.service.addMove(user.id, x);
            return res.status(HttpStatus.CREATED).json(r);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
