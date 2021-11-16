import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { CardService } from 'src/card/card.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, CardService],
  imports: [AuthModule],
})
export class UserModule {}
