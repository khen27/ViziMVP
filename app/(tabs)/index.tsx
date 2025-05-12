import { StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import MapView, {Marker} from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';


export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        initialRegion={{
          latitude: 25.78,  // Miami
          longitude: -80.20,
          latitudeDelta: 0.06,
          longitudeDelta: 0.035,
        }}>
      </MapView>
      <TouchableOpacity style={styles.filterButton}>
        <Ionicons name="filter" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.plusButton}>
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
    position: 'absolute',
    bottom: 120,
    left: 20,
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 28,
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  plusButton: {
    position: 'absolute',
    bottom:120,
    right: 20,
    backgroundColor: '#1E3A8A',
    padding: 18,
    borderRadius: 36,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  searchButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 36,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  locateButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 36,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
