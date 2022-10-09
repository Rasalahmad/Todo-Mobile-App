import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Create() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = () => {};
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
      </View>
      <View style={{ marginVertical: 40 }}>
        <Button title={"Create"} onPress={handleSubmit} />
      </View>
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
    marginVertical: 50,
  },
});
