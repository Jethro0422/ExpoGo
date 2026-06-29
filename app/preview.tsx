import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { analyzeImage } from "../lib/gemini";
import { imageToBase64 } from "../lib/image";

export default function PreviewScreen() {
  const { photoUri } = useLocalSearchParams<{
    photoUri: string;
  }>();

  const [loading, setLoading] = useState(false);

  async function analyze() {
    if (!photoUri) return;

    try {
      setLoading(true);

      const base64 = await imageToBase64(photoUri);

      const result = await analyzeImage(base64);

      router.push({
        pathname: "/result",
        params: {
          photoUri,
          result,
        },
      });
    } catch (error) {
      console.log(error);
      alert("Failed to analyze image.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: photoUri }}
        style={styles.image}
        contentFit="contain"
      />

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 15 }}>Gemini is analyzing...</Text>
        </View>
      ) : (
        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.grayButton}
            onPress={() => router.back()}
          >
            <Text style={styles.text}>Retake</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.blueButton} onPress={analyze}>
            <Text style={styles.text}>Analyze</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  image: {
    flex: 1,
    width: "100%",
  },

  bottom: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 20,
  },

  blueButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },

  grayButton: {
    backgroundColor: "#666",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },

  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  loading: {
    padding: 30,
    alignItems: "center",
  },
});
