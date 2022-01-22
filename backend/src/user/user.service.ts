import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma, State } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ClassroomDto } from 'src/constants/classroom';
import { CardService } from 'src/card/card.service';
import { CardDto } from 'src/constants/card';
import { UpcomingDueDatesDto, UserAnalyticsDto } from 'src/constants/user';
import { filter } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private cardService: CardService,
  ) {}

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

  async setClassroomState(
    user: User,
    id: number,
    stateId: number,
  ): Promise<CardDto[]> {
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
        },
      },
    });

    const assignments = await this.prisma.assignment.findMany({
      where: {
        classroom_id: classroom.id,
        due_date: {
          gt: new Date(),
        },
      },
    });

    const cards = [];
    for (const assignment of assignments) {
      cards.push(
        await this.cardService.create(
          { ...assignment, state_id: state.id, assignment_id: assignment.id },
          user,
        ),
      );
    }

    return cards;
  }

  async getAnalytics(user: User, boardId?: number): Promise<UserAnalyticsDto> {
    const cards = await this.prisma.card.findMany({
      where: {
        creator_id: user.id,
        deleted: false,
        state: {
          board: {
            deleted: false,
          }
        }
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

    if (boardId) {
      states = states.filter((state) => state.board_id === boardId);
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
            deleted: false,
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

  async getUpcomingDueDates(user: User): Promise<UpcomingDueDatesDto[]> {
    const upcomingDueDatesDto: UpcomingDueDatesDto[] = [];

    let cards = await this.prisma.card.findMany({
      where: {
        creator_id: user.id,
        deleted: false,
      },
    });

    cards = cards.filter((card) => card.due_date);

    for (const card of cards) {
      const state = await this.prisma.state.findFirst({
        where: {
          id: card.state_id,
        },
      });

      const board = await this.prisma.board.findFirst({
        where: {
          id: state.board_id,
          deleted: false,
        },
      });

      if (state.type !== 'DONE') {
        const daysleft = await this.dateDiffInDays(new Date(), card.due_date);

        if (daysleft >= 0) {
          const upcomingDueDate: UpcomingDueDatesDto = {
            user_id: user.id,
            board_id: state.board_id,
            board_title: board.title,
            card_title: card.title,
            due_date: card.due_date,
            days_left: daysleft,
          };

          upcomingDueDatesDto.push(upcomingDueDate);
        }
      }
    }

    // sort by days left
    upcomingDueDatesDto.sort((a, b) => {
      return a.days_left - b.days_left;
    });

    return upcomingDueDatesDto;
  }

  async dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }
}
