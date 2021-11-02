import { Board, Prisma } from '.prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import e from 'express';
import { CardDto } from 'src/constants/card';
import { StateDto } from 'src/constants/state';
import { PrismaService } from 'src/prisma.service';
import { BoardDto } from '../constants/board';

@Injectable()
export class BoardService {
  constructor(private prisma: PrismaService) {}

  /** Create a new board
   * @param  {User} user
   * @param  {Board} boardData
   * @returns Promise
   */
  async create(user: User, boardData: Board): Promise<Board> {
    //check if board already exists with the same name
    const board = await this.prisma.board.findFirst({
      where: {
        title: boardData.title,
        user_id: user.id,
      },
    });
    if (board) {
      throw new HttpException(
        'Already created a board with the same name',
        HttpStatus.BAD_REQUEST,
      );
    }

    boardData.user_id = user.id;

    try {
      return this.prisma.board.create({ data: boardData });
    } catch (e) {
      throw new HttpException('BAD_REQUEST', HttpStatus.UNAUTHORIZED);
    }
  }

  /** Find a board by id
   * @param  {number} boardId
   * @returns Promise
   */
  async find(user: User, boardId: number): Promise<BoardDto> {
    const boardWhereUniqueInput: Prisma.BoardWhereInput = {
      user_id: user.id,
      id: boardId,
    };
    const board = await this.prisma.board.findFirst({
      where: boardWhereUniqueInput,
    });

    if (!board) {
      throw new HttpException('BAD_REQUEST', HttpStatus.UNAUTHORIZED);
    }

    return board;
  }

  /** Find all boards by user id
   * @param  {User} user
   * @returns Promise
   */
  async findAll(user: User): Promise<BoardDto[]> {
    return this.prisma.board.findMany({
      where: {
        user_id: user.id,
        deleted: false,
        classroom: { none: {} },
      },
    });
  }

  /** Update a board
   * @param  {{where:Prisma.BoardWhereUniqueInput;data:Prisma.BoardUpdateInput;}} params
   * @returns Promise
   */
  async update(params: {
    where: Prisma.BoardWhereUniqueInput;
    data: Prisma.BoardUpdateInput;
  }): Promise<Board> {
    const { where, data } = params;
    delete data.created_at;
    delete data.updated_at;

    return this.prisma.board.update({
      data,
      where,
    });
  }

  /** Find all board states
   * @param  {number} boardId
   * @returns Promise
   */
  async findStates(
    user: User,
    boardId: number,
    include?: Prisma.StateInclude,
  ): Promise<StateDto[]> {
    // Find all states tied to a boardId with a specifc user
    const board = await this.prisma.board.findFirst({
      where: {
        id: boardId,
      },
    });

    // Find all states tied to a boardId with a specific user
    return this.prisma.state.findMany({
      where: {
        board_id: board.id,
      },
      orderBy: [
        {
          order: 'asc',
        },
      ],
      include,
    });
  }

  /**
   * Reorganize board states
   *
   * @param {user} User
   * @param {number} id
   * @param {number} oldIndex Previous state index
   * @param {number} newIndex New state index
   */
  async reorderStates(user: User, id: number, oldIndex: any, newIndex: any) {
    let states = await this.findStates(user, id);

    if (oldIndex == newIndex) {
      throw new HttpException('The state index did not change', 400);
    } else if (oldIndex < 0 || newIndex < 0) {
      throw new HttpException('State index cannot be negative', 400);
    } else if (oldIndex > states.length || newIndex > states.length) {
      throw new HttpException(
        'State index cannot be greater than number of states',
        400,
      );
    }

    states = states.sort((a, b) => {
      if (a.type === 'TODO') return -1;
      if (a.type === 'DONE') return 1;

      if (b.type === 'TODO') return 1;
      if (b.type === 'DONE') return -1;

      return a.order - b.order;
    });

    const moved = states.splice(newIndex, 1);
    states.splice(oldIndex, 0, moved[0]);

    const promises = [];
    states.forEach((state, i) => {
      promises.push(
        this.prisma.state.update({
          where: {
            id: state.id,
          },
          data: {
            order: i - 1,
          },
        }),
      );
    });

    await Promise.all(promises);

    return;
  }

  /**
   * Given a card ID, move the card from the old state to the new state at the proper index and order.
   * Change the order of the old state to account for the removed card
   * NOTE: This is a very inefficient way to do this.
   * TODO: Fix a reordering bug
   * @param {number} card_id
   * @param {number} new_state_id the cards new state id
   * @param {number} new_index  the cards index in the new state
   */
  async reorganizeCards(
    card_id: number,
    new_state_id: number,
    new_index: number,
  ): Promise<CardDto> {
    const card = await this.prisma.card.findFirst({
      where: {
        id: card_id,
      },
    });
    const old_state_id = card.state_id;

    // Update the new state cards
    const updatedCards2 = await this.prisma.card.updateMany({
      where: {
        state_id: new_state_id,
        order: {
          gte: new_index,
        },
      },
      data: {
        order: {
          increment: 1,
        },
      },
    });

    // update the old state
    const updatedOldStateCards = await this.prisma.card.updateMany({
      where: {
        state_id: old_state_id,
        order: {
          gt: card.order,
        },
      },
      data: {
        order: {
          decrement: 1,
        },
      },
    });

    // update the cards state and order
    return await this.prisma.card.update({
      where: {
        id: card.id,
      },
      data: {
        state_id: new_state_id,
        order: new_index,
      },
    });
  }

  /** Delete a board by id
   * @param  {number} boardId
   * @returns Promise
   */
  async delete(user: User, boardId: number): Promise<BoardDto> {
    const board = await this.prisma.board.findFirst({
      where: {
        user_id: user.id,
        id: boardId,
      },
    });

    if (!board) {
      throw new HttpException('BAD_REQUEST', HttpStatus.UNAUTHORIZED);
    }

    return this.prisma.board.update({
      where: {
        id: boardId,
      },
      data: {
        deleted: true,
      },
    });
  }
}
