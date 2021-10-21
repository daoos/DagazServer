import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiResponse, ApiSecurity } from '@nestjs/swagger';
import { AiFit } from '../interfaces/ai_fit.interface';
import { AiRequest } from '../interfaces/ai_request.interface';
import { AiResponse } from '../interfaces/ai_response.interface';
import { AiStat } from '../interfaces/ai_stat.interface';
import { AiService } from './ai.service';

@ApiSecurity('bearer')
@Controller('api/ai')
export class AiController {

    constructor(
        private readonly service: AiService
    ) {}

    @Get()
    @ApiResponse({ type: AiRequest })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async getSid(@Res() res): Promise<AiRequest> {
        try {
            const r = await this.service.getSid();
            return res.status(HttpStatus.OK).json(r);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Get(':id')
    @ApiResponse({ type: [AiRequest] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async get(@Res() res, @Param('id') id): Promise<AiRequest[]> {
        try {
            const r = await this.service.get(id);
            return res.status(HttpStatus.OK).json(r);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Put()
    @ApiBody({ type: AiRequest })
    @ApiResponse({ type: [AiResponse] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async req(@Res() res, @Body() x: AiRequest): Promise<AiResponse[]> {
        try {
            const r = await this.service.request(x);
            return res.status(HttpStatus.OK).json(r);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Post()
    @ApiBody({ type: [AiResponse] })
    @ApiResponse({ type: [AiResponse] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiNotFoundResponse({ description: 'Not Found.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async resp(@Res() res, @Body() x: AiResponse[]): Promise<AiResponse[]> {
        try {
            const r = await this.service.response(x);
            if (!r) {
                return res.status(HttpStatus.NOT_FOUND).json();
            } else {
                return res.status(HttpStatus.OK).json(r);
            }
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Put('fit')
    @ApiBody({ type: AiFit })
    @ApiResponse({ type: AiFit })
    @ApiCreatedResponse({ description: 'Successfully.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async putFit(@Res() res, @Body() x: AiFit): Promise<AiFit> {
        try {
            const r = await this.service.addFit(x);
            return res.status(HttpStatus.CREATED).json(r);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Delete('fit/:game/:lim')
    @ApiResponse({ type: [AiFit] })
    @ApiOkResponse({ description: 'Successfully.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async getFit(@Res() res, @Param('game') game, @Param('lim') lim): Promise<AiFit[]> {
        try {
            const r = await this.service.getFit(game, lim);
            return res.status(HttpStatus.OK).json(r);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }

    @Post('stat')
    @ApiBody({ type: AiStat })
    @ApiResponse({ type: AiStat })
    @ApiCreatedResponse({ description: 'Successfully.'})
    @ApiInternalServerErrorResponse({ description: 'Internal Server error.'})
    async postStat(@Res() res, @Body() x: AiStat): Promise<AiStat> {
        try {
            const r = await this.service.postStat(x);
            return res.status(HttpStatus.CREATED).json(r);
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: e.message.error.toString(), stack: e.stack});
        }
    }
}
