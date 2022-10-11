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
import Error from "../components/Error";
import EyePassword from "../components/EyePassword";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

export default function Registration({ navigation }) {
  const radioOption = ["Male", "Female"];
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      const storageRef = ref(getStorage(), `${name + Date.now()}`);

      const img = await fetch(result.uri);
      const blob = await img.blob();

      console.log("uploading image");
      const uploadTask = uploadBytesResumable(storageRef, blob);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setImage(downloadURL);
          });
        }
      );
    }
  };

  const auth = getAuth();

  const registration = async () => {
    if (name.trim() === "") {
      setError(() => ({ nameError: "Name is required." }));
    } else if (email.trim() === "") {
      setError(() => ({ emailError: "Mail id is required." }));
    } else if (password.length < 6) {
      setError(() => ({
        passwordError: "Password length must be at least 6.",
      }));
    } else if (age.trim() === "") {
      setError(() => ({ ageError: "Age is required." }));
    } else if (gender === null) {
      setError(() => ({ genderError: "Gender is required." }));
    } else {
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
          image,
          uid: result.user.uid,
        });
        setLoading(false);
        navigation.navigate("Home");
        showMessage({
          message: "Registration Successful",
          type: "success",
        });
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

  let content = null;

  // if (loading) {
  //   content = (
  //     <SafeAreaView
  //       style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  //     >
  //       <ActivityIndicator size="large" color={"blue"} />
  //     </SafeAreaView>
  //   );
  // }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={require("../../assets/login.png")} style={styles.img} />
        <View style={styles.inputContainer}>
          <Text style={styles.heading}>Registration</Text>
          <Input
            placeholder={"Full Name"}
            onChangeText={(text) => setName(text)}
            autoCapitalize={"words"}
          />
          {error.nameError && <Error error={error.nameError} />}
          <Input
            placeholder={"Email Address"}
            autoCapitalize={"none"}
            onChangeText={(text) => setEmail(text)}
          />
          {error.emailError && <Error error={error.emailError} />}
          <EyePassword onChangeText={(text) => setPassword(text)} />
          {error.passwordError && <Error error={error.passwordError} />}
          <Input
            placeholder={"Age"}
            keyboardType="numeric"
            onChangeText={(text) => setAge(text)}
          />
          {error.ageError && <Error error={error.ageError} />}
          <Text style={{ fontSize: 18, margin: 5 }}>Select Gender</Text>
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
          {error.genderError && <Error error={error.genderError} />}
          <Text style={styles.routText}>
            Already have an account?{" "}
            <Text
              style={{ color: "orange" }}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Text>
          </Text>
          <Pressable onPress={pickImage}>
            <Text>Upload Image</Text>
          </Pressable>
          {loading ? (
            <SafeAreaView
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <ActivityIndicator size="large" color={"blue"} />
            </SafeAreaView>
          ) : (
            <View style={{ marginVertical: 10 }}>
              <Button title={"Sign up"} onPress={registration} />
            </View>
          )}
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
