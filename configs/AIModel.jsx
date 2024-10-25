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
export const generateChapterContent_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: "Erkläre detailliert die Konzepte, Methoden und Vorgehensweisen mit Übungsaufgaben und durchdachten Lösungen zum Thema: 'Die Normalverteilung', Kapitel: 'Einführung in die Normalverteilung', und unter Berücksichtigung der Kapitelbeschreibung: 'Definition der Normalverteilung, Eigenschaften und Anwendungen. Darstellung der Dichtefunktion und ihrer wichtigsten Parameter.' sowie einer Kapitellänge von etwa '30 Minuten'. Gib deine Ergebnisse im JSON Format mit Feldnamen 'title', 'detailedDescription', 'excersises' als Liste und 'links' als Liste. Jeder der Feldnamen soll nur einmal vorkommen und die Ausageb soll mit dem JSON Formatierer in JavaScript geparsed werden können, es ist also in mathematischen Formeln auf escape-characters zu achten. Stelle sicher, dass mathematische Formeln in HTML gerendert werden können und schön aussehen. Stelle immer sicher, dass das JSON geparsed werden kann!!!"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n  \"title\": \"Einführung in die Normalverteilung\",\n  \"detailedDescription\": \"## Die Normalverteilung: Eine Einführung\\n\\nDie Normalverteilung, auch bekannt als Gauß-Verteilung, ist eines der wichtigsten Konzepte in der Statistik und Wahrscheinlichkeitstheorie. Sie beschreibt die Verteilung von Daten, die in der Natur häufig vorkommen, z. B. die Körpergröße von Menschen, die Blutdruckwerte oder die Messwerte von physikalischen Größen. Die Normalverteilung spielt eine zentrale Rolle in vielen Bereichen, wie z. B. in der Qualitätskontrolle, der Finanzmathematik und der Sozialforschung.\\n\\n### Definition\\n\\nDie Normalverteilung ist eine stetige Wahrscheinlichkeitsverteilung, die durch ihre Glockenform charakterisiert ist. Ihre Dichtefunktion ist gegeben durch:\\n\\n$$f(x) = \\\\frac{1}{\\\\sigma \\\\sqrt{2\\\\pi}}e^{-\\\\frac{(x-\\\\mu)^2}{2\\\\sigma^2}}$$\\n\\nDabei ist:\\n\\n*  **\\\\(\\\\mu\\\\)** der Erwartungswert (Mittelwert) der Verteilung, der die Lage des Mittelpunkts der Glockenkurve bestimmt.\\n*  **\\\\(\\\\sigma\\\\)** die Standardabweichung, die die Streuung der Daten um den Mittelwert beschreibt. Je größer die Standardabweichung ist, desto breiter ist die Glockenkurve.\\n\\n### Eigenschaften der Normalverteilung\\n\\nDie Normalverteilung besitzt einige wichtige Eigenschaften, die sie für viele Anwendungen besonders geeignet machen:\\n\\n* **Symmetrie:** Die Normalverteilung ist symmetrisch um ihren Mittelwert, d. h. die Wahrscheinlichkeit, einen Wert links vom Mittelwert zu beobachten, ist gleich der Wahrscheinlichkeit, einen Wert rechts vom Mittelwert zu beobachten.\\n* **Glockenform:** Die Dichtefunktion der Normalverteilung hat eine charakteristische Glockenform, wobei die Wahrscheinlichkeit an den Rändern der Verteilung abnimmt und im Mittelwert am größten ist.\\n* **Standardisierung:** Jede beliebige Normalverteilung kann durch Standardisierung in eine Standardnormalverteilung mit Erwartungswert 0 und Standardabweichung 1 transformiert werden. Die Standardnormalverteilung ist besonders nützlich, da Tabellen mit Wahrscheinlichkeiten für verschiedene Werte der Standardnormalverteilung verfügbar sind.\\n* **Zentraler Grenzwertsatz:** Der zentrale Grenzwertsatz besagt, dass die Verteilung des Mittelwerts einer großen Stichprobe von unabhängigen und identisch verteilten Zufallsvariablen (unabhängig von der zugrundeliegenden Verteilung) sich der Normalverteilung annähert. Dieser Satz macht die Normalverteilung für viele Anwendungen in der Statistik unerlässlich.\\n\\n### Anwendungen\\n\\nDie Normalverteilung findet breite Anwendung in vielen Bereichen, darunter:\\n\\n* **Qualitätskontrolle:** Die Normalverteilung wird verwendet, um die Qualität von Produkten zu beurteilen und die Produktions- und Qualitätsprozesse zu optimieren.\\n* **Finanzmathematik:** Die Normalverteilung spielt eine wichtige Rolle bei der Modellierung von Finanzmärkten, insbesondere bei der Bewertung von Optionen.\\n* **Sozialforschung:** Die Normalverteilung wird verwendet, um soziale Phänomene wie die Verteilung des Einkommens oder die Zufriedenheit mit bestimmten Lebensbereichen zu analysieren.\\n* **Statistische Inferenz:** Die Normalverteilung ist die Grundlage für viele statistische Tests und Konfidenzintervalle.\\n\\n### Darstellung der Dichtefunktion\\n\\nDie Dichtefunktion der Normalverteilung kann mit verschiedenen Tools dargestellt werden. Hier sind einige gängige Möglichkeiten:\\n\\n* **Graphische Darstellung:** Die Dichtefunktion kann mit Hilfe von Software wie R, Python oder Excel visualisiert werden. So kann man die Form der Glockenkurve und die Lage des Mittelwerts und der Standardabweichung deutlich erkennen.\\n* **Tabellen:** Tabellen mit Wahrscheinlichkeiten für verschiedene Werte der Standardnormalverteilung sind verfügbar und können verwendet werden, um die Wahrscheinlichkeit zu bestimmen, dass ein Wert innerhalb eines bestimmten Bereichs liegt.\\n* **Formel:** Die Dichtefunktion kann auch mithilfe der Formel dargestellt werden, um die Wahrscheinlichkeit für einen bestimmten Wert zu berechnen.\\n\\n### Wichtige Parameter\\n\\nDie beiden wichtigsten Parameter der Normalverteilung sind:\\n\\n* **Erwartungswert (\\\\(\\\\mu\\\\))**: Der Erwartungswert gibt den Mittelwert der Verteilung an.\\n* **Standardabweichung (\\\\(\\\\sigma\\\\))**: Die Standardabweichung beschreibt die Streuung der Daten um den Mittelwert.\\n\\nDie Kombination aus Erwartungswert und Standardabweichung definiert die spezifische Form der Normalverteilung. Je größer die Standardabweichung ist, desto breiter ist die Glockenkurve. \\n\\nDie Normalverteilung ist ein fundamentales Konzept in der Statistik und Wahrscheinlichkeitstheorie. Die Kenntnis ihrer Eigenschaften und Anwendungen ist daher unerlässlich, um Daten richtig zu interpretieren und statistische Schlussfolgerungen zu ziehen.\",  \"excersises\": [\n    {\n      \"description\": \"Geben Sie die Formel für die Dichtefunktion der Normalverteilung an.\",\n      \"solution\": \"$$f(x) = \\\\frac{1}{\\\\sigma \\\\sqrt{2\\\\pi}}e^{-\\\\frac{(x-\\\\mu)^2}{2\\\\sigma^2}}$$\"\n    },\n    {\n      \"description\": \"Was ist der Erwartungswert einer Normalverteilung mit \\\\(\\\\mu = 10\\\\) und \\\\(\\\\sigma = 2\\\\)?\",\n      \"solution\": \"Der Erwartungswert ist \\\\(\\\\mu = 10\\\\).\"\n    },\n    {\n      \"description\": \"Was bedeutet die Standardabweichung in Bezug auf die Form der Normalverteilung?\",\n      \"solution\": \"Die Standardabweichung beschreibt die Streuung der Daten um den Mittelwert. Je größer die Standardabweichung ist, desto breiter ist die Glockenkurve.\"\n    },\n    {\n      \"description\": \"Was ist der Zweck der Standardisierung einer Normalverteilung?\",\n      \"solution\": \"Die Standardisierung transformiert jede beliebige Normalverteilung in eine Standardnormalverteilung mit Erwartungswert 0 und Standardabweichung 1. Dies vereinfacht die Berechnung von Wahrscheinlichkeiten, da Tabellen mit Wahrscheinlichkeiten für die Standardnormalverteilung verfügbar sind.\"\n    },\n    {\n      \"description\": \"Nennen Sie zwei Anwendungsbeispiele für die Normalverteilung.\",\n      \"solution\": \"Zwei Anwendungsbeispiele sind die Qualitätskontrolle in der Produktion und die Bewertung von Optionen in der Finanzmathematik.\"\n    }\n  ],\n  \"links\": [\n    {\n      \"name\": \"Wikipedia: Normalverteilung\",\n      \"url\": \"https://de.wikipedia.org/wiki/Normalverteilung\"\n    },\n    {\n      \"name\": \"Statistische Normalverteilung\",\n      \"url\": \"https://www.statistik.tu-dortmund.de/lehre/materialien/Wahrscheinlichkeitstheorie/Kap_4/Kap_4_3.pdf\"\n    }\n  ]\n}\n```"},
      ],
    },
  ],
});
