export interface ListenRepeatSession {
  id: string;
  title: string;
  scenario: string;
  instruction: string;
  sentences: string[];
}

export const listenRepeatSessions: ListenRepeatSession[] = [
  {
    id: "art-gallery-1",
    title: "Art Gallery Welcome",
    scenario: "You are learning how to welcome visitors to a local art gallery.",
    instruction: "Listen to the speaker and repeat what he says. Repeat only once.",
    sentences: [
      "Welcome to the Modern Art Gallery.",
      "Our exhibition features works from local artists.",
      "Please feel free to take photographs without flash.",
      "The guided tour begins in fifteen minutes.",
      "Restrooms are located on the second floor.",
      "Our gift shop offers prints and postcards.",
      "Thank you for visiting us today."
    ]
  },
  {
    id: "zoo-guide-1",
    title: "Zoo Guide",
    scenario: "You are learning to welcome visitors to the zoo.",
    instruction: "Listen to your manager and repeat what she says. Repeat only once.",
    sentences: [
      "Good morning and welcome to City Zoo.",
      "The zoo opens at nine and closes at five.",
      "Please do not feed any of the animals.",
      "The elephant exhibit is currently under renovation.",
      "You can find the panda enclosure near the main entrance.",
      "Our cafe serves lunch from eleven to three.",
      "We hope you enjoy your visit today."
    ]
  },
  {
    id: "campus-gym-1",
    title: "Campus Gym Tour",
    scenario: "You are learning how to guide new students through the campus gym.",
    instruction: "Listen to the instructor and repeat what she says. Repeat only once.",
    sentences: [
      "Welcome to the university fitness center.",
      "All students must show their ID cards at the entrance.",
      "The weight room is on your left.",
      "Group fitness classes are held in the main studio.",
      "Lockers are available for daily use.",
      "Please wipe down equipment after use.",
      "The gym is open from six AM to eleven PM."
    ]
  },
  {
    id: "library-tour-1",
    title: "Library Orientation",
    scenario: "You are helping new students navigate the university library.",
    instruction: "Listen to the librarian and repeat what she says. Repeat only once.",
    sentences: [
      "The library has over two million books and journals.",
      "Study rooms can be reserved online in advance.",
      "Printing services are available on every floor.",
      "Books can be borrowed for up to three weeks.",
      "Late returns will result in a small fine.",
      "The quiet zone is on the fourth floor.",
      "Our reference desk is open until eight PM."
    ]
  },
  {
    id: "campus-cafe-1",
    title: "Campus Cafe Guide",
    scenario: "You are training to work at the campus cafe.",
    instruction: "Listen to your supervisor and repeat what he says. Repeat only once.",
    sentences: [
      "We serve coffee, tea, and fresh pastries.",
      "All our ingredients are locally sourced.",
      "Students get a ten percent discount with their ID.",
      "The lunch special changes every day.",
      "We accept cash, cards, and mobile payments.",
      "Please form a single line at the counter.",
      "Thank you for choosing the Campus Cafe."
    ]
  },
  {
    id: "dorm-tour-1",
    title: "Dormitory Tour",
    scenario: "You are showing new students around the dormitory building.",
    instruction: "Listen to the resident advisor and repeat what she says. Repeat only once.",
    sentences: [
      "Each room comes with a bed, desk, and closet.",
      "The laundry room is in the basement.",
      "Quiet hours begin at ten PM on weekdays.",
      "Guests must sign in at the front desk.",
      "The common room has a TV and game tables.",
      "Maintenance requests can be submitted online.",
      "Your mailbox is located in the lobby."
    ]
  },
  {
    id: "bookstore-1",
    title: "Campus Bookstore",
    scenario: "You are learning to assist customers at the university bookstore.",
    instruction: "Listen to the manager and repeat what she says. Repeat only once.",
    sentences: [
      "Textbooks are organized by department and course number.",
      "We offer both new and used options.",
      "You can order books online for pickup.",
      "Returns are accepted within two weeks with receipt.",
      "School supplies are in the back section.",
      "We price match with major online retailers.",
      "Let me know if you need help finding anything."
    ]
  },
  {
    id: "museum-1",
    title: "Science Museum Guide",
    scenario: "You are training as a guide at the science museum.",
    instruction: "Listen to the senior guide and repeat what he says. Repeat only once.",
    sentences: [
      "The dinosaur exhibit is our most popular attraction.",
      "Please keep your hands off the displays.",
      "Interactive exhibits are located on the third floor.",
      "The planetarium show starts every hour.",
      "Group tickets are available at a discount.",
      "Photography is allowed in most areas.",
      "Our next guided tour leaves in twenty minutes."
    ]
  },
  {
    id: "student-center-1",
    title: "Student Center Information",
    scenario: "You are working at the student center information desk.",
    instruction: "Listen to your colleague and repeat what she says. Repeat only once.",
    sentences: [
      "The student center is open seven days a week.",
      "Club meetings are posted on the bulletin board.",
      "You can find the career services office upstairs.",
      "Free printing is available with your student ID.",
      "The food court has eight different restaurants.",
      "Lost and found is located at the security desk.",
      "Event tickets are sold at the box office."
    ]
  },
  {
    id: "rec-center-1",
    title: "Recreation Center",
    scenario: "You are giving tours of the campus recreation center.",
    instruction: "Listen to the coordinator and repeat what he says. Repeat only once.",
    sentences: [
      "The pool is open for lap swimming in the morning.",
      "Basketball courts can be reserved by the hour.",
      "Equipment rental is free for all students.",
      "Personal trainers are available by appointment.",
      "The rock climbing wall requires a safety course.",
      "Intramural sports registration opens next week.",
      "Towel service is included with your membership."
    ]
  }
];
