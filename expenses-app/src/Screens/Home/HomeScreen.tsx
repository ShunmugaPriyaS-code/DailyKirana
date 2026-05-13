import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Expense } from '../../../@types/expense';
import { currency } from '../../../helpers/currency';
import { formatTamilMonth, toISODate, isSameMonth } from '../../../helpers/date';
import { ExpenseRow } from '../../components/ExpenseRow';
import { ScreenShell } from '../../components/ScreenShell';

type HomeScreenProps = {
  currentDate: Date;
  expenses: Expense[];
  onAddPress: () => void;
};

export function HomeScreen({ currentDate, expenses, onAddPress }: HomeScreenProps) {
  const todayISO = toISODate(currentDate);
  const todayExpenses = expenses.filter((expense) => expense.date === todayISO);
  const todayTotal = todayExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );
  const monthTotal = expenses
    .filter((expense) => isSameMonth(expense.date, currentDate))
    .reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <View>
      <ScreenShell
        heroColor="#F6A623"
        subtitle="இன்றைய செலவு"
        title={`DailyKirana · ${formatTamilMonth(currentDate)}`}
      >
        <View style={styles.statRow}>
          <View style={styles.statCard}>
            <Text style={styles.mutedTamil}>இன்று</Text>
            <Text style={styles.statValue}>{currency.format(todayTotal)}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.mutedTamil}>இம்மாதம்</Text>
            <Text style={styles.statValue}>{currency.format(monthTotal)}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>இன்றைய உள்ளீடுகள்</Text>
        {todayExpenses.length > 0 ? (
          todayExpenses.map((expense) => (
            <ExpenseRow expense={expense} key={expense.id} />
          ))
        ) : (
          <Text style={styles.emptyText}>இன்று செலவுகள் இல்லை</Text>
        )}

        <Pressable onPress={onAddPress} style={styles.fab}>
          <Text style={styles.fabIcon}>+</Text>
        </Pressable>
      </ScreenShell>
    </View>
  );
}

const styles = StyleSheet.create({
  statRow: {
    flexDirection: 'row',
    gap: 14,
  },
  statCard: {
    backgroundColor: '#23231F',
    borderRadius: 14,
    flex: 1,
    justifyContent: 'center',
    minHeight: 96,
    padding: 16,
  },
  mutedTamil: {
    color: '#A5A39C',
    fontSize: 15,
    fontWeight: '800',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    marginTop: 4,
  },
  sectionTitle: {
    color: '#A5A39C',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 14,
    marginTop: 22,
  },
  emptyText: {
    color: '#DFDDD7',
    fontSize: 18,
    fontWeight: '800',
    paddingBottom: 20,
    paddingTop: 8,
    textAlign: 'center',
  },
  fab: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#F6A623',
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    marginTop: 18,
    width: 60,
  },
  fabIcon: {
    color: '#1F1F1B',
    fontSize: 34,
    fontWeight: '300',
    lineHeight: 38,
  },
});
