import { StyleSheet, TouchableOpacity, Alert, ViewStyle, Image, Platform, View as RNView } from 'react-native';
import React, { useState, useRef, useContext } from 'react';
import type { Region } from 'react-native-maps';
import { View } from '@/components/Themed';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import Toast from '../components/Toast';
import CreateChatModal from '../components/CreateChatModal';
import GroupChatMarker from '../components/GroupChatMarker';
import ChatDetailsModal from '../components/ChatDetailsModal';
import { getNextWidgetImage, getRandomWidgetImage } from '../utils/imageUtils';
import { ChatDataContext } from '../context/ChatDataContext';

// Import icons
const filterIcon = require('../../assets/icons/icon-filter.png');
const filterIconPressed = require('../../assets/icons/icon-filter-pressed.png');
const searchIcon = require('../../assets/icons/icon-search.png');
const addIcon = require('../../assets/icons/icon-add.png');
const locateIcon = require('../../assets/icons/icon-locate.png');
const infoToastIcon = require('../../assets/icons/icon-toast-information.png');
const truckIcon = require('../../assets/icons/icon-truck.png');

// Define chat marker type
interface ChatMarker {
  id: string;
  latitude: number;
  longitude: number;
  imageUrl: string | null;
  participants: number;
  name?: string;
  location?: string;
  description?: string;
  duration?: string;
  tags?: string[];
  distance?: number;
  createdBy?: string;
  createdAt?: string;
  imageIndex?: number;
  borderColorIndex?: number;
  progress?: number;
}

const createMarker = (lon: number, lat: number, id: string) => (
  <Marker 
    key={id}
    coordinate={{longitude: lon, latitude: lat}}
  />
)

export default function TabOneScreen() {
  // Add map ref
  const mapRef = useRef<MapView>(null);

  // Track region
  const [region, setRegion] = useState({
    latitude: 25.78,  // Miami
    longitude: -80.20,
    latitudeDelta: 0.06,
    longitudeDelta: 0.035,
  });

  // Store original coordinates
  const originalCoordinates = {
    latitude: 25.78,  // Miami
    longitude: -80.20,
    latitudeDelta: 0.06,
    longitudeDelta: 0.035,
  };

  // Markers state
  const [markers, setMarkers] = useState([{ id: '1', lat: 0, lon: 0 }]);
  
  // Filter button state
  const [filterPressed, setFilterPressed] = useState(false);

  // For the chat details modal
  const [selectedChat, setSelectedChat] = useState<ChatMarker | null>(null);
  const [chatDetailsModalVisible, setChatDetailsModalVisible] = useState(false);

  // Toggle filter state
  const toggleFilter = () => {
    setFilterPressed(!filterPressed);
  };

  // Handle locate button press
  const handleLocatePress = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(originalCoordinates, 1000);
    }
  };

  // Helper to generate random lat/lng inside region
  function getRandomLatLng(region: Region) {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
    const lat = latitude + (Math.random() - 0.5) * latitudeDelta;
    const lon = longitude + (Math.random() - 0.5) * longitudeDelta;
    return { lat, lon };
  }

  // Get random food image
  const getRandomFoodImage = () => {
    const foods = ['taco', 'pizza', 'burger', 'sushi', 'salad', 'pasta', 'sandwich', 'dessert'];
    const randomFood = foods[Math.floor(Math.random() * foods.length)];
    return `https://source.unsplash.com/featured/?${randomFood}`;
  };

  // Add this line near the beginning of the component, after other useState declarations
  const { chatMarkers, setChatMarkers } = useContext(ChatDataContext);
  
  // Update the addChatMarker function to use the context
  const addChatMarker = (formValues?: {
    chatName: string;
    description: string;
    selectedTags: string[];
    duration: string;
  }) => {
    const { lat, lon } = getRandomLatLng(region);
    
    // Generate a unique index for the image based on the current count
    const imageIndex = chatMarkers.length % 15;
    
    // Randomly select a border color
    const borderColorIndex = Math.floor(Math.random() * 3); // 0, 1, or 2
    
    // Random progress between 0.2 and 1
    const progress = 0.2 + Math.random() * 0.8;
    
    const newChatMarker = {
      id: Date.now().toString(),
      latitude: lat,
      longitude: lon,
      imageUrl: null, // No URL - we'll use our local images
      participants: Math.floor(Math.random() * 48) + 2, // Random between 2-50,
      name: formValues?.chatName || 'Group Chat',
      location: '584 NW 26th St, Miami, FL 33127',
      description: formValues?.description || 'Join this interesting group chat!',
      duration: formValues?.duration || '12 hours',
      tags: formValues?.selectedTags?.length ? formValues.selectedTags : ['General'],
      distance: Number((Math.random() * 5).toFixed(1)), // Random distance 0-5 miles
      createdBy: 'You',
      createdAt: 'Just now',
      imageIndex: imageIndex, // Assign an image index
      borderColorIndex: borderColorIndex, // Assign a border color
      progress: progress, // Assign random progress
    };
    
    setChatMarkers([...chatMarkers, newChatMarker]);
    setCreateChatModalVisible(false);
  };

  // Handler for when a group chat marker is pressed
  const handleChatMarkerPress = (chatMarker: ChatMarker) => {
    if (chatMarker) {
      setSelectedChat(chatMarker);
      setChatDetailsModalVisible(true);
    }
  };
  
  // Handle joining a chat
  const handleJoinChat = () => {
    // For now, just close the modal - future enhancement would be to join the chat
    setChatDetailsModalVisible(false);
    setToastVisible(true);
  };

  const insets = useSafeAreaInsets();
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  // Calculate proper map height
  const navBarHeight = 80;
  const mapBottomMargin = 35; // Space between map and navbar
  const mapHeight = screenHeight - navBarHeight - mapBottomMargin;

  const [toastVisible, setToastVisible] = useState(false);
  const [createChatModalVisible, setCreateChatModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Create Chat Modal */}
      <CreateChatModal 
        visible={createChatModalVisible} 
        onClose={() => setCreateChatModalVisible(false)} 
        onSave={(values) => {
          // Form values will be used to create a new chat
          addChatMarker(values);
        }}
      />
      
      {/* Chat Details Modal */}
      {selectedChat && (
        <ChatDetailsModal
          visible={chatDetailsModalVisible}
          onClose={() => {
            setChatDetailsModalVisible(false);
            // Clear the selected chat when closing the modal
            setSelectedChat(null);
          }}
          onJoin={handleJoinChat}
          chatData={selectedChat}
        />
      )}
      
      {/* Toast notification */}
      <Toast
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
        message="Search is coming soon!"
        icon={<Image source={infoToastIcon} style={{ width: 20, height: 20 }} resizeMode="contain" />}
        backgroundColor="#FFFFFF"
        borderColor="rgba(139, 92, 246, 0.2)"
        shadowColor="rgba(248, 92, 58, 0.1)"
        textColor="#000"
        duration={2500}
        topOffset={insets.top}
      />
      {/* Background gradient - fills the screen */}
      <LinearGradient
        colors={['#836CE8', '#4694FD']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.2, y: 0.8 }}
        end={{ x: 1, y: 0.5 }}
      />
      
      {/* Transition gradient - specifically positioned for visual continuity */}
      <LinearGradient
        colors={['#7389EC', '#4694FD']}
        style={styles.navbarTransitionGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />

      {/* Semi-transparent decorative elements to enhance the transition */}
      <RNView style={styles.leftCornerAccent} />
      <RNView style={styles.rightCornerAccent} />
      
      {/* Main layout container */}
      <RNView style={styles.mainContainer}>
        {/* White rounded container for map */}
        <RNView style={[styles.mapContainer, { height: mapHeight }]}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={region}
            onRegionChangeComplete={setRegion}
          >
            {markers.map(marker => createMarker(marker.lon, marker.lat, marker.id))}
            
            {/* Render group chat markers */}
            {chatMarkers.map(chatMarker => (
              <Marker
                key={chatMarker.id}
                coordinate={{
                  latitude: chatMarker.latitude,
                  longitude: chatMarker.longitude
                }}
                anchor={{ x: 0.5, y: 0.5 }}
                tracksViewChanges={false}
              >
                <GroupChatMarker
                  imageUrl={chatMarker.imageUrl}
                  participants={chatMarker.participants}
                  latitude={chatMarker.latitude}
                  longitude={chatMarker.longitude}
                  onPress={() => handleChatMarkerPress(chatMarker)}
                  imageIndex={chatMarker.imageIndex}
                  borderColorIndex={chatMarker.borderColorIndex}
                  progress={chatMarker.progress}
                />
              </Marker>
            ))}
          </MapView>
        </RNView>
        
        {/* Bottom right buttons */}
        <View style={styles.bottomRightButtons}>
          <TouchableOpacity
            style={styles.blueButton}
            onPress={() => {
              setCreateChatModalVisible(true);
            }}
          >
            <Image source={addIcon} style={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.whiteButton}
            onPress={handleLocatePress}
          >
            <Image source={locateIcon} style={styles.iconImage} />
          </TouchableOpacity>
        </View>
        
        {/* Bottom left buttons */}
        <View style={styles.bottomLeftButtons}>
          <TouchableOpacity 
            style={filterPressed ? styles.blueFilterButton : styles.whiteButton}
            onPress={toggleFilter}
          >
            <Image 
              source={filterPressed ? filterIconPressed : filterIcon} 
              style={styles.iconImage} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.whiteButton}
            onPress={() => setToastVisible(true)}
          >
            <Image source={searchIcon} style={styles.iconImage} />
          </TouchableOpacity>
        </View>
      </RNView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  mapContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
    shadowColor: 'rgba(11, 19, 66, 0.3)',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 2,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  navbarTransitionGradient: {
    position: 'absolute',
    height: 130,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  // Decorative elements to enhance the transition
  leftCornerAccent: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 16,
    bottom: 105, // Fixed value for navBarHeight + 25
    backgroundColor: 'rgba(115, 137, 236, 0.25)',
    borderRadius: 25,
    zIndex: 2,
  },
  rightCornerAccent: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 20,
    bottom: 95, // Fixed value for navBarHeight + 15
    backgroundColor: 'rgba(70, 148, 253, 0.15)',
    borderRadius: 30,
    zIndex: 2,
  },
  bottomRightButtons: {
    position: 'absolute',
    right: 10,
    bottom: 130,
    flexDirection: 'column',
    gap: 10,
    zIndex: 10,
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
  },
  bottomLeftButtons: {
    position: 'absolute',
    left: 10,
    bottom: 130,
    flexDirection: 'column',
    gap: 10, 
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  whiteButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(9, 65, 115, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 8,
  },
  blueButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#0B228C',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(9, 65, 115, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 8,
  },
  blueFilterButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#4694FD',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(9, 65, 115, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 8,
  },
  redButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(9, 65, 115, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 8,
  },
  iconImage: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
});

/*

create a steate that is an array of markers
lat and longitude
map the array to marker components inside the map view
onclick generate new coorinates and add to the array

*/