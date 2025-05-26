import React from 'react';
import { View, TextInput, FlatList, Pressable, Text, StyleSheet } from 'react-native';
import { colors, spacing, radii, typography } from '../../theme';

export interface Suggestion {
  city: string;
  region: string;
  countryCode: string;
}

export interface AutocompleteInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (t: string) => void;
  suggestions: Suggestion[];
  onSelect: (item: Suggestion) => void;
}

export default function AutocompleteInput({
  placeholder,
  value,
  onChangeText,
  suggestions,
  onSelect,
}: AutocompleteInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.grayDark}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="words"
      />
      {value.length > 0 && suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={item => `${item.city},${item.region},${item.countryCode}`}
          renderItem={({ item }) => (
            <Pressable
              style={styles.item}
              onPress={() => onSelect(item)}
            >
              <Text style={styles.itemText}>
                {item.city}
                {item.region ? `, ${item.region}` : ''}
                {item.countryCode ? `, ${item.countryCode}` : ''}
              </Text>
            </Pressable>
          )}
          style={styles.dropdown}
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', zIndex: 20 },
  input: {
    width: '100%',
    height: 56,
    borderRadius: radii.lg,
    backgroundColor: colors.grayLight,
    paddingHorizontal: spacing.lg,
    fontSize: typography.size.md,
    color: colors.black,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.xs,
  },
  dropdown: {
    backgroundColor: colors.white,
    borderRadius: radii.lg,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 2,
    paddingVertical: spacing.xs,
    maxHeight: 200,
  },
  item: {
    paddingVertical: spacing.md + spacing.xs,
    paddingHorizontal: spacing.lg,
  },
  itemText: {
    fontSize: typography.size.md,
    color: colors.grayDark,
    fontFamily: typography.fontFamily,
  },
}); 