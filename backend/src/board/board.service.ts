import { Board, Card, prisma, Prisma, State } from '.prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { StateDto } from 'src/constants/board';
import { PrismaService } from 'src/prisma.service';
import { BoardDto } from '../constants/board';

@Injectable()
export class BoardService {
  constructor(private prisma: PrismaService) {}

  async create(user: User, boardData: Board): Promise<Board> {
    boardData.user_id = user.id;

    try {
      return this.prisma.board.create({ data: boardData });
    } catch (e) {
      throw new HttpException('BAD_REQUEST', HttpStatus.UNAUTHORIZED);
    }
  }

  async find(boardId: number): Promise<BoardDto> {
    const boardWhereUniqueInput: Prisma.BoardWhereUniqueInput = {
      id: boardId,
    };
    return this.prisma.board.findUnique({
      where: boardWhereUniqueInput,
    });
  }

  async findAll(user: User): Promise<BoardDto[]> {
    const boardWhereInput: Prisma.BoardWhereInput = {
      user_id: user.id,
    };
    return this.prisma.board.findMany({
      where: boardWhereInput,
    });
  }

  async findStates(boardId: number): Promise<StateDto[]> {
    const stateWhereInput: Prisma.StateWhereInput = {
      board_id: boardId,
    };
    return this.prisma.state.findMany({
      where: stateWhereInput,
    });
  }
}
