export interface Finances {
    expenses: {
        _id: string;
        description: string;
        expenses: number;
        date: string;
    }
    incomes: {
        _id: string;
        description: string;
        incomes: number;
    }
}