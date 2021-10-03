import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { StateService } from 'src/state/state.service';
import { StateController } from './state.controller';

@Module({
  controllers: [StateController],
  providers: [StateService, PrismaService],
})
export class StateModule {}
