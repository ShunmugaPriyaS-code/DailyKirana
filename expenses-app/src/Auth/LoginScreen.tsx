import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type LoginScreenProps = {
  password: string;
  userName: string;
  onLogin: () => void;
  onPasswordChange: (value: string) => void;
  onUserNameChange: (value: string) => void;
};

export function LoginScreen({
  password,
  userName,
  onLogin,
  onPasswordChange,
  onUserNameChange,
}: LoginScreenProps) {
  const canLogin = userName.trim().length > 0 && password.trim().length > 0;

  return (
    <View style={styles.card}>
      <View style={styles.hero}>
        <Text style={styles.title}>DailyKirana</Text>
        <Text style={styles.subtitle}>Monthly expense tracker</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>பெயர் (NAME)</Text>
        <TextInput
          autoCapitalize="words"
          onChangeText={onUserNameChange}
          placeholder="Enter your name"
          placeholderTextColor="#A5A39C"
          style={styles.input}
          value={userName}
        />

        <Text style={styles.label}>கடவுச்சொல் (PASSWORD)</Text>
        <TextInput
          onChangeText={onPasswordChange}
          placeholder="Enter password"
          placeholderTextColor="#A5A39C"
          secureTextEntry
          style={styles.input}
          value={password}
        />

        <Pressable
          disabled={!canLogin}
          onPress={onLogin}
          style={[styles.button, !canLogin && styles.disabledButton]}
        >
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    backgroundColor: '#30302D',
    borderColor: '#62605B',
    borderRadius: 30,
    borderWidth: 1,
    maxWidth: 430,
    overflow: 'hidden',
    width: '100%',
  },
  hero: {
    backgroundColor: '#F6A623',
    justifyContent: 'flex-end',
    minHeight: 128,
    paddingBottom: 22,
    paddingHorizontal: 28,
  },
  title: {
    color: '#1F1F1B',
    fontSize: 30,
    fontWeight: '900',
  },
  subtitle: {
    color: '#373530',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 4,
  },
  form: {
    padding: 24,
  },
  label: {
    color: '#A5A39C',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 8,
    marginTop: 14,
  },
  input: {
    backgroundColor: '#23231F',
    borderRadius: 10,
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
    minHeight: 54,
    paddingHorizontal: 16,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#5B4CC2',
    borderRadius: 12,
    justifyContent: 'center',
    marginTop: 22,
    minHeight: 58,
  },
  disabledButton: {
    opacity: 0.45,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },
});
