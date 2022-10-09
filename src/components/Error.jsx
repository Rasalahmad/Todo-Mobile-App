import { StyleSheet, Text } from "react-native";
import React from "react";

export default function Error({ error }) {
  return <Text style={styles.errorStyle}>{error}</Text>;
}

const styles = StyleSheet.create({
  errorStyle: {
    color: "red",
    marginHorizontal: 10,
  },
});
