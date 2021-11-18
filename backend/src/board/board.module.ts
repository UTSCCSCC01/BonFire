import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { StateService } from 'src/state/state.service';
import { UserService } from 'src/user/user.service';
import { CardService } from 'src/card/card.service';

@Module({
  controllers: [BoardController],
  providers: [BoardService, PrismaService, StateService, UserService, CardService],
  imports: [AuthModule],
})
export class BoardModule {}
