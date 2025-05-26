import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Pressable, Text } from 'react-native';
import { colors } from 'theme/theme';

export interface City {
  name: string;
  country: string;
  flag: string;
}

interface Props {
  placeholder: string;
  value: string;
  onChange: (c: City) => void;
}

export default function AutocompleteInput({ placeholder, value, onChange }: Props) {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<City[]>([]);

  // Mock data for suggestions
  const SUGGESTIONS = [
    { name: 'Miami, FL', country: 'USA', flag: '🇺🇸' },
    { name: 'Austin, TX', country: 'USA', flag: '🇺🇸' },
    { name: 'New York, NY', country: 'USA', flag: '🇺🇸' },
    { name: 'Los Angeles, CA', country: 'USA', flag: '🇺🇸' },
    { name: 'San Francisco, CA', country: 'USA', flag: '🇺🇸' },
  ];

  const handleChange = (text: string) => {
    setQuery(text);
    setData(
      SUGGESTIONS.filter((c) => c.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <TextInput
        placeholder={placeholder}
        value={value || query}
        onChangeText={handleChange}
        style={styles.input}
        placeholderTextColor="rgba(11,34,140,0.3)"
      />
      {query.length > 0 && data.length > 0 && (
        <FlatList
          data={data}
          keyExtractor={(i) => i.name}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                onChange(item);
                setQuery('');
                setData([]);
              }}
              style={styles.option}
            >
              <Text style={styles.optionText}>
                {item.flag} {item.name}
              </Text>
            </Pressable>
          )}
          style={styles.dropdown}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#0B228C',
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: 'DM Sans',
    maxWidth: 353,
    width: '100%',
    backgroundColor: colors.white,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#0B228C',
    borderRadius: 20,
    marginTop: 8,
    maxHeight: 180,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    width: 353,
    alignSelf: 'center',
  },
  option: { padding: 16 },
  optionText: {
    fontFamily: 'DM Sans',
    fontSize: 16,
    color: colors.black,
  },
}); 