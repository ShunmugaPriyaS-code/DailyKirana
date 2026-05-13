import type { DimensionValue } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import type { CategoryKey, Expense } from '../../../@types/expense';
import { currency } from '../../../helpers/currency';
import { formatEnglishMonth, isSameMonth } from '../../../helpers/date';
import { ScreenShell } from '../../components/ScreenShell';
import { categories } from '../../lib/expenses';

type MonthlyReportScreenProps = {
  currentDate: Date;
  expenses: Expense[];
};

export function MonthlyReportScreen({
  currentDate,
  expenses,
}: MonthlyReportScreenProps) {
  const monthlyExpenses = expenses.filter((expense) =>
    isSameMonth(expense.date, currentDate),
  );
  const monthTotal = monthlyExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );
  const regularCategoryTotals = (Object.keys(categories) as CategoryKey[])
    .filter((key) => key !== 'other')
    .map((key) => ({
      color: categories[key].color,
      key,
      label: categories[key].tamil,
      total: monthlyExpenses
        .filter((expense) => expense.category === key)
        .reduce((sum, expense) => sum + expense.amount, 0),
    }))
    .filter((item) => item.total > 0);
  const otherTotals = monthlyExpenses
    .filter((expense) => expense.category === 'other')
    .reduce<Record<string, number>>((totals, expense) => {
      const name = expense.vendor || expense.title;

      return {
        ...totals,
        [name]: (totals[name] ?? 0) + expense.amount,
      };
    }, {});
  const breakdownItems = [
    ...regularCategoryTotals,
    ...Object.entries(otherTotals).map(([label, total]) => ({
      color: categories.other.color,
      key: `other-${label}`,
      label,
      total,
    })),
  ];

  return (
    <ScreenShell
      heroColor="#22A77D"
      subtitle={`${formatEnglishMonth(currentDate)} breakdown`}
      title="மாத அறிக்கை"
    >
      <Text style={styles.sectionTitle}>வகை வாரியாக</Text>
      {breakdownItems.length > 0 ? (
        breakdownItems.map(({ color, key, label, total }) => {
        const width: DimensionValue = monthTotal
          ? `${Math.max((total / monthTotal) * 100, 8)}%`
          : '8%';

        return (
          <View key={key} style={styles.breakdownItem}>
            <View style={styles.breakdownHeader}>
              <Text style={styles.breakdownLabel}>{label}</Text>
              <Text style={styles.breakdownAmount}>{currency.format(total)}</Text>
            </View>
            <View style={styles.track}>
              <View
                style={[styles.bar, { backgroundColor: color, width }]}
              />
            </View>
          </View>
        );
        })
      ) : (
        <Text style={styles.emptyText}>இந்த மாத செலவுகள் இல்லை</Text>
      )}

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>மொத்தம்</Text>
        <Text style={styles.totalAmount}>{currency.format(monthTotal)}</Text>
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: '#A5A39C',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 14,
    marginTop: 22,
  },
  breakdownItem: {
    marginBottom: 18,
  },
  emptyText: {
    color: '#DFDDD7',
    fontSize: 18,
    fontWeight: '800',
    paddingBottom: 22,
    paddingTop: 8,
    textAlign: 'center',
  },
  breakdownHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  breakdownLabel: {
    color: '#DFDDD7',
    fontSize: 20,
    fontWeight: '900',
  },
  breakdownAmount: {
    color: '#DFDDD7',
    fontSize: 20,
    fontWeight: '900',
  },
  track: {
    backgroundColor: '#22221F',
    borderRadius: 8,
    height: 12,
    overflow: 'hidden',
  },
  bar: {
    borderRadius: 8,
    height: 12,
  },
  totalRow: {
    alignItems: 'center',
    borderTopColor: '#4B4944',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingTop: 20,
  },
  totalLabel: {
    color: '#DFDDD7',
    fontSize: 22,
    fontWeight: '900',
  },
  totalAmount: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
  },
});
