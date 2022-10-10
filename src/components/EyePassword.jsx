import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";

export default function EyePassword({ onChangeText }) {
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  return (
    <View style={styles.passWordContainer}>
      <TextInput
        style={{ flex: 1 }}
        placeholder={"Password"}
        secureTextEntry={isPasswordSecure}
        onChangeText={onChangeText}
      />
      <Pressable
        onPress={() => {
          isPasswordSecure
            ? setIsPasswordSecure(false)
            : setIsPasswordSecure(true);
        }}
      >
        <Feather
          name={isPasswordSecure ? "eye-off" : "eye"}
          size={24}
          color="black"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  passWordContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomWidth: 0.5,
    fontSize: 16,
    marginHorizontal: 10,
    borderBottomColor: "gray",
    marginVertical: 15,
  },
});
