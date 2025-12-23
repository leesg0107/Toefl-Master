export interface EmailPrompt {
  id: string;
  title: string;
  situation: string;
  recipient: string;
  requiredPoints: string[];
  sampleResponse?: string;
}

export const emailPrompts: EmailPrompt[] = [
  {
    id: "email-1",
    title: "Request for Deadline Extension",
    situation: "You need to ask your professor for an extension on your research paper because you have been sick.",
    recipient: "Professor Williams",
    requiredPoints: [
      "Explain why you need an extension",
      "Mention how much extra time you need",
      "Express your commitment to completing the assignment"
    ],
    sampleResponse: `Dear Professor Williams,

I am writing to request an extension for the research paper due this Friday. Unfortunately, I have been unwell for the past week with a severe flu, which has made it difficult for me to focus on my work.

I would greatly appreciate it if I could have an additional five days to complete the assignment. This extra time would allow me to recover fully and submit a paper that meets your expectations.

I understand the importance of deadlines and assure you that I am committed to completing the assignment as soon as possible. I have already completed the research and outline, and I am confident I can finish the paper by next Wednesday.

Thank you for considering my request. I look forward to your response.

Sincerely,
[Your Name]`
  },
  {
    id: "email-2",
    title: "Recommendation Letter Request",
    situation: "You want to ask your former professor to write a recommendation letter for your graduate school application.",
    recipient: "Professor Chen",
    requiredPoints: [
      "Remind the professor of who you are",
      "Explain what the recommendation is for",
      "Provide details about the deadline"
    ]
  },
  {
    id: "email-3",
    title: "Club Event Proposal",
    situation: "As president of the environmental club, you want to propose organizing a campus cleanup event to the student activities coordinator.",
    recipient: "Ms. Johnson, Student Activities Coordinator",
    requiredPoints: [
      "Describe the event you want to organize",
      "Explain the benefits for the campus community",
      "Request approval and any necessary resources"
    ]
  },
  {
    id: "email-4",
    title: "Internship Inquiry",
    situation: "You are interested in a summer internship at a company and want to inquire about available positions.",
    recipient: "Human Resources Department",
    requiredPoints: [
      "Express your interest in the company",
      "Mention your qualifications briefly",
      "Ask about available internship opportunities"
    ]
  },
  {
    id: "email-5",
    title: "Course Registration Issue",
    situation: "You are having trouble registering for a required course because it shows as full, and you need to graduate this semester.",
    recipient: "Academic Advisor",
    requiredPoints: [
      "Explain the registration problem you are facing",
      "Mention why this course is essential for you",
      "Ask for help resolving the issue"
    ]
  },
  {
    id: "email-6",
    title: "Library Book Extension",
    situation: "You need to extend the loan period for several library books that are due tomorrow because you haven't finished your research.",
    recipient: "University Library",
    requiredPoints: [
      "List the books you need to extend",
      "Explain why you need more time",
      "Ask about the extension process"
    ]
  },
  {
    id: "email-7",
    title: "Study Group Formation",
    situation: "You want to form a study group for an upcoming exam and are reaching out to classmates.",
    recipient: "Fellow classmates",
    requiredPoints: [
      "Propose forming a study group",
      "Suggest meeting times and location",
      "Ask for their interest and availability"
    ]
  },
  {
    id: "email-8",
    title: "Housing Maintenance Request",
    situation: "There is a problem with the heating system in your dormitory room and you need to request maintenance.",
    recipient: "Housing Services",
    requiredPoints: [
      "Describe the problem with your heating",
      "Mention your room number and availability",
      "Request a maintenance visit"
    ]
  },
  {
    id: "email-9",
    title: "Research Assistant Position",
    situation: "You want to apply for a research assistant position with a professor whose work interests you.",
    recipient: "Professor Martinez",
    requiredPoints: [
      "Express interest in the research assistant position",
      "Highlight relevant skills or coursework",
      "Request a meeting to discuss the opportunity"
    ]
  },
  {
    id: "email-10",
    title: "Conference Presentation Inquiry",
    situation: "You want to present your research at an academic conference and need information about the submission process.",
    recipient: "Conference Organizers",
    requiredPoints: [
      "Introduce yourself and your research topic",
      "Ask about presentation submission requirements",
      "Inquire about registration and deadlines"
    ]
  },
  {
    id: "email-11",
    title: "Scholarship Application Follow-up",
    situation: "You submitted a scholarship application two months ago and haven't heard back. You want to check on its status.",
    recipient: "Financial Aid Office",
    requiredPoints: [
      "Reference your application and when you submitted it",
      "Politely ask about the status",
      "Confirm your contact information"
    ]
  },
  {
    id: "email-12",
    title: "Guest Speaker Invitation",
    situation: "Your club wants to invite a professional to speak at an upcoming event about career opportunities in your field.",
    recipient: "Industry Professional",
    requiredPoints: [
      "Introduce your club and the event",
      "Explain why you're inviting them",
      "Provide event details and ask for their availability"
    ]
  },
  {
    id: "email-13",
    title: "Lab Equipment Reservation",
    situation: "You need to reserve laboratory equipment for your research project next week.",
    recipient: "Lab Coordinator",
    requiredPoints: [
      "Specify which equipment you need",
      "Mention the dates and times you need it",
      "Explain the purpose of your research"
    ]
  },
  {
    id: "email-14",
    title: "Peer Tutoring Request",
    situation: "You are struggling with a difficult course and want to request a peer tutor through the academic support center.",
    recipient: "Academic Support Center",
    requiredPoints: [
      "Identify the course you need help with",
      "Describe what topics you're struggling with",
      "Ask about available tutoring options"
    ]
  },
  {
    id: "email-15",
    title: "Exchange Program Interest",
    situation: "You are interested in participating in a study abroad exchange program and want more information.",
    recipient: "International Programs Office",
    requiredPoints: [
      "Express interest in the exchange program",
      "Ask about application requirements",
      "Inquire about available destinations and deadlines"
    ]
  }
];
