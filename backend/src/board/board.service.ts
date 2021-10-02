import { Board, Prisma } from '.prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CardService } from 'src/card/card.service';
import { PrismaService } from 'src/prisma.service';
import { StateService } from 'src/state/state.service';
import { BoardDto, CardDto, StateDto } from '../constants/board';

@Injectable()
export class BoardService {

    constructor(
        private prisma: PrismaService,
        private readonly cardService: CardService,
        private readonly stateService: StateService,
        ) {}

    async create(user: User, boardData: Board): Promise<Board>{
        boardData.user_id=user.id;

        try {
            return this.prisma.board.create({ data: boardData, });
        } catch (e) {
            throw new HttpException('BAD_REQUEST', HttpStatus.UNAUTHORIZED);
        }
    }
    
    async find(id: number): Promise<Board | null> {
        let boardWhereUniqueInput: Prisma.BoardWhereUniqueInput = {
            id
        };
        return this.prisma.board.findUnique({
            where: boardWhereUniqueInput,
        });
    }

    async getBoardDetails(boardData: Board): Promise<BoardDto | null> {
        let boardDetails: BoardDto = {
            board: boardData
        };
        const statesResult = await this.stateService.findMany({ where: { board_id: boardData.id }})
        
        for (const state of statesResult){
            let cardsResult = await this.cardService.findMany({ where: { state_id: state.id }});
            var cards: CardDto[] = cardsResult.map((card): CardDto => (
                { 
                    id: card.id, 
                    title: card.title, 
                    desc: card.desc,
                    submit_url: card.submit_url,
                    order: card.order,
                    due_date: card.due_date,
                    created_at: card.created_at,
                    updated_at: card.updated_at
                }));
        }

        const states: StateDto[] = statesResult.map((state): StateDto => (
            {
                id: state.id,
                title: state.title,
                order: state.order,
                created_at: state.created_at,
                updated_at: state.updated_at,
                cards: cards
            }));

        boardDetails.states=states;

        return boardDetails;
    }
}
