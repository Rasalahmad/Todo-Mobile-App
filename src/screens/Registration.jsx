import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Registration({ navigation }) {
  return (
    <View>
      <Text>Registration</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
