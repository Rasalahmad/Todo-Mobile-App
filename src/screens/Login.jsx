import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

export default function Login({ navigation }) {
  return (
    <View>
      <Text>Login</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Registration")}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
