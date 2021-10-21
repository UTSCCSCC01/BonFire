import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { StateService } from 'src/state/state.service';

@Module({
  controllers: [BoardController],
  providers: [BoardService, PrismaService, StateService],
  imports: [AuthModule],
})
export class BoardModule {}
