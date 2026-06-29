import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Loading camera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.permissionText}>
          Camera permission is required.
        </Text>

        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function takePicture() {
    try {
      if (!cameraRef.current) return;

      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });

      if (!photo) return;

      console.log(photo.uri);

      router.push({
        pathname: "/preview",
        params: {
          photoUri: photo.uri,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="back" />

      <View style={styles.overlay}>
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <Text style={styles.buttonText}>Capture</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  camera: {
    flex: 1,
  },

  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  captureButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 35,
    paddingVertical: 16,
    borderRadius: 50,
    elevation: 5,
  },

  permissionButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  permissionText: {
    fontSize: 18,
    textAlign: "center",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
