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
  systemInstruction: "Du bist ein geduldiger und sehr gut ausgebildeter Mathematik Lehrer. Du bist präzise und gehst auf verschiedene Schwierigkeiten ein und erklärst diese ausführlich.",
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
export const generateChapterContent_AI = model.startChat({
  generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Erkläre detailliert die Konzepte, Methoden und Vorgehensweisen mit Übungsaufgaben und durchdachten Lösungen zum Thema: 'Die Normalverteilung', Kapitel: 'Einführung in die Normalverteilung', und unter Berücksichtigung der Kapitelbeschreibung: 'Definition der Normalverteilung, Eigenschaften und Anwendungen. Darstellung der Dichtefunktion und ihrer wichtigsten Parameter.' sowie einer Kapitellänge von etwa '30 Minuten'. Gib deine Ergebnisse im JSON Format mit Feldnamen 'title', 'detailedDescription', 'excersises' als Liste und 'links' als Liste an. Jeder der Feldnamen soll nur einmal vorkommen und die Ausgabe soll mit dem JSON Formatierer in JavaScript geparsed werden können, es ist also in mathematischen Formeln auf escape-characters zu achten, Kommas nach Feldnamen und so weiter. Stelle sicher, dass mathematische Formeln in HTML gerendert werden können und schön aussehen. STELLE IMMER SICHER, dass das JSON geparsed werden kann!!!"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n\"title\": \"Einführung in die Normalverteilung\",\n\"detailedDescription\": \"## Die Normalverteilung: Ein grundlegendes Konzept in der Statistik\\n\\nDie Normalverteilung, auch bekannt als Gauß-Verteilung, ist eine der wichtigsten und häufigsten Verteilungen in der Statistik. Sie beschreibt viele natürliche Phänomene und wird in einer Vielzahl von Bereichen eingesetzt, wie z.B. in der Physik, Biologie, Wirtschaft und Sozialwissenschaften.\\n\\n### Definition der Normalverteilung\\n\\nEine Zufallsvariable *X* folgt einer Normalverteilung mit Mittelwert *μ* und Standardabweichung *σ*, wenn ihre Wahrscheinlichkeitsdichtefunktion durch die folgende Formel gegeben ist:\\n\\n$$f(x) = \\\\frac{1}{\\\\sigma\\\\sqrt{2\\\\pi}}e^{-\\\\frac{(x-\\\\mu)^2}{2\\\\sigma^2}}$$\\n\\nDabei gilt:\\n\\n* **μ (Mu):** Der Mittelwert der Verteilung. Er repräsentiert den Mittelpunkt der Verteilung.\\n* **σ (Sigma):** Die Standardabweichung der Verteilung. Sie misst die Streuung der Daten um den Mittelwert.\\n\\nDie Normalverteilung wird oft als *N(μ, σ<sup>2</sup>)* geschrieben.  \\n\\n### Eigenschaften der Normalverteilung\\n\\nDie Normalverteilung hat einige wichtige Eigenschaften:\\n\\n1. **Symmetrie:** Die Verteilung ist symmetrisch um den Mittelwert *μ*. Das bedeutet, dass die Wahrscheinlichkeit, einen Wert links vom Mittelwert zu beobachten, gleich der Wahrscheinlichkeit ist, einen Wert rechts vom Mittelwert zu beobachten.\\n\\n2. **Glockenform:** Die Dichtefunktion hat eine charakteristische Glockenform. Die höchsten Werte liegen bei *μ*, und die Werte fallen symmetrisch ab, je weiter man sich vom Mittelwert entfernt.\\n\\n3. **68-95-99,7-Regel:**  Ungefähr 68% der Daten liegen innerhalb einer Standardabweichung vom Mittelwert, 95% der Daten liegen innerhalb von zwei Standardabweichungen und 99,7% der Daten liegen innerhalb von drei Standardabweichungen vom Mittelwert.\\n\\n4. **Standardnormalverteilung:** Die Normalverteilung mit Mittelwert *μ = 0* und Standardabweichung *σ = 1* wird als Standardnormalverteilung bezeichnet. Ihre Dichtefunktion ist gegeben durch:\\n\\n$$f(z) = \\\\frac{1}{\\\\sqrt{2\\\\pi}}e^{-\\\\frac{z^2}{2}}$$\\n\\nDie Standardnormalverteilung ist sehr nützlich, da jede Normalverteilung durch Standardisierung in die Standardnormalverteilung transformiert werden kann.\\n\\n### Anwendungen der Normalverteilung\\n\\nDie Normalverteilung hat zahlreiche Anwendungen in verschiedenen Bereichen, zum Beispiel:\\n\\n* **Modellierung von Messfehlern:** Die Normalverteilung wird verwendet, um die zufälligen Fehler in Messungen zu modellieren.\\n* **Statistische Tests:** Viele statistische Tests basieren auf der Annahme, dass die Daten normalverteilt sind.\\n* **Qualitätssicherung:** In der Qualitätssicherung wird die Normalverteilung verwendet, um die Wahrscheinlichkeit von Defekten zu berechnen und Prozesse zu optimieren.\\n* **Finanzwesen:** Die Normalverteilung wird in der Finanzmathematik verwendet, um den Kursverlauf von Aktien und anderen Finanzinstrumenten zu modellieren.\\n\\n### Zusammenfassung\\n\\nDie Normalverteilung ist ein wichtiges Konzept in der Statistik und hat vielfältige Anwendungen in verschiedenen Bereichen. Sie beschreibt viele natürliche Phänomene und ist ein grundlegendes Werkzeug für statistische Analysen.\",\n\"excersises\": [\n{\n\"question\": \"Welche Eigenschaften hat die Normalverteilung?\",\n\"solution\": \"Die Normalverteilung hat folgende Eigenschaften:\\n\\n1. **Symmetrie:** Sie ist symmetrisch um den Mittelwert *μ*. \\n2. **Glockenform:** Die Dichtefunktion hat eine charakteristische Glockenform.\\n3. **68-95-99,7-Regel:** Ungefähr 68% der Daten liegen innerhalb einer Standardabweichung vom Mittelwert, 95% der Daten liegen innerhalb von zwei Standardabweichungen und 99,7% der Daten liegen innerhalb von drei Standardabweichungen vom Mittelwert.\\n4. **Standardnormalverteilung:** Die Normalverteilung mit Mittelwert *μ = 0* und Standardabweichung *σ = 1* wird als Standardnormalverteilung bezeichnet.\"\n},\n{\n\"question\": \"Was ist der Unterschied zwischen der Normalverteilung und der Standardnormalverteilung?\",\n\"solution\": \"Die Normalverteilung ist eine allgemeine Verteilung mit Mittelwert *μ* und Standardabweichung *σ*. Die Standardnormalverteilung ist ein Spezialfall der Normalverteilung mit *μ = 0* und *σ = 1*. Jede Normalverteilung kann durch Standardisierung in die Standardnormalverteilung transformiert werden.\"\n},\n{\n\"question\": \"Welche Vorteile bietet die Standardnormalverteilung?\",\n\"solution\": \"Die Standardnormalverteilung ist sehr nützlich, da sie eine vereinfachte Form der Normalverteilung darstellt und die Wahrscheinlichkeit von Werten direkt aus Tabellen abgelesen werden kann. Außerdem kann jede Normalverteilung durch Standardisierung in die Standardnormalverteilung transformiert werden, was Berechnungen und Interpretationen vereinfacht.\"\n}\n],\n\"links\": [\n\"https://en.wikipedia.org/wiki/Normal_distribution\",\n\"https://www.statisticshowto.com/probability-and-statistics/normal-distributions/\",\n\"https://www.mathsisfun.com/data/normal-distribution.html\"\n]\n}\n```"},
        ],
      },
    ],
  });
