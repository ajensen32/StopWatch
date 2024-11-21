import React, { useState, useRef } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Increment by 10 milliseconds
      }, 10);
    }
  };

  const stopStopwatch = () => {
    if (isRunning) {
      setIsRunning(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const recordLap = () => {
    setLaps((prevLaps) => [...prevLaps, time]);
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600000);
    const seconds = Math.floor((time % 3600000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${hours}:${seconds.toString().padStart(2, "0")}:${milliseconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formatTime(time)}</Text>
      <View style={styles.buttons}>
        <Button
          title={isRunning ? "Stop" : "Start"}
          onPress={isRunning ? stopStopwatch : startStopwatch}
        />
        <Button title="Lap" onPress={recordLap} disabled={!isRunning} />
        <Button title="Reset" onPress={resetStopwatch} />
      </View>
      <ScrollView style={styles.lapsContainer}>
        {laps.map((lap, index) => (
          <Text key={index} style={styles.lap}>
            Lap {index + 1}: {formatTime(lap)}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  time: {
    fontSize: 48,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
  },
  lapsContainer: {
    marginTop: 20,
    width: "100%",
  },
  lap: {
    fontSize: 18,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
