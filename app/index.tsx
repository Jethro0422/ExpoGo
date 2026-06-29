import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  async function openGallery() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission Required", "Please allow gallery access.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
      allowsEditing: false,
    });

    if (result.canceled) return;

    router.push({
      pathname: "/preview",
      params: {
        photoUri: result.assets[0].uri,
      },
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <Text style={styles.logo}>VisionAI ✨</Text>

      <Text style={styles.subtitle}>
        AI Image Understanding using Google Gemini
      </Text>

      {/* Camera */}

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => router.push("/camera")}
      >
        <LinearGradient colors={["#7C3AED", "#5B21B6"]} style={styles.card}>
          <Ionicons name="camera" color="white" size={45} />

          <View style={styles.textArea}>
            <Text style={styles.title}>Capture Photo</Text>

            <Text style={styles.description}>
              Take a picture using your camera.
            </Text>
          </View>

          <Ionicons name="chevron-forward" color="white" size={28} />
        </LinearGradient>
      </TouchableOpacity>

      {/* Gallery */}

      <TouchableOpacity activeOpacity={0.9} onPress={openGallery}>
        <LinearGradient colors={["#2563EB", "#1D4ED8"]} style={styles.card}>
          <Ionicons name="images" color="white" size={45} />

          <View style={styles.textArea}>
            <Text style={styles.title}>Choose from Gallery</Text>

            <Text style={styles.description}>Select an existing photo.</Text>
          </View>

          <Ionicons name="chevron-forward" color="white" size={28} />
        </LinearGradient>
      </TouchableOpacity>

      {/* History */}

      <View style={[styles.card, { backgroundColor: "#111827" }]}>
        <Ionicons name="time" color="#10B981" size={45} />

        <View style={styles.textArea}>
          <Text style={styles.title}>History</Text>

          <Text style={styles.description}>Coming Soon</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Ionicons name="sparkles" color="#A855F7" size={25} />

        <Text style={styles.footerText}>Powered by Google Gemini AI</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050816",
    paddingHorizontal: 22,
    paddingTop: 40,
  },

  logo: {
    color: "#A855F7",
    fontWeight: "900",
    fontSize: 42,
    marginBottom: 8,
  },

  subtitle: {
    color: "#94A3B8",
    fontSize: 18,
    marginBottom: 35,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    padding: 22,
    marginBottom: 22,
  },

  textArea: {
    flex: 1,
    marginHorizontal: 18,
  },

  title: {
    color: "white",
    fontWeight: "800",
    fontSize: 22,
  },

  description: {
    color: "#ddd",
    marginTop: 5,
    fontSize: 15,
  },

  footer: {
    marginTop: "auto",
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  footerText: {
    color: "#aaa",
    marginLeft: 10,
  },
});
