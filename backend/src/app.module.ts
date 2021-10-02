import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { BoardService } from './board/board.service';
import { BoardController } from './board/board.controller';
import { CardService } from './card/card.service';
import { StateService } from './state/state.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [BoardController],
  providers: [AuthService, UserService, PrismaService, BoardService, CardService, StateService],
})

export class AppModule {}
