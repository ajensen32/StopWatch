import React from "react";
import { View, StyleSheet } from "react-native";
import Stopwatch from "@/components/Stopwatch";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Stopwatch />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
