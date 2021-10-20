import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma.service';
import { ClassroomService } from './classroom.service';
import { ClassroomController } from './classroom.controller';

@Module({
  controllers: [ClassroomController],
  providers: [ClassroomService, PrismaService],
  imports: [AuthModule],
})
export class ClassroomModule {}
