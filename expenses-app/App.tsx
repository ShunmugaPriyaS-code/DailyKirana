import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import type { CategoryKey, Expense } from './@types/expense';
import { AppRoutes, type AppTab } from './Routes/AppRoutes';
import { formatDisplayDate, parseDateInput, toISODate } from './helpers/date';
import { LoginScreen } from './src/Auth/LoginScreen';
import { UserDrawer } from './src/components/UserDrawer';
import { categories } from './src/lib/expenses';

export default function App() {
  const currentDate = new Date();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [amount, setAmount] = useState('');
  const [otherName, setOtherName] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(formatDisplayDate(currentDate));
  const [category, setCategory] = useState<CategoryKey>('vegetables');

  const login = () => {
    if (userName.trim() && password.trim()) {
      setIsLoggedIn(true);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsDrawerOpen(false);
    setIsAddingExpense(false);
    setActiveTab('home');
    setPassword('');
  };

  const addExpense = () => {
    const parsedAmount = Number(amount);

    if (!parsedAmount || parsedAmount < 1) {
      return;
    }

    const selectedCategory = categories[category];
    const expenseDate = parseDateInput(date);
    const cleanOtherName = otherName.trim();
    const cleanNote = note.trim();
    const expenseTitle =
      category === 'other'
        ? cleanOtherName || cleanNote || selectedCategory.label
        : cleanNote || selectedCategory.label;
    const expenseVendor =
      category === 'other' ? expenseTitle : selectedCategory.tamil;

    setExpenses((current) => [
      {
        id: Date.now(),
        title: expenseTitle,
        vendor: expenseVendor,
        amount: parsedAmount,
        category,
        date: toISODate(expenseDate),
        dateLabel: formatDisplayDate(expenseDate),
      },
      ...current,
    ]);
    setAmount('');
    setOtherName('');
    setNote('');
    setDate(formatDisplayDate(currentDate));
    setIsAddingExpense(false);
    setActiveTab('home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {!isLoggedIn ? (
            <LoginScreen
              password={password}
              userName={userName}
              onLogin={login}
              onPasswordChange={setPassword}
              onUserNameChange={setUserName}
            />
          ) : (
            <AppRoutes
              activeTab={activeTab}
              amount={amount}
              category={category}
              currentDate={currentDate}
              date={date}
              expenses={expenses}
              isAddingExpense={isAddingExpense}
              note={note}
              otherName={otherName}
              onAddExpensePress={() => setIsAddingExpense(true)}
              onAmountChange={setAmount}
              onCancelAddExpense={() => {
                setIsAddingExpense(false);
                setOtherName('');
              }}
              onCategoryChange={setCategory}
              onDateChange={setDate}
              onMenuPress={() => setIsDrawerOpen(true)}
              onNoteChange={setNote}
              onOtherNameChange={setOtherName}
              onSaveExpense={addExpense}
              onTabChange={setActiveTab}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      {isLoggedIn && isDrawerOpen && (
        <UserDrawer
          activeTab={activeTab}
          currentDate={currentDate}
          expenses={expenses}
          onClose={() => setIsDrawerOpen(false)}
          onLogout={logout}
          onNavigate={(tab) => {
            setIsAddingExpense(false);
            setActiveTab(tab);
          }}
          userName={userName}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1D1D1B',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 24,
  },
});
