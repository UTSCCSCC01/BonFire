import { User, Board } from '.prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ClassroomDto } from '../constants/classroom';

@Injectable()
export class ClassroomService {
  constructor(private prisma: PrismaService) {}

  /** Create a new board
   * @param  {User} user
   * @param  {Board} boardData
   * @returns Promise
   */
  async create(user: User, classroomData: ClassroomDto): Promise<Classroom> {
    const classroomCode = this.generateClassroomCode();
    const newClassroom = await this.prisma.classroom.create({
      data: {
        ...classroomData,
        code: classroomCode,
        owner: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return newClassroom;
  }

  //generate a unique 8 digit code for the classroom
  async generateClassroomCode(): Promise<string> {
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += Math.floor(Math.random() * 10);
    }
    return code;
  }
}
