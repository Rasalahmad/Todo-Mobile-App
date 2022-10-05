import {
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
} from "react-native";
import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Registration({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../../assets/login.png")} style={styles.img} />
      <View style={styles.inputContainer}>
        <Text style={styles.heading}>Registration</Text>
        <Input placeholder={"Full Name"} />
        <Input placeholder={"Email Address"} />
        <Input placeholder={"Password"} secureTextEntry />
        <Input placeholder={"Age"} />
        <View style={{ marginVertical: 40 }}>
          <Button title={"Submit"} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    marginVertical: 50,
    marginHorizontal: 20,
  },
});
