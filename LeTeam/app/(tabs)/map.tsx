import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function HomeScreen() {
  const uclaRegion = {
    latitude: 34.0689,
    longitude: -118.4452,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={uclaRegion}
      >
        <Marker
          coordinate={{
            latitude: 34.0689,
            longitude: -118.4452,
          }}
          title="UCLA"
          description="University of California, Los Angeles"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
