import { Board, Prisma, State } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { CardDto } from 'src/constants/card';
import { CreateStateDto, StateDto } from 'src/constants/state';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StateService {
  constructor(private prisma: PrismaService) {}
  async find(stateId: number): Promise<StateDto> {
    const stateWhereUniqueInput: Prisma.StateWhereUniqueInput = {
      id: stateId,
    };
    return this.prisma.state.findUnique({
      where: stateWhereUniqueInput,
    });
  }

  async findCards(stateId: number): Promise<CardDto[]> {
    const stateWhereInput: Prisma.StateWhereInput = {
      id: stateId,
    };
    return this.prisma.card.findMany({
      where: stateWhereInput,
    });
  }

  async getBoard(stateId: number): Promise<Board> {
    const stateWhereUniqueInput: Prisma.StateWhereUniqueInput = {
      id: stateId,
    };
    return this.prisma.board.findUnique({
      where: stateWhereUniqueInput,
    });
  }

  async create(boardId: number, state: CreateStateDto): Promise<StateDto> {
    const stateOrder = await this.prisma.state.count({
      where: {
        board: {
          id: boardId,
        },
      },
    });
    const stateCreateInput: Prisma.StateCreateInput = {
      title: state.title,
      order: stateOrder + 1,
      board: {
        connect: {
          id: boardId,
        },
      },
    };
    return this.prisma.state.create({
      data: stateCreateInput,
    });
  }
}
