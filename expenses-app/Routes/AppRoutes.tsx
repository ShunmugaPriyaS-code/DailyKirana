import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { CategoryKey, Expense } from '../@types/expense';
import { AddExpenseScreen } from '../src/Screens/AddExpense/AddExpenseScreen';
import { HomeScreen } from '../src/Screens/Home/HomeScreen';
import { MonthlyReportScreen } from '../src/Screens/MonthlyReport/MonthlyReportScreen';

export type AppTab = 'home' | 'report';

type AppRoutesProps = {
  activeTab: AppTab;
  amount: string;
  category: CategoryKey;
  currentDate: Date;
  date: string;
  expenses: Expense[];
  isAddingExpense: boolean;
  note: string;
  otherName: string;
  onAddExpensePress: () => void;
  onAmountChange: (value: string) => void;
  onCancelAddExpense: () => void;
  onCategoryChange: (value: CategoryKey) => void;
  onDateChange: (value: string) => void;
  onMenuPress: () => void;
  onNoteChange: (value: string) => void;
  onOtherNameChange: (value: string) => void;
  onSaveExpense: () => void;
  onTabChange: (tab: AppTab) => void;
};

const tabs: { label: string; tab: AppTab }[] = [
  { label: 'Home', tab: 'home' },
  { label: 'Monthly Report', tab: 'report' },
];

export function AppRoutes({
  activeTab,
  amount,
  category,
  currentDate,
  date,
  expenses,
  isAddingExpense,
  note,
  otherName,
  onAddExpensePress,
  onAmountChange,
  onCancelAddExpense,
  onCategoryChange,
  onDateChange,
  onMenuPress,
  onNoteChange,
  onOtherNameChange,
  onSaveExpense,
  onTabChange,
}: AppRoutesProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable onPress={onMenuPress} style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </Pressable>
        <Text style={styles.topBarTitle}>DailyKirana</Text>
        <View style={styles.topBarSpacer} />
      </View>

      <View style={styles.screenArea}>
        {isAddingExpense && (
          <AddExpenseScreen
            amount={amount}
            category={category}
            date={date}
            note={note}
            otherName={otherName}
            onAmountChange={onAmountChange}
            onCancel={onCancelAddExpense}
            onCategoryChange={onCategoryChange}
            onDateChange={onDateChange}
            onNoteChange={onNoteChange}
            onOtherNameChange={onOtherNameChange}
            onSave={onSaveExpense}
          />
        )}

        {!isAddingExpense && activeTab === 'home' && (
          <HomeScreen
            currentDate={currentDate}
            expenses={expenses}
            onAddPress={onAddExpensePress}
          />
        )}

        {!isAddingExpense && activeTab === 'report' && (
          <MonthlyReportScreen currentDate={currentDate} expenses={expenses} />
        )}
      </View>

      <View style={styles.tabBar}>
        {tabs.map((tabItem) => {
          const active = tabItem.tab === activeTab && !isAddingExpense;

          return (
            <Pressable
              key={tabItem.tab}
              onPress={() => {
                onCancelAddExpense();
                onTabChange(tabItem.tab);
              }}
              style={[styles.tab, active && styles.activeTab]}
            >
              <Text style={[styles.tabText, active && styles.activeTabText]}>
                {tabItem.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    justifyContent: 'space-between',
    width: '100%',
  },
  topBar: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    maxWidth: 430,
    minHeight: 48,
    width: '100%',
  },
  menuButton: {
    alignItems: 'center',
    backgroundColor: '#262622',
    borderColor: '#4B4944',
    borderRadius: 14,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  menuIcon: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 24,
  },
  topBarTitle: {
    color: '#FFFFFF',
    flex: 1,
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
  topBarSpacer: {
    width: 44,
  },
  screenArea: {
    flex: 1,
    justifyContent: 'center',
  },
  tabBar: {
    alignSelf: 'center',
    backgroundColor: '#262622',
    borderColor: '#4B4944',
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: 'row',
    maxWidth: 430,
    padding: 5,
    width: '100%',
  },
  tab: {
    alignItems: 'center',
    borderRadius: 18,
    flex: 1,
    justifyContent: 'center',
    minHeight: 46,
  },
  activeTab: {
    backgroundColor: '#F6A623',
  },
  tabText: {
    color: '#A5A39C',
    fontSize: 15,
    fontWeight: '900',
  },
  activeTabText: {
    color: '#1F1F1B',
  },
});
