import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function Button({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.myBtn} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  myBtn: {
    textAlign: "center",
    paddingTop: 12,
    width: 150,
    alignSelf: "center",
    paddingBottom: 5,
    borderRadius: 20,
    backgroundColor: "orange",
    color: "#fff",
  },
  title: {
    fontSize: 18,
    alignSelf: "center",
  },
});
