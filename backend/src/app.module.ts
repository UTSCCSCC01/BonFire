import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { StateModule } from './state/state.module';
import { CardModule } from './card/card.module';
import { BoardModule } from './board/board.module';
import { PassportModule } from '@nestjs/passport';
import { ClassroomModule } from './classroom/classroom.module';
import { UserModule } from './user/user.module';
import { AssignmentModule } from './assignment/assignment.module';
import { TagModule } from './tag/tag.module';

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
    TagModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
