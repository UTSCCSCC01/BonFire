import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { DashboardService } from './dashboard/dashboard.service';
import { BoardService } from './board/board.service';
import { BoardController } from './board/board.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [AppController, BoardController],
  providers: [AppService, AuthService, UserService, PrismaService, DashboardService, BoardService],
})
export class AppModule {}
