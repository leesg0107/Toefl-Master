export interface InterviewTopic {
  id: string;
  title: string;
  researchContext: string;
  introMessage: string;
  questions: {
    text: string;
    followUp?: string;
  }[];
  isPremium?: boolean;
}

export const interviewTopics: InterviewTopic[] = [
  // FREE TOPICS
  {
    id: "urban-life",
    title: "Urban Life Study",
    researchContext: "You have agreed to take part in a research study about urban life. You will have a short online interview with a researcher.",
    introMessage: "Thank you for speaking with me today. I'm conducting a study about people's experiences and perceptions of living in a city. I'd like to ask you some questions.",
    questions: [
      {
        text: "Now, do you currently live in a big city, a small town, or a village?",
      },
      {
        text: "Cities affect people in different ways. Some people find cities dynamic and exciting. Others find that cities are overwhelming and drain them of energy. What kind of reaction do you have to cities? Why do you think you react in this way?",
      },
      {
        text: "Some people believe that those who live in cities lead more interesting lives. They would argue, for example, that people who live in cities have more access to professional opportunities and interesting leisure activities. Do you agree that people who live in cities lead more interesting lives? Why or why not?",
      },
      {
        text: "For some time now, researchers have been interested in whether green spaces, such as parks, make people who live in cities happier. Do you think that city governments should create more parks in urban areas to promote a general sense of happiness and life satisfaction? Why or why not?",
      }
    ]
  },
  {
    id: "smartphone-usage",
    title: "Smartphone Usage Study",
    researchContext: "You have agreed to take part in a research study about smartphone usage. You will have a short online interview with a researcher.",
    introMessage: "Thank you for participating in this study. I'm researching how people use their smartphones in daily life. Let me ask you a few questions.",
    questions: [
      {
        text: "First, approximately how many hours per day do you spend using your smartphone?",
      },
      {
        text: "Many people check their phones first thing in the morning. Some feel this habit is harmful while others find it useful for staying informed. Do you check your phone immediately after waking up? Why or why not?",
      },
      {
        text: "Some researchers argue that smartphones have made people less social in face-to-face settings. Others say smartphones actually help people stay more connected. What is your opinion on how smartphones have affected social interactions?",
      },
      {
        text: "Imagine that you had to give up your smartphone for one month. How would this affect your daily life? What would be the biggest challenges for you?",
      }
    ]
  },
  {
    id: "study-habits",
    title: "Student Learning Study",
    researchContext: "You are participating in a study about student learning habits. A researcher will ask you some questions about how you study.",
    introMessage: "Thank you for joining this study on learning habits. I'll be asking about your study routines and preferences. Please answer based on your actual experiences.",
    questions: [
      {
        text: "Where do you typically prefer to study? Please describe your ideal study environment.",
      },
      {
        text: "Some students prefer to study in complete silence, while others like to have background music or noise. Which do you prefer, and why do you think this works best for you?",
      },
      {
        text: "There's an ongoing debate about whether studying with others is more effective than studying alone. In your experience, which approach leads to better learning outcomes? Please explain your answer.",
      },
      {
        text: "Many students today use technology like apps and videos to help them study. Do you think technology-based learning is as effective as traditional methods like reading textbooks and taking notes by hand? Why or why not?",
      }
    ]
  },
  {
    id: "exercise-fitness",
    title: "Health and Fitness Study",
    researchContext: "You are taking part in a health research study about exercise habits. A researcher will interview you about your physical activity.",
    introMessage: "Thank you for participating in our health study. I'll be asking about your exercise habits and attitudes toward physical fitness.",
    questions: [
      {
        text: "How would you describe your current level of physical activity? Are you very active, somewhat active, or not very active?",
      },
      {
        text: "Some people prefer exercising at home, while others prefer going to a gym or exercising outdoors. What is your preference, and what are the reasons for it?",
      },
      {
        text: "Researchers have found that many people struggle to maintain a regular exercise routine. What do you think is the biggest obstacle that prevents people from exercising regularly?",
      },
      {
        text: "Some employers are now offering fitness programs or gym memberships as employee benefits. Do you think companies should be responsible for encouraging their employees to be physically active? Why or why not?",
      }
    ]
  },
  {
    id: "online-shopping",
    title: "Consumer Behavior Study",
    researchContext: "You have agreed to participate in a consumer research study about shopping habits. You will be interviewed about your shopping preferences.",
    introMessage: "Thank you for joining this study on consumer behavior. I'm interested in understanding how people make purchasing decisions today.",
    questions: [
      {
        text: "When you need to buy something, do you typically shop online or in physical stores? Why?",
      },
      {
        text: "Online reviews and ratings have become very important in shopping decisions. How much do reviews influence your purchasing decisions? Can you think of a time when reviews changed your mind about a product?",
      },
      {
        text: "Some people worry that online shopping is causing local stores to close. Do you think communities should take steps to protect local businesses? What could be done?",
      },
      {
        text: "Looking at the future of shopping, some predict that physical stores will almost disappear while others believe they will always exist. What is your prediction for the future of retail shopping in twenty years?",
      }
    ]
  },
  {
    id: "entertainment-choices",
    title: "Entertainment Habits Study",
    researchContext: "You are participating in a study about entertainment preferences. A researcher will ask you about how you spend your leisure time.",
    introMessage: "Thank you for being part of this entertainment study. I'd like to learn about how you choose to spend your free time.",
    questions: [
      {
        text: "What forms of entertainment do you enjoy most in your free time?",
      },
      {
        text: "Streaming services have changed how people watch movies and TV shows. Some say this is a positive change, while others miss the old ways of entertainment. How has streaming affected your entertainment habits?",
      },
      {
        text: "There's a debate about whether video games are a legitimate form of entertainment comparable to movies or books. What is your opinion on video games as an entertainment medium?",
      },
      {
        text: "Some people argue that we spend too much time on passive entertainment like watching screens. Do you think people should try to be more active in their leisure time? Why or why not?",
      }
    ]
  },

  // PREMIUM TOPICS
  {
    id: "social-media",
    title: "Social Media Impact Study",
    researchContext: "You have joined a research project about social media use. A researcher will interview you about your social media habits.",
    introMessage: "Thank you for participating in our social media study. I'll be asking about your experiences with social media platforms and their impact on your life.",
    questions: [
      {
        text: "Which social media platforms do you use most frequently, and approximately how much time do you spend on them each day?",
      },
      {
        text: "Social media has changed how people get their news and information. Some say this is beneficial because it's faster and more accessible. Others worry about misinformation spreading. What is your opinion on social media as a news source?",
      },
      {
        text: "Research shows that social media use can affect mental health, especially among young people. What do you think social media companies should do to protect users' mental well-being?",
      },
      {
        text: "Some countries have considered banning certain social media platforms or limiting screen time by law. Do you think governments should regulate social media use? Why or why not?",
      }
    ],
    isPremium: true
  },
  {
    id: "environmental-habits",
    title: "Environmental Awareness Study",
    researchContext: "You have agreed to participate in an environmental research study. You will answer questions about your environmental habits and attitudes.",
    introMessage: "Thank you for joining this environmental study. I'm interested in understanding how people think about environmental issues in their daily lives.",
    questions: [
      {
        text: "How would you rate your level of concern about environmental issues? Would you say you are very concerned, somewhat concerned, or not very concerned?",
      },
      {
        text: "Many people want to help the environment but find it difficult to change their habits. What do you think is the biggest barrier that prevents people from living more environmentally friendly lives?",
      },
      {
        text: "Some argue that individual actions like recycling have minimal impact and that real change must come from governments and corporations. Do you agree that individual actions matter in addressing environmental problems?",
      },
      {
        text: "Climate change has become a major global issue. What role do you think education should play in addressing climate change? Should environmental education be mandatory in schools?",
      }
    ],
    isPremium: true
  },
  {
    id: "career-goals",
    title: "Career Development Study",
    researchContext: "You have joined a career development research study. You will be interviewed about your professional goals and career planning.",
    introMessage: "Thank you for participating in our career study. I'll be asking about your career aspirations and how you're preparing for your professional future.",
    questions: [
      {
        text: "What field or industry are you most interested in working in? What attracts you to this area?",
      },
      {
        text: "The job market has changed significantly in recent years. Some skills that were valuable before are now less important, while new skills have become essential. What skills do you think are most important for success in today's job market?",
      },
      {
        text: "There's a debate about whether formal education or practical experience is more valuable for career success. What do you think matters more when building a successful career?",
      },
      {
        text: "Many people today change careers multiple times during their working lives. Do you think staying in one career for a long time is still a good approach, or is career flexibility more important now?",
      }
    ],
    isPremium: true
  },
  {
    id: "technology-daily-life",
    title: "Technology and Daily Life Study",
    researchContext: "You are participating in a study about how technology affects daily life. A researcher will ask you about your relationship with technology.",
    introMessage: "Thank you for joining this technology study. I'm researching how technology has become integrated into people's everyday routines.",
    questions: [
      {
        text: "Which technologies do you consider most essential in your daily life? What would be hardest for you to live without?",
      },
      {
        text: "Some people believe that technology has made life more convenient but also more stressful. Do you feel that technology has improved your quality of life overall, or has it created new problems?",
      },
      {
        text: "Privacy concerns have grown as technology collects more personal data. How concerned are you about digital privacy, and have you taken any steps to protect your personal information online?",
      },
      {
        text: "Looking at emerging technologies like artificial intelligence, some people are excited about the possibilities while others are worried about potential negative effects. What is your attitude toward AI and how it might change society?",
      }
    ],
    isPremium: true
  },
  {
    id: "food-dining",
    title: "Food Culture Study",
    researchContext: "You have joined a research study about food preferences and dining habits. You will have a short interview about food in your life.",
    introMessage: "Thank you for participating in this food culture study. I'm interested in understanding how people think about food and eating.",
    questions: [
      {
        text: "How often do you cook at home versus eating out or ordering food delivery? What influences this choice for you?",
      },
      {
        text: "Food trends come and go, such as organic foods, plant-based diets, and local sourcing. Which food trends do you think are genuinely beneficial, and which might be just marketing?",
      },
      {
        text: "Some people argue that healthy food is too expensive for many families. What do you think should be done to make nutritious food more accessible to everyone?",
      },
      {
        text: "Food delivery apps have changed how people eat. Some say this convenience comes at a cost to health and family dining culture. What is your opinion on how food delivery has changed eating habits?",
      }
    ],
    isPremium: true
  },
  {
    id: "travel-experiences",
    title: "Travel and Tourism Study",
    researchContext: "You are participating in a tourism research study. A researcher will ask you about your travel experiences and preferences.",
    introMessage: "Thank you for joining our travel study. I'm interested in understanding how people approach travel and what they value in travel experiences.",
    questions: [
      {
        text: "How often do you travel, and what types of destinations do you prefer? Do you like cities, nature, historical sites, or something else?",
      },
      {
        text: "Travel can be educational and eye-opening, but tourism also has negative effects on local communities and environments. How do you try to be a responsible traveler?",
      },
      {
        text: "With virtual reality and online experiences, some argue that people can experience other places without actually traveling. Do you think virtual travel could ever replace physical travel? Why or why not?",
      },
      {
        text: "The pandemic changed travel dramatically. Do you think people's attitudes toward travel have permanently changed? How might tourism be different in the future?",
      }
    ],
    isPremium: true
  },
  {
    id: "reading-habits",
    title: "Reading and Literacy Study",
    researchContext: "You are participating in a literacy research study. A researcher will ask you about your reading habits and preferences.",
    introMessage: "Thank you for being part of this reading study. I'd like to understand how people approach reading in the digital age.",
    questions: [
      {
        text: "How much time do you spend reading in a typical week? What types of content do you usually read?",
      },
      {
        text: "The debate between physical books and e-books continues. Which format do you prefer, and what are the advantages you see in your preferred format?",
      },
      {
        text: "Many people say they don't have time to read anymore. Do you think reading is becoming less important in today's society, or is it still as valuable as before?",
      },
      {
        text: "Some educators worry that social media and short-form content have reduced people's ability to read long texts. Do you think attention spans are getting shorter? Has this affected your own reading habits?",
      }
    ],
    isPremium: true
  },
  {
    id: "time-management",
    title: "Productivity Study",
    researchContext: "You have agreed to participate in a productivity research study. You will answer questions about managing your time and staying productive.",
    introMessage: "Thank you for joining this productivity study. I'm researching how people manage their time and balance different responsibilities.",
    questions: [
      {
        text: "How would you describe your approach to managing your time? Do you use any specific tools or methods to stay organized?",
      },
      {
        text: "Distractions are a major challenge for productivity. What do you find most distracting when you're trying to focus, and how do you deal with these distractions?",
      },
      {
        text: "Some people believe in strict schedules and routines, while others prefer flexibility. Which approach works better for you, and why?",
      },
      {
        text: "Work-life balance has become a major topic of discussion. Do you find it difficult to separate work or study time from personal time? What strategies help you maintain balance?",
      }
    ],
    isPremium: true
  }
];
