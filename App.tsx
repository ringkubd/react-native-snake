import {GameEngine} from 'react-native-game-engine';
import React, {useRef, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Constants from './utils/constants';
import Head from './components/Head';
import Food from './components/Food';
import Tail from './components/Tail';
import GameLoop from './systems/GameLoop';

const App = () => {
  const BoardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
  const engine = useRef(null);
  const [isGameRunning, setIsGameRunning] = useState(true);
  const [axis, setAxis] = useState('0deg');

  const randomPositions = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const resetGame = () => {
    engine.current.swap({
      head: {
        position: [0, 0],
        size: Constants.CELL_SIZE,
        updateFrequency: 10,
        nextMove: 10,
        xspeed: 0,
        yspeed: 0,
        engine: engine,
        renderer: <Head />,
      },
      food: {
        position: [
          randomPositions(0, Constants.GRID_SIZE - 1),
          randomPositions(0, Constants.GRID_SIZE - 1),
        ],
        size: Constants.CELL_SIZE,
        renderer: <Food />,
      },
      tail: {
        size: Constants.CELL_SIZE,
        elements: [],
        renderer: <Tail />,
      },
    });
    setIsGameRunning(true);
  };

  return (
    <View style={styles.canvas}>
      <GameEngine
        ref={engine}
        style={{
          width: BoardSize,
          height: BoardSize,
          flex: null,
          backgroundColor: 'white',
        }}
        entities={{
          head: {
            position: [0, 0],
            size: Constants.CELL_SIZE,
            updateFrequency: 10,
            nextMove: 10,
            xspeed: 0,
            yspeed: 0,
            axis: axis,
            renderer: <Head axis={axis} />,
          },
          food: {
            position: [
              randomPositions(0, Constants.GRID_SIZE - 1),
              randomPositions(0, Constants.GRID_SIZE - 1),
            ],
            size: Constants.CELL_SIZE,
            renderer: <Food />,
          },
          tail: {
            size: Constants.CELL_SIZE,
            elements: [],
            renderer: <Tail />,
          },
        }}
        systems={[GameLoop]}
        running={isGameRunning}
        onEvent={e => {
          switch (e) {
            case 'game-over':
              Alert.alert('Game over!');
              setIsGameRunning(false);
              return;
            case 'move-up':
              setAxis('360deg');
              return;
            case 'move-left':
              setAxis('0deg');
              return;
            case 'move-right':
              setAxis('180deg');
              return;
            case 'move-down':
              setAxis('80deg');
              return;
          }
        }}
      />
      <View style={styles.controlContainer}>
        <View style={styles.controllerRow}>
          <TouchableOpacity onPress={() => engine.current.dispatch('move-up')}>
            <View style={styles.controlBtn} />
          </TouchableOpacity>
        </View>
        <View style={styles.controllerRow}>
          <TouchableOpacity
            onPress={() => engine.current.dispatch('move-left')}>
            <View style={styles.controlBtn} />
          </TouchableOpacity>
          <View style={[styles.controlBtn, {backgroundColor: null}]} />
          <TouchableOpacity
            onPress={() => engine.current.dispatch('move-right')}>
            <View style={styles.controlBtn} />
          </TouchableOpacity>
        </View>
        <View style={styles.controllerRow}>
          <TouchableOpacity
            onPress={() => engine.current.dispatch('move-down')}>
            <View style={styles.controlBtn} />
          </TouchableOpacity>
        </View>
      </View>
      {!isGameRunning && (
        <TouchableOpacity onPress={resetGame}>
          <Text
            style={{
              color: 'white',
              marginTop: 15,
              fontSize: 22,
              padding: 10,
              backgroundColor: 'grey',
              borderRadius: 10,
            }}>
            Start New Game
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlContainer: {
    marginTop: 10,
  },
  controllerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlBtn: {
    backgroundColor: 'yellow',
    width: 100,
    height: 100,
  },
});
export default App;
