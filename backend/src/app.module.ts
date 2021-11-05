import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { StateModule } from './state/state.module';
import { CardModule } from './card/card.module';
import { BoardModule } from './board/board.module';
import { PassportModule } from '@nestjs/passport';
import { ClassroomModule } from './classroom/classroom.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AssignmentModule } from './assignment/assignment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    BoardModule,
    StateModule,
    CardModule,
    PassportModule,
    ClassroomModule,
    UserModule,
    AssignmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
