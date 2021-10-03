import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { CardDto, StateDto } from 'src/constants/board';
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
}
