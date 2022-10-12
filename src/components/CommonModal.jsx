import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Button from "./Button";
import Input from "./Input";
import * as ImagePicker from "expo-image-picker";
import { updateDoc, doc, collection } from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { showMessage } from "react-native-flash-message";
import { db } from "../../firebase.config";

export default function CommonModal({
  modalVisible,
  setModalVisible,
  users,
  handleLogout,
}) {
  const radioOption = ["Male", "Female"];
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(users[0]?.name && users[0]?.name);
  const [age, setAge] = useState(users[0]?.age && users[0]?.age);
  const [image, setImage] = useState(users[0]?.image ? users[0]?.image : null);
  const [gender, setGender] = useState(users[0]?.gender && users[0]?.gender);
  const [loading, setLoading] = useState(false);

  const closePopup = () => {
    setModalVisible(!modalVisible);
    setEditMode(false);
  };

  console.log(name);

  // upload the image
  const uploadImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const storageRef = ref(getStorage(), `${name + Date.now()}`);

      const img = await fetch(result.uri);
      const blob = await img.blob();

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

  // update user profile
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await updateDoc(
        doc(db, "users", users[0]?.id && users[0]?.id),
        {
          name,
          age,
          gender,
          image: image && image,
        }
      );
      setLoading(false);
      setEditMode(false);
      showMessage({
        message: "User updated successfully",
        type: "info",
      });
    } catch (err) {
      setLoading(false);
      showMessage({
        message: "Something went wrong",
        type: "danger",
      });
    }
  };

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
          <Pressable style={styles.closeBtn} onPress={closePopup}>
            <AntDesign name="close" size={24} color="black" />
          </Pressable>
          <Pressable style={styles.editBtn} onPress={() => setEditMode(true)}>
            <AntDesign name="edit" size={24} color="black" />
          </Pressable>
          {!editMode ? (
            <View>
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
              <View>
                <Button title={"Logout"} onPress={handleLogout} />
              </View>
            </View>
          ) : (
            <View>
              <Pressable onPress={uploadImage}>
                {image ? (
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: image,
                    }}
                  />
                ) : users[0]?.image ? (
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
              </Pressable>
              <Input
                placeholder={"Full Name"}
                onChangeText={(text) => setName(text)}
                autoCapitalize={"words"}
                value={name}
              />
              <Input
                placeholder={"Age"}
                keyboardType="numeric"
                onChangeText={(text) => setAge(text)}
                value={age}
              />
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
              {loading ? (
                <ActivityIndicator size="large" color={"blue"} />
              ) : (
                <View style={{ marginVertical: 20 }}>
                  <Button title={"Update"} onPress={handleUpdate} />
                </View>
              )}
            </View>
          )}
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
  editBtn: {
    marginTop: -12,
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
