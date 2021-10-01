import { Board, Prisma } from '.prisma/client';
import { createParamDecorator, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaClientValidationError } from '@prisma/client/runtime';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BoardService {

    constructor(private prisma: PrismaService) {}

    async create(user: User, boardData: Board): Promise<Board>{
        boardData.user_id=user.id

        try {
            return this.prisma.board.create({data: boardData,});
        } catch (e) {
            throw new HttpException('BAD_REQUEST', HttpStatus.UNAUTHORIZED);
        }
    }
    
    async find(user: User, id: number): Promise<Board | null> {

        let boardWhereUniqueInput: Prisma.BoardWhereUniqueInput = {
            id
        }
        return this.prisma.board.findUnique({
            where: boardWhereUniqueInput,
        });
    }
    
}
