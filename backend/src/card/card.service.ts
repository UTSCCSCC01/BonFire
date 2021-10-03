import { Injectable } from '@nestjs/common';
import { Card, Prisma } from '@prisma/client';
import { CardDto } from 'src/constants/board';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CardService {
  constructor(private prisma: PrismaService) {}
  async find(cardId: number): Promise<CardDto> {
    const cardWhereUniqueInput: Prisma.CardWhereUniqueInput = {
      id: cardId,
    };
    return this.prisma.card.findUnique({
      where: cardWhereUniqueInput,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CardWhereUniqueInput;
    where?: Prisma.CardWhereInput;
    orderBy?: Prisma.CardOrderByWithRelationInput;
  }): Promise<Card[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.card.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}
