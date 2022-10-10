import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  FlatList,
  ActivityIndicator,
  Alert,
  Image,
  Modal,
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
import { showMessage } from "react-native-flash-message";
import { getAuth, signOut } from "firebase/auth";

export default function Home({ navigation, route, user }) {
  const [notes, setNotes] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const auth = getAuth();

  const handlePress = () => {
    navigation.navigate("Create");
  };

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "notes"), where("uid", "==", user.uid));
    const notesListSubscription = onSnapshot(q, (querySnapshot) => {
      const noteList = [];
      querySnapshot.forEach((doc) => {
        noteList.push({ ...doc.data(), id: doc.id });
      });
      setNotes(noteList);
      setLoading(false);
    });
    return notesListSubscription;
  }, []);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "users"), where("email", "==", user.email));
    const userListSubscription = onSnapshot(q, (querySnapshot) => {
      const userList = [];
      querySnapshot.forEach((doc) => {
        userList.push({ ...doc.data(), id: doc.id });
      });
      setUsers(userList);
      setLoading(false);
    });
    return userListSubscription;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setModalVisible(!modalVisible);
      showMessage({
        message: "Logout successfully",
        type: "success",
      });
    } catch (err) {
      showMessage({
        message: "Something went wrong",
        type: "danger",
      });
    }
  };

  const renderItem = ({ item }) => {
    const { title, desc, color, id } = item;
    const handleDelete = () => {
      deleteDoc(doc(db, "notes", id));
      showMessage({
        message: "Note deleted successfully",
        type: "danger",
      });
    };
    const createTwoButtonAlert = () =>
      Alert.alert("Delete Note", "Are you sure you want to delete the note?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: handleDelete },
      ]);
    return (
      <Pressable
        onPress={() => navigation.navigate("update", { item })}
        style={[styles.itemContainer, { backgroundColor: color }]}
      >
        <Pressable style={styles.deleteBtn} onPress={createTwoButtonAlert}>
          <AntDesign name="delete" size={24} color="white" />
        </Pressable>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{desc}</Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.closeBtn}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <AntDesign name="close" size={24} color="black" />
            </Pressable>
            <Text style={styles.modalText}>Name : {users[0]?.name}</Text>
            <Text style={styles.modalText}>Age :{users[0]?.age}</Text>
            <Text style={styles.modalText}>Gender : {users[0]?.gender}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleLogout}
            >
              <Text style={styles.textStyle}>Logout</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.totalView}>
        <View style={styles.mainDiv}>
          <Pressable onPress={() => setModalVisible(true)}>
            <Image
              style={styles.avatar}
              source={require("../../assets/avatar.png")}
            />
          </Pressable>
          <Text style={styles.heading}>My Notes</Text>
          <Pressable onPress={handlePress}>
            <AntDesign name="pluscircleo" size={25} color="black" />
          </Pressable>
        </View>
        {loading ? (
          <SafeAreaView style={{ position: "relative", top: 280 }}>
            <ActivityIndicator size="large" color={"blue"} />
          </SafeAreaView>
        ) : notes.length === 0 ? (
          <SafeAreaView style={{ position: "relative", top: 280 }}>
            <Text style={{ textAlign: "center" }}>No Notes Found</Text>
          </SafeAreaView>
        ) : (
          <FlatList
            data={notes}
            renderItem={renderItem}
            keyExtractor={(item) => item.title}
            contentContainerStyle={{ padding: 20 }}
            showsVerticalScrollIndicator={false}
          />
        )}
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
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  centeredView: {
    marginTop: 35,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    // textAlign: "center",
  },
  closeBtn: {
    position: "absolute",
    right: 0,
    padding: 20,
  },
});
