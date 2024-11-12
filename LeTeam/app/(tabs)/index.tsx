import React, { useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, Animated, PanResponder, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function App() {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        pan.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (e, gestureState) => {
        const { dx, dy } = gestureState;
        if (dx > 120) {
          Animated.spring(pan, {
            toValue: { x: SCREEN_WIDTH + 100, y: dy },
            useNativeDriver: false,
          }).start(() => resetPosition());
        } else if (dx < -120) {
          Animated.spring(pan, {
            toValue: { x: -SCREEN_WIDTH - 100, y: dy },
            useNativeDriver: false,
          }).start(() => resetPosition());
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const resetPosition = () => {
    pan.setValue({ x: 0, y: 0 });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Animated.View
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
          <Text style={styles.title}>Event</Text>
          <Text style={styles.date}>Sat, Nov 9th, 5:00 - 10:00 PM</Text>
        </View>
        <MaterialIcons name="fullscreen" size={20} style={styles.icon} />
        </Animated.View>


      </View>
      <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <FontAwesome name="times" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.heartButton]}>
            <FontAwesome name="heart" size={24} color="white" />
          </TouchableOpacity>
        </View>
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
    flexDirection: 'column',
    justifyContent: 'space-between',
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
});
