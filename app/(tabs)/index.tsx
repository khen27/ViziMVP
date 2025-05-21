import { StyleSheet, TouchableOpacity, Alert, ViewStyle, Image } from 'react-native';

import React, { useState } from 'react';
import type { Region } from 'react-native-maps';
import { View } from '@/components/Themed';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import icons
const filterIcon = require('../../assets/icons/icon-filter.png');
const searchIcon = require('../../assets/icons/icon-search.png');
const addIcon = require('../../assets/icons/icon-add.png');
const locateIcon = require('../../assets/icons/icon-locate.png');

const createMarker = (lon: number, lat: number, id: string) => (
  <Marker 
    key={id}
    coordinate={{longitude: lon, latitude: lat}}
  />
)

export default function TabOneScreen() {
  // Track region
  const [region, setRegion] = useState({
    latitude: 25.78,  // Miami
    longitude: -80.20,
    latitudeDelta: 0.06,
    longitudeDelta: 0.035,
  });

  // Markers state
  const [markers, setMarkers] = useState([{ id: '1', lat: 0, lon: 0 }]);

  // Helper to generate random lat/lng inside region
  function getRandomLatLng(region: Region) {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
    const lat = latitude + (Math.random() - 0.5) * latitudeDelta;
    const lon = longitude + (Math.random() - 0.5) * longitudeDelta;
    return { lat, lon };
  }

  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#7389EC', '#4694FD']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
      
      <View style={styles.contentContainer}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          initialRegion={region}
          onRegionChangeComplete={setRegion}
        >
          {markers.map(marker => createMarker(marker.lon, marker.lat, marker.id))}
        </MapView>
        
        {/* Bottom right buttons */}
        <View style={styles.bottomRightButtons}>
          <TouchableOpacity
            style={styles.blueButton}
            onPress={() => {
              const { lat, lon } = getRandomLatLng(region);
              setMarkers(prev => [
                ...prev,
                { id: Date.now().toString(), lat, lon }
              ]);
            }}
          >
            <Image source={addIcon} style={styles.iconImage} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.whiteButton}>
            <Image source={locateIcon} style={styles.iconImage} />
          </TouchableOpacity>
        </View>
        
        {/* Bottom left buttons */}
        <View style={styles.bottomLeftButtons}>
          <TouchableOpacity style={styles.whiteButton}>
            <Image source={filterIcon} style={styles.iconImage} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.whiteButton}>
            <Image source={searchIcon} style={styles.iconImage} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    margin: 0,
    position: 'relative',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  map: {
    position: 'absolute',
    width: 393,
    height: 735,
    left: 0,
    top: 0,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: 'rgba(11, 19, 66, 0.5)',
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 100,
    shadowOpacity: 0.5,
    elevation: 10,
  },
  bottomRightButtons: {
    position: 'absolute',
    right: 16,
    bottom: 90,
    flexDirection: 'column',
    gap: 10,
    zIndex: 10,
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
  },
  bottomLeftButtons: {
    position: 'absolute',
    left: 16,
    bottom: 90,
    flexDirection: 'column',
    gap: 10, 
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  whiteButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
    borderRadius: 25,
    backgroundColor: '#0B228C',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(9, 65, 115, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 8,
  },
  iconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

/*

create a steate that is an array of markers
lat and longitude
map the array to marker components inside the map view
onclick generate new coorinates and add to the array

*/