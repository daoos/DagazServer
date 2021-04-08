import { Controller, UseGuards, Get, Req, Res, HttpStatus, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiSecurity, ApiOkResponse, ApiUnauthorizedResponse, ApiInternalServerErrorResponse, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { SessionService } from './session.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Sess } from '../interfaces/sess.interface';
import { TokenGuard } from '../auth/token.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Exp } from '../interfaces/exp.interface';

@ApiSecurity('bearer')
@Controller('api/session')
export class SessionController {

    constructor(
        private readonly service: SessionService
    ) {}

    @Get('export/:sid')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async exportSession(@Res() res, @Param('sid') sid): Promise<Exp[]> {
        try {
            const r = await this.service.exportSession(sid);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.OK).json(r);
            }
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Get('tournament/:tourn')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findTournSessions(@Res() res, @Param('tourn') tourn): Promise<Sess[]> {
        try {
            const r = await this.service.getTournSessions(tourn, 0);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Get('tournament/:tourn/:user')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findTournUserSessions(@Res() res, @Param('tourn') tourn, @Param('user') user): Promise<Sess[]> {
        try {
            const r = await this.service.getTournSessions(tourn, user);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Get('waiting/:game/:variant')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findWaitingVar(@Req() request: Request, @Res() res, @Param('game') game, @Param('variant') variant): Promise<Sess[]> {
        const user: any = request.user;
        try {
            const r = await this.service.getWaitingSessions(user.id, game, variant);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Get('waiting/:game')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findWaitingGame(@Req() request: Request, @Res() res, @Param('game') game): Promise<Sess[]> {
        const user: any = request.user;
        try {
            const r = await this.service.getWaitingSessions(user.id, game, null);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Get('waiting')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findWaiting(@Req() request: Request, @Res() res): Promise<Sess[]> {
        const user: any = request.user;
        try {
            const r = await this.service.getWaitingSessions(user.id, null, null);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Get('all/:game/:variant')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findAllVar(@Req() request: Request, @Res() res, @Param('game') game, @Param('variant') variant): Promise<Sess[]> {
        const user: any = request.user;
        try {
            const r = await this.service.getAllSessions(user.id, game, variant);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Get('all/:game')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findAllGame(@Req() request: Request, @Res() res, @Param('game') game): Promise<Sess[]> {
        const user: any = request.user;
        try {
            const r = await this.service.getAllSessions(user.id, game, null);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Get('all')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findAll(@Req() request: Request, @Res() res): Promise<Sess[]> {
        const user: any = request.user;
        try {
            const r = await this.service.getAllSessions(user.id, null, null);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Get('current')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findCurrent(@Req() request: Request, @Res() res): Promise<Sess[]> {
        const user: any = request.user;
        try {
            const r = await this.service.getCurrentSessions(user.id);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Get('active')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findActive(@Req() request: Request, @Res() res): Promise<Sess[]> {
        const user: any = request.user;
        try {
            const r = await this.service.getActiveSessions(user.id);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Get('archive')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findArchive(@Req() request: Request, @Res() res): Promise<Sess[]> {
        const user: any = request.user;
        try {
            const r = await this.service.getArchiveSessions(user.id);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Get('my')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async findMySessions(@Req() request: Request, @Res() res): Promise<Sess[]> {
        const user: any = request.user;
        try {
            const r = await this.service.getMySessions(user.id);
            return res.status(HttpStatus.OK).json(r);
        } catch(e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Post()
    @ApiBody({ type: [Sess] })
    @ApiCreatedResponse({ description: 'Successfully.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async create(@Req() request: Request, @Res() res, @Body() x: Sess): Promise<Sess> {
        const user: any = request.user;
        try {
            const r = await this.service.createSession(user.id, x);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.CREATED).json(r);
            }
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Post('anonymous')
    @ApiBody({ type: [Sess] })
    @ApiCreatedResponse({ description: 'Successfully.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async anonymous(@Req() request: Request, @Res() res, @Body() x: Sess): Promise<Sess> {
        const user: any = request.user;
        try {
            const r = await this.service.anonymous(user.id, x);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.CREATED).json(r);
            }
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, TokenGuard)
    @Post('recovery')
    @ApiBody({ type: [Sess] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async recovery(@Req() request: Request, @Res() res, @Body() x: Sess): Promise<Sess> {
        const user: any = request.user;
        try {
            const r = await this.service.recovery(user.id, x);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.OK).json(r);
            }
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Post('close')
    @ApiBody({ type: [Sess] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async close(@Res() res, @Body() x: Sess): Promise<Sess> {
        try {
            const r = await this.service.closeSession(x);
            if (!r) {
                return res.status(HttpStatus.FORBIDDEN).json(x);
            } else {
                return res.status(HttpStatus.OK).json(r);
            }
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard, TokenGuard)
    @Roles('admin')
    @Delete(':id')
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async delete(@Req() request: Request, @Res() res, @Param('id') id): Promise<Sess> {
        const user: any = request.user;
        try {
            const r = await this.service.delSession(id);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.OK).json(r);
            }
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
