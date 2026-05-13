import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { CategoryKey } from '../../../@types/expense';
import { ScreenShell } from '../../components/ScreenShell';
import { categories } from '../../lib/expenses';

type AddExpenseScreenProps = {
  amount: string;
  category: CategoryKey;
  date: string;
  note: string;
  otherName: string;
  onAmountChange: (value: string) => void;
  onCancel: () => void;
  onCategoryChange: (value: CategoryKey) => void;
  onDateChange: (value: string) => void;
  onNoteChange: (value: string) => void;
  onOtherNameChange: (value: string) => void;
  onSave: () => void;
};

export function AddExpenseScreen({
  amount,
  category,
  date,
  note,
  otherName,
  onAmountChange,
  onCancel,
  onCategoryChange,
  onDateChange,
  onNoteChange,
  onOtherNameChange,
  onSave,
}: AddExpenseScreenProps) {
  return (
    <ScreenShell
      heroColor="#5B4CC2"
      subtitle="Add expense"
      subtitleColor="#D6D1FF"
      title="செலவு சேர்க்க"
      titleColor="#FFFFFF"
    >
      <Text style={styles.inputLabel}>தொகை (AMOUNT)</Text>
      <TextInput
        keyboardType="numeric"
        onChangeText={onAmountChange}
        placeholder="₹ 0.00"
        placeholderTextColor="#A5A39C"
        style={styles.input}
        value={amount}
      />

      <Text style={styles.inputLabel}>வகை (CATEGORY)</Text>
      <View style={styles.chipRow}>
        {(Object.keys(categories) as CategoryKey[]).map((key) => {
          const active = category === key;

          return (
            <Pressable
              key={key}
              onPress={() => onCategoryChange(key)}
              style={[styles.chip, active && styles.activeChip]}
            >
              <Text style={[styles.chipText, active && styles.activeChipText]}>
                {categories[key].tamil}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {category === 'other' && (
        <>
          <Text style={styles.inputLabel}>செலவு பெயர் (EXPENSE NAME)</Text>
          <TextInput
            onChangeText={onOtherNameChange}
            placeholder="e.g. Curd, bus fare..."
            placeholderTextColor="#A5A39C"
            style={styles.input}
            value={otherName}
          />
        </>
      )}

      <Text style={styles.inputLabel}>குறிப்பு (NOTE)</Text>
      <TextInput
        onChangeText={onNoteChange}
        placeholder="e.g. Aavin milk 1L..."
        placeholderTextColor="#A5A39C"
        style={styles.input}
        value={note}
      />

      <Text style={styles.inputLabel}>தேதி (DATE)</Text>
      <TextInput
        onChangeText={onDateChange}
        placeholder="Today"
        placeholderTextColor="#A5A39C"
        style={styles.input}
        value={date}
      />

      <Pressable onPress={onSave} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>சேமி - Save</Text>
      </Pressable>

      <Pressable onPress={onCancel} style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </Pressable>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  inputLabel: {
    color: '#A5A39C',
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#23231F',
    borderRadius: 10,
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
    minHeight: 54,
    paddingHorizontal: 16,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    borderColor: '#75736C',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  activeChip: {
    backgroundColor: '#E6E1FF',
    borderColor: '#E6E1FF',
  },
  chipText: {
    color: '#DFDDD7',
    fontSize: 16,
    fontWeight: '900',
  },
  activeChipText: {
    color: '#44399E',
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: '#5B4CC2',
    borderRadius: 12,
    justifyContent: 'center',
    marginTop: 16,
    minHeight: 58,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '900',
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  cancelButtonText: {
    color: '#A5A39C',
    fontSize: 16,
    fontWeight: '900',
  },
});
