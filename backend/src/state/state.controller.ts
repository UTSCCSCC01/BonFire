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
import { CardDto } from 'src/constants/card';

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
    const stateResult = await this.stateService.find(+stateId);
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
  async create(@Body() stateData: CreateStateDto): Promise<StateDto> {
    return this.stateService.create(stateData);
  }

  @Get(':id/cards')
  @ApiOperation({ summary: 'Returns all cards tied to a specific state' })
  @ApiOkResponse({
    description: 'List of Cards',
    type: CardDto,
  })
  public async getCards(@Param('id') stateId: number): Promise<CardDto[]> {
    const statesResult = await this.stateService.find(+stateId);
    if (!statesResult) {
      throw new HttpException('Invalid state id', HttpStatus.NOT_FOUND);
    }
    return await this.stateService.findCards(+stateId);
  }
}
