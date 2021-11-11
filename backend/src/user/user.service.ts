import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma, State } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ClassroomDto } from 'src/constants/classroom';
import { UserAnalyticsDto } from 'src/constants/user';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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

    await this.prisma.studentClassrooms.create({
      data: {
        classroom_id: classroom.id,
        student_id: user.id,
      },
    });
    return classroom;
  }

  async getAnalytics(user: User): Promise<UserAnalyticsDto> {
    const cards = await this.prisma.card.findMany({
      where: {
        creator_id: user.id,
        deleted: false,
      },
    });

    const states: State[] = [];
    for (const card of cards) {
      states.push(
        await this.prisma.state.findFirst({
          where: {
            id: card.state_id,
          },
        }),
      );
    }

    const todos = states.filter(
      (state) => state.type === 'TODO' && !state.deleted,
    ).length;
    const custom = states.filter(
      (state) => state.type === 'CUSTOM' && !state.deleted,
    ).length;
    const done = states.filter(
      (state) => state.type === 'DONE' && !state.deleted,
    ).length;

    const userAnalytics: UserAnalyticsDto = {
      user_id: user.id,
      todoCount: todos,
      todoPercentage: Math.round((todos / states.length) * 100),
      inProgressCount: custom,
      totalCount: states.length,
      inProgressPercentage: Math.round((custom / states.length) * 100),
      doneCount: done,
      donePercentage: Math.round((done / states.length) * 100),
    };

    return userAnalytics;
  }

  async getBoardAnalytics(
    user: User,
    boardId: number,
  ): Promise<UserAnalyticsDto> {
    const cards = await this.prisma.card.findMany({
      where: {
        creator_id: user.id,
        deleted: false,
      },
    });

    let states: State[] = [];
    for (const card of cards) {
      states.push(
        await this.prisma.state.findFirst({
          where: {
            id: card.state_id,
          },
        }),
      );
    }

    // make state belonds to boardId
    states = states.filter((state) => state.board_id === boardId);

    const todos = states.filter(
      (state) => state.type === 'TODO' && !state.deleted,
    ).length;
    const custom = states.filter(
      (state) => state.type === 'CUSTOM' && !state.deleted,
    ).length;
    const done = states.filter(
      (state) => state.type === 'DONE' && !state.deleted,
    ).length;

    const userAnalytics: UserAnalyticsDto = {
      user_id: user.id,
      todoCount: todos,
      todoPercentage: Math.round((todos / states.length) * 100),
      inProgressCount: custom,
      totalCount: states.length,
      inProgressPercentage: Math.round((custom / states.length) * 100),
      doneCount: done,
      donePercentage: Math.round((done / states.length) * 100),
    };

    return userAnalytics;
  }
}
