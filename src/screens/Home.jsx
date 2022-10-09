import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export default function Home({ navigation }) {
  const handlePress = () => {
    navigation.navigate("Create");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.totalView}>
        <View style={styles.mainDiv}>
          <Text style={styles.heading}>My Notes</Text>
          <Pressable onPress={handlePress}>
            <AntDesign name="pluscircleo" size={25} color="black" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  totalView: {
    padding: 20,
  },
  mainDiv: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
