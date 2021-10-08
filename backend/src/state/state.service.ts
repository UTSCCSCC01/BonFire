import { Board, Prisma, State } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { BoardDto } from 'src/constants/board';
import { CardDto } from 'src/constants/card';
import { CreateStateDto, StateDto } from 'src/constants/state';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StateService {
  constructor(private prisma: PrismaService) {}

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
  async create(data: CreateStateDto): Promise<StateDto> {
    const stateOrder = await this.prisma.state.count({
      where: {
        board: {
          id: +data.board_id,
        },
      },
    });
    const stateCreateInput: Prisma.StateCreateInput = {
      title: data.title,
      order: stateOrder + 1,
      board: {
        connect: {
          id: +data.board_id,
        },
      },
    };
    return this.prisma.state.create({
      data: stateCreateInput,
    });
  }
}
