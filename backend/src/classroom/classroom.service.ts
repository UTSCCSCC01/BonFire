import { User, Board, Classroom } from '.prisma/client';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BoardService } from 'src/board/board.service';
import { UserDto } from 'src/constants/user';
import { PrismaService } from 'src/prisma.service';
import { StateService } from 'src/state/state.service';
import { ClassroomDto } from '../constants/classroom';

@Injectable()
export class ClassroomService {
  constructor(
    private prisma: PrismaService,
    private boardService: BoardService,
    private stateService: StateService,
  ) {}

  async create(user: User, classroomData: Classroom): Promise<Classroom> {
    const classroomExist = await this.prisma.classroom.findFirst({
      where: {
        name: classroomData.name,
        creator_id: user.id,
      },
    });
    if (classroomExist) {
      throw new HttpException(
        'Already created a classroom with the same name',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token: string = this.generateClassroomToken();
    const board = await this.boardService.create(user, {
      title: token,
    } as Board);

    await this.stateService.create(
      { board_id: board.id, title: 'Tasks' },
      'TODO',
    );
    await this.stateService.create(
      { board_id: board.id, title: 'In Progress' },
      'CUSTOM',
    );
    await this.stateService.create(
      { board_id: board.id, title: 'Done' },
      'DONE',
    );

    classroomData.token = token;
    classroomData.creator_id = user.id;
    classroomData.board_id = board.id;
    return this.prisma.classroom.create({ data: classroomData });
  }

  async findAll(user: User): Promise<ClassroomDto[]> {
    return await this.prisma.classroom.findMany({
      where: {
        OR: [
          { creator_id: user.id },
          {
            students: {
              some: {
                student_id: user.id,
              },
            },
          },
        ],
      },
    });
  }

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

  async removeUser(user: User, classroomId: number): Promise<User> {
    const classroom = await this.prisma.classroom.findUnique({
      where: {
        id: classroomId,
      },
    });

    if (!classroom) {
      throw new HttpException('Invalid classroom', HttpStatus.UNAUTHORIZED);
    }

    if (classroom.creator_id === user.id) {
      throw new HttpException(
        'Cannot remove creator from classroom',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.prisma.studentClassrooms.delete({
      where: {
        classroom_id_student_id: {
          classroom_id: classroomId,
          student_id: user.id,
        },
      },
    });

    return user;
  }

  async regenerateToken(user: User, classroomId: number): Promise<Classroom> {
    const classroom = await this.prisma.classroom.findUnique({
      where: {
        id: classroomId,
      },
    });

    if (!classroom) {
      throw new HttpException(
        'Classroom Does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (classroom.creator_id !== user.id) {
      throw new HttpException(
        'Insufficient permissions',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const token = this.generateClassroomToken();

    return this.prisma.classroom.update({
      where: {
        id: classroomId,
      },
      data: {
        token,
      },
    });
  }

  async delete(user: User, classroomId: number): Promise<Classroom> {
    const classroom = await this.prisma.classroom.findUnique({
      where: {
        id: classroomId,
      },
    });

    if (!classroom) {
      throw new HttpException(
        'Classroom Does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (classroom.creator_id !== user.id) {
      throw new HttpException(
        'Insufficient permissions',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.prisma.classroom.delete({
      where: {
        id: classroomId,
      },
    });
  }

  async getStudents(user: User, classroomId: number): Promise<UserDto[]> {
    const classroom = await this.prisma.classroom.findUnique({
      where: {
        id: classroomId,
      },
    });

    if (!classroom) {
      throw new HttpException(
        'Classroom Does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (classroom.creator_id !== user.id) {
      throw new HttpException(
        'Insufficient permissions',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const students = await this.prisma.studentClassrooms.findMany({
      where: {
        classroom_id: classroomId,
      },
    });

    const users = await Promise.all(
      students.map(async (student) => {
        return await this.prisma.user.findUnique({
          where: {
            id: student.student_id,
          },
        });
      }),
    );

    return users;
  }

  async kickStudent(
    creator: User,
    classroomId: number,
    studentId: number,
  ): Promise<ClassroomDto> {
    const classroom = await this.prisma.classroom.findUnique({
      where: {
        id: classroomId,
      },
    });

    if (!classroom) {
      throw new HttpException(
        'Classroom Does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (classroom.creator_id !== creator.id) {
      throw new HttpException(
        'Insufficient permissions',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.prisma.studentClassrooms.delete({
      where: {
        classroom_id_student_id: {
          classroom_id: classroomId,
          student_id: studentId,
        },
      },
    });

    return classroom;
  }

  generateClassroomToken(): string {
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += Math.floor(Math.random() * 10);
    }
    return 'Campsite#'.concat(code);
  }
}
