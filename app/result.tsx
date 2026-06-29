import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function ResultScreen() {
  const { result } = useLocalSearchParams<{
    result: string;
  }>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>VisionAI Result</Text>

      <Text style={styles.result}>{result}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
  },

  result: {
    fontSize: 18,
    lineHeight: 30,
  },
});
