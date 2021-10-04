import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma.service';
import { StateService } from 'src/state/state.service';
import { StateController } from './state.controller';

@Module({
  controllers: [StateController],
  providers: [StateService, PrismaService],
  imports: [AuthModule],
})
export class StateModule {}
