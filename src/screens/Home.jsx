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
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
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
        noteList.push({ ...doc.data(), id: doc.id });
      });
      setNotes(noteList);
    });
    return notesListSubscription;
  }, []);

  const renderItem = ({ item }) => {
    const { title, desc, color, id } = item;
    const handleDelete = () => {
      deleteDoc(doc(db, "notes", id));
    };
    return (
      <Pressable
        onPress={() => navigation.navigate("update", { item })}
        style={[styles.itemContainer, { backgroundColor: color }]}
      >
        <Pressable style={styles.deleteBtn} onPress={handleDelete}>
          <AntDesign name="delete" size={24} color="white" />
        </Pressable>
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
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
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
  deleteBtn: {
    position: "absolute",
    alignSelf: "flex-end",
    padding: 10,
    zIndex: 2,
  },
});
