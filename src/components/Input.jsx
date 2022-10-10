import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

export default function Input({
  placeholder,
  secureTextEntry,
  autoCapitalize,
  onChangeText,
  multiline,
  value,
  keyboardType,
}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      onChangeText={onChangeText}
      multiline={multiline}
      keyboardType={keyboardType}
    >
      <Text>{value}</Text>
    </TextInput>
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 0.5,
    fontSize: 16,
    marginHorizontal: 10,
    borderBottomColor: "gray",
    marginVertical: 15,
    lineHeight: 28,
  },
});
