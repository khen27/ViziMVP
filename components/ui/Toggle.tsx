import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { colors } from 'theme/theme';

interface Props {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
}

export default function Toggle({ label, description, value, onValueChange }: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        {description ? <Text style={styles.desc}>{description}</Text> : null}
      </View>
      <Switch
        trackColor={{ false: colors.grayBorder, true: colors.primary }}
        thumbColor={colors.white}
        value={value}
        onValueChange={onValueChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 32,
    marginBottom: 0,
    width: '100%',
  },
  label: {
    fontFamily: 'DM Sans',
    fontWeight: '500',
    fontSize: 16,
    color: colors.black,
  },
  desc: {
    color: colors.grayDark,
    fontSize: 14,
    marginTop: 4,
    width: 260,
    fontFamily: 'DM Sans',
    fontWeight: '400',
  },
}); 