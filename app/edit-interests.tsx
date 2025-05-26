import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useInterests } from 'context/InterestsContext';

type Interest = {
  id: string;
  emoji: string;
  label: string;
};

type Categories = {
  [key: string]: Interest[];
};

// Interest categories and their items
const categories: Categories = {
  'Fun': [
    { id: 'traveling', emoji: '✈️', label: 'Traveling' },
    { id: 'music', emoji: '🎵', label: 'Music' },
    { id: 'camping', emoji: '🏕️', label: 'Camping' },
    { id: 'gaming', emoji: '🎮', label: 'Gaming' },
    { id: 'beach_trips', emoji: '🏖️', label: 'Beach trips' },
    { id: 'reading', emoji: '📚', label: 'Reading' },
    { id: 'theatre', emoji: '🎭', label: 'Theatre' },
  ],
  'Sports': [
    { id: 'cycling', emoji: '🚲', label: 'Cycling' },
    { id: 'swimming', emoji: '🏊‍♂️', label: 'Swimming' },
    { id: 'gym_fitness', emoji: '💪', label: 'Gym & fitness' },
    { id: 'hiking', emoji: '⛰️', label: 'Hiking' },
    { id: 'sports', emoji: '⚽', label: 'Sports' },
    { id: 'basketball', emoji: '🏀', label: 'Basketball' },
    { id: 'kayaking', emoji: '🛶', label: 'Kayaking' },
  ],
  'Food': [
    { id: 'cooking', emoji: '👨‍🍳', label: 'Cooking' },
    { id: 'coffee', emoji: '☕', label: 'Coffee' },
    { id: 'wine', emoji: '🍷', label: 'Wine' },
    { id: 'foodie', emoji: '🍽️', label: 'Foodie' },
    { id: 'baking', emoji: '🥖', label: 'Baking' },
    { id: 'brunch', emoji: '🥞', label: 'Brunch' },
    { id: 'vegan', emoji: '🥗', label: 'Vegan' },
    { id: 'bbq', emoji: '🍖', label: 'BBQ' },
    { id: 'sushi', emoji: '🍱', label: 'Sushi' },
    { id: 'pizza', emoji: '🍕', label: 'Pizza' },
    { id: 'cocktails', emoji: '🍸', label: 'Cocktails' },
    { id: 'beer', emoji: '🍺', label: 'Beer' },
  ]
};

export default function EditInterestsScreen() {
  const router = useRouter();
  const { allInterests, updateInterests } = useInterests();
  const [selectedInterests, setSelectedInterests] = useState<Set<string>>(new Set(allInterests));
  const [currentCategory, setCurrentCategory] = useState<string>('All Interests');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState<boolean>(false);

  const toggleInterest = (interestId: string) => {
    const newSelected = new Set(selectedInterests);
    if (newSelected.has(interestId)) {
      newSelected.delete(interestId);
    } else {
      newSelected.add(interestId);
    }
    setSelectedInterests(newSelected);
  };

  const toggleCategory = (categoryName: string) => {
    const newSelected = new Set(selectedInterests);
    const categoryInterests = categories[categoryName];
    
    const allSelected = categoryInterests.every(interest => 
      selectedInterests.has(interest.id)
    );

    categoryInterests.forEach(interest => {
      if (allSelected) {
        newSelected.delete(interest.id);
      } else {
        newSelected.add(interest.id);
      }
    });

    setSelectedInterests(newSelected);
  };

  const handleConfirm = async () => {
    await updateInterests(Array.from(selectedInterests));
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <View style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>Edit Interests</Text>
        </View>
        <Text style={styles.subtitle}>
          You'll see 5 of your interests—others see what you share in common.
        </Text>

        <TouchableOpacity
          style={styles.categoryDropdown}
          onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
        >
          <Text style={styles.categoryDropdownText}>{currentCategory}</Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>

        <ScrollView style={styles.scrollView}>
          {Object.entries(categories).map(([category, interests]) => (
            <View key={category} style={styles.categorySection}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryTitle}>
                  {category} ({interests.filter(i => selectedInterests.has(i.id)).length}/{interests.length})
                </Text>
                <TouchableOpacity
                  style={styles.selectAllButton}
                  onPress={() => toggleCategory(category)}
                >
                  <Text style={styles.selectAllText}>Select all</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.interestsGrid}>
                {interests.map((interest) => (
                  <TouchableOpacity
                    key={interest.id}
                    style={[
                      styles.interestChip,
                      selectedInterests.has(interest.id) && styles.selectedChip
                    ]}
                    onPress={() => toggleInterest(interest.id)}
                  >
                    <Text style={styles.interestEmoji}>{interest.emoji}</Text>
                    <Text style={[
                      styles.interestLabel,
                      selectedInterests.has(interest.id) && styles.selectedLabel
                    ]}>
                      {interest.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmButtonText}>
            Confirm ({selectedInterests.size} Selected)
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EAF2F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  backIcon: {
    width: 10,
    height: 10,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#000',
    transform: [{ rotate: '45deg' }],
    marginLeft: 4,
  },
  title: {
    fontSize: 24,
    fontFamily: 'DMSans_700Bold',
    color: '#000000',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'DMSans_400Regular',
    color: '#666666',
    textAlign: 'center',
    paddingHorizontal: 40,
    marginBottom: 24,
  },
  categoryDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 20,
  },
  categoryDropdownText: {
    fontSize: 16,
    fontFamily: 'DMSans_500Medium',
    color: '#000000',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666666',
  },
  scrollView: {
    flex: 1,
  },
  categorySection: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: 'DMSans_500Medium',
    color: '#000000',
  },
  selectAllButton: {
    padding: 8,
  },
  selectAllText: {
    fontSize: 14,
    fontFamily: 'DMSans_500Medium',
    color: '#666666',
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#EAF2F9',
    borderRadius: 20,
    gap: 8,
  },
  selectedChip: {
    backgroundColor: '#0B228C',
  },
  interestEmoji: {
    fontSize: 16,
  },
  interestLabel: {
    fontSize: 14,
    fontFamily: 'DMSans_500Medium',
    color: '#000000',
  },
  selectedLabel: {
    color: '#FFFFFF',
  },
  confirmButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    height: 56,
    backgroundColor: '#0B228C',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontFamily: 'DMSans_500Medium',
    color: '#FFFFFF',
  },
}); 