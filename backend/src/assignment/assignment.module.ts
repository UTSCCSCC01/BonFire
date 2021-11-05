import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma.service';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';

@Module({
  controllers: [AssignmentController],
  providers: [AssignmentService, PrismaService],
  imports: [AuthModule],
})
export class AssignmentModule {}
