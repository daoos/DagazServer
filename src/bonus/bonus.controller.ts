import { Controller, UseGuards, Post, Req, Res, Body, HttpStatus, Get, Param } from '@nestjs/common';
import { ApiSecurity, ApiBody, ApiCreatedResponse, ApiUnauthorizedResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { BonusService } from './bonus.service';
import { Bonus } from '../interfaces/bonus.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TokenGuard } from '../auth/token.guard';
import { Request } from 'express';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiSecurity('bearer')
@Controller('api/bonus')
export class BonusController {

    constructor(
        private readonly service: BonusService
    ) {}

    @UseGuards(JwtAuthGuard, RolesGuard, TokenGuard)
    @Roles('admin')
    @Get(':bonus')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async getBonus(@Res() res, @Param('bonus') bonus): Promise<Bonus> {
        try {
            const r = await this.service.getBonus(bonus);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.OK).json(r);
            }
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Post()
    @ApiBody({ type: [Bonus] })
    @ApiCreatedResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async join(@Res() res, @Body() x: Bonus): Promise<Bonus> {
        try {
            const r = await this.service.createBonus(x);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.CREATED).json(r);
            }
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
