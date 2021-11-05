import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TagService } from './tag.service';

@Module({
  providers: [TagService, PrismaService]
})
export class TagModule {}
