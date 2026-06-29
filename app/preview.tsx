import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PreviewScreen() {
  const { photoUri } = useLocalSearchParams<{
    photoUri: string;
  }>();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: photoUri }}
        style={styles.image}
        contentFit="contain"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push("/result")}
        >
          <Text style={styles.buttonText}>Analyze</Text>
        </TouchableOpacity>
      </View>
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

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },

  primaryButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 10,
  },

  secondaryButton: {
    backgroundColor: "#555",
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
