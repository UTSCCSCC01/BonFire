import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma.service';
import { ClassroomService } from './classroom.service';
import { ClassroomController } from './classroom.controller';
import { BoardService } from 'src/board/board.service';
import { StateService } from 'src/state/state.service';

@Module({
  controllers: [ClassroomController],
  providers: [ClassroomService, PrismaService, BoardService, StateService],
  imports: [AuthModule],
})
export class ClassroomModule {}
