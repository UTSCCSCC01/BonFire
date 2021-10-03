import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CardController],
  providers: [CardService, PrismaService],
  imports: [AuthModule],
})
export class CardModule {}
