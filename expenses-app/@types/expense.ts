export type CategoryKey = 'vegetables' | 'milk' | 'rice' | 'medicine' | 'other';

export type Expense = {
  id: number;
  title: string;
  vendor: string;
  amount: number;
  category: CategoryKey;
  dateLabel: string;
  date: string;
};

export type ExpenseCategory = {
  label: string;
  tamil: string;
  color: string;
};
