export interface BuildSentenceQuestion {
  id: string;
  prompt: string;
  scrambledWords: string[];
  correctSentence: string;
  difficulty: "easy" | "medium" | "hard";
}

export const buildSentenceQuestions: BuildSentenceQuestion[] = [
  // Easy
  {
    id: "bs-1",
    prompt: "What did you think of the tour guides?",
    scrambledWords: ["guides", "fantastic", "who", "the", "tour", "were", "showed", "around", "old", "us", "city", "the"],
    correctSentence: "The tour guides who showed us around the old city were fantastic.",
    difficulty: "easy"
  },
  {
    id: "bs-2",
    prompt: "How was the weather during your trip?",
    scrambledWords: ["was", "weather", "the", "perfect", "entire", "during", "trip", "the"],
    correctSentence: "The weather was perfect during the entire trip.",
    difficulty: "easy"
  },
  {
    id: "bs-3",
    prompt: "When does the library close?",
    scrambledWords: ["library", "closes", "the", "at", "ten", "every", "night", "o'clock"],
    correctSentence: "The library closes at ten o'clock every night.",
    difficulty: "easy"
  },
  {
    id: "bs-4",
    prompt: "What do you recommend for breakfast?",
    scrambledWords: ["recommend", "I", "pancakes", "the", "fresh", "with", "fruit"],
    correctSentence: "I recommend the pancakes with fresh fruit.",
    difficulty: "easy"
  },
  {
    id: "bs-5",
    prompt: "How can I get to the museum?",
    scrambledWords: ["take", "can", "you", "bus", "the", "museum", "to", "the", "number", "five"],
    correctSentence: "You can take the number five bus to the museum.",
    difficulty: "easy"
  },
  // Medium
  {
    id: "bs-6",
    prompt: "What happened at the conference?",
    scrambledWords: ["presented", "professor", "the", "research", "her", "latest", "climate", "on", "change", "effects"],
    correctSentence: "The professor presented her latest research on climate change effects.",
    difficulty: "medium"
  },
  {
    id: "bs-7",
    prompt: "Why did you choose this university?",
    scrambledWords: ["chose", "I", "university", "this", "because", "excellent", "it", "has", "an", "program", "engineering"],
    correctSentence: "I chose this university because it has an excellent engineering program.",
    difficulty: "medium"
  },
  {
    id: "bs-8",
    prompt: "What are the benefits of exercise?",
    scrambledWords: ["exercise", "regular", "improves", "physical", "both", "and", "mental", "health", "significantly"],
    correctSentence: "Regular exercise significantly improves both physical and mental health.",
    difficulty: "medium"
  },
  {
    id: "bs-9",
    prompt: "How has technology changed education?",
    scrambledWords: ["technology", "has", "transformed", "way", "the", "students", "information", "access", "and", "learn"],
    correctSentence: "Technology has transformed the way students access information and learn.",
    difficulty: "medium"
  },
  {
    id: "bs-10",
    prompt: "What is the main cause of pollution?",
    scrambledWords: ["industrial", "emissions", "one", "are", "of", "causes", "the", "main", "air", "pollution", "of"],
    correctSentence: "Industrial emissions are one of the main causes of air pollution.",
    difficulty: "medium"
  },
  {
    id: "bs-11",
    prompt: "How can students improve their grades?",
    scrambledWords: ["students", "improve", "can", "grades", "their", "by", "attending", "regularly", "classes", "and", "studying", "consistently"],
    correctSentence: "Students can improve their grades by attending classes regularly and studying consistently.",
    difficulty: "medium"
  },
  {
    id: "bs-12",
    prompt: "What makes a good leader?",
    scrambledWords: ["leader", "a", "good", "inspires", "others", "through", "actions", "their", "not", "just", "words"],
    correctSentence: "A good leader inspires others through their actions, not just words.",
    difficulty: "medium"
  },
  // Hard
  {
    id: "bs-13",
    prompt: "How does social media affect communication?",
    scrambledWords: ["although", "social", "media", "connects", "people", "globally", "it", "may", "reduce", "quality", "the", "of", "face-to-face", "interactions"],
    correctSentence: "Although social media connects people globally, it may reduce the quality of face-to-face interactions.",
    difficulty: "hard"
  },
  {
    id: "bs-14",
    prompt: "What should governments do about climate change?",
    scrambledWords: ["governments", "should", "implement", "policies", "stricter", "that", "encourage", "use", "the", "of", "renewable", "energy", "sources"],
    correctSentence: "Governments should implement stricter policies that encourage the use of renewable energy sources.",
    difficulty: "hard"
  },
  {
    id: "bs-15",
    prompt: "Why is critical thinking important?",
    scrambledWords: ["critical", "thinking", "enables", "individuals", "to", "analyze", "information", "objectively", "and", "make", "decisions", "informed"],
    correctSentence: "Critical thinking enables individuals to analyze information objectively and make informed decisions.",
    difficulty: "hard"
  },
  {
    id: "bs-16",
    prompt: "What are the challenges of remote work?",
    scrambledWords: ["one", "of", "challenges", "the", "main", "remote", "of", "work", "is", "maintaining", "communication", "effective", "team", "members", "among"],
    correctSentence: "One of the main challenges of remote work is maintaining effective communication among team members.",
    difficulty: "hard"
  },
  {
    id: "bs-17",
    prompt: "How can cities become more sustainable?",
    scrambledWords: ["cities", "sustainable", "become", "more", "can", "by", "investing", "transportation", "public", "in", "reducing", "and", "waste", "through", "recycling", "programs"],
    correctSentence: "Cities can become more sustainable by investing in public transportation and reducing waste through recycling programs.",
    difficulty: "hard"
  },
  {
    id: "bs-18",
    prompt: "What role does education play in society?",
    scrambledWords: ["education", "plays", "role", "a", "crucial", "in", "preparing", "individuals", "contribute", "to", "positively", "to", "society", "and", "economy", "the"],
    correctSentence: "Education plays a crucial role in preparing individuals to contribute positively to society and the economy.",
    difficulty: "hard"
  },
  {
    id: "bs-19",
    prompt: "Why should we protect endangered species?",
    scrambledWords: ["protecting", "species", "endangered", "essential", "is", "for", "maintaining", "biodiversity", "which", "supports", "ecosystems", "healthy", "and", "balance", "environmental"],
    correctSentence: "Protecting endangered species is essential for maintaining biodiversity, which supports healthy ecosystems and environmental balance.",
    difficulty: "hard"
  },
  {
    id: "bs-20",
    prompt: "How has globalization affected local cultures?",
    scrambledWords: ["while", "globalization", "has", "economic", "brought", "opportunities", "it", "has", "also", "raised", "concerns", "preservation", "about", "the", "of", "local", "traditions", "cultural"],
    correctSentence: "While globalization has brought economic opportunities, it has also raised concerns about the preservation of local cultural traditions.",
    difficulty: "hard"
  }
];
