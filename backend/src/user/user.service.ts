import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/constants/user';

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

  async joinClassroom(user: User, classroomId: number): Promise<UserDto> {
    // add user to classroom with id classroomId
    const userClassroom = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        classrooms: {
          connect: {
            id: classroomId,
          },
        },
      },
    });
    return userClassroom;
  }
}
