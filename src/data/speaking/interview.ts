export interface InterviewTopic {
  id: string;
  title: string;
  scenario: string;
  questions: string[];
}

export const interviewTopics: InterviewTopic[] = [
  {
    id: "smartphone-usage",
    title: "Smartphone Usage",
    scenario: "You have agreed to take part in a research study about smartphone usage. You will have a short online interview with a researcher.",
    questions: [
      "How often do you use your smartphone on a typical day?",
      "What apps or features do you use most frequently on your phone?",
      "Do you think smartphones have more positive or negative effects on daily life? Why?",
      "How do you think smartphone usage will change in the next ten years?"
    ]
  },
  {
    id: "commuting-habits",
    title: "Commuting Habits",
    scenario: "You have volunteered for a research study about commuting habits. You will have a short online interview with a researcher.",
    questions: [
      "How do you usually get to school or work?",
      "What do you typically do during your commute?",
      "What changes would make your commute better?",
      "Do you think remote work or online classes will reduce commuting in the future?"
    ]
  },
  {
    id: "urban-life",
    title: "Urban Life",
    scenario: "You have agreed to take part in a research study about urban life. You will have a short online interview with a researcher.",
    questions: [
      "What do you like most about living in a city?",
      "What are some challenges of urban living?",
      "How has city life changed in recent years?",
      "Would you prefer to live in a city or a rural area in the future? Why?"
    ]
  },
  {
    id: "study-habits",
    title: "Study Habits",
    scenario: "You are participating in a study about student learning habits. A researcher will ask you some questions.",
    questions: [
      "Where do you usually study, and why do you prefer that place?",
      "How do you prepare for important exams?",
      "Do you prefer studying alone or with others? Explain your preference.",
      "What study techniques have you found most effective?"
    ]
  },
  {
    id: "social-media",
    title: "Social Media",
    scenario: "You have joined a research project about social media use. You will answer questions from a researcher.",
    questions: [
      "Which social media platforms do you use regularly?",
      "How much time do you spend on social media each day?",
      "What are the main benefits of social media for you?",
      "Do you think social media has changed how people communicate? How?"
    ]
  },
  {
    id: "exercise-fitness",
    title: "Exercise and Fitness",
    scenario: "You are taking part in a health research study about exercise habits. A researcher will interview you.",
    questions: [
      "What types of physical activities do you enjoy?",
      "How often do you exercise in a typical week?",
      "What motivates you to stay active or makes it difficult?",
      "How important is physical fitness in your daily life?"
    ]
  },
  {
    id: "online-shopping",
    title: "Online Shopping",
    scenario: "You have agreed to participate in a consumer research study about shopping habits. You will be interviewed online.",
    questions: [
      "How often do you shop online compared to in physical stores?",
      "What products do you usually buy online?",
      "What factors influence your decision to buy something online?",
      "Do you think online shopping will completely replace traditional stores?"
    ]
  },
  {
    id: "entertainment-choices",
    title: "Entertainment Choices",
    scenario: "You are participating in a study about entertainment preferences. A researcher will ask you some questions.",
    questions: [
      "What do you usually do for entertainment in your free time?",
      "Do you prefer watching movies at home or in theaters? Why?",
      "How has streaming changed the way you consume entertainment?",
      "What type of content do you think will be popular in the future?"
    ]
  },
  {
    id: "food-dining",
    title: "Food and Dining",
    scenario: "You have joined a research study about food preferences and dining habits. You will have a short interview.",
    questions: [
      "Do you prefer cooking at home or eating out? Why?",
      "What type of cuisine do you enjoy the most?",
      "How has food delivery changed your eating habits?",
      "Do you think people should pay more attention to what they eat? Why?"
    ]
  },
  {
    id: "travel-experiences",
    title: "Travel Experiences",
    scenario: "You are participating in a tourism research study. A researcher will ask you about your travel experiences.",
    questions: [
      "How often do you travel, and what type of trips do you prefer?",
      "What is the most memorable place you have visited?",
      "What factors do you consider when planning a trip?",
      "How do you think travel will change in the coming years?"
    ]
  },
  {
    id: "environmental-habits",
    title: "Environmental Habits",
    scenario: "You have agreed to participate in an environmental research study. You will answer questions about your habits.",
    questions: [
      "What do you do in your daily life to help the environment?",
      "How concerned are you about environmental issues?",
      "What environmental changes have you noticed in your area?",
      "What should individuals do to reduce their environmental impact?"
    ]
  },
  {
    id: "reading-habits",
    title: "Reading Habits",
    scenario: "You are participating in a literacy research study. A researcher will ask you about your reading habits.",
    questions: [
      "How much time do you spend reading each week?",
      "Do you prefer physical books or e-books? Why?",
      "What types of books or articles do you enjoy reading?",
      "How has technology changed the way people read?"
    ]
  },
  {
    id: "career-goals",
    title: "Career Goals",
    scenario: "You have joined a career development research study. You will be interviewed about your professional goals.",
    questions: [
      "What career path are you interested in pursuing?",
      "What skills do you think are most important for your chosen field?",
      "How do you plan to achieve your career goals?",
      "What role does education play in career success?"
    ]
  },
  {
    id: "technology-daily-life",
    title: "Technology in Daily Life",
    scenario: "You are participating in a study about how technology affects daily life. A researcher will ask you questions.",
    questions: [
      "What technologies do you use most often in your daily life?",
      "How has technology made your life easier or more difficult?",
      "What new technology are you most excited about?",
      "Do you think people rely too much on technology today?"
    ]
  },
  {
    id: "time-management",
    title: "Time Management",
    scenario: "You have agreed to participate in a productivity research study. You will answer questions about managing your time.",
    questions: [
      "How do you usually organize your daily schedule?",
      "What activities take up most of your time?",
      "What strategies help you manage your time effectively?",
      "How do you balance work or school with personal life?"
    ]
  }
];
