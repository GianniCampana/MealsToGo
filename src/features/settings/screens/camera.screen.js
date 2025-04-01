import React, { useRef, useEffect, useContext } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export const CameraScreen = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const { user } = useContext(AuthenticationContext);

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
      navigation.goBack();
    }
  };

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    // Lo stato dei permessi è ancora in fase di determinazione
    return (
      <View style={styles.container}>
        <Text>Verifica dei permessi...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    // I permessi sono stati negati
    return (
      <View style={styles.container}>
        <Text>Accesso alla fotocamera negato</Text>
        <Button title="Concedi permesso" onPress={requestPermission} />
      </View>
    );
  }

  // I permessi sono stati concessi, mostra la fotocamera
  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        facing="front"
        ratio="16:9"
        style={styles.camera}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.captureButton} onPress={snap}>
          <Icon name="camera" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: { flex: 1, width: "100%" },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  captureButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
