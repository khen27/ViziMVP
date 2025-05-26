import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCitySearch, CityResult } from '../hooks/useCitySearch';
import { getFlagEmoji } from '../utils/getFlagEmoji';

export default function HomeCityScreen() {
  const [query, setQuery] = useState('');
  const { results, loading } = useCitySearch(query);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter your city"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      {loading && <Text style={styles.loading}>Loading...</Text>}
      <FlatList
        data={results}
        keyExtractor={(item: CityResult) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => console.log('Selected city:', item)}
          >
            <Text style={styles.flag}>{getFlagEmoji(item.countryCode)}</Text>
            <Text style={styles.text}>
              {item.city}{item.region ? `, ${item.region}` : ''}, {item.country}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  loading: { marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  flag: { fontSize: 18, marginRight: 8 },
  text: { fontSize: 16 },
}); 