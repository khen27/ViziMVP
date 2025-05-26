import React from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  /** children rendered under the curved header */
  children: React.ReactNode;
  /** two-stop gradient */
  gradient?: [string, string];
  /** height of the curved header  */
  archHeight?: number;
}

export default function ScreenContainer({
  children,
  gradient = ['#836CE8', '#4694FD'],
  archHeight = 200,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* gradient header with arch */}
      <View style={{ height: archHeight, overflow: 'hidden' }}>
        <LinearGradient
          colors={gradient}
          style={[StyleSheet.absoluteFill]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <View style={styles.arch} />
      </View>

      {/* page content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: insets.bottom + 120 }}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  arch: {
    position: 'absolute',
    bottom: -32,
    width: '200%',
    height: 64,
    backgroundColor: '#fff',
    borderTopLeftRadius: 999,
    borderTopRightRadius: 999,
    alignSelf: 'center',
  },
}); 