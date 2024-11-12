import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

interface Event {
  id: number;
  name: string;
  date: string;
  attending: boolean;
}

type UserType = 'intern' | 'postgrad';

interface Location {
  city: string;
  state: string;
}

const ProfileScreen: React.FC = () => {
  const [userType, setUserType] = useState<UserType>('intern');
  const [location, setLocation] = useState<Location>({ 
    city: 'San Francisco',
    state: 'CA'
  });
  
  const [events, setEvents] = useState<Event[]>([
    { id: 1, name: 'Tech Conference 2024', date: '2024-12-01', attending: true },
    { id: 2, name: 'Networking Mixer', date: '2024-12-15', attending: false },
    { id: 3, name: 'Workshop Series', date: '2024-12-20', attending: true },
  ]);

  const toggleEventAttendance = (eventId: number): void => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, attending: !event.attending }
        : event
    ));
  };

  const formatLocation = (loc: Location): string => {
    return `${loc.city}, ${loc.state}`;
  };

  return (
    <SafeAreaView style ={{ flex: 1 }}>
      
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
        <Image source={require('../../assets/images/bruh.jpg')} 
        style={styles.profileImage}
        />
        </View>
        </View>

    <ScrollView style={styles.container}>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Role</Text>
        <View style={styles.userTypeContainer}>
          <TouchableOpacity
            style={[
              styles.userTypeButton,
              userType === 'intern' && styles.activeUserType,
            ]}
            onPress={() => setUserType('intern')}
          >
            <Text style={[
              styles.userTypeText,
              userType === 'intern' && styles.activeUserTypeText,
            ]}>
              Intern
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.userTypeButton,
              userType === 'postgrad' && styles.activeUserType,
            ]}
            onPress={() => setUserType('postgrad')}
          >
            <Text style={[
              styles.userTypeText,
              userType === 'postgrad' && styles.activeUserTypeText,
            ]}>
              Post-grad
            </Text>
          </TouchableOpacity>
        </View>
      </View>

     
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>{formatLocation(location)}</Text>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => {/* Implement location edit */}}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

     
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Events</Text>
        {events.map(event => (
          <View key={event.id} style={styles.eventCard}>
            <View>
              <Text style={styles.eventName}>{event.name}</Text>
              <Text style={styles.eventDate}>{event.date}</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.attendButton,
                event.attending && styles.attendingButton,
              ]}
              onPress={() => toggleEventAttendance(event.id)}
            >
              <Text style={[
                styles.attendButtonText,
                event.attending && styles.attendingButtonText,
              ]}>
                {event.attending ? 'Attending' : 'Join'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImageContainer:{
    width:100,
    height:100,
    borderRadius: 100,
    backgroundColor: '#000000',
    elevation: 3,
    shadowColor: '#000',
  },
  profileImage:{
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  userTypeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  userTypeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  activeUserType: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  userTypeText: {
    fontSize: 16,
    color: '#333',
  },
  activeUserTypeText: {
    color: '#fff',
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    color: '#333',
  },
  editButton: {
    padding: 8,
  },
  editButtonText: {
    color: '#007AFF',
    fontSize: 16,
  },
  eventCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  eventName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  attendButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  attendingButton: {
    backgroundColor: '#E3F2FD',
  },
  attendButtonText: {
    color: '#666',
  },
  attendingButtonText: {
    color: '#007AFF',
  },
});

export default ProfileScreen;