import { Card, State } from '.prisma/client';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';
import { StateService } from './state.service';
import { StateDto } from '../constants/state';
import { CreateStateDto } from '../constants/state';

@Controller('states')
@ApiTags('states')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Returns a state by specific ID' })
  @ApiOkResponse({
    description: 'State details',
    type: StateDto,
  })
  public async getCard(@Param('id') stateId: number): Promise<StateDto> {
    const stateResult = await this.stateService.find(Number(stateId));
    if (!stateResult) {
      throw new HttpException('Invalid state id', HttpStatus.NOT_FOUND);
    }
    return stateResult;
  }

  @Post(':id')
  @ApiOperation({
    summary: 'Creates a new state in the board given a board id and state name',
  })
  @ApiOkResponse({
    description: 'Returns newly created state',
    type: StateDto,
  })
  async register(
    @Param('id') id: number,
    @Body() stateData: CreateStateDto,
  ): Promise<StateDto> {
    const board = await this.stateService.getBoard(Number(id));
    if (!board)
      throw new HttpException('Invalid board id', HttpStatus.BAD_REQUEST);

    return this.stateService.create(Number(id), stateData);
  }

  @Get('cards/:id')
  @ApiOperation({ summary: 'Returns all cards tied to a specific state' })
  @ApiOkResponse({
    description: 'List of Cards',
  })
  public async getStates(@Param('id') stateId: number): Promise<StateDto[]> {
    const statesResult = await this.stateService.find(Number(stateId));
    if (!statesResult) {
      throw new HttpException('Invalid state id', HttpStatus.NOT_FOUND);
    }
    return await this.stateService.findCards(stateId);
  }
}
