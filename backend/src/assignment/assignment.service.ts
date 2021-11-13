import { User, Assignment, Prisma } from '.prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CardService } from 'src/card/card.service';
import { CreateAssignmentDto } from 'src/constants/assignment';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AssignmentService {
  constructor(private prisma: PrismaService, private cardService: CardService) {}

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

    const assignment = await this.prisma.assignment.create({
      data: createInput,
    });

    const students = await this.prisma.studentClassrooms.findMany({
      where: {
        classroom_id: +assignmentData.classroom_id,
        state_id: {
          not: null,
        }
      }
    });

    students.forEach(student => {
      this.cardService.create({ ...assignment, state_id: student.state_id, assignment_id: assignment.id }, user)
    });

    return assignment;
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
    let { title, desc, submit_url, due_date, available_date, published_date } = data;
    due_date = due_date ? new Date(due_date as string) : null;
    available_date = available_date ? new Date(available_date as string) : null;
    published_date = published_date ? new Date(published_date as string) : null;

    return this.prisma.assignment.update({
      data: { title, desc, submit_url, due_date, available_date, published_date},
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
