import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, SafeAreaView, ScrollView, Modal, FlatList, Image, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, Stack, useLocalSearchParams } from 'expo-router';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

// Add prop types for CustomDropdown
interface CustomDropdownProps {
  label: string;
  value: string | number;
  options: (string | number)[];
  onSelect: (val: string | number) => void;
}

function CustomDropdown({ label, value, options, onSelect }: CustomDropdownProps) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.pickerLabel}>{label}</Text>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.dropdownButtonText}>{value}</Text>
        <Text style={styles.dropdownChevron}>▼</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.dropdownModal}>
            <FlatList
              data={options}
              keyExtractor={item => item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.dropdownOption, value === item && styles.dropdownOptionSelected]}
                  onPress={() => {
                    onSelect(item);
                    setModalVisible(false);
                  }}
                  activeOpacity={0.8}
                >
                  <View style={styles.dropdownOptionRow}>
                    {value === item ? (
                      <Text style={styles.checkmark}>✔</Text>
                    ) : (
                      <View style={styles.checkmarkPlaceholder} />
                    )}
                    <Text style={[styles.dropdownOptionText, value === item && styles.dropdownOptionTextSelected]}>{item}</Text>
                  </View>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default function AgeVerification() {
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { name } = useLocalSearchParams();

  const handleConfirm = () => {
    console.log('Current date:', new Date().toISOString());
    const numericAge = parseInt(age, 10);
    if (isNaN(numericAge) || numericAge < 18) {
      setError('You must be 18 or older to proceed');
      return;
    }
    setError('');
    router.push({
      pathname: '/social-media',
      params: { name }
    });
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
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.card}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <View style={styles.backIcon} />
            </TouchableOpacity>
            <View style={styles.headerSection}>
              <Text style={styles.title}>How old are you?</Text>
              <Text style={styles.subtitle}>Please take a moment to verify that you are at least 18 years old.</Text>
            </View>
            <View style={styles.pickerSection}>
              <Text style={styles.pickerLabel}>Age</Text>
              <TextInput
                style={styles.ageInput}
                value={age}
                onChangeText={text => {
                  setAge(text);
                  if (error) setError('');
                }}
                keyboardType="numeric"
                maxLength={3}
                placeholder="Enter your age"
                placeholderTextColor="#ACACAC"
              />
              {error ? <Text style={styles.error}>{error}</Text> : null}
            </View>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  card: {
    position: 'absolute',
    width: 393,
    height: 786,
    left: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: 'rgba(11, 19, 66, 0.10)',
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 24,
    shadowOpacity: 0.5,
    elevation: 10,
  },
  backButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 10,
    top: 10,
    backgroundColor: '#EAF2F9',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  backIcon: {
    width: 28,
    height: 28,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#000',
    transform: [{ rotate: '45deg' }],
    marginLeft: 10,
  },
  headerSection: {
    marginTop: 73,
    marginBottom: 32,
    width: 353,
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: 'DMSans-Medium',
    fontSize: 32,
    lineHeight: 42,
    color: '#000',
    letterSpacing: -0.05 * 32,
    textAlign: 'center',
    width: 353,
  },
  subtitle: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(0,0,0,0.6)',
    marginTop: 8,
    width: 353,
    textAlign: 'center',
  },
  pickerSection: {
    width: 353,
    marginTop: 40,
    marginBottom: 40,
  },
  pickerLabel: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
    marginTop: 12,
  },
  dropdownContainer: {
    marginBottom: 12,
    width: '100%',
  },
  dropdownButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: 'rgba(216, 216, 216, 0.3)',
    borderRadius: 25,
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    shadowColor: 'rgba(9, 65, 115, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  dropdownButtonText: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    color: '#000',
  },
  dropdownChevron: {
    fontSize: 18,
    color: '#ACACAC',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownModal: {
    width: 353,
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 8,
    shadowColor: 'rgba(9, 65, 115, 0.1)',
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 60,
    shadowOpacity: 0.1,
    elevation: 10,
    maxHeight: 220,
    borderWidth: 1,
    borderColor: 'rgba(216, 216, 216, 0.3)',
  },
  dropdownOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 8,
    width: 337,
    height: 38,
    backgroundColor: '#EAF2F9',
    borderRadius: 30,
    marginBottom: 4,
    opacity: 0.8,
  },
  dropdownOptionSelected: {
    backgroundColor: '#EAF2F9',
    opacity: 1,
    borderWidth: 2,
    borderColor: '#4694FD',
  },
  dropdownOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: 317,
    height: 18,
  },
  checkmark: {
    width: 24,
    height: 24,
    color: '#0B228C',
    fontSize: 18,
    marginRight: 6,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  checkmarkPlaceholder: {
    width: 24,
    height: 24,
    marginRight: 6,
  },
  dropdownOptionText: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    color: '#000',
    opacity: 0.8,
  },
  dropdownOptionTextSelected: {
    color: '#0B228C',
    fontWeight: '500',
    opacity: 1,
  },
  error: {
    color: '#ED5370',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  confirmButton: {
    position: 'absolute',
    width: 353,
    height: 50,
    left: 20,
    top: 688,
    backgroundColor: '#0B228C',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFF',
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.015 * 16,
  },
  ageInput: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: 'rgba(216, 216, 216, 0.3)',
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#000',
    fontFamily: 'DMSans-Regular',
    marginBottom: 12,
    shadowColor: 'rgba(9, 65, 115, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    shadowOpacity: 0.1,
    elevation: 2,
  },
}); 