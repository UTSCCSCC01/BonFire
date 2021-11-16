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
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { RequestUser } from 'src/constants/auth';
import { CardDto, CardTags, CreateCardDto, Tag } from 'src/constants/card';
import { TagService } from 'src/tag/tag.service';
import { CardService } from './card.service';

@Controller('cards')
@ApiTags('cards')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class CardController {
  constructor(
    private readonly cardService: CardService,
    private readonly tagService: TagService,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Returns a card by specific ID' })
  @ApiOkResponse({
    description: 'Card details',
    type: CardDto,
  })
  public async getCard(@Param('id') cardId: number): Promise<CardDto> {
    const cardResult = await this.cardService.find(+cardId);
    if (!cardResult) {
      throw new HttpException('Invalid card id', HttpStatus.NOT_FOUND);
    }
    return cardResult;
  }

  @Post()
  @ApiOperation({
    summary: 'Creates a new card in the state given a state id',
  })
  @ApiOkResponse({
    description: 'Returns newly created card',
    type: CardDto,
  })
  async create(
    @RequestUser() user: User,
    @Body() card: CreateCardDto,
  ): Promise<CardDto> {
    return await this.cardService.create(card, user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Updates a card by specific ID' })
  @ApiOkResponse({
    description: 'Returns updated card',
    type: CardDto,
  })
  public async updateCard(
    @RequestUser() user: User,
    @Param('id') cardId: number,
    @Body() card: CreateCardDto,
  ): Promise<CardDto> {
    return this.cardService.update(user, +cardId, card);
  }

  // get card tags
  @Get(':id/tags')
  @ApiOperation({ summary: 'Returns a card tags by specific ID' })
  @ApiOkResponse({
    description: 'Card tags',
    type: [String],
  })
  async getTags(@Param('id') cardId: number): Promise<CardTags> {
    return this.cardService.getTags(+cardId);
  }

  // Create card tag
  @Post(':id/tags')
  @ApiOperation({ summary: 'Creates a new card tag' })
  @ApiOkResponse({
    description: 'Returns newly created card tag',
    type: String,
  })
  async createTag(
    @RequestUser() user: User,
    @Param('id') cardId: number,
    @Body()
    body: {
      label: string;
    },
  ): Promise<Tag> {
    return this.tagService.create(user, +cardId, body.label);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a card' })
  @ApiOkResponse({
    description: 'Deleted Card',
    status: 201,
  })
  public async deleteCard(
    @RequestUser() user: User,
    @Param('id') cardId: number,
  ): Promise<CardDto> {
    return this.cardService.delete(user, +cardId);
  }
}
