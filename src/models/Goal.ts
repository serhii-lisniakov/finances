import {GoalStatus} from "../enums/GoalStatus";

export interface Goal {
    id: number;
    title: string;
    price: number;
    status: GoalStatus;
}
