import { User, Board, Classroom, Prisma } from '.prisma/client';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BoardService } from 'src/board/board.service';
import { PrismaService } from 'src/prisma.service';
import { StateService } from 'src/state/state.service';
import { ClassroomDto } from '../constants/classroom';

@Injectable()
export class ClassroomService {
  constructor(private prisma: PrismaService, private boardService: BoardService, private stateService: StateService) {}

  /** Create a new board
   * @param  {User} user
   * @param  {Board} boardData
   * @returns Promise
   */
  async create(user: User, classroomData: Classroom): Promise<Classroom> {
    //check if classroom already exists with the same name
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
    const board = await this.boardService.create(user, ({ title: token } as Board));

    //TODO(davidpetrov): Add in progress state that publishes cards to student boards
    await this.stateService.create({ board_id: board.id, title: 'Tasks' }, 'TODO');
    await this.stateService.create({ board_id: board.id, title: 'Done' }, 'DONE');

    classroomData.token = token;
    classroomData.creator_id = user.id;
    classroomData.board_id = board.id;
    return this.prisma.classroom.create({ data: classroomData });
  }

  /** Find all boards by user id
   * @param  {User} user
   * @returns Promise
   */
  async findAll(user: User): Promise<ClassroomDto[]> {
    return this.prisma.classroom.findMany({
      where: { creator_id: user.id },
    });
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

}
