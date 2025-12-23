export interface EmailPrompt {
  id: string;
  title: string;
  instructions: string;
  situation: string;
  recipientEmail: string;
  suggestedSubject: string;
  requiredPoints: string[];
  sampleResponse?: string;
  isPremium?: boolean;
}

export const emailPrompts: EmailPrompt[] = [
  // FREE PROMPTS
  {
    id: "email-1",
    title: "Poetry Magazine Submission Issue",
    instructions: "You will read some information and use the information to write an email. You will have 7 minutes to write the email.",
    situation: "A new poetry magazine has asked its readers for submissions, and you decided to submit two of your poems. However, you had a problem using the online submission form, and you are not certain that your submissions were received.",
    recipientEmail: "editor@sunshinepoetrymagazine.com",
    suggestedSubject: "Problem using submission form",
    requiredPoints: [
      "Tell the editor what you like about the new magazine",
      "Describe the problem you experienced",
      "Ask about the status of your submissions"
    ],
    sampleResponse: `Dear Editor,

I am writing to inquire about two poem submissions I attempted to make through your website last week. First, I want to say how much I enjoy Sunshine Poetry Magazine. The diverse range of voices and the beautiful layout make it stand out from other literary publications.

Unfortunately, when I tried to submit my poems through your online form, I encountered a technical issue. After clicking the submit button, the page froze and displayed an error message. I tried submitting twice, but I am unsure whether my poems were actually received.

Could you please check whether my submissions went through? My name is [Your Name] and the poems were titled "Morning Light" and "City Dreams." I would greatly appreciate any assistance you can provide.

Thank you for your time.

Sincerely,
[Your Name]`
  },
  {
    id: "email-2",
    title: "Campus Bookstore Complaint",
    instructions: "You will read some information and use the information to write an email. You will have 7 minutes to write the email.",
    situation: "You recently purchased a textbook from the campus bookstore, but when you got home, you discovered that several pages were missing. You need the book for your class that starts next week.",
    recipientEmail: "customerservice@campusbookstore.edu",
    suggestedSubject: "Defective textbook purchase",
    requiredPoints: [
      "Describe the problem with your purchase",
      "Explain why you need the book urgently",
      "Request a solution to the problem"
    ]
  },
  {
    id: "email-3",
    title: "Research Study Participation",
    instructions: "You will read some information and use the information to write an email. You will have 7 minutes to write the email.",
    situation: "You saw a flyer on campus about a psychology research study that offers payment to participants. You are interested in participating but have some questions about the time commitment and what the study involves.",
    recipientEmail: "researchlab@university.edu",
    suggestedSubject: "Questions about research study participation",
    requiredPoints: [
      "Express your interest in participating",
      "Ask specific questions about the study requirements",
      "Inquire about scheduling and compensation"
    ]
  },
  {
    id: "email-4",
    title: "Apartment Lease Question",
    instructions: "You will read some information and use the information to write an email. You will have 7 minutes to write the email.",
    situation: "Your apartment lease ends next month, and you want to renew it. However, you heard that the rent might increase significantly. You want to discuss your options with the property manager.",
    recipientEmail: "manager@sunriseapartments.com",
    suggestedSubject: "Lease renewal inquiry",
    requiredPoints: [
      "State your intention to renew the lease",
      "Ask about any changes to the rent",
      "Inquire about the renewal process and timeline"
    ]
  },
  {
    id: "email-5",
    title: "Conference Travel Grant",
    instructions: "You will read some information and use the information to write an email. You will have 7 minutes to write the email.",
    situation: "Your department offers travel grants for students presenting at academic conferences. You have been accepted to present your research at an international conference and want to apply for funding.",
    recipientEmail: "grants@department.edu",
    suggestedSubject: "Travel grant application for conference presentation",
    requiredPoints: [
      "Provide information about the conference and your presentation",
      "Explain why attending this conference is important for your research",
      "Ask about the application process and requirements"
    ]
  },
  {
    id: "email-6",
    title: "Gym Membership Cancellation",
    instructions: "You will read some information and use the information to write an email. You will have 7 minutes to write the email.",
    situation: "You signed up for a gym membership three months ago, but you have been charged incorrectly for the past two months. You have tried calling but couldn't reach anyone. You want to resolve the billing issue.",
    recipientEmail: "billing@cityfitness.com",
    suggestedSubject: "Billing error on my membership account",
    requiredPoints: [
      "Describe the billing errors you have noticed",
      "Explain what attempts you made to contact them",
      "Request a resolution and refund if applicable"
    ]
  },
  {
    id: "email-7",
    title: "Volunteer Opportunity Inquiry",
    instructions: "You will read some information and use the information to write an email. You will have 7 minutes to write the email.",
    situation: "You want to volunteer at a local animal shelter during your summer break. You saw their website but couldn't find specific information about volunteer requirements for college students.",
    recipientEmail: "volunteer@happypawsshelter.org",
    suggestedSubject: "Summer volunteer opportunity inquiry",
    requiredPoints: [
      "Express your interest in volunteering",
      "Mention your availability during summer",
      "Ask about requirements and the application process"
    ]
  },
  {
    id: "email-8",
    title: "Online Course Technical Issue",
    instructions: "You will read some information and use the information to write an email. You will have 7 minutes to write the email.",
    situation: "You are taking an online course, but the video lectures are not loading properly on your computer. You have tried different browsers and checked your internet connection, but the problem persists.",
    recipientEmail: "support@onlinelearning.edu",
    suggestedSubject: "Video playback issues with course content",
    requiredPoints: [
      "Describe the technical problem in detail",
      "Explain what troubleshooting steps you have already taken",
      "Request technical assistance or an alternative solution"
    ]
  },

  // PREMIUM PROMPTS
  {
    id: "email-9",
    title: "Job Interview Follow-up",
    instructions: "You will read some information and use the information to write an email. You will have 7 minutes to write the email.",
    situation: "You had a job interview last week for a marketing position at a company you really want to work for. The interviewer said they would contact you within a week, but you haven't heard back yet.",
    recipientEmail: "hr@innovativemarketing.com",
    suggestedSubject: "Follow-up on Marketing Associate interview",
    requiredPoints: [
      "Thank them for the interview opportunity",
      "Reiterate your interest in the position",
      "Politely ask about the status of your application"
    ],
    isPremium: true
  },
  {
    id: "email-10",
    title: "Graduate School Recommendation",
    instructions: "You will read some information and use the information to write an email. You will have 7 minutes to write the email.",
    situation: "You are applying to graduate school and need a letter of recommendation from a professor you took a class with two years ago. You received an A in the class and participated actively in discussions.",
    recipientEmail: "professor.johnson@university.edu",
    suggestedSubject: "Request for graduate school recommendation letter",
    requiredPoints: [
      "Remind the professor who you are and which class you took",
      "Explain why you are asking them specifically",
      "Provide details about the graduate program and deadline"
    ],
    isPremium: true
  },
  {
    id: "email-11",
    title: "Product Return Request",
    instructions: "You will read some information and use the information to write an email. You will have 7 minutes to write the email.",
    situation: "You ordered a laptop online, but when it arrived, you noticed it was a different model than what you ordered. The company's return policy states that returns must be initiated within 30 days.",
    recipientEmail: "returns@techstore.com",
    suggestedSubject: "Wrong product received - Order #12345",
    requiredPoints: [
      "Describe the discrepancy between your order and what you received",
      "Reference your order number and purchase date",
      "Request an exchange for the correct product"
    ],
    isPremium: true
  },
  {
    id: "email-12",
    title: "Internship Project Proposal",
    instructions: "You will read some information and use the information to write an email. You will have 7 minutes to write the email.",
    situation: "You are starting an internship next month and your supervisor asked you to propose a project you would like to work on. You have an idea related to improving the company's social media presence.",
    recipientEmail: "supervisor@creativemedia.com",
    suggestedSubject: "Internship project proposal",
    requiredPoints: [
      "Introduce your project idea clearly",
      "Explain how it would benefit the company",
      "Ask for feedback and approval to proceed"
    ],
    isPremium: true
  },
  {
    id: "email-13",
    title: "Study Abroad Housing",
    instructions: "You will read some information and use the information to write an email. You will have 7 minutes to write the email.",
    situation: "You have been accepted to a study abroad program in Spain for next semester. You need to arrange housing but are unsure whether to choose a homestay with a local family or a student dormitory.",
    recipientEmail: "housing@studyabroadspain.org",
    suggestedSubject: "Housing options inquiry for spring semester",
    requiredPoints: [
      "Introduce yourself and your program dates",
      "Ask about the differences between housing options",
      "Request recommendations based on your preferences"
    ],
    isPremium: true
  },
  {
    id: "email-14",
    title: "Medical Appointment Rescheduling",
    instructions: "You will read some information and use the information to write an email. You will have 7 minutes to write the email.",
    situation: "You have a medical appointment scheduled for next Tuesday, but you just found out you have a mandatory exam at that time. You need to reschedule the appointment as soon as possible.",
    recipientEmail: "appointments@universityhealthcenter.edu",
    suggestedSubject: "Request to reschedule appointment",
    requiredPoints: [
      "Mention your current appointment details",
      "Explain why you need to reschedule",
      "Suggest alternative times you are available"
    ],
    isPremium: true
  },
  {
    id: "email-15",
    title: "Academic Journal Submission",
    instructions: "You will read some information and use the information to write an email. You will have 7 minutes to write the email.",
    situation: "You want to submit your research paper to an academic journal for publication. You have some questions about the review process and formatting requirements before submitting.",
    recipientEmail: "submissions@academicjournal.org",
    suggestedSubject: "Pre-submission inquiry for research paper",
    requiredPoints: [
      "Briefly describe your research topic",
      "Ask specific questions about submission requirements",
      "Inquire about the review timeline and process"
    ],
    isPremium: true
  },
  {
    id: "email-16",
    title: "Campus Event Permission",
    instructions: "You will read some information and use the information to write an email. You will have 7 minutes to write the email.",
    situation: "Your student organization wants to host an outdoor concert on campus. You need to request permission from the campus events office and provide details about your event.",
    recipientEmail: "events@campuslife.edu",
    suggestedSubject: "Event permission request - Spring Concert",
    requiredPoints: [
      "Describe the event you want to host",
      "Provide specific date, time, and location preferences",
      "Ask about the approval process and any requirements"
    ],
    isPremium: true
  },
  {
    id: "email-17",
    title: "Professional Networking Request",
    instructions: "You will read some information and use the information to write an email. You will have 7 minutes to write the email.",
    situation: "You attended a career fair and spoke briefly with a professional who works in your desired field. They gave you their business card and said you could contact them if you had questions about the industry.",
    recipientEmail: "professional@company.com",
    suggestedSubject: "Following up from the career fair",
    requiredPoints: [
      "Remind them of where you met",
      "Express your interest in learning more about their field",
      "Request an informational interview or phone call"
    ],
    isPremium: true
  },
  {
    id: "email-18",
    title: "Course Prerequisite Waiver",
    instructions: "You will read some information and use the information to write an email. You will have 7 minutes to write the email.",
    situation: "You want to take an advanced computer science course, but you haven't completed the prerequisite. However, you have equivalent experience from work and self-study that you believe qualifies you.",
    recipientEmail: "instructor@cs.university.edu",
    suggestedSubject: "Request for prerequisite waiver - CS 401",
    requiredPoints: [
      "Explain which course you want to take",
      "Describe your relevant experience and qualifications",
      "Ask if a waiver is possible and what you need to provide"
    ],
    isPremium: true
  }
];
