import { Card } from '.prisma/client';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CardDto } from 'src/constants/board';
import { CardService } from './card.service';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Returns a card by specific ID' })
  @ApiOkResponse({
    description: 'Card details',
    type: CardDto,
  })
  public async getCard(@Param('id') card: Card): Promise<CardDto> {
    const cardResult = await this.cardService.find(card);
    if (!cardResult) {
      throw new HttpException('Invalid card id', HttpStatus.NOT_FOUND);
    }
    return cardResult;
  }
}
