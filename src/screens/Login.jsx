import {
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { showMessage } from "react-native-flash-message";
import Error from "../components/Error";
import EyePassword from "../components/EyePassword";
import { auth } from "../../firebase.config";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (email.trim() === "") {
      setError(() => ({ emailError: "Email is required." }));
    } else if (password.length < 6) {
      setError(() => ({
        passwordError: "Password length must be at least 6.",
      }));
    } else {
      setLoading(true);
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        if (result.user.uid) {
          setLoading(false);
          navigation.navigate("Home");
          showMessage({
            message: "Login Successfully",
            type: "success",
          });
        }
      } catch (error) {
        const str = error.message.split(" ")[2].split("/")[1];
        const errorMessage = str.substring(0, str.length - 2);
        setLoading(false);
        showMessage({
          message: errorMessage,
          type: "danger",
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../../assets/login.png")} style={styles.img} />
      <View style={styles.inputContainer}>
        <Text style={styles.heading}>Login</Text>
        <Input
          placeholder={"Email Address"}
          autoCapitalize={"none"}
          onChangeText={(text) => setEmail(text)}
        />
        {error.emailError && <Error error={error.emailError} />}
        <EyePassword onChangeText={(text) => setPassword(text)} />
        {error.passwordError && <Error error={error.passwordError} />}
        <Text style={styles.routText}>
          Don't have an account?{" "}
          <Text
            style={{ color: "orange" }}
            onPress={() => navigation.navigate("Registration")}
          >
            Registration
          </Text>
        </Text>
        {loading ? (
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <ActivityIndicator size="large" color={"blue"} />
          </SafeAreaView>
        ) : (
          <View style={{ marginVertical: 40 }}>
            <Button title={"Sign In"} onPress={handleSubmit} />
          </View>
        )}
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
  routText: {
    marginLeft: 10,
    marginVertical: 10,
  },
});
