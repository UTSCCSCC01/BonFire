import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { StateType } from '@prisma/client';
import { BoardDto } from 'src/constants/board';
import { CardDto } from 'src/constants/card';
import { CreateStateDto, StateDto } from 'src/constants/state';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StateService {
  constructor(private prisma: PrismaService) {}

  /** Find a state by prisma values
   * @param  {{skip?:number;take?:number;cursor?:Prisma.StateWhereUniqueInput;where?:Prisma.StateWhereInput;orderBy?:Prisma.StateOrderByWithRelationInput;}} params
   * @returns Promise
   */
  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.StateWhereUniqueInput;
    where?: Prisma.StateWhereInput;
    orderBy?: Prisma.StateOrderByWithRelationInput;
    include?: Prisma.StateInclude;
  }): Promise<StateDto[]> {
    const { skip, take, cursor, where, orderBy, include } = params;
    return this.prisma.state.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  /** Update a state
   * @param  {{where:Prisma.StateWhereUniqueInput;data:Prisma.StateUpdateInput;}} params
   * @returns Promise
   */
  async update(params: {
    where: Prisma.StateWhereUniqueInput;
    data: Prisma.StateUpdateInput;
  }): Promise<StateDto> {
    const { where, data } = params;
    delete data.created_at;
    delete data.updated_at;

    return this.prisma.state.update({
      data,
      where,
    });
  }

  /** Finds state by id
   * @param  {number} stateId
   * @returns Promise
   */
  async find(stateId: number): Promise<StateDto> {
    const stateWhereUniqueInput: Prisma.StateWhereUniqueInput = {
      id: stateId,
    };
    return this.prisma.state.findUnique({
      where: stateWhereUniqueInput,
    });
  }

  /** Find all cards in state
   * @param  {number} stateId
   * @returns Promise
   */
  async findCards(stateId: number): Promise<CardDto[]> {
    const stateWhereInput: Prisma.StateWhereInput = {
      id: stateId,
    };
    return this.prisma.card.findMany({
      where: stateWhereInput,
    });
  }

  /** Finds board of state
   * @param  {number} stateId
   * @returns Promise
   */
  async getBoard(stateId: number): Promise<BoardDto> {
    const stateWhereUniqueInput: Prisma.StateWhereUniqueInput = {
      id: stateId,
    };
    return this.prisma.state.findUnique({
      where: stateWhereUniqueInput,
      include: {
        board: true,
      },
    });
  }

  /** Creates state
   * @param  {CreateStateDto} data
   * @returns Promise
   */
  async create(
    data: CreateStateDto,
    type: StateType = 'CUSTOM',
  ): Promise<StateDto> {
    const stateOrder = await this.prisma.state.count({
      where: {
        board: {
          id: +data.board_id,
        },
      },
    });

    let order = 0;
    if (type === 'DONE') order = -1;
    else if (stateOrder > 0) order = stateOrder + 1;

    const stateCreateInput: Prisma.StateCreateInput = {
      title: data.title,
      board: {
        connect: {
          id: +data.board_id,
        },
      },
      type,
      order,
    };
    return this.prisma.state.create({
      data: stateCreateInput,
    });
  }
}
