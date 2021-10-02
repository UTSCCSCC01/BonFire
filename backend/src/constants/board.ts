import { Board } from "@prisma/client";

export type BoardDetails = {
    board?: Board,
    states?: StateDetails[]
}

export type StateDetails={
    id?: number
    title?: string
    created_at?: Date
    updated_at?: Date
    cards?:CardDetails[]
}

export type CardDetails={
    id?: number
    title?: string
    desc?: string | null
    submit_url?: string | null
    due_date?: Date | null
    created_at?: Date
    updated_at?: Date
}