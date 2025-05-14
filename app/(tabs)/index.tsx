import { StyleSheet, TouchableOpacity, Alert, ViewStyle } from 'react-native';

import React, { useState } from 'react';
import { View } from '@/components/Themed';
import MapView, {Marker} from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';


const createMarker = (lon: number, lat: number) => <Marker coordinate={{longitude: lon, latitude: lat}}/>

export default function TabOneScreen() {
  
  const [markers, setMarkers] = useState([{ lat: 0, lon: 0 }]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        initialRegion={{
          latitude: 25.78,  // Miami
          longitude: -80.20,
          latitudeDelta: 0.06,
          longitudeDelta: 0.035,
        }}>
          {
            // [{lat. lon}. {lat, lon}]  .map((lat, lon) => Marker<lat, lon>)
            // [1, 2, 3].map(number => number*2)
            //markers.map(markers => createMarker())
          }
      </MapView>
      <TouchableOpacity style={styles.filterButton}>
        <Ionicons name="filter" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.plusButton} onPress={() => {
        var newMarkers = [
          ...markers, 
          {
            lat: 25.72 + 0.12*Math.random(),
            lon: -80 + 0.07*Math.random()
          }
        ]
        setMarkers(newMarkers);
      }}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.searchButton}>
        <Ionicons name="search" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.locateButton}>
        <Ionicons name="location" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const buttonBasicStyle: any = { // any - temporary hack here
  position: 'absolute',
  padding: 14,
  borderRadius: 28,
  elevation: 5, // Android shadow
  shadowColor: '#000', // iOS shadow
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
};
const primaryButtonBasicStyle = {
  ...buttonBasicStyle,
  backgroundColor: '1E3A8A',
};
const secondaryButtonBasicStyle = {
  ...buttonBasicStyle,
  backgroundColor: 'white',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '100%',
    height: '100%',
  },
  filterButton: {
    ...secondaryButtonBasicStyle,
    bottom: 120,
    left: 20,
  },
  plusButton: {
    ...primaryButtonBasicStyle,
    bottom:120,
    right: 20,
  },
  searchButton: {
    ...secondaryButtonBasicStyle,
    bottom: 30,
    left: 20,
  },
  locateButton: {
    ...secondaryButtonBasicStyle,
    bottom: 30,
    right: 20,
  },
});

/*

create a steate that is an array of markers
lat and longitude
map the array to marker components inside the map view
onclick generate new coorinates and add to the array

*/