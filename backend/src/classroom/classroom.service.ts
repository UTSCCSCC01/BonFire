import { User, Board, Classroom } from '.prisma/client';

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
  async create(user: User, classroomData: Classroom): Promise<Classroom> {
    const token: string = this.generateClassroomToken();
    classroomData.token = token;
    classroomData.creator_id = user.id;
    return this.prisma.classroom.create({ data: classroomData });
  }

  // get classroom by id and return ClassroomDto
  async find(classroomId: number): Promise<ClassroomDto> {
    const classroom = await this.prisma.classroom.findFirst({
      where: {
        id: classroomId,
      },
    });

    if (!classroom) {
      throw new HttpException('BAD_REQUEST', HttpStatus.UNAUTHORIZED);
    }

    return classroom;
  }

  generateClassroomToken(): string {
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += Math.floor(Math.random() * 10);
    }
    return 'Campsite#'.concat(code);
  }

  async findAll(user: User): Promise<ClassroomDto[]> {
    return this.prisma.classroom.findMany({
      where: {
        creator_id: user.id,
      },
    });
  }
}
