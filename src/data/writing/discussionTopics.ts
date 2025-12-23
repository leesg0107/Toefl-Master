export interface DiscussionTopic {
  id: string;
  title: string;
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
}

export const discussionTopics: DiscussionTopic[] = [
  {
    id: "disc-1",
    title: "Company Social Responsibility",
    professorQuestion: "In your opinion, what is the best way for a company to have a positive impact on society? You may support one of your classmates' views or present a different perspective.",
    studentA: {
      name: "Alex",
      response: "I think companies should focus on creating good jobs with fair wages and benefits. When people have stable employment, they can support their families and contribute to the local economy. This creates a ripple effect that benefits the whole community."
    },
    studentB: {
      name: "Maria",
      response: "I believe companies should prioritize environmental sustainability. By reducing their carbon footprint and using renewable resources, businesses can help protect the planet for future generations. This is especially important given the climate crisis we're facing."
    },
    category: "Business & Society"
  },
  {
    id: "disc-2",
    title: "Taxing Unhealthy Products",
    professorQuestion: "Should the government tax unhealthy products, such as sugary drinks and junk food? Share your opinion and explain your reasoning.",
    studentA: {
      name: "James",
      response: "I support taxing unhealthy products because it can discourage consumption and fund public health programs. Countries like Mexico have seen a decrease in sugary drink consumption after implementing such taxes. It's a practical way to address the obesity epidemic."
    },
    studentB: {
      name: "Sophie",
      response: "I disagree with these taxes because they unfairly burden low-income families who often rely on cheaper processed foods. Instead of taxing, the government should invest in making healthy food more accessible and affordable for everyone."
    },
    category: "Health Policy"
  },
  {
    id: "disc-3",
    title: "Online vs. Traditional Education",
    professorQuestion: "Do you think online education can be as effective as traditional classroom learning? Explain your position.",
    studentA: {
      name: "Chen",
      response: "Online education offers flexibility that traditional classrooms cannot match. Students can learn at their own pace, review materials as needed, and access courses from anywhere. This is especially valuable for working adults and those in remote areas."
    },
    studentB: {
      name: "Emma",
      response: "While online learning has benefits, I think traditional classrooms are more effective for most students. The in-person interaction with professors and peers creates a more engaging learning environment and helps develop important social skills."
    },
    category: "Education"
  },
  {
    id: "disc-4",
    title: "Social Media Age Restrictions",
    professorQuestion: "Should there be stricter age restrictions on social media use? Share your thoughts on this issue.",
    studentA: {
      name: "David",
      response: "Yes, I think stricter age limits are necessary. Young children are particularly vulnerable to cyberbullying, inappropriate content, and the psychological effects of social comparison. Waiting until they're more mature could protect their mental health."
    },
    studentB: {
      name: "Aisha",
      response: "Instead of stricter age restrictions, I believe we should focus on education. Teaching children about digital literacy and online safety is more practical than trying to enforce age limits, which are easy to bypass anyway."
    },
    category: "Technology & Society"
  },
  {
    id: "disc-5",
    title: "Remote Work Future",
    professorQuestion: "Do you think remote work will become the standard in the future, or will people return to traditional offices? Explain your view.",
    studentA: {
      name: "Michael",
      response: "I believe remote work will become increasingly common. Companies have realized that many jobs can be done effectively from home, and employees value the flexibility. This trend will likely continue as technology improves."
    },
    studentB: {
      name: "Lisa",
      response: "While remote work has benefits, I think a hybrid model will become the standard. Some tasks require face-to-face collaboration, and many people miss the social aspects of the office. A balance between remote and in-person work seems most practical."
    },
    category: "Work & Career"
  },
  {
    id: "disc-6",
    title: "Mandatory Volunteering",
    professorQuestion: "Should schools require students to complete volunteer hours as a graduation requirement? What do you think?",
    studentA: {
      name: "Rachel",
      response: "I support mandatory volunteering because it exposes students to community needs and helps them develop empathy. Many students might not volunteer on their own, but once they start, they often find it rewarding and continue beyond the requirement."
    },
    studentB: {
      name: "Tom",
      response: "Making volunteering mandatory defeats its purpose. True community service should come from genuine desire to help, not obligation. Forced volunteering can create resentment and doesn't teach the real value of giving back."
    },
    category: "Education"
  },
  {
    id: "disc-7",
    title: "Artificial Intelligence in Healthcare",
    professorQuestion: "How do you feel about the increasing use of artificial intelligence in healthcare decisions? Is this a positive development?",
    studentA: {
      name: "Kevin",
      response: "AI in healthcare is a positive development because it can analyze vast amounts of data to identify patterns humans might miss. This can lead to earlier and more accurate diagnoses, ultimately saving lives."
    },
    studentB: {
      name: "Natalie",
      response: "While AI can assist doctors, I'm concerned about over-reliance on technology for healthcare decisions. Medicine involves human factors that AI cannot fully understand. The doctor-patient relationship and human judgment should remain central."
    },
    category: "Technology & Health"
  },
  {
    id: "disc-8",
    title: "Public Transportation vs. Cars",
    professorQuestion: "Should cities prioritize public transportation over personal vehicles? Share your perspective on urban transportation.",
    studentA: {
      name: "Jessica",
      response: "Cities should definitely prioritize public transportation. It reduces traffic congestion, lowers pollution, and is more accessible to people who cannot afford cars. Investing in efficient public transit benefits everyone."
    },
    studentB: {
      name: "Ryan",
      response: "While public transportation is important, personal vehicles offer flexibility that many people need. Families with children, people with disabilities, or those working irregular hours often rely on cars. Cities should improve both options."
    },
    category: "Urban Planning"
  },
  {
    id: "disc-9",
    title: "Gap Year Benefits",
    professorQuestion: "Do you think taking a gap year before university is beneficial? Why or why not?",
    studentA: {
      name: "Amanda",
      response: "A gap year can be very beneficial. It gives students time to mature, explore their interests, and gain real-world experience. Many students who take gap years return to university more focused and motivated."
    },
    studentB: {
      name: "Brian",
      response: "While gap years work for some, I think they can disrupt academic momentum. Students might find it harder to return to studying, and a year of delay can affect career timelines. Most students are better off starting university directly."
    },
    category: "Education"
  },
  {
    id: "disc-10",
    title: "Plastic Ban Effectiveness",
    professorQuestion: "Are bans on single-use plastics effective in reducing environmental damage? What's your opinion?",
    studentA: {
      name: "Diana",
      response: "Plastic bans are effective because they force both consumers and businesses to adopt alternatives. While inconvenient at first, these bans have significantly reduced plastic waste in cities that have implemented them."
    },
    studentB: {
      name: "George",
      response: "Bans alone aren't enough. We need better recycling infrastructure and education about proper disposal. Some plastic alternatives actually have worse environmental impacts when you consider their full lifecycle."
    },
    category: "Environment"
  },
  {
    id: "disc-11",
    title: "Celebrity Influence",
    professorQuestion: "Do celebrities have too much influence on young people's decisions and values? Share your thoughts.",
    studentA: {
      name: "Hannah",
      response: "Celebrities can have a positive influence by using their platforms to raise awareness about important issues. Many young people have become interested in social causes because of celebrity advocacy."
    },
    studentB: {
      name: "Ian",
      response: "I think celebrities have too much influence, especially regarding lifestyle and consumption choices. Young people often try to imitate unrealistic standards, which can affect their self-esteem and financial decisions."
    },
    category: "Media & Society"
  },
  {
    id: "disc-12",
    title: "Four-Day Work Week",
    professorQuestion: "Would a four-day work week be beneficial for employees and companies? What do you think?",
    studentA: {
      name: "Julia",
      response: "A four-day work week would greatly benefit employees by improving work-life balance and reducing burnout. Studies have shown that productivity often remains the same or even increases with fewer working days."
    },
    studentB: {
      name: "Mark",
      response: "While attractive in theory, a four-day week isn't practical for all industries. Healthcare, retail, and service sectors need continuous staffing. Implementing this could create scheduling challenges and increase operational costs."
    },
    category: "Work & Career"
  }
];
