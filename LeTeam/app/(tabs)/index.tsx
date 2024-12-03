import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const eventData = [
  {
    title: 'Nova GM',
    date: 'Tues, Dec 2nd, 8:00 - 10:00 PM',
    description: 'Come to Startup UCLA to celebrate all the newbies and their presentations for build-a-thon projects!',
    location: 'Nova @ Startup UCLA, Westwood',
  },
  {
    title: 'Nova Friendsgiving',
    date: 'Sun, Nov 17th, 7:00 - 10:00 PM',
    description: 'Celebrate Thanksgiving with your Nova besties at Kylies before the break. Make sure to bring your own special dish!',
    location: '424 Kelton Ave, Los Angeles',
  },
  {
    title: 'LeTeam Sprint',
    date: 'Wed, Nov 27th, 6:00 - 7:00 PM',
    description: 'Meet up to lock in on the build-a-thon project due this week.',
    location: '280 Charles E Young Dr N, Los Angeles',
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
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setExpandedCard(null)}
      >
        <MaterialIcons name="close" size={24} />
      </TouchableOpacity>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.location}>{item.location}</Text>
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
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_HEIGHT * 0.5,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
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
});
