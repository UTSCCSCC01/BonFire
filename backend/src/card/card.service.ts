import { Injectable } from '@nestjs/common';
import { Card, Prisma } from '@prisma/client';
import { CardDto } from 'src/constants/card';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CardService {
  constructor(private prisma: PrismaService) { }

  /** Find first card by id
   * @param  {number} cardId
   * @returns Promise
   */
  async find(cardId: number): Promise<CardDto> {
    const cardWhereUniqueInput: Prisma.CardWhereUniqueInput = {
      id: cardId,
    };
    return this.prisma.card.findUnique({
      where: cardWhereUniqueInput,
    });
  }

  /** Find all cards with prisma options
   * @param  {{skip?:number;take?:number;cursor?:Prisma.CardWhereUniqueInput;where?:Prisma.CardWhereInput;orderBy?:Prisma.CardOrderByWithRelationInput;}} params
   * @returns Promise
   */
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
