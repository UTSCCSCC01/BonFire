import { Board } from "@prisma/client";
import { ApiProperty } from '@nestjs/swagger';

export class BoardDto {
    @ApiProperty()
    board: Board;
    
    @ApiProperty()
    states?: StateDto[];
}

export class StateDto {
    @ApiProperty()
    id: number;
    
    @ApiProperty()
    title: string;

    @ApiProperty()
    order: number;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;

    @ApiProperty()
    cards?:CardDto[];
}

export class CardDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    desc: string | null;

    @ApiProperty()
    submit_url: string | null;

    @ApiProperty()
    order: number;

    @ApiProperty()
    due_date: Date | null;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;
}