

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
import Icon from 'react-native-vector-icons/MaterialIcons';


interface Event {
  id: number;
  name: string;
  date: string;
  attending: boolean;
}



interface Location {
  city: string;
  state: string;
}

const ProfileScreen: React.FC = () => {
  const [userType, setUserType] = useState('intern');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [location, setLocation] = useState<Location>({ 
    city: 'San Francisco',
    state: 'CA'
  });

  const userTypes = [
    { label: 'Intern', value: 'intern' },
    { label: 'Post-grad', value: 'postgrad' },
  ];
  
  const handleSelect = (value: string) => {
    setUserType(value);
    setDropdownVisible(false);
  };

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
    return `${loc.city}`;
  };

  return (
    <SafeAreaView style ={{ flex: 1 }}>
      
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
        <Image source={require('../../assets/images/chayalu.jpeg')} 
        style={styles.profileImage}
        />
        </View>
        <View style={{flexDirection: 'row',}}>
        <Text style={styles.name}>Chaya Lu</Text>
        <Text style={styles.atname}>@chayalu</Text>
        </View>
        <Text>here to grow!</Text>
        </View>
        

    <ScrollView style={styles.container}>
      
      <View style={styles.section}>
        <View style={styles.userTypeContainer}>
          <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setDropdownVisible((prev) => !prev)}
          >
            <Text style={styles.dropdownButtonText}>
          {userType ? userTypes.find((type) => type.value === userType)?.label || 'undefined': 'Select User Type'} 
        </Text>
        <Icon name="arrow-drop-down" size={20} color="#000" />
          </TouchableOpacity>
          {isDropdownVisible && (
        <View style={styles.dropdownMenu}>
          {userTypes.map((type) => (
            <TouchableOpacity
              key={type.value}
              style={[
                styles.dropdownMenuItem,
                userType === type.value && styles.activeDropdownItem,
              ]}
              onPress={() => handleSelect(type.value)}
            >
              <Text
                style={[
                  styles.dropdownMenuItemText,
                  userType === type.value && styles.activeDropdownItemText,
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
          )}
        <View style={styles.locationBox}>
        <Text style={styles.dropdownButtonText}>{formatLocation(location)}</Text>
        </View>
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
  name: {
    paddingVertical: 7,
    fontSize: 20,
    color: 'black',
  },
  atname: {
    paddingTop: 13,
    paddingLeft: 5,
    fontSize: 13,
    color: 'gray',
  },
  profileHeader: {
    paddingHorizontal:36,
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
  dropdownButton:{

  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  section: {
    backgroundColor: 'white',
    padding: 5,
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
    paddingHorizontal: 25,
    maxWidth:82.7,
    gap: 12,
  },
  dropdownButton: {
    paddingVertical: 10,
    minWidth: 100,
    maxHeight: 40,
    backgroundColor: '#E6E6FA',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  dropdownButtonText: {
    fontSize: 13,
    color: '#333',
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E6E6FA',
    overflow: 'hidden',
  },
  dropdownMenuItem: {
    padding: 5,
  },
  dropdownMenuItemText: {
    fontSize: 13,
    color: '#333',
  },
  activeDropdownItem: {
    backgroundColor: '#E6E6FA',
  },
  activeDropdownItemText: {
    color: '#333',
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
  locationBox: {
    paddingVertical: 10,
    minWidth: 100,
    maxHeight: 40,
    backgroundColor: '#D3D3D3',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
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
