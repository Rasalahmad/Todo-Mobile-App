import {
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Registration({ navigation }) {
  const radioOption = ["Male", "Female"];
  const [gender, setGender] = useState(null);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={require("../../assets/login.png")} style={styles.img} />
        <View style={styles.inputContainer}>
          <Text style={styles.heading}>Registration</Text>
          <Input placeholder={"Full Name"} />
          <Input placeholder={"Email Address"} />
          <Input placeholder={"Password"} secureTextEntry />
          <Input placeholder={"Age"} />
          {radioOption.map((option) => {
            const selected = option === gender;
            return (
              <Pressable
                style={styles.radioContainer}
                key={option}
                onPress={() => setGender(option)}
              >
                <View
                  style={[
                    styles.outerCircle,
                    selected && styles.selectedOuterCircle,
                  ]}
                >
                  <View
                    style={[
                      styles.innerCircle,
                      selected && styles.selectedInnerCircle,
                    ]}
                  ></View>
                </View>
                <Text style={styles.radioText}>{option}</Text>
              </Pressable>
            );
          })}
          <Text style={styles.routText}>
            Already have an account?{" "}
            <Text
              style={{ color: "orange" }}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Text>
          </Text>
          <View style={{ marginVertical: 10 }}>
            <Button title={"Submit"} />
          </View>
        </View>
      </ScrollView>
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
  routText: {
    marginLeft: 10,
    marginVertical: 10,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  outerCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 0.5,
    alignItems: "center",
    borderColor: "#cfcfcf",
    justifyContent: "center",
  },
  innerCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#cfcfcf",
  },
  radioText: {
    marginTop: 8,
    fontSize: 16,
    marginLeft: 10,
  },
  selectedOuterCircle: {
    borderColor: "orange",
  },
  selectedInnerCircle: {
    borderColor: "orange",
    backgroundColor: "orange",
  },
});
