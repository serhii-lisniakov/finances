import {TimelineItem} from "./TimelineItem";
import {IncomeExpense} from "../IncomesExpenses/IncomeExpense";
import {addMonths, differenceInMonths, format, setDate} from "date-fns";
import {calcTaxes} from "../IncomesExpenses/calcTotals";

export type MappedTimeline = TimelineItem & {
    isExpense: boolean;
};

export function getMappedTimelines(
    data: TimelineItem[],
    incomes: IncomeExpense[],
): MappedTimeline[] {
    const spreadTimelines = data
        .map((timeline) => {
            if (timeline.repeat) {
                return Array(timeline.repeat)
                    .fill("")
                    .map((_, i) => ({
                        ...timeline,
                        date: addMonths(timeline.date, i).getTime(),
                        isExpense: true,
                    }));
            }

            return {
                ...timeline,
                isExpense: true,
            };
        })
        .flat();

    const spreadIncomesExpenses = incomes
        .filter((income) => !income.isDisabled)
        .map((income) => {
            return Array(Math.abs(differenceInMonths(income.startDate, addMonths(new Date(), 24))))
                .fill("")
                .map((_, i) => ({
                    id: 0,
                    title: income.title,
                    amount: calcTaxes(income),
                    date: addMonths(setDate(income.startDate, income.dayOfMonth), i).getTime(),
                    repeat: 0,
                    isExpense: income.isExpense,
                }));
        })
        .flat();

    const spreadIncomes = mapIncomeToTimeline({
        data: spreadIncomesExpenses.filter((income) => !income.isExpense),
        isExpense: false,
        title: "Month incomes",
    });

    const spreadExpenses = mapIncomeToTimeline({
        data: spreadIncomesExpenses.filter((income) => income.isExpense),
        isExpense: true,
        title: "Month expenses",
    });

    return [
        ...spreadTimelines,
        ...(Object.values(spreadIncomes) as MappedTimeline[]),
        ...(Object.values(spreadExpenses) as MappedTimeline[]),
    ];
}

type MapperParams = {
    data: MappedTimeline[];
    isExpense: boolean;
    title: string;
};

type MapperResult = {[date in string]: MappedTimeline};

function mapIncomeToTimeline({data, isExpense, title}: MapperParams): MapperResult {
    return data.reduce((a: MapperResult, i) => {
        const key = format(i.date, "dd MMM yyyy");

        a[key] = {
            id: 0,
            title,
            amount: (a[key]?.amount || 0) + i.amount,
            date: a[key]?.date || i.date,
            repeat: 0,
            isExpense,
        };
        return a;
    }, {});
}
