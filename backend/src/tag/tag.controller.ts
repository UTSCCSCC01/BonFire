import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';
import { TagDto } from 'src/constants/tag';
import { CreateTagDto } from '../constants/tag';
import { TagService } from './tag.service';

@Controller('tags')
@ApiTags('tags')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @ApiOperation({
    summary: 'Creates a new tag in the board given a card id and tag name',
  })
  @ApiOkResponse({
    description: 'Returns newly created state',
    type: TagDto,
  })
  async create(@Body() tagData: CreateTagDto): Promise<TagDto> {
    return this.tagService.create(tagData);
  }

  @Get()
  @ApiOperation({ summary: 'Returns tags by attached to a specific card ID' })
  @ApiOkResponse({
    description: 'Tags',
    type: TagDto,
  })
  public async getTags(@Param('id') cardId: number): Promise<TagDto[]> {
    const tagsResult = await this.tagService.findTags(+cardId);
    if (!tagsResult) {
      throw new HttpException('Invalid card id', HttpStatus.NOT_FOUND);
    }
    return tagsResult;
  }
}
