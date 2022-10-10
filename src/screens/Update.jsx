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
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../App";
import { showMessage } from "react-native-flash-message";
import Error from "../components/Error";

export default function Update({ navigation, route, user }) {
  const noteItem = route.params.item;
  const [title, setTitle] = useState(noteItem?.title);
  const [desc, setDesc] = useState(noteItem?.desc);
  const [color, setColor] = useState(noteItem?.color);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const colorOption = ["red", "green", "orange"];

  const handleSubmit = async () => {
    if (title.trim() === "") {
      setError(() => ({ titleError: "Title is required." }));
    } else if (desc.trim() === "") {
      setError(() => ({ descError: "Description is required." }));
    } else if (color === null) {
      setError(() => ({ colorError: "Color is required." }));
    } else {
      setLoading(true);
      try {
        await updateDoc(doc(db, "notes", noteItem.id), {
          title,
          desc,
          color,
        });
        setLoading(false);
        navigation.navigate("Home");
        showMessage({
          message: "Note updated successfully",
          type: "info",
        });
      } catch (err) {
        setLoading(false);
        showMessage({
          message: "Something went wrong",
          type: "danger",
        });
      }
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.secondaryContainer}>
        <Text style={styles.heading}>Update Your Note</Text>
      </View>
      <View style={styles.inputs}>
        <Input
          placeholder={"title"}
          onChangeText={(text) => setTitle(text)}
          value={title}
        />
        {error.titleError && <Error error={error.titleError} />}
        <Input
          placeholder={"description"}
          onChangeText={(text) => setDesc(text)}
          multiline={true}
          value={desc}
        />
        {error.descError && <Error error={error.descError} />}
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
        {error.colorError && <Error error={error.colorError} />}
      </View>
      {loading ? (
        <SafeAreaView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={"blue"} />
        </SafeAreaView>
      ) : (
        <View style={{ marginVertical: 40 }}>
          <Button title={"Update"} onPress={handleSubmit} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
