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
        {text: "Erkläre detailliert die Konzepte, Methoden und Vorgehensweisen mit Übungsaufgaben und durchdachten Lösungen zum Thema: 'Die Normalverteilung', Kapitel: 'Einführung in die Normalverteilung', und unter Berücksichtigung der Kapitelbeschreibung: 'Definition der Normalverteilung, Eigenschaften und Anwendungen. Darstellung der Dichtefunktion und ihrer wichtigsten Parameter.' sowie einer Kapitellänge von etwa '30 Minuten'. Gib deine Ergebnisse im JSON Format mit Feldnamen 'title', 'detailedDescription' als Liste mit Objekten mit Feldern 'chapterTitle' und 'content', 'excersises' als Liste und 'links' als Liste an. Jeder der Feldnamen soll nur einmal vorkommen und die Ausgabe soll mit dem JSON Formatierer in JavaScript geparsed werden können, es ist also in mathematischen Formeln auf escape-characters zu achten, Kommas nach Feldnamen und so weiter. Nutze für die Textformatierung html-Code und kein Markdown. Stelle sicher, dass mathematische Formeln und Terme LaTeX Code nutzen und in HTML gerendert werden können. Nutze KEINE Zeichen die nicht utf-8 sind! STELLE IMMER SICHER, dass das JSON geparsed werden kann!!!"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n\"title\": \"Die Normalverteilung\",\n\"detailedDescription\": [\n{\n\"chapterTitle\": \"Einführung in die Normalverteilung\",\n\"content\": \"<p>Die Normalverteilung, auch Gauß-Verteilung genannt, ist eine der wichtigsten und am häufigsten vorkommenden Wahrscheinlichkeitsverteilungen in der Statistik. Sie beschreibt die Verteilung von kontinuierlichen Daten, die sich um einen Mittelwert konzentrieren und symmetrisch um diesen Mittelwert verteilt sind.</p>\\n<p>Die Normalverteilung spielt in vielen Bereichen der Wissenschaft und Technik eine wichtige Rolle, zum Beispiel in der Physik, Biologie, Wirtschaft und Sozialwissenschaften. Sie dient als Grundlage für viele statistische Tests und Konfidenzintervalle.</p>\"\n},\n{\n\"chapterTitle\": \"Definition der Normalverteilung\",\n\"content\": \"<p>Die Normalverteilung ist definiert durch ihre Dichtefunktion, die durch die folgende Formel gegeben ist:</p>\\n<p>$$f(x) = \\\\frac{1}{\\\\sigma \\\\sqrt{2\\\\pi}}e^{-\\\\frac{(x-\\\\mu)^2}{2\\\\sigma^2}}$$</p>\\n<p>Dabei sind:</p>\\n<ul>\\n<li>$\\\\mu$ der Mittelwert der Verteilung</li>\\n<li>$\\\\sigma$ die Standardabweichung der Verteilung</li>\\n<li>$e$ die Eulersche Zahl (ca. 2,718)</li>\\n<li>$\\\\pi$ die Kreiszahl (ca. 3,14159)</li>\\n</ul>\\n<p>Die Dichtefunktion ist eine Glockenkurve, die symmetrisch um den Mittelwert $\\\\mu$ ist. Die Standardabweichung $\\\\sigma$ bestimmt die Breite der Kurve. Je größer die Standardabweichung, desto breiter ist die Kurve.</p>\"\n},\n{\n\"chapterTitle\": \"Eigenschaften der Normalverteilung\",\n\"content\": \"<p>Die Normalverteilung hat folgende wichtige Eigenschaften:</p>\\n<ul>\\n<li><b>Symmetrie:</b> Die Verteilung ist symmetrisch um den Mittelwert, d.h. die Wahrscheinlichkeit, einen Wert kleiner als den Mittelwert zu beobachten, ist gleich der Wahrscheinlichkeit, einen Wert größer als den Mittelwert zu beobachten.</li>\\n<li><b>Glockenkurve:</b> Die Dichtefunktion hat die Form einer Glockenkurve, die sich um den Mittelwert konzentriert.</li>\\n<li><b>Mittelwert, Median und Modus sind identisch:</b> Der Mittelwert, der Median und der Modus der Normalverteilung stimmen überein.</li>\\n<li><b>68-95-99,7 Regel:</b> Ungefähr 68% der Daten liegen innerhalb einer Standardabweichung vom Mittelwert, 95% innerhalb von zwei Standardabweichungen und 99,7% innerhalb von drei Standardabweichungen.</li>\\n</ul>\"\n},\n{\n\"chapterTitle\": \"Anwendungen der Normalverteilung\",\n\"content\": \"<p>Die Normalverteilung hat viele Anwendungen in verschiedenen Bereichen, darunter:</p>\\n<ul>\\n<li><b>Statistische Tests:</b> Viele statistische Tests basieren auf der Annahme, dass die Daten normalverteilt sind.</li>\\n<li><b>Konfidenzintervalle:</b> Konfidenzintervalle für Mittelwerte und andere Parameter werden oft unter der Annahme einer Normalverteilung berechnet.</li>\\n<li><b>Prognose:</b> Die Normalverteilung wird oft verwendet, um zukünftige Ereignisse zu prognostizieren.</li>\\n<li><b>Qualitätskontrolle:</b> Die Normalverteilung wird verwendet, um die Qualität von Produkten und Prozessen zu überwachen.</li>\\n<li><b>Finanzen:</b> Die Normalverteilung wird verwendet, um Aktienkurse und andere Finanzdaten zu modellieren.</li>\\n</ul>\"\n}\n],\n\"excersises\": [\n{\n\"question\": \"Eine Normalverteilung hat einen Mittelwert von 10 und eine Standardabweichung von 2. Was ist die Wahrscheinlichkeit, einen Wert zwischen 8 und 12 zu beobachten?\",\n\"solution\": \"<p>Die Wahrscheinlichkeit, einen Wert zwischen 8 und 12 zu beobachten, entspricht der Fläche unter der Kurve der Normalverteilung zwischen diesen beiden Werten. Da die Normalverteilung symmetrisch ist, entspricht diese Wahrscheinlichkeit der Fläche unter der Kurve zwischen 1 Standardabweichung unter dem Mittelwert und 1 Standardabweichung über dem Mittelwert. Gemäß der 68-95-99,7 Regel liegt etwa 68% der Daten innerhalb einer Standardabweichung vom Mittelwert. Daher beträgt die Wahrscheinlichkeit, einen Wert zwischen 8 und 12 zu beobachten, etwa <b>68%</b>.</p>\"\n},\n{\n\"question\": \"Eine Normalverteilung hat einen Mittelwert von 50 und eine Standardabweichung von 5. Was ist die Wahrscheinlichkeit, einen Wert größer als 60 zu beobachten?\",\n\"solution\": \"<p>Um diese Wahrscheinlichkeit zu berechnen, müssen wir die Standardnormalverteilung verwenden. Die Standardnormalverteilung hat einen Mittelwert von 0 und eine Standardabweichung von 1. Um den Wert 60 in eine Standardnormalverteilung zu transformieren, subtrahieren wir den Mittelwert (50) und dividieren durch die Standardabweichung (5). Das Ergebnis ist 2.  Die Wahrscheinlichkeit, einen Wert größer als 2 in der Standardnormalverteilung zu beobachten, kann mithilfe einer Tabelle der Standardnormalverteilung oder eines Statistik-Softwarepakets berechnet werden. Sie beträgt etwa <b>2,28%</b>.</p>\"\n}\n],\n\"links\": [\n{\n\"url\": \"https://en.wikipedia.org/wiki/Normal_distribution\",\n\"description\": \"Wikipedia-Artikel über die Normalverteilung\"\n},\n{\n\"url\": \"https://www.stat.berkeley.edu/~stark/SticiGui/Text/Normal.htm\",\n\"description\": \"Eine umfassende Anleitung zur Normalverteilung mit vielen Beispielen\"\n}\n]\n}\n```"},
      ],
    },
  ],
});
