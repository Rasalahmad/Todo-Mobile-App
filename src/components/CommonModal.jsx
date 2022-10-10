import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export default function CommonModal({
  modalVisible,
  setModalVisible,
  users,
  handleLogout,
}) {
  return (
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
  );
}

const styles = StyleSheet.create({
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
