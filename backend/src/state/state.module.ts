import { Module } from '@nestjs/common';
import { StateService } from 'src/state/state.service';
import { StateController } from './state.controller';

@Module({
  controllers: [StateController],
  providers: [StateService],
})
export class StateModule {}
