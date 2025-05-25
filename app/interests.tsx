import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, Stack, useLocalSearchParams } from 'expo-router';

interface Interest {
  id: string;
  emoji: string;
  label: string;
}

interface Categories {
  [key: string]: Interest[];
}

// Define categories and their interests
const categories: Categories = {
  'Fun & Entertainment': [
    { id: 'traveling', emoji: '✈️', label: 'Traveling' },
    { id: 'music', emoji: '🎵', label: 'Music' },
    { id: 'gaming', emoji: '🎮', label: 'Gaming' },
    { id: 'movies', emoji: '🍿', label: 'Movies' },
    { id: 'themeparks', emoji: '🎢', label: 'Theme parks' },
    { id: 'dancing', emoji: '🕺', label: 'Dancing' },
    { id: 'karaoke', emoji: '🎤', label: 'Karaoke' },
    { id: 'puzzles', emoji: '🧩', label: 'Puzzles' },
    { id: 'theatre', emoji: '🎭', label: 'Theatre' },
  ],
  'Food & Drink': [
    { id: 'foodie', emoji: '🍕', label: 'Foodie' },
    { id: 'coffee', emoji: '☕', label: 'Coffee' },
    { id: 'baking', emoji: '🧁', label: 'Baking' },
    { id: 'mealprep', emoji: '🧑‍🍳', label: 'Meal prep' },
    { id: 'foodiegifts', emoji: '🛍', label: 'Shopping (for foodie gifts)' },
    { id: 'craftbeer', emoji: '🍻', label: 'Craft beer' },
  ],
  'Sports & Outdoors': [
    { id: 'gym', emoji: '🏋️‍♀️', label: 'Gym & fitness' },
    { id: 'cycling', emoji: '🚴‍♂️', label: 'Cycling' },
    { id: 'swimming', emoji: '🏊‍♀️', label: 'Swimming' },
    { id: 'hiking', emoji: '🥾', label: 'Hiking' },
    { id: 'camping', emoji: '🏕', label: 'Camping' },
    { id: 'basketball', emoji: '🏀', label: 'Basketball' },
    { id: 'skiing', emoji: '⛷', label: 'Skiing & snowboarding' },
    { id: 'astronomy', emoji: '🚀', label: 'Astronomy' },
    { id: 'dogs', emoji: '🐶', label: 'Dogs & pets' },
  ],
  'Creative & Learning': [
    { id: 'photography', emoji: '📷', label: 'Photography' },
    { id: 'painting', emoji: '🎨', label: 'Painting' },
    { id: 'writing', emoji: '✍️', label: 'Writing' },
    { id: 'reading', emoji: '📚', label: 'Reading' },
    { id: 'digitalart', emoji: '📝', label: 'Digital art' },
    { id: 'coding', emoji: '💻', label: 'Coding' },
    { id: 'podcasts', emoji: '🎧', label: 'Podcasts' },
    { id: 'sustainability', emoji: '🌍', label: 'Sustainability' },
    { id: 'languages', emoji: '🗣', label: 'Language learning' },
  ],
  'Lifestyle & Wellness': [
    { id: 'yoga', emoji: '🧘', label: 'Yoga & mindfulness' },
    { id: 'development', emoji: '💤', label: 'Personal development' },
    { id: 'nightlife', emoji: '💃', label: 'Nightlife' },
    { id: 'fashion', emoji: '👗', label: 'Fashion' },
    { id: 'homedecor', emoji: '🏠', label: 'Home decor' },
    { id: 'roadtrips', emoji: '🚗', label: 'Solo travel' },
    { id: 'animalrescue', emoji: '🐾', label: 'Animal rescue' },
    { id: 'cats', emoji: '🐱', label: 'Cat lover' },
  ],
  'Tech & Games': [
    { id: 'tech', emoji: '📱', label: 'Tech & gadgets' },
    { id: 'chess', emoji: '♟', label: 'Chess' },
    { id: 'retrogames', emoji: '🕹', label: 'Retro games' },
    { id: 'esports', emoji: '🎮', label: 'eSports' },
    { id: 'boardgames', emoji: '🎲', label: 'Board games' },
    { id: 'space', emoji: '🚀', label: 'Space/science' },
  ],
};

export default function InterestsScreen() {
  const [selectedInterests, setSelectedInterests] = useState<Set<string>>(new Set());
  const [currentCategory, setCurrentCategory] = useState<string>('All Interests');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState<boolean>(false);
  const router = useRouter();
  const { name } = useLocalSearchParams();

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

  const handleConfirm = () => {
    if (selectedInterests.size >= 10) {
      router.push({
        pathname: '/profile-photo',
        params: { name }
      });
    }
  };

  const renderCategorySection = (categoryName: string) => {
    const categoryInterests = categories[categoryName];
    const selectedCount = categoryInterests.filter(
      interest => selectedInterests.has(interest.id)
    ).length;

    return (
      <View key={categoryName} style={styles.categorySection}>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>
            {categoryName} ({selectedCount}/{categoryInterests.length})
          </Text>
          <TouchableOpacity 
            style={styles.selectAllButton}
            onPress={() => toggleCategory(categoryName)}
          >
            <Text style={styles.selectAllText}>Select all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.interestsGrid}>
          {categoryInterests.map((interest: Interest) => (
            <TouchableOpacity
              key={interest.id}
              style={[
                styles.interestPill,
                selectedInterests.has(interest.id) && styles.selectedPill
              ]}
              onPress={() => toggleInterest(interest.id)}
            >
              <Text style={[
                styles.interestText,
                selectedInterests.has(interest.id) && styles.selectedText
              ]}>
                {interest.emoji} {interest.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient
        colors={["#836CE8", "#4694FD"]}
        style={styles.gradient}
        start={{ x: 0.24, y: 0.78 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
          >
            <View style={styles.header}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <View style={styles.backIcon} />
              </TouchableOpacity>
              <Text style={styles.title}>Interests</Text>
            </View>
            <Text style={styles.subtitle}>
              Select at least 10 interests to personalize your experience.
            </Text>

            <View style={styles.card}>
              <TouchableOpacity
                style={styles.categoryDropdown}
                onPress={() => setShowCategoryDropdown(true)}
              >
                <Text style={styles.dropdownText}>{currentCategory}</Text>
                <Text style={styles.dropdownChevron}>▼</Text>
              </TouchableOpacity>

              <ScrollView 
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
              >
                {Object.keys(categories).map(renderCategorySection)}
                <View style={styles.bottomPadding} />
              </ScrollView>

              <TouchableOpacity
                style={[
                  styles.confirmButton,
                  selectedInterests.size >= 10 && styles.confirmButtonEnabled
                ]}
                onPress={handleConfirm}
                disabled={selectedInterests.size < 10}
              >
                <Text style={styles.confirmButtonText}>
                  Confirm ({selectedInterests.size} Selected)
                </Text>
              </TouchableOpacity>
            </View>

            <Modal
              visible={showCategoryDropdown}
              transparent
              animationType="fade"
              onRequestClose={() => setShowCategoryDropdown(false)}
            >
              <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={() => setShowCategoryDropdown(false)}
              >
                <View style={styles.modalContent}>
                  <TouchableOpacity
                    style={styles.categoryOption}
                    onPress={() => {
                      setCurrentCategory('All Interests');
                      setShowCategoryDropdown(false);
                    }}
                  >
                    <Text style={styles.categoryOptionText}>All Interests</Text>
                  </TouchableOpacity>
                  {Object.keys(categories).map((category) => (
                    <TouchableOpacity
                      key={category}
                      style={styles.categoryOption}
                      onPress={() => {
                        setCurrentCategory(category);
                        setShowCategoryDropdown(false);
                      }}
                    >
                      <Text style={styles.categoryOptionText}>{category}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </TouchableOpacity>
            </Modal>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  backButton: {
    width: 50,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#000',
    transform: [{ rotate: '45deg' }],
    marginLeft: 8,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'DMSans-Bold',
    fontSize: 32,
    marginRight: 50, // To offset the back button
  },
  subtitle: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.6)',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  card: {
    position: 'absolute',
    width: '100%',
    top: 150,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  categoryDropdown: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
  },
  dropdownChevron: {
    fontSize: 16,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    color: '#000',
  },
  selectAllButton: {
    padding: 8,
  },
  selectAllText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 14,
    color: '#0B228C',
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestPill: {
    backgroundColor: '#EBF3F9',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  selectedPill: {
    backgroundColor: '#0B228C',
  },
  interestText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 14,
    color: '#000',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  confirmButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#CCCCCC',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  confirmButtonEnabled: {
    backgroundColor: '#0B228C',
  },
  confirmButtonText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },
  categoryOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  categoryOptionText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
  },
  bottomPadding: {
    height: 100,
  },
}); 