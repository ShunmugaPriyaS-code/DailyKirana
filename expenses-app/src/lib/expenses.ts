import type { CategoryKey, ExpenseCategory } from '../../@types/expense';

export const categories: Record<CategoryKey, ExpenseCategory> = {
  vegetables: { label: 'Vegetables', tamil: 'காய்கறி', color: '#F6A623' },
  milk: { label: 'Milk', tamil: 'பால்', color: '#22A77D' },
  rice: { label: 'Rice', tamil: 'அரிசி', color: '#8A7DE8' },
  medicine: { label: 'Medicine', tamil: 'மருந்து', color: '#EC653D' },
  other: { label: 'Other', tamil: 'பிற', color: '#A5A39C' },
};
