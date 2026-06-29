import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { imageToBase64 } from "../lib/image";

export default function PreviewScreen() {
  const { photoUri } = useLocalSearchParams<{
    photoUri: string;
  }>();

  const [loading, setLoading] = useState(false);

  async function analyze(type: string) {
    try {
      setLoading(true);

      const base64 = await imageToBase64(photoUri!);

      const response = await fetch("http://192.168.1.5:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64,
          mode: type,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      router.push({
        pathname: "/result",
        params: {
          photoUri,
          result: data.result,
        },
      });
    } catch (err: any) {
      Alert.alert("VisionAI", err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: photoUri }}
        style={styles.image}
        contentFit="cover"
      />

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#7C3AED" />

          <Text style={styles.loadingText}>VisionAI is analyzing...</Text>
        </View>
      ) : (
        <>
          <TouchableOpacity style={styles.retake} onPress={() => router.back()}>
            <Ionicons name="camera-reverse" size={22} color="white" />

            <Text style={styles.retakeText}>Retake</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => analyze("academic")}>
            <LinearGradient
              colors={["#7C3AED", "#5B21B6"]}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Academic Analysis</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => analyze("safety")}>
            <LinearGradient
              colors={["#9333EA", "#6D28D9"]}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Safety Analysis</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => analyze("inventory")}>
            <LinearGradient
              colors={["#A855F7", "#7E22CE"]}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Inventory Analysis</Text>
            </LinearGradient>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050816",
    padding: 20,
  },

  image: {
    width: "100%",
    height: 340,
    borderRadius: 25,
    marginBottom: 25,
  },

  retake: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  retakeText: {
    color: "white",
    marginLeft: 8,
    fontSize: 17,
    fontWeight: "700",
  },

  button: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 18,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "800",
    fontSize: 18,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "white",
    marginTop: 18,
    fontSize: 18,
  },
});
