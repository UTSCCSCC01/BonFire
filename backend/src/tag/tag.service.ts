import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTagDto, TagDto } from '../constants/tag';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  //create a new tag given a name, colour and card id
  async create(tagData: CreateTagDto): Promise<TagDto> {
    return await this.prisma.tag.create({
      data: {
        name: tagData.name,
        color: tagData.color,
        card: {
          connect: {
            id: tagData.card_id,
          },
        },
      },
    });
  }

  async findTags(cardId: number): Promise<TagDto[]> {
    return await this.prisma.tag.findMany({
      where: {
        card: {
          id: cardId,
        },
      },
    });
  }
}
