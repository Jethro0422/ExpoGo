import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ResultScreen() {
  const { result, photoUri } = useLocalSearchParams<{
    result: string;
    photoUri: string;
  }>();

  async function copyResult() {
    await Clipboard.setStringAsync(result ?? "");
    Alert.alert("VisionAI", "Result copied to clipboard.");
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text style={styles.title}>VisionAI Result</Text>

      <Image
        source={{ uri: photoUri }}
        style={styles.image}
        contentFit="cover"
      />

      <View style={styles.card}>
        <View style={styles.header}>
          <Ionicons name="sparkles" size={26} color="#A855F7" />

          <Text style={styles.headerText}>AI Analysis</Text>
        </View>

        <Text style={styles.result}>{result}</Text>
      </View>

      <TouchableOpacity style={styles.buttonPurple} onPress={copyResult}>
        <Ionicons name="copy" color="white" size={20} />

        <Text style={styles.buttonText}>Copy Result</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonBlue} onPress={() => router.back()}>
        <Ionicons name="refresh" color="white" size={20} />

        <Text style={styles.buttonText}>Analyze Again</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonGray}
        onPress={() => router.replace("/")}
      >
        <Ionicons name="home" color="white" size={20} />

        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050816",
    padding: 20,
  },

  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 20,
    textAlign: "center",
  },

  image: {
    width: "100%",
    height: 260,
    borderRadius: 20,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#111827",
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  headerText: {
    color: "#A855F7",
    fontWeight: "800",
    fontSize: 22,
    marginLeft: 10,
  },

  result: {
    color: "white",
    fontSize: 17,
    lineHeight: 28,
  },

  buttonPurple: {
    backgroundColor: "#7C3AED",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  buttonBlue: {
    backgroundColor: "#2563EB",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  buttonGray: {
    backgroundColor: "#374151",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "800",
    fontSize: 17,
    marginLeft: 10,
  },
});
