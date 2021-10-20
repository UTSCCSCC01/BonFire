import { User, Board, Classroom } from '.prisma/client';

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

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

  async existsClass(token: string): Promise<Classroom> {
    return this.prisma.classroom.findFirst({
      where: { token: token },
    });
  }
  
  generateClassroomToken(): string {
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += Math.floor(Math.random() * 10);
    }
    return code;
  }
}
