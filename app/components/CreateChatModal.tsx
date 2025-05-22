import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Switch,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import CustomSlider from './CustomSlider';

// Mock data for focus tags with emojis
const focusTags = [
  { name: 'Traveling', emoji: '✈️' },
  { name: 'Camping', emoji: '🏕️' },
  { name: 'Sports', emoji: '⚽' },
  { name: 'Beach trips', emoji: '🏖️' },
  { name: 'Swimming', emoji: '🏊' },
  { name: 'Hiking', emoji: '🥾' },
  { name: 'Reading', emoji: '📚' },
  { name: 'Theatre', emoji: '🎭' },
  { name: 'Cooking', emoji: '🍳' },
  { name: 'Photography', emoji: '📷' },
  { name: 'Music', emoji: '🎵' },
  { name: 'Art', emoji: '🎨' }
];

interface CreateChatModalProps {
  visible: boolean;
  onClose: () => void;
}

const CreateChatModal: React.FC<CreateChatModalProps> = ({ visible, onClose }) => {
  // State variables
  const [chatName, setChatName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [interestFilter, setInterestFilter] = useState('Everyone');
  const [showInterestOptions, setShowInterestOptions] = useState(false);
  const [ageRange, setAgeRange] = useState({ min: 18, max: 100 });
  const [maxDistance, setMaxDistance] = useState(10);
  const [chatDuration, setChatDuration] = useState('12 hours');
  const [showDurationOptions, setShowDurationOptions] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [showNameError, setShowNameError] = useState(false);
  
  // Toggle tag selection
  const toggleTag = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter(t => t !== tagName));
    } else {
      setSelectedTags([...selectedTags, tagName]);
    }
  };
  
  // Interest filter options
  const interestOptions = ['Everyone', 'Men', 'Women', 'Non-binary'];
  
  // Chat duration options
  const durationOptions = ['12 hours', '24 hours', '3 days', '1 week'];
  
  // Handle save button press
  const handleSave = () => {
    if (!chatName.trim()) {
      setShowNameError(true);
      return;
    }
    // Would handle save logic here
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Create Chat</Text>
            <View style={styles.headerRight} />
          </View>
          
          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Upload Photo Button */}
            <TouchableOpacity style={styles.uploadSection}>
              <LinearGradient
                colors={['#836CE8', '#4694FD']}
                style={styles.uploadButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="camera-outline" size={24} color="#fff" />
                <Text style={styles.uploadText}>Upload Photo</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            {/* Chat Name Input */}
            <View style={styles.inputSection}>
              <Text style={styles.label}>Chat name</Text>
              <TextInput
                style={[styles.input, showNameError && styles.inputError]}
                placeholder="Write the name"
                value={chatName}
                onChangeText={(text) => {
                  setChatName(text);
                  if (text.trim()) setShowNameError(false);
                }}
              />
              {showNameError && (
                <Text style={styles.errorText}>Please enter a chat name</Text>
              )}
            </View>
            
            {/* Location */}
            <View style={styles.inputSection}>
              <Text style={styles.label}>Location:</Text>
              <View style={styles.locationInput}>
                <Text style={styles.locationText}>
                  584 NW 26th St, Miami, FL 33127
                </Text>
              </View>
            </View>
            
            {/* Focus Tags */}
            <View style={styles.inputSection}>
              <Text style={styles.label}>Focus:</Text>
              <View style={styles.tagsContainer}>
                {focusTags.map((tag) => (
                  <TouchableOpacity
                    key={tag.name}
                    style={[
                      styles.tagButton,
                      selectedTags.includes(tag.name) && styles.tagButtonSelected,
                    ]}
                    onPress={() => toggleTag(tag.name)}
                  >
                    <Text style={styles.tagEmoji}>{tag.emoji}</Text>
                    <Text
                      style={[
                        styles.tagText,
                        selectedTags.includes(tag.name) && styles.tagTextSelected,
                      ]}
                    >
                      {tag.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* Description */}
            <View style={styles.inputSection}>
              <Text style={styles.label}>Description:</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Describe your group chat…"
                multiline
                numberOfLines={4}
                value={description}
                onChangeText={setDescription}
              />
            </View>
            
            {/* Interest Filter */}
            <View style={styles.inputSection}>
              <Text style={styles.label}>I'm interested in</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowInterestOptions(!showInterestOptions)}
              >
                <Text style={styles.dropdownText}>{interestFilter}</Text>
                <Ionicons 
                  name={showInterestOptions ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
              
              {showInterestOptions && (
                <View style={styles.dropdownOptions}>
                  {interestOptions.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.dropdownOption,
                        interestFilter === option && styles.dropdownOptionSelected,
                      ]}
                      onPress={() => {
                        setInterestFilter(option);
                        setShowInterestOptions(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.dropdownOptionText,
                          interestFilter === option && styles.dropdownOptionTextSelected,
                        ]}
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            
            {/* Age Range Slider */}
            <View style={styles.inputSection}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Age range:</Text>
                <View style={styles.ageIndicators}>
                  <Text style={styles.rangeIndicator}>min {ageRange.min}</Text>
                  <Text style={styles.rangeIndicator}>max {ageRange.max}</Text>
                </View>
              </View>
              <View style={styles.sliderContainer}>
                <CustomSlider
                  style={styles.slider}
                  minimumValue={18}
                  maximumValue={100}
                  step={1}
                  minimumTrackTintColor="#0B228C"
                  maximumTrackTintColor="#D8D8D8"
                  thumbTintColor="#EAF2F9"
                  value={ageRange.min}
                  onValueChange={(value) => 
                    setAgeRange({ ...ageRange, min: Math.min(value, ageRange.max - 1) })
                  }
                />
                <CustomSlider
                  style={styles.slider}
                  minimumValue={18}
                  maximumValue={100}
                  step={1}
                  minimumTrackTintColor="#0B228C"
                  maximumTrackTintColor="#D8D8D8"
                  thumbTintColor="#EAF2F9"
                  value={ageRange.max}
                  onValueChange={(value) => 
                    setAgeRange({ ...ageRange, max: Math.max(value, ageRange.min + 1) })
                  }
                />
              </View>
              <View style={styles.ageInputsContainer}>
                <View style={styles.ageInput}>
                  <Text style={styles.ageValue}>{ageRange.min}</Text>
                </View>
                <Text style={styles.ageSeparator}>-</Text>
                <View style={styles.ageInput}>
                  <Text style={styles.ageValue}>{ageRange.max}</Text>
                </View>
              </View>
            </View>
            
            {/* Max Distance Slider */}
            <View style={styles.inputSection}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Max distance:</Text>
                <Text style={styles.distanceValue}>{maxDistance} miles</Text>
              </View>
              <View style={styles.distanceSliderContainer}>
                <CustomSlider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={10}
                  step={0.5}
                  minimumTrackTintColor="#0B228C"
                  maximumTrackTintColor="#D8D8D8"
                  thumbTintColor="#EAF2F9"
                  value={maxDistance}
                  onValueChange={setMaxDistance}
                />
              </View>
            </View>
            
            {/* Chat Duration Dropdown */}
            <View style={styles.inputSection}>
              <Text style={styles.label}>Chat Duration</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowDurationOptions(!showDurationOptions)}
              >
                <Text style={styles.dropdownText}>{chatDuration}</Text>
                <Ionicons 
                  name={showDurationOptions ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
              
              {showDurationOptions && (
                <View style={styles.dropdownOptions}>
                  {durationOptions.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.dropdownOption,
                        chatDuration === option && styles.dropdownOptionSelected,
                      ]}
                      onPress={() => {
                        setChatDuration(option);
                        setShowDurationOptions(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.dropdownOptionText,
                          chatDuration === option && styles.dropdownOptionTextSelected,
                        ]}
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            
            {/* Private Chat Toggle */}
            <View style={styles.toggleSection}>
              <Text style={styles.label}>Private chat:</Text>
              <Switch
                trackColor={{ false: "#DEE6ED", true: "#4694FD" }}
                thumbColor={isPrivate ? "#FFFFFF" : "#FFFFFF"}
                ios_backgroundColor="#DEE6ED"
                onValueChange={() => setIsPrivate(!isPrivate)}
                value={isPrivate}
              />
            </View>
            
            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: '95%',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EAF2F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: -0.5,
    fontFamily: 'DMSans-Medium',
  },
  headerRight: {
    width: 50,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 50,
  },
  uploadSection: {
    marginBottom: 24,
    alignItems: 'center',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    borderRadius: 50,
    paddingHorizontal: 20,
  },
  uploadText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
    fontFamily: 'DMSans-Medium',
  },
  inputSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000',
    fontFamily: 'DMSans-Medium',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
  },
  inputError: {
    borderColor: '#FF0000',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 14,
    marginTop: 5,
    fontFamily: 'DMSans-Regular',
  },
  locationInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 25,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  locationText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'DMSans-Regular',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tagButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF3F9',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
    marginRight: 8,
    marginBottom: 8,
  },
  tagButtonSelected: {
    backgroundColor: '#4694FD',
  },
  tagEmoji: {
    fontSize: 16,
    marginRight: 5,
  },
  tagText: {
    fontSize: 13,
    color: '#000',
    fontFamily: 'DMSans-Regular',
  },
  tagTextSelected: {
    color: '#FFFFFF',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
    fontFamily: 'DMSans-Regular',
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'DMSans-Regular',
  },
  dropdownOptions: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    zIndex: 10,
    overflow: 'hidden',
  },
  dropdownOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8',
  },
  dropdownOptionSelected: {
    backgroundColor: '#F0F7FF',
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'DMSans-Regular',
  },
  dropdownOptionTextSelected: {
    color: '#4694FD',
  },
  sliderContainer: {
    marginBottom: 15,
  },
  ageIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rangeIndicator: {
    fontSize: 13,
    color: '#000',
    opacity: 0.5,
    fontFamily: 'DMSans-Medium',
  },
  slider: {
    height: 40,
    width: '100%',
  },
  ageInputsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ageInput: {
    width: '45%',
    height: 44,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ageValue: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'DMSans-Regular',
  },
  ageSeparator: {
    width: '10%',
    textAlign: 'center',
    fontSize: 16,
    color: '#808080',
  },
  distanceSliderContainer: {
    marginTop: 10,
  },
  distanceValue: {
    fontSize: 13,
    color: '#000',
    fontFamily: 'DMSans-Medium',
  },
  toggleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  saveButton: {
    backgroundColor: '#0B228C',
    width: '100%',
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'DMSans-Medium',
  },
});

export default CreateChatModal; 