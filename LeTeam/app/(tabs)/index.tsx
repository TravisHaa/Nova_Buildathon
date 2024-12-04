import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  Animated,
  PanResponder,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const eventData = [
  {
    photo: require('../../assets/images/notion.jpg'),
    title: 'Make with Notion',
    date: 'Thurs, Oct 24, 10:30 AM - 4:20 PM',
    description: 'Join us at Notion\'s first global conference! Get a first look at our newest product launches and a peek into our biggest innovations coming in the new year.',
    location: 'Pier 39, San Fransisco',
    hostImage: require('../../assets/images/notionlogo.png'),
    host: "Notion",
    distance: "0.3",
    attendees: "Eliana Salas, Zaiden Simon, Kalani Bowman, Sabrina Lee, and 250 more."
  },
  {
    photo: require('../../assets/images/novagm.png'),
    title: 'Nova GM',
    date: 'Tues, Dec 2nd, 8:00 - 10:00 PM',
    description: 'Come to Startup UCLA to celebrate all the newbies and their presentations for build-a-thon projects!',
    location: 'Nova @ Startup UCLA, Westwood',
    hostImage: require('../../assets/images/nova.jpg'),
    host: "Nova",
    distance: "0.1",
    attendees: "Sonav Agarwal, Kylie Bach, Richelle Shim, Izzy Qian, and 20 more."
  },
  {
    photo:require('../../assets/images/friendsgiving.jpg'),
    title: 'Nova Friendsgiving',
    date: 'Sun, Nov 17th, 7:00 - 10:00 PM',
    description: 'Celebrate Thanksgiving with your Nova besties at Kylie\'s before the break. Make sure to bring your own special dish!',
    location: '424 Kelton Ave, Los Angeles',
    hostImage: require('../../assets/images/nova.jpg'),
    host: "Nova",
    distance: "0.5",
    attendees: "Kylie Bach, Richelle Shim, Izzy Qian, Jenny Wang, and 20 more."
  },
  {
    photo:require('../../assets/images/leteam.png'),
    title: 'LeTeam Sprint',
    date: 'Wed, Nov 27th, 6:00 - 7:00 PM',
    description: 'Meet up to lock in on the build-a-thon project due this week.',
    location: '280 Charles E Young Dr N, Los Angeles',
    hostImage: require('../../assets/images/baguette.png'),
    host: "LeTeam",
    distance: "0.6",
    attendees: "Dylan Tang, Travis Ma, Kasie Yang, Katelyn Doanla."
  },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState(eventData);
  const [expandedCard, setExpandedCard] = useState(null);
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (e, { dx, dy }) => {
        if (dx > 120) {
          Animated.spring(pan, {
            toValue: { x: SCREEN_WIDTH + 100, y: dy },
            useNativeDriver: false,
          }).start(() => handleSwipe('like'));
        } else if (dx < -120) {
          Animated.spring(pan, {
            toValue: { x: -SCREEN_WIDTH - 100, y: dy },
            useNativeDriver: false,
          }).start(() => handleSwipe('dislike'));
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const handleSwipe = (direction) => {
    pan.setValue({ x: 0, y: 0 });
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const resetCards = () => {
    setCurrentIndex(0);
    pan.setValue({ x: 0, y: 0 });
  };

  const renderExpandedView = (item) => (
    <View style={styles.fullscreenContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={() => setExpandedCard(null)}>
        <MaterialIcons name="close" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContent}>
      <Image source={item.photo} style={styles.expandedImage} resizeMode="cover" />
      <View style={styles.expandedContent}>
        <Text style={styles.expandedTitle}>{item.title}</Text>
        <Text style={styles.expandedDate}>{item.date}</Text>
  
        <View style={styles.tagContainer}>
          <Text style={styles.tag}>{item.host}</Text>
        </View>
  
        <Text style={styles.sectionTitle}>About Event</Text>
        <Text style={styles.expandedDescription}>{item.description}</Text>
        <View style={styles.locationDetails}>
        <Text style={styles.sectionTitle}>Location</Text>
        <Text style={styles.locationText}> • {item.distance} mi away</Text>
        </View>
        <Text style={styles.locationText}>{item.location}</Text>
        <View style={styles.mapPlaceholder}>
          <Text>map</Text>
        </View>
  
        <Text style={styles.sectionTitle}>Hosted By:</Text>
        <View style={styles.hostContainer}>
          <Image source={item.hostImage} style={styles.hostImage}/>
          <Text style={styles.hostText}>{item.host}</Text>
        </View>
  
        <Text style={styles.sectionTitle}>Attendees:</Text>
        <View style={styles.attendeesContainer}>
          <View style={styles.attendeeCircle}></View>
          <View style={styles.attendeeCircle}></View>
          <View style={styles.attendeeCircle}></View>
          <View style={styles.attendeeCircle}></View>
          <Text style={styles.attendeeCount}>+ more </Text>
        </View>
        <Text style={styles.attendeeNames}>
          {item.attendees}
        </Text>
  
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
  

  const renderCards = () => {
    if (expandedCard !== null) {
      return renderExpandedView(cards[expandedCard]);
    }
    if (currentIndex >= eventData.length) {
      return (
        <View style={styles.resetContainer}>
          <TouchableOpacity style={styles.resetButton} onPress={resetCards}>
            <FontAwesome name="refresh" size={24} color="white" />
          </TouchableOpacity>
        </View>
      );
    }

    return eventData.map((item, index) => {
      if (index === currentIndex) {
        return (
          <Animated.View
            key={index}
            style={[
              styles.card,
              {
                transform: [
                  { translateX: pan.x },
                  { translateY: pan.y },
                  {
                    rotate: pan.x.interpolate({
                      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
                      outputRange: ['-10deg', '0deg', '10deg'],
                    }),
                  },
                ],
              },
            ]}
            {...panResponder.panHandlers}
          >
          <View style={styles.cardContent}>
            <Image source={item.photo} style={styles.cardImage} resizeMode="cover" />
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => setExpandedCard(index)}
            >
              <MaterialIcons name="fullscreen" size={20} />
            </TouchableOpacity>
          </View>
          </Animated.View>
        );
      }
      return null; // Hide all other cards
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>{renderCards()}</View>
      {currentIndex < eventData.length && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSwipe('dislike')}
          >
            <FontAwesome name="times" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.heartButton]}
            onPress={() => handleSwipe('like')}
          >
            <FontAwesome name="heart" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.6,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'column',
  },
  cardImage: {
    flex: 3, // Adjust this value to control the space taken by the image
    width: '100%',
  },
  infoContainer: {
    flex: 1, // Adjust this value to control the space taken by text
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  icon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    color: '#666',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 40,
    justifyContent: 'space-evenly',
    width: SCREEN_WIDTH,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: '#D9D9D9',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  heartButton: {
    backgroundColor: '#D9D9D9',
  },
  resetContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButton: {
    width: 50,
    height: 50,
    backgroundColor: '#D9D9D9',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  fullscreenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fullscreenDate: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  fullscreenDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  fullscreenLocation: {
    fontSize: 14,
    color: '#666',
  },
  scrollContent: {
    flexGrow: 1,
  },
  expandedImage: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.3,
  },
  expandedContent: {
    padding: 20,
    flex: 1,
  },
  expandedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  expandedDate: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tag: {
    backgroundColor: '#E8E8FF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 12,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  expandedDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  locationDetails: {
    flexDirection: 'row',
  },
  locationText: {
    fontSize: 16,
    marginVertical: 10,
    color: '#666',
  },
  mapPlaceholder: {
    height: 100,
    backgroundColor: '#E8E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 10,
  },
  hostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  hostText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  attendeeCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFE8CC',
    marginRight: 5,
  },
  attendeeCount: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
  },
  attendeeNames: {
    fontSize: 14,
    color: '#666',
  },
  registerButton: {
    marginTop: 20,
    backgroundColor: '#E8E8FF',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  hostImage: {
    width: 20,
    height: 20,
  }
  
});
