import { Prisma, State } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { CardDto } from 'src/constants/board';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StateService {
  constructor(private prisma: PrismaService) {}
  async find(
    stateWhereUniqueInput: Prisma.StateWhereUniqueInput,
  ): Promise<State | null> {
    return this.prisma.state.findUnique({
      where: stateWhereUniqueInput,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.StateWhereUniqueInput;
    where?: Prisma.StateWhereInput;
    orderBy?: Prisma.StateOrderByWithRelationInput;
  }): Promise<State[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.state.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findCards(state: State): Promise<CardDto[]> {
    const cardWhereInput: Prisma.CardWhereInput = {
      state_id: state.id,
    };
    return this.prisma.card.findMany({
      where: cardWhereInput,
    });
  }
}
