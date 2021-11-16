import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  Delete,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';
import { StateService } from './state.service';
import { RequestUser } from 'src/constants/auth';
import { StateDto } from '../constants/state';
import { CreateStateDto, StateDetailsDto } from '../constants/state';
import { CardDto } from 'src/constants/card';
import { User, State } from '@prisma/client';

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

  @Post()
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

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a specific state' })
  @ApiOkResponse({
    description: 'Deleted State',
    status: 201,
  })
  public async deleteState(
    @RequestUser() user: User,
    @Param('id') stateId: number,
  ): Promise<StateDto> {
    return this.stateService.delete(user, +stateId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a state by specific ID' })
  @ApiOkResponse({
    description: 'State details',
    type: StateDetailsDto,
  })
  public async updateState(
    @RequestUser() user: User,
    @Param('id') id: number,
    @Body() state: State,
  ): Promise<StateDto> {
    const canAccess = await this.stateService.find(+id);
    if (!canAccess) {
      throw new HttpException('Invalid state id', HttpStatus.UNAUTHORIZED);
    }
    const stateResult = await this.stateService.update({
      where: { id: +id },
      data: state,
    });
    return stateResult;
  }
}
