import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';

import mapMarker from './src/images/map-marker.png';

export default function App() {
  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{ 
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        <Marker 
          icon={mapMarker}
          coordinate={{
            latitude: 0,
            longitude: 0,
          }}
        >
          <Callout>
            <Text>Lar das Meninas</Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});
