import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ClassroomDto } from 'src/constants/classroom';
import { CardService } from 'src/card/card.service';
import { CardDto } from 'src/constants/card';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private cardService: CardService) {}

  /** Find a user by email or id
   * @param  {Prisma.UserWhereUniqueInput} userWhereUniqueInput
   * @returns Promise
   */
  async find(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  /** Find a user by prisma values
   * @param  {{skip?:number;take?:number;cursor?:Prisma.UserWhereUniqueInput;where?:Prisma.UserWhereInput;orderBy?:Prisma.UserOrderByWithRelationInput;}} params
   * @returns Promise
   */
  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /** Create a user
   * @param  {Prisma.UserCreateInput} data
   * @returns Promise
   */
  async create(data: Prisma.UserCreateInput): Promise<User> {
    data.password = await bcrypt.hash(data.password, 12);
    return this.prisma.user.create({
      data,
    });
  }

  /** Update a user
   * @param  {{where:Prisma.UserWhereUniqueInput;data:Prisma.UserUpdateInput;}} params
   * @returns Promise
   */
  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  /** Delete a user from the database
   * @param  {Prisma.UserWhereUniqueInput} where
   * @returns Promise
   */
  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  async joinClassroom(user: User, token: string): Promise<ClassroomDto> {
    // check if the token is valid
    const classroom = await this.prisma.classroom.findFirst({
      where: { token },
    });

    if (!classroom || classroom.token !== token) {
      throw new HttpException('Invalid board token', HttpStatus.NOT_FOUND);
    }

    // // Check if user is already in the classroom or if he is the owner
    // const userInClassroom = await this.prisma.user.findFirst({
    //   where: {
    //     id: user.id,
    //     OR: [
    //       {
    //         id: classroom.creator_id,
    //       },
    //       {
    //         classrooms: {
    //           some: {
    //             id: classroom.id,
    //           },
    //         },
    //       },
    //     ],
    //   },
    // });
    // if (userInClassroom) {
    //   throw new HttpException(
    //     'User is already in the classroom',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    // add user to classroom with id classroomId
    await this.prisma.studentClassrooms.create({
      data: {
        classroom_id: classroom.id,
        student_id: user.id,
      },
    });
    return classroom;
  }

  async setClassroomState(user: User, id: number, stateId: number): Promise<CardDto[]> {
    // check if the token is valid
    const classroom = await this.prisma.classroom.findFirst({
      where: { id },
    });
    const state = await this.prisma.state.findFirst({
      where: { id: stateId },
    });

    if (!classroom || !state) {
      throw new HttpException('Invalid board token', HttpStatus.NOT_FOUND);
    }

    // add user to classroom with id classroomId
    await this.prisma.studentClassrooms.update({
      data: {
        state_id: state.id,
      },
      where: {
        classroom_id_student_id: {
          classroom_id: classroom.id,
          student_id: user.id,
        }
      },
    });

    const assignments = await this.prisma.assignment.findMany({
      where: {
        classroom_id: classroom.id,
        due_date: {
          gt: new Date(),
        },
      }
    });

    let cards = [];
    for (const assignment of assignments) {
      cards.push(await this.cardService.create({...assignment, state_id: state.id, assignment_id: assignment.id}, user));
    }

    return cards;
  }
}
