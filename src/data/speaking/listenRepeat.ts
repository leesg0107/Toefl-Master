export interface ListenRepeatSession {
  id: string;
  title: string;
  location: string;
  description: string;
  sentences: string[];
}

export const listenRepeatSessions: ListenRepeatSession[] = [
  {
    id: "classroom-basics-1",
    title: "Classroom Layout",
    location: "Classroom",
    description: "Learn basic vocabulary about classroom objects and their locations.",
    sentences: [
      "The whiteboard is at the front of the room.",
      "The printer is next to the teacher's desk.",
      "Student desks are arranged in rows.",
      "The clock is above the door.",
      "The projector is on the ceiling.",
      "Windows are on the left side of the room.",
      "The trash bin is in the corner."
    ]
  },
  {
    id: "library-basics-1",
    title: "Library Tour",
    location: "University Library",
    description: "Learn about different areas and resources in the library.",
    sentences: [
      "The reference desk is near the entrance.",
      "Computers are on the first floor.",
      "Study rooms are on the second floor.",
      "The quiet zone is on the top floor.",
      "Printers are next to the copy machines.",
      "Books are organized by subject.",
      "The cafe is in the basement."
    ]
  },
  {
    id: "computer-lab-basics-1",
    title: "Computer Lab",
    location: "Computer Lab",
    description: "Learn about computer lab facilities and equipment.",
    sentences: [
      "Each desk has a computer and monitor.",
      "Headphones are in the drawer.",
      "The printer is at the back of the room.",
      "The scanner is next to the printer.",
      "Power outlets are under each desk.",
      "The projector screen is at the front.",
      "The help desk is by the entrance."
    ]
  },
  {
    id: "science-lab-basics-1",
    title: "Science Lab Orientation",
    location: "Science Laboratory",
    description: "Learn about laboratory equipment and safety stations.",
    sentences: [
      "Microscopes are stored in the cabinet.",
      "The safety shower is in the corner.",
      "Goggles are on the shelf by the door.",
      "The fume hood is along the back wall.",
      "Lab coats are hanging by the entrance.",
      "The eyewash station is near the sink.",
      "Chemical supplies are in the locked cabinet."
    ]
  },
  {
    id: "classroom-instructions-1",
    title: "Classroom Procedures",
    location: "Classroom",
    description: "Learn instructions about using classroom equipment.",
    sentences: [
      "Please turn off your phones before class begins.",
      "Use the projector remote to change slides.",
      "Write your name on the attendance sheet by the door.",
      "Return borrowed markers to the holder after use.",
      "The thermostat should stay at seventy degrees.",
      "Close the windows if it starts to rain.",
      "Stack your chairs at the end of class."
    ]
  },
  {
    id: "library-instructions-1",
    title: "Library Services",
    location: "University Library",
    description: "Learn about library rules and services.",
    sentences: [
      "Books can be borrowed for three weeks at a time.",
      "You need your student ID to use the printers.",
      "Study rooms must be reserved at least one day ahead.",
      "Please return books to the circulation desk.",
      "Overdue fines are fifty cents per day.",
      "Reference materials cannot leave the building.",
      "Scan your card to enter the quiet study area."
    ]
  },
  {
    id: "lab-safety-1",
    title: "Lab Safety Rules",
    location: "Science Laboratory",
    description: "Learn important safety procedures in the laboratory.",
    sentences: [
      "Always wear safety goggles when handling chemicals.",
      "Wash your hands before leaving the laboratory.",
      "Report any spills to the lab instructor immediately.",
      "Keep your work area clean and organized.",
      "Do not eat or drink in the laboratory.",
      "Tie back long hair when working with equipment.",
      "Know the location of all emergency exits."
    ]
  },
  {
    id: "lecture-hall-1",
    title: "Lecture Hall Guide",
    location: "Lecture Hall",
    description: "Learn about lecture hall facilities and equipment.",
    sentences: [
      "The microphone switch is on the podium.",
      "Adjust the screen using the control panel on the wall.",
      "Recording devices are not allowed during lectures.",
      "Emergency exits are located on both sides.",
      "Please sit in the front rows if you need assistance.",
      "The lecture will be uploaded to the course website.",
      "Questions should be saved for the end of class."
    ]
  },
  {
    id: "research-lab-1",
    title: "Research Lab Procedures",
    location: "Research Laboratory",
    description: "Learn complex procedures for conducting research.",
    sentences: [
      "All experiments must be documented in your lab notebook.",
      "The centrifuge requires a balanced load to operate safely.",
      "Store samples in the refrigerator labeled with your name.",
      "Equipment reservations are made through the online system.",
      "Dispose of chemical waste in the designated containers.",
      "The electron microscope is available by appointment only.",
      "Submit your research protocols to the supervisor for approval."
    ]
  },
  {
    id: "academic-advising-1",
    title: "Academic Advising Office",
    location: "Academic Advising Center",
    description: "Learn about academic advising services and procedures.",
    sentences: [
      "Schedule an appointment before course registration opens.",
      "Bring your unofficial transcript to discuss requirements.",
      "Major declaration forms are available at the front desk.",
      "Credit transfer requests require official documentation.",
      "The deadline for adding courses is on the website.",
      "Students on probation must meet with an advisor.",
      "Graduation applications should be filed in advance."
    ]
  },
  {
    id: "study-group-1",
    title: "Group Study Session",
    location: "Study Room",
    description: "Learn phrases for collaborative study and group projects.",
    sentences: [
      "Let's divide the research topics among ourselves.",
      "Can you share your notes from last week's lecture?",
      "The presentation slides are due by Friday afternoon.",
      "We should meet again before the exam to review.",
      "Each person should prepare three questions.",
      "This chapter will be heavily tested on the final.",
      "Make sure to cite all sources in the bibliography."
    ]
  },
  {
    id: "professor-office-1",
    title: "Office Hours",
    location: "Professor's Office",
    description: "Learn how to communicate during office hours.",
    sentences: [
      "Could you clarify the assignment requirements?",
      "Could you recommend additional readings on this topic?",
      "I'm having trouble understanding this concept.",
      "Would it be possible to get an extension?",
      "I have a question about my midterm grade.",
      "Are there research opportunities in your lab?",
      "I would appreciate feedback on my proposal."
    ]
  },
  {
    id: "writing-center-1",
    title: "Writing Center",
    location: "Writing Center",
    description: "Learn about writing center services and appointments.",
    sentences: [
      "Appointments can be made up to a week in advance.",
      "Bring a draft of your paper to the session.",
      "Tutors can help with organization and grammar.",
      "Sessions are limited to thirty minutes each.",
      "Walk-in appointments are available when tutors are free.",
      "The center specializes in academic writing.",
      "Tutors provide feedback but do not edit your work."
    ]
  },
  {
    id: "registrar-office-1",
    title: "Registrar's Office",
    location: "Registrar's Office",
    description: "Learn about registration and academic records.",
    sentences: [
      "Official transcripts can be ordered through the portal.",
      "Enrollment letters are processed within three days.",
      "Course conflicts must be resolved before the deadline.",
      "Students on hold cannot register for future semesters.",
      "Degree audits are updated at the start of each semester.",
      "Name change requests require legal documentation.",
      "Transfer credit evaluations take about two weeks."
    ]
  },
  {
    id: "tutoring-center-1",
    title: "Tutoring Center",
    location: "Academic Support Center",
    description: "Learn about tutoring services and resources.",
    sentences: [
      "Tutoring is free for all enrolled students.",
      "Math tutors are available every afternoon.",
      "Sign up for tutoring at the front desk.",
      "Group sessions are held in Room 204.",
      "Bring your textbook and notes to each session.",
      "The schedule is posted on the website.",
      "Drop-in tutoring is offered on Fridays."
    ]
  }
];

// Helper function to get all unique locations
export function getUniqueLocations() {
  return [...new Set(listenRepeatSessions.map(session => session.location))];
}
