import {
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { showMessage } from "react-native-flash-message";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result.user.uid) {
        setLoading(false);
        navigation.navigate("Home");
      }
    } catch (err) {
      setLoading(false);
      showMessage({
        message: "Something went wrong",
        type: "danger",
      });
    }
  };

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
  if (!loading) {
    content = (
      <SafeAreaView style={styles.container}>
        <Image source={require("../../assets/login.png")} style={styles.img} />
        <View style={styles.inputContainer}>
          <Text style={styles.heading}>Login</Text>
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
          <Text style={styles.routText}>
            Don't have an account?{" "}
            <Text
              style={{ color: "orange" }}
              onPress={() => navigation.navigate("Registration")}
            >
              Registration
            </Text>
          </Text>
          <View style={{ marginVertical: 40 }}>
            <Button title={"Sign In"} onPress={handleSubmit} />
          </View>
        </View>
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
});
