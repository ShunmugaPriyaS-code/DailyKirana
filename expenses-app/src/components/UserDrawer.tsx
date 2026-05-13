import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Expense } from '../../@types/expense';
import type { AppTab } from '../../Routes/AppRoutes';
import { currency } from '../../helpers/currency';
import { formatEnglishMonth, isSameMonth, toISODate } from '../../helpers/date';

type UserDrawerProps = {
  activeTab: AppTab;
  currentDate: Date;
  expenses: Expense[];
  onClose: () => void;
  onLogout: () => void;
  onNavigate: (tab: AppTab) => void;
  userName: string;
};

export function UserDrawer({
  activeTab,
  currentDate,
  expenses,
  onClose,
  onLogout,
  onNavigate,
  userName,
}: UserDrawerProps) {
  const todayISO = toISODate(currentDate);
  const todayTotal = expenses
    .filter((expense) => expense.date === todayISO)
    .reduce((sum, expense) => sum + expense.amount, 0);
  const monthlyExpenses = expenses.filter((expense) =>
    isSameMonth(expense.date, currentDate),
  );
  const monthTotal = monthlyExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  const navigate = (tab: AppTab) => {
    onNavigate(tab);
    onClose();
  };

  return (
    <View style={styles.overlay}>
      <Pressable onPress={onClose} style={styles.backdrop} />
      <View style={styles.drawer}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {userName.trim().slice(0, 1).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.userName}>{userName.trim()}</Text>
          <Text style={styles.userMeta}>{formatEnglishMonth(currentDate)}</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Today</Text>
            <Text style={styles.statValue}>{currency.format(todayTotal)}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>This Month</Text>
            <Text style={styles.statValue}>{currency.format(monthTotal)}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Entries</Text>
            <Text style={styles.statValue}>{monthlyExpenses.length}</Text>
          </View>
        </View>

        <View style={styles.navSection}>
          <Pressable
            onPress={() => navigate('home')}
            style={[styles.navItem, activeTab === 'home' && styles.activeNavItem]}
          >
            <Text
              style={[styles.navText, activeTab === 'home' && styles.activeNavText]}
            >
              Home
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigate('report')}
            style={[
              styles.navItem,
              activeTab === 'report' && styles.activeNavItem,
            ]}
          >
            <Text
              style={[
                styles.navText,
                activeTab === 'report' && styles.activeNavText,
              ]}
            >
              Monthly Report
            </Text>
          </Pressable>
        </View>

        <Pressable onPress={onLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    zIndex: 20,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  drawer: {
    backgroundColor: '#30302D',
    borderRightColor: '#62605B',
    borderRightWidth: 1,
    height: '100%',
    maxWidth: 340,
    padding: 22,
    paddingTop: 34,
    width: '82%',
  },
  profileHeader: {
    borderBottomColor: '#4B4944',
    borderBottomWidth: 1,
    paddingBottom: 22,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: '#F6A623',
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    width: 60,
  },
  avatarText: {
    color: '#1F1F1B',
    fontSize: 28,
    fontWeight: '900',
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 14,
  },
  userMeta: {
    color: '#A5A39C',
    fontSize: 15,
    fontWeight: '800',
    marginTop: 4,
  },
  statsGrid: {
    gap: 10,
    marginTop: 20,
  },
  statBox: {
    backgroundColor: '#23231F',
    borderRadius: 12,
    padding: 14,
  },
  statLabel: {
    color: '#A5A39C',
    fontSize: 13,
    fontWeight: '800',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 4,
  },
  navSection: {
    gap: 10,
    marginTop: 24,
  },
  navItem: {
    borderRadius: 14,
    minHeight: 50,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  activeNavItem: {
    backgroundColor: '#F6A623',
  },
  navText: {
    color: '#DFDDD7',
    fontSize: 17,
    fontWeight: '900',
  },
  activeNavText: {
    color: '#1F1F1B',
  },
  logoutButton: {
    borderColor: '#62605B',
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: 'auto',
    minHeight: 52,
    paddingHorizontal: 16,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '900',
    textAlign: 'center',
  },
});
