import { StyleSheet, Text, View } from 'react-native';
import type { Expense } from '../../@types/expense';
import { currency } from '../../helpers/currency';
import { categories } from '../lib/expenses';

type ExpenseRowProps = {
  expense: Expense;
};

export function ExpenseRow({ expense }: ExpenseRowProps) {
  const detail = categories[expense.category];

  return (
    <View style={styles.row}>
      <View style={[styles.dot, { backgroundColor: detail.color }]} />
      <View style={styles.copy}>
        <Text style={styles.title}>{expense.title}</Text>
        <Text style={styles.category}>{expense.vendor}</Text>
      </View>
      <Text style={styles.amount}>{currency.format(expense.amount)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    borderBottomColor: '#4B4944',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 14,
    minHeight: 72,
  },
  dot: {
    borderRadius: 8,
    height: 16,
    width: 16,
  },
  copy: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  category: {
    color: '#A5A39C',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
  amount: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '900',
  },
});
