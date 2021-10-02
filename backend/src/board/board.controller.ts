import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Board, Card, User } from '@prisma/client';
import { CardService } from 'src/card/card.service';
import { RequestUser } from 'src/constants/auth';
import { BoardDetails, CardDetails, StateDetails } from 'src/constants/board';
import { StateService } from 'src/state/state.service';
import { BoardService } from './board.service';

@Controller('board')
@ApiTags('board')
@UseGuards(AuthGuard())
@ApiBearerAuth() 
export class BoardController {
    constructor(
        private readonly boardService: BoardService,
        private readonly cardService: CardService,
        private readonly stateService: StateService,
        ) {}

    @Post()
    @ApiOperation({ summary: 'Creates and returns a new board' })
    @ApiParam({ name: 'title' })
    public async createBoard(@RequestUser() user: User, @Body() board: Board): Promise<Board>{
        return this.boardService.create(user, board);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Returns a board by specific ID' })
    public async getBoard(@RequestUser() user: User, @Param('id') id: number): Promise<BoardDetails> {
        var boardDetails: BoardDetails = {}
        const boardResult = await this.boardService.find(user, Number(id));
        if (!boardResult) {
            throw new HttpException("Invalid board id", HttpStatus.NOT_FOUND);
        }

        boardDetails.board=boardResult;
        const statesResult = await this.stateService.findMany({ where: { board_id: boardResult.id }})
        
        for (const s in statesResult){
            let state = statesResult[s];
            let cardsResult = await this.cardService.findMany({ where: { state_id: state.id }});
            var cards: CardDetails[]  = cardsResult.map((card): CardDetails => (
                { 
                    id: card.id, 
                    title: card.title, 
                    desc: card.desc,
                    submit_url: card.submit_url,
                    due_date: card.due_date,
                    created_at: card.created_at,
                    updated_at: card.updated_at
                }))
        }

        const states : StateDetails[] = statesResult.map((state): StateDetails => (
            {
                id: state.id,
                title: state.title,
                created_at: state.created_at,
                updated_at: state.updated_at,
                cards: cards
            }))

        boardDetails.states=states

        return boardDetails;
    }
}
