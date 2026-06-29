export async function analyzeImage(base64: string) {
  const response = await fetch("http://192.168.1.5:5000/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image: base64,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Analysis failed.");
  }

  return data.result;
}
