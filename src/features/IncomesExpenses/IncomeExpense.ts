export type IncomeExpense = {
    id: number;
    title: string;
    price: number;
    isExpense: boolean;
    isDisabled: boolean;
    taxesPercent: number;
    dayOfMonth?: number;
    startDate?: number;
};
