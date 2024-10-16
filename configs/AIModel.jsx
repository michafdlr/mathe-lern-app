/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const GenerateCourseLayout = model.startChat({
  generationConfig,
// safetySettings: Adjust safety settings
// See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {text: "Erzeuge zu den Angaben unten einen Lernkurs mit den folgenden Details auf Deutsch. \nDer Kurs soll einen Kursnamen, eine Beschreibung und eine angegebene Anzahl an Kapiteln haben, die jeweils einen Namen, eine Inhaltsbeschreibung und eine Dauer beinhalten sollen. Das Oberthema ist stets Mathematik.\nOberthema: „Analysis“\nThema: „Extrempunktberechnung“\nBeschreibung (optional): „Beziehe zu jedem Kapitel Übungsaufgaben mit Lösungen ein.“\nSchwierigkeit: „Mittel“\nLänge: 2 Stunden\nAnzahl der Kapitel: 5\nAusgabe im JSON Format"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n  \"name\": \"Extrempunkte in der Analysis\",\n  \"beschreibung\": \"Dieser Kurs führt Sie Schritt für Schritt durch die Berechnung von Extrempunkten in der Analysis. Jedes Kapitel beinhaltet Übungsaufgaben mit Lösungen.\",\n  \"schwierigkeit\": \"Mittel\",\n  \"dauer\": \"2 Stunden\",\n  \"kapitel\": [\n    {\n      \"name\": \"Einführung in Extremwerte\",\n      \"beschreibung\": \"Definition von Extremwerten, Maximum und Minimum. Visualisierung von Extrempunkten in Funktionen.\",\n      \"dauer\": \"20 Minuten\"\n    },\n    {\n      \"name\": \"Ableitung und Extrema\",\n      \"beschreibung\": \"Die Rolle der Ableitung bei der Bestimmung von Extrempunkten. Zusammenhang zwischen Ableitung und Steigung. Notwendige Bedingung für Extrempunkte.\",\n      \"dauer\": \"30 Minuten\"\n    },\n    {\n      \"name\": \"Hinreichende Bedingung für Extrema\",\n      \"beschreibung\": \"Die zweite Ableitung und ihre Bedeutung für die Unterscheidung von Maxima und Minima. Anwendung der hinreichenden Bedingung auf Beispiele.\",\n      \"dauer\": \"35 Minuten\"\n    },\n    {\n      \"name\": \"Extrempunkte in Anwendungen\",\n      \"beschreibung\": \"Anwenden der Theorie auf praktische Probleme. Optimierungsprobleme in der Wirtschaft, der Physik und anderen Bereichen.\",\n      \"dauer\": \"40 Minuten\"\n    },\n    {\n      \"name\": \"Zusammenfassung und Übungsaufgaben\",\n      \"beschreibung\": \"Zusammenfassung der wichtigsten Punkte. Übungsaufgaben mit Lösungen zur Vertiefung des Stoffes.\",\n      \"dauer\": \"35 Minuten\"\n    }\n  ]\n}\n``` \n"},
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
