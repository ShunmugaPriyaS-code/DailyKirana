import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type ScreenShellProps = {
  children: ReactNode;
  heroColor: string;
  subtitle: string;
  title: string;
  titleColor?: string;
  subtitleColor?: string;
};

export function ScreenShell({
  children,
  heroColor,
  subtitle,
  title,
  titleColor = '#1F1F1B',
  subtitleColor = '#373530',
}: ScreenShellProps) {
  return (
    <View style={styles.phone}>
      <View style={[styles.hero, { backgroundColor: heroColor }]}>
        <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: subtitleColor }]}>{subtitle}</Text>
      </View>
      <View style={styles.panel}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  phone: {
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
    justifyContent: 'flex-end',
    minHeight: 104,
    paddingBottom: 20,
    paddingHorizontal: 28,
  },
  title: {
    fontSize: 25,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 2,
  },
  panel: {
    padding: 24,
  },
});
