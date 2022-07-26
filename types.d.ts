export interface Finances {
    createdAt: any;
    id: string;
    description: string;
    category: string;
    value: number;
    date: Date;
}
export interface Income {
    id: string;
    description: string;
    category: string;
    value: number;
    date: string;
    createdAt: Date;
}
export interface Expense {
    id: string;
    description: string;
    category: string;
    value: number;
    date: string;
    createdAt: Date;
}


