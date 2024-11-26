import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function HomeScreen() {
  const uclaRegion = {
    latitude: 34.0689,
    longitude: -118.4452,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const [selectedFilter, setSelectedFilter] = useState('All');
  const events = [
    { id: '1', title: 'Park and Picnic', date: 'Oct 22', description: "Josh's Personal Event", type: 'All' },
    { id: '2', title: 'Intern Dinner', date: 'Nov 1', description: 'AWS Early Career', type: 'Amazon' },
    { id: '3', title: 'Rock Climbing', date: 'Nov 2', description: 'Hike with Nick', type: 'Hike' },
  ];

  const filteredEvents = events.filter(event => selectedFilter === 'All' || event.type === selectedFilter);

  return (
    <View style={styles.container}>
      {/* Map Section */}
      <MapView style={styles.map} initialRegion={uclaRegion}>
        <Marker
          coordinate={{ latitude: 34.0689, longitude: -118.4452 }}
          title="Park and Picnic"
          description="Josh's Personal Event"
          pinColor="blue"
        />
        <Marker
          coordinate={{ latitude: 34.0695, longitude: -118.446 }}
          title="Intern Dinner"
          description="AWS Early Career"
          pinColor="red"
        />
        <Marker
          coordinate={{ latitude: 34.0700, longitude: -118.447 }}
          title="Rock Climbing"
          description="Hike with Nick"
          pinColor="red"
        />
      </MapView>

      {/* Filter Bar Section */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterBar}>
        {['All', 'Amazon', 'Food', 'Hike'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.selectedFilterButton,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={styles.filterText}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Events List Section */}
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.eventsContainer}
        renderItem={({ item }) => (
          <View style={styles.eventCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text style={styles.eventDescription}>{item.description}</Text>
            </View>
            <Text style={styles.eventDate}>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    height: '55%', // Keeping the map height to be more prominent
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 0, // Removed marginBottom to reduce the gap between filter bar and event cards
  },
  filterButton: {
    paddingHorizontal: 12,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedFilterButton: {
    backgroundColor: '#B7A4F4',
    borderColor: '#B7A4F4',
  },
  filterText: {
    color: '#333',
    fontSize: 14,
    lineHeight: 16,
  },
  eventsContainer: {
    paddingHorizontal: 10,
    paddingTop: 4, // Reduced the padding to reduce the gap between filter bar and event cards
  },
  eventCard: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 6,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  eventDescription: {
    fontSize: 12,
    color: '#888',
  },
  eventDate: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
});
