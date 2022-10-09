import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../App";

export default function Home({ navigation, route, user }) {
  const [notes, setNotes] = useState([]);
  const handlePress = () => {
    navigation.navigate("Create");
  };

  useEffect(() => {
    const q = query(collection(db, "notes"), where("uid", "==", user.uid));
    const notesListSubscription = onSnapshot(q, (querySnapshot) => {
      const noteList = [];
      querySnapshot.forEach((doc) => {
        noteList.push(doc.data());
      });
      setNotes(noteList);
    });
    return notesListSubscription;
  }, []);

  const renderItem = ({ item }) => {
    const { title, desc, color } = item;
    return (
      <Pressable style={[styles.itemContainer, { backgroundColor: color }]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{desc}</Text>
      </Pressable>
    );
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
        <FlatList
          data={notes}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
          contentContainerStyle={{ padding: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  totalView: {},
  mainDiv: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  itemContainer: {
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
  },
  description: {
    fontSize: 18,
    color: "#fff",
    marginTop: 8,
  },
});
