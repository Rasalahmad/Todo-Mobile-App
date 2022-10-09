import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Input from "../components/Input";
import Button from "../components/Button";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../App";
import { showMessage } from "react-native-flash-message";

export default function Create({ navigation, route, user }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [color, setColor] = useState(null);
  const [loading, setLoading] = useState(false);

  const colorOption = ["red", "green", "orange"];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, "notes"), {
        title,
        desc,
        color,
        uid: user && user.uid,
      });
      setLoading(false);
      navigation.navigate("Home");
    } catch (err) {
      setLoading(false);
      showMessage({
        message: "Something went wrong",
        type: "danger",
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.secondaryContainer}>
        <Text style={styles.heading}>Create</Text>
      </View>
      <View style={styles.image}>
        <AntDesign
          style={styles.icon}
          name="pluscircleo"
          size={100}
          color="black"
        />
      </View>
      <View style={styles.inputs}>
        <Input placeholder={"title"} onChangeText={(text) => setTitle(text)} />
        <Input
          placeholder={"description"}
          onChangeText={(text) => setDesc(text)}
          multiline={true}
          value={desc}
        />
        <Text style={styles.colorText}>Select Color</Text>
        {colorOption.map((option) => {
          const selected = option === color;
          return (
            <Pressable
              style={styles.radioContainer}
              key={option}
              onPress={() => setColor(option)}
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
              <Text
                style={[
                  styles.radioText,
                  option === "red" && { color: "red" },
                  option === "green" && { color: "green" },
                  option === "orange" && { color: "orange" },
                ]}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {loading ? (
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={"blue"} />
        </SafeAreaView>
      ) : (
        <View style={{ marginVertical: 10 }}>
          <Button title={"Create"} onPress={handleSubmit} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  secondaryContainer: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    textAlign: "center",
    marginTop: 25,
  },
  inputs: {
    marginHorizontal: 10,
    marginVertical: 60,
  },
  colorText: {
    margin: 10,
    fontSize: 18,
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
    marginTop: 10,
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
