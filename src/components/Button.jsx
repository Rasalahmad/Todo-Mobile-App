import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Button({ title, bgColor }) {
  return <Text style={styles.myBtn}>{title}</Text>;
}

const styles = StyleSheet.create({
  myBtn: {
    textAlign: "center",
    paddingTop: 12,
    width: "100%",
    paddingBottom: 5,
    borderRadius: 20,
    alignSelf: "center",
    backgroundColor: "blue",
    color: "#fff",
    fontSize: 18,
  },
});
