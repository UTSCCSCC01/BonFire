import { User, Assignment, Prisma } from '.prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAssignmentDto } from 'src/constants/assignment';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AssignmentService {
  constructor(private prisma: PrismaService) {}

  /**
   * @param  {User} user
   * @param  {Assignment} assignmentData
   * @returns Promise
   */
  async create(
    user: User,
    assignmentData: CreateAssignmentDto,
  ): Promise<Assignment> {
    const { title, desc } = assignmentData;
    const due_date = new Date(assignmentData.due_date);
    const published_date = assignmentData.published_date
      ? new Date(assignmentData.published_date)
      : null;
    const available_date = assignmentData.available_date
      ? new Date(assignmentData.available_date)
      : null;

    const createInput: Prisma.AssignmentCreateInput = {
      title,
      desc,
      due_date,
      published_date,
      available_date,
      classroom: {
        connect: {
          id: +assignmentData.classroom_id,
        },
      },
      creator: {
        connect: {
          id: +user.id,
        },
      },
    };

    return this.prisma.assignment.create({
      data: createInput,
    });
  }

  /**
   * @param  {User} user
   * @param  {number} assignmentId
   * @returns Promise
   */
  async find(assignmentId: number): Promise<Assignment> {
    const assignment = await this.prisma.assignment.findFirst({
      where: {
        id: assignmentId,
      },
    });

    if (!assignment) {
      throw new HttpException('BAD_REQUEST', HttpStatus.UNAUTHORIZED);
    }

    return assignment;
  }
  /**
   * @param  {{where:Prisma.AssignmentWhereUniqueInput;data:Prisma.AssignmentUpdateInput;}} params
   * @returns Promise
   */
  async update(params: {
    where: Prisma.AssignmentWhereUniqueInput;
    data: Prisma.AssignmentUpdateInput;
  }): Promise<Assignment> {
    const { where, data } = params;
    delete data.created_at;
    delete data.updated_at;

    return this.prisma.assignment.update({
      data,
      where,
    });
  }

  /** Delete a assignment by id
   * @param  {number} boardId
   * @returns Promise
   */
  async delete(user: User, assignmentId: number): Promise<Assignment> {
    const assignment = await this.prisma.assignment.findFirst({
      where: {
        creator_id: user.id,
        id: assignmentId,
      },
    });

    if (!assignment) {
      throw new HttpException('BAD_REQUEST', HttpStatus.UNAUTHORIZED);
    }

    return this.prisma.assignment.update({
      where: {
        id: assignmentId,
      },
      data: {
        deleted: true,
      },
    });
  }
}
