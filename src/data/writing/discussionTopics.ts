export interface DiscussionTopic {
  id: string;
  title: string;
  courseContext: string;
  professorQuestion: string;
  studentA: {
    name: string;
    response: string;
  };
  studentB: {
    name: string;
    response: string;
  };
  category: string;
  isPremium?: boolean;
}

export const discussionTopics: DiscussionTopic[] = [
  // FREE TOPICS
  {
    id: "disc-1",
    title: "Mandatory Volunteer Work",
    courseContext: "Your professor is teaching a class on social studies.",
    professorQuestion: "Volunteerism refers to the act of offering your time and service without financial compensation to benefit a community, organization, or cause. While many people volunteer mainly to help others, some institutions have mandatory volunteer programs. High schools are one example, where students may be required to complete a certain number of volunteer hours to graduate. What do you think? Should high school students be required to do volunteer work? Why or why not?",
    studentA: {
      name: "Alex",
      response: "Yes, I think high schools should require volunteer hours because it helps students build a sense of civic responsibility. Many teenagers don't naturally think about helping others, and this requirement can introduce them to the idea that their time and effort can make a real difference in the lives of others."
    },
    studentB: {
      name: "Maria",
      response: "I don't think volunteer hours should be required because many students already have limited free time. Some have part-time jobs or take care of younger siblings after school. Adding a mandatory volunteer requirement could create extra stress and make it harder for those students to balance their existing responsibilities."
    },
    category: "Social Studies"
  },
  {
    id: "disc-2",
    title: "Technology in Education",
    courseContext: "Your professor is teaching a class on educational technology.",
    professorQuestion: "Many schools are now providing students with tablets or laptops instead of traditional textbooks. Some educators believe this improves learning, while others are concerned about the drawbacks. Do you think schools should replace textbooks with electronic devices? Explain your position.",
    studentA: {
      name: "James",
      response: "I support using electronic devices in schools because they offer interactive features that textbooks cannot. Students can access videos, simulations, and up-to-date information. Digital devices also reduce the weight of backpacks and save paper, which is better for the environment."
    },
    studentB: {
      name: "Sophie",
      response: "I prefer traditional textbooks because electronic devices can be distracting. Students might be tempted to play games or browse social media during class. Also, staring at screens for long periods can cause eye strain and headaches, which could negatively affect learning."
    },
    category: "Education"
  },
  {
    id: "disc-3",
    title: "Urban Green Spaces",
    courseContext: "Your professor is teaching a class on urban planning.",
    professorQuestion: "For some time now, researchers have been interested in whether green spaces, such as parks, make people who live in cities happier. Some cities are converting vacant lots and unused buildings into parks and gardens. Do you think city governments should prioritize creating more green spaces in urban areas? Why or why not?",
    studentA: {
      name: "Chen",
      response: "Yes, cities should definitely create more green spaces. Parks give residents places to exercise, relax, and connect with nature. Studies show that access to green spaces reduces stress and improves mental health. In dense urban areas, these spaces are essential for quality of life."
    },
    studentB: {
      name: "Emma",
      response: "While parks are nice, I think city governments have more pressing priorities. Housing shortages, transportation, and education often need funding more urgently. Creating new parks is expensive, and that money could be used to address problems that affect more residents directly."
    },
    category: "Urban Planning"
  },
  {
    id: "disc-4",
    title: "Working While Studying",
    courseContext: "Your professor is teaching a class on economics and personal finance.",
    professorQuestion: "Many college students work part-time jobs while pursuing their degrees. Some believe this helps students gain valuable experience, while others argue it distracts from academics. Should college students work while studying? Share your perspective.",
    studentA: {
      name: "David",
      response: "I think working part-time is beneficial for college students. It teaches time management, provides income to cover expenses, and offers real-world experience that looks good on a resume. These practical skills are just as important as academic knowledge."
    },
    studentB: {
      name: "Aisha",
      response: "I believe students should focus on their studies without the added burden of work. College is a short period in life dedicated to learning, and working can take time away from studying, participating in extracurricular activities, and getting enough rest."
    },
    category: "Economics"
  },
  {
    id: "disc-5",
    title: "Social Media Influence",
    courseContext: "Your professor is teaching a class on media and communication.",
    professorQuestion: "Social media influencers now have millions of followers and can affect purchasing decisions, political opinions, and lifestyle choices. Some people trust influencers more than traditional media. Do you think social media influencers have too much power in today's society? Explain your reasoning.",
    studentA: {
      name: "Michael",
      response: "I don't think influencers have too much power. People choose to follow them and can unfollow anytime. Influencers often represent diverse voices that traditional media ignores. Their influence is a natural result of connecting with audiences authentically."
    },
    studentB: {
      name: "Lisa",
      response: "I think influencers do have too much power, especially over young people. Many followers don't realize that influencer content is often sponsored. This hidden advertising can manipulate people into making poor purchasing decisions or developing unrealistic expectations."
    },
    category: "Media Studies"
  },
  {
    id: "disc-6",
    title: "Standardized Testing",
    courseContext: "Your professor is teaching a class on educational assessment.",
    professorQuestion: "Standardized tests like the SAT and ACT have long been used for college admissions. Recently, many universities have made these tests optional. Do you think standardized tests should continue to be used for college admissions? Why or why not?",
    studentA: {
      name: "Rachel",
      response: "Standardized tests provide an objective measure to compare students from different schools and backgrounds. Without them, admissions would rely entirely on grades, which vary greatly between schools. Tests help ensure a fair comparison across all applicants."
    },
    studentB: {
      name: "Tom",
      response: "I think standardized tests should be optional. They favor students who can afford expensive test prep courses and don't measure important qualities like creativity or leadership. A student's full academic record and activities give a better picture of their abilities."
    },
    category: "Education"
  },

  // PREMIUM TOPICS
  {
    id: "disc-7",
    title: "Artificial Intelligence Ethics",
    courseContext: "Your professor is teaching a class on computer science ethics.",
    professorQuestion: "Artificial intelligence is increasingly being used to make important decisions, such as who gets a loan, who gets hired, or even who receives medical treatment. Some argue AI makes these decisions more objective, while others worry about bias in algorithms. Should AI be used for important life decisions? What do you think?",
    studentA: {
      name: "Kevin",
      response: "AI can actually reduce human bias in decision-making. Humans have unconscious biases that affect judgments, but well-designed AI systems can evaluate candidates based purely on relevant criteria. With proper oversight, AI can make fairer decisions than humans."
    },
    studentB: {
      name: "Natalie",
      response: "I'm concerned about using AI for important decisions. AI systems learn from historical data, which often contains existing biases. If the data reflects past discrimination, the AI will perpetuate it. Important decisions about people's lives should involve human judgment."
    },
    category: "Technology Ethics",
    isPremium: true
  },
  {
    id: "disc-8",
    title: "Remote Work Permanence",
    courseContext: "Your professor is teaching a class on organizational behavior.",
    professorQuestion: "Since the pandemic, many companies have allowed employees to work remotely on a permanent basis. Some see this as the future of work, while others believe in-person collaboration is essential. Should companies continue to offer remote work options permanently? Share your view.",
    studentA: {
      name: "Jessica",
      response: "Remote work should definitely continue. It eliminates commute time, reduces office costs, and gives employees flexibility to balance work and personal life. Many studies show remote workers are just as productive, if not more, than office workers."
    },
    studentB: {
      name: "Ryan",
      response: "While remote work has benefits, I think it weakens company culture and team bonds. Spontaneous conversations and in-person collaboration often lead to better ideas. New employees especially struggle to learn and integrate without being physically present."
    },
    category: "Business",
    isPremium: true
  },
  {
    id: "disc-9",
    title: "Space Exploration Funding",
    courseContext: "Your professor is teaching a class on public policy.",
    professorQuestion: "Governments spend billions of dollars on space exploration programs. Some believe this money could be better spent on solving problems on Earth, such as poverty or climate change. Should governments continue to invest heavily in space exploration? Why or why not?",
    studentA: {
      name: "Amanda",
      response: "Space exploration is essential for humanity's future. It drives technological innovation, inspires young scientists, and could help us find resources or even new places to live. Many everyday technologies we use came from space research."
    },
    studentB: {
      name: "Brian",
      response: "With so many urgent problems on Earth, spending billions on space seems irresponsible. We have people without clean water, healthcare, or basic education. These immediate needs should be addressed before we focus on exploring other planets."
    },
    category: "Public Policy",
    isPremium: true
  },
  {
    id: "disc-10",
    title: "Universal Basic Income",
    courseContext: "Your professor is teaching a class on economics.",
    professorQuestion: "Universal Basic Income (UBI) is a program where the government gives every adult citizen a regular payment, regardless of employment status. Some see it as a solution to poverty and job automation, while others worry about its costs. Do you think UBI is a good idea? Explain your position.",
    studentA: {
      name: "Diana",
      response: "UBI could be an effective way to eliminate poverty and give people security to pursue education or start businesses. As automation replaces more jobs, having a guaranteed income could help society transition smoothly."
    },
    studentB: {
      name: "George",
      response: "UBI sounds good in theory, but it's too expensive to implement. It could also reduce people's motivation to work. Instead of giving everyone money, we should focus on job training programs and creating new employment opportunities."
    },
    category: "Economics",
    isPremium: true
  },
  {
    id: "disc-11",
    title: "Genetic Modification",
    courseContext: "Your professor is teaching a class on bioethics.",
    professorQuestion: "New genetic technologies allow scientists to modify genes in human embryos, potentially eliminating hereditary diseases. However, this raises ethical concerns about 'designer babies' and unintended consequences. Should genetic modification of human embryos be allowed? What do you think?",
    studentA: {
      name: "Hannah",
      response: "Genetic modification could eliminate terrible diseases like Huntington's or cystic fibrosis. Parents who carry these genes deserve the option to have healthy children. With proper regulation, the technology can be used responsibly for medical purposes only."
    },
    studentB: {
      name: "Ian",
      response: "I think modifying human genes is too risky. We don't fully understand the long-term effects, and it could create new problems. There's also a risk that only wealthy families will access this technology, creating genetic inequality."
    },
    category: "Bioethics",
    isPremium: true
  },
  {
    id: "disc-12",
    title: "Privacy vs. Security",
    courseContext: "Your professor is teaching a class on civil liberties.",
    professorQuestion: "Governments increasingly use surveillance technology to monitor citizens, claiming it's necessary for national security. Critics argue this violates privacy rights. Should governments be allowed to conduct widespread surveillance for security purposes? Share your thoughts.",
    studentA: {
      name: "Julia",
      response: "Security surveillance is necessary in today's world. Terrorist attacks and crimes can be prevented when authorities have access to communication data. Law-abiding citizens have nothing to hide, and the safety benefits outweigh privacy concerns."
    },
    studentB: {
      name: "Mark",
      response: "Mass surveillance fundamentally violates our right to privacy. History shows that such powers can be abused by governments. Even if we trust current leaders, we shouldn't create systems that could be misused by future ones."
    },
    category: "Civil Liberties",
    isPremium: true
  },
  {
    id: "disc-13",
    title: "Gig Economy Workers",
    courseContext: "Your professor is teaching a class on labor economics.",
    professorQuestion: "Workers in the gig economy, such as rideshare drivers and food delivery couriers, are classified as independent contractors rather than employees. This means they don't receive benefits like health insurance or paid leave. Should gig workers be classified as employees with full benefits? What do you think?",
    studentA: {
      name: "Daniel",
      response: "Gig workers should be classified as employees. They often work full-time hours for these companies and deserve the same protections. Denying them benefits while companies profit is exploitative. It's time to update labor laws for the modern economy."
    },
    studentB: {
      name: "Olivia",
      response: "The flexibility of gig work is what attracts many workers. They can set their own hours and work for multiple companies. Classifying them as employees would reduce this flexibility and might lead companies to hire fewer workers overall."
    },
    category: "Labor Economics",
    isPremium: true
  },
  {
    id: "disc-14",
    title: "Academic Grade Inflation",
    courseContext: "Your professor is teaching a class on higher education.",
    professorQuestion: "Studies show that average grades at universities have been steadily increasing over the decades, a phenomenon called grade inflation. Some argue this devalues academic achievement, while others see it as reflecting improved learning. Is grade inflation a problem that needs to be addressed? Why or why not?",
    studentA: {
      name: "Sarah",
      response: "Grade inflation is definitely a problem. When everyone gets high grades, it becomes impossible to distinguish excellent students from average ones. This hurts students who truly excel and makes grades meaningless for employers."
    },
    studentB: {
      name: "Nathan",
      response: "Higher grades might reflect better teaching methods and resources, not inflation. Students today have more access to information and support than before. Instead of worrying about grades, we should focus on whether students are actually learning."
    },
    category: "Higher Education",
    isPremium: true
  }
];
