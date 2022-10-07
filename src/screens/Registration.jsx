import {
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../App";
import { showMessage } from "react-native-flash-message";

export default function Registration({ navigation }) {
  const radioOption = ["Male", "Female"];
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  const registration = async () => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("result", result);

      await addDoc(collection(db, "users"), {
        name,
        email,
        gender,
        age,
        uid: result.user.uid,
      });
      setLoading(false);
      navigation.navigate("Login");
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const message = () =>
    showMessage({
      message: "Error",
      type: "danger",
    });

  let content = null;

  if (loading) {
    content = (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color={"blue"} />
      </SafeAreaView>
    );
  }
  if (!loading && error) {
    content = (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }
  if (!loading && !error) {
    content = (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Image
            source={require("../../assets/login.png")}
            style={styles.img}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.heading}>Registration</Text>
            <Input
              placeholder={"Full Name"}
              onChangeText={(text) => setName(text)}
            />
            <Input
              placeholder={"Email Address"}
              autoCapitalize={"none"}
              onChangeText={(text) => setEmail(text)}
            />
            <Input
              placeholder={"Password"}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
            <Input placeholder={"Age"} onChangeText={(text) => setAge(text)} />
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
              <Button title={"Submit"} onPress={registration} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return content;
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
