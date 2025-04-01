import React, { useRef, useState, useEffect } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { View, StyleSheet, Text, Button } from "react-native";

export const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  camera: { flex: 1, width: "100%" },
});
