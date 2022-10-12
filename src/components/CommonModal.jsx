import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Gravatar } from "react-native-gravatar";
import Button from "./Button";

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
          {/* <Gravatar
            options={{
              email: users[0]?.email,
              parameters: { size: "200", d: "mm" },
              secure: true,
            }}
            style={styles.avatar}
          /> */}
          {users[0]?.image ? (
            <Image
              style={styles.avatar}
              source={{
                uri: users[0]?.image,
              }}
            />
          ) : (
            <Image
              style={styles.avatar}
              source={require("../../assets/avatar.png")}
            />
          )}
          <View style={styles.modalText}>
            <Text>Name : {users[0]?.name}</Text>
            <Text>Age :{users[0]?.age}</Text>
            <Text>Gender : {users[0]?.gender}</Text>
          </View>
          <Pressable
            // style={[styles.button, styles.buttonClose]}
            onPress={handleLogout}
          >
            <Button title={"Logout"} />
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
    backgroundColor: "orange",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    alignSelf: "center",
  },
  closeBtn: {
    position: "absolute",
    right: 0,
    padding: 20,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
});
