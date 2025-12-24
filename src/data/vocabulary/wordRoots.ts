export interface WordRoot {
  id: string;
  root: string;
  meaning: string;
  origin: string;
  words: {
    word: string;
    prefix: string;
    prefixMeaning: string;
    definition: string;
    example: string;
  }[];
}

export const wordRoots: WordRoot[] = [
  {
    id: "pose",
    root: "-pose / -posit",
    meaning: "to put, to place (놓다, 두다)",
    origin: "Latin: ponere",
    words: [
      {
        word: "compose",
        prefix: "com-",
        prefixMeaning: "together (함께)",
        definition: "To put together; to create by combining parts",
        example: "She composed a beautiful symphony."
      },
      {
        word: "propose",
        prefix: "pro-",
        prefixMeaning: "forward (앞으로)",
        definition: "To put forward for consideration; to suggest",
        example: "I propose we start the meeting early."
      },
      {
        word: "suppose",
        prefix: "sup- (sub-)",
        prefixMeaning: "under (아래에)",
        definition: "To assume to be true; to place under consideration",
        example: "I suppose you're right about that."
      },
      {
        word: "impose",
        prefix: "im- (in-)",
        prefixMeaning: "upon, on (위에)",
        definition: "To force something on someone",
        example: "The government imposed new taxes."
      },
      {
        word: "expose",
        prefix: "ex-",
        prefixMeaning: "out (밖으로)",
        definition: "To put out for viewing; to reveal",
        example: "The journalist exposed the corruption."
      },
      {
        word: "oppose",
        prefix: "op- (ob-)",
        prefixMeaning: "against (반대로)",
        definition: "To place oneself against; to resist",
        example: "Many citizens oppose the new law."
      },
      {
        word: "dispose",
        prefix: "dis-",
        prefixMeaning: "apart (떨어져)",
        definition: "To put away; to get rid of",
        example: "Dispose of waste properly."
      },
      {
        word: "deposit",
        prefix: "de-",
        prefixMeaning: "down (아래로)",
        definition: "To put down; to place for safekeeping",
        example: "Deposit money in your bank account."
      }
    ]
  },
  {
    id: "duce",
    root: "-duce / -duct",
    meaning: "to lead, to bring (이끌다, 가져오다)",
    origin: "Latin: ducere",
    words: [
      {
        word: "produce",
        prefix: "pro-",
        prefixMeaning: "forward (앞으로)",
        definition: "To bring forward; to make or create",
        example: "The factory produces 1000 units daily."
      },
      {
        word: "reduce",
        prefix: "re-",
        prefixMeaning: "back (뒤로)",
        definition: "To bring back to a smaller state; to decrease",
        example: "We need to reduce our expenses."
      },
      {
        word: "induce",
        prefix: "in-",
        prefixMeaning: "into (안으로)",
        definition: "To lead into; to persuade or cause",
        example: "The medication may induce drowsiness."
      },
      {
        word: "deduce",
        prefix: "de-",
        prefixMeaning: "down, from (아래로, ~로부터)",
        definition: "To lead down from evidence; to conclude logically",
        example: "From the clues, we can deduce the answer."
      },
      {
        word: "introduce",
        prefix: "intro-",
        prefixMeaning: "inward (안쪽으로)",
        definition: "To lead into; to present for the first time",
        example: "Let me introduce you to my colleague."
      },
      {
        word: "conduct",
        prefix: "con-",
        prefixMeaning: "together (함께)",
        definition: "To lead together; to direct or manage",
        example: "She will conduct the orchestra tonight."
      },
      {
        word: "educate",
        prefix: "e- (ex-)",
        prefixMeaning: "out (밖으로)",
        definition: "To lead out; to develop knowledge",
        example: "Schools educate children for the future."
      }
    ]
  },
  {
    id: "ject",
    root: "-ject",
    meaning: "to throw (던지다)",
    origin: "Latin: jacere",
    words: [
      {
        word: "project",
        prefix: "pro-",
        prefixMeaning: "forward (앞으로)",
        definition: "To throw forward; to plan or estimate",
        example: "We project sales will increase by 20%."
      },
      {
        word: "reject",
        prefix: "re-",
        prefixMeaning: "back (뒤로)",
        definition: "To throw back; to refuse to accept",
        example: "The committee rejected the proposal."
      },
      {
        word: "inject",
        prefix: "in-",
        prefixMeaning: "into (안으로)",
        definition: "To throw into; to introduce forcefully",
        example: "The doctor injected the vaccine."
      },
      {
        word: "eject",
        prefix: "e- (ex-)",
        prefixMeaning: "out (밖으로)",
        definition: "To throw out; to force out",
        example: "The pilot had to eject from the plane."
      },
      {
        word: "subject",
        prefix: "sub-",
        prefixMeaning: "under (아래에)",
        definition: "To throw under; to bring under control",
        example: "Don't subject yourself to unnecessary stress."
      },
      {
        word: "object",
        prefix: "ob-",
        prefixMeaning: "against (반대로)",
        definition: "To throw against; to express opposition",
        example: "I object to this decision."
      }
    ]
  },
  {
    id: "spect",
    root: "-spect / -spic",
    meaning: "to look, to see (보다)",
    origin: "Latin: specere",
    words: [
      {
        word: "inspect",
        prefix: "in-",
        prefixMeaning: "into (안으로)",
        definition: "To look into; to examine carefully",
        example: "Officials will inspect the building."
      },
      {
        word: "expect",
        prefix: "ex-",
        prefixMeaning: "out (밖으로)",
        definition: "To look out for; to anticipate",
        example: "We expect results by Friday."
      },
      {
        word: "respect",
        prefix: "re-",
        prefixMeaning: "back, again (다시)",
        definition: "To look back at; to admire",
        example: "Students should respect their teachers."
      },
      {
        word: "suspect",
        prefix: "sus- (sub-)",
        prefixMeaning: "under, secretly (아래에서)",
        definition: "To look at secretly; to doubt",
        example: "Police suspect foul play."
      },
      {
        word: "prospect",
        prefix: "pro-",
        prefixMeaning: "forward (앞으로)",
        definition: "To look forward; a possibility",
        example: "The prospect of success excites us."
      },
      {
        word: "perspective",
        prefix: "per-",
        prefixMeaning: "through (통해서)",
        definition: "To look through; a point of view",
        example: "Consider it from a different perspective."
      },
      {
        word: "spectator",
        prefix: "(none)",
        prefixMeaning: "-",
        definition: "One who looks; an observer",
        example: "Thousands of spectators watched the game."
      }
    ]
  },
  {
    id: "tract",
    root: "-tract",
    meaning: "to pull, to draw (끌다, 당기다)",
    origin: "Latin: trahere",
    words: [
      {
        word: "attract",
        prefix: "at- (ad-)",
        prefixMeaning: "toward (향해)",
        definition: "To pull toward; to draw interest",
        example: "Bright colors attract attention."
      },
      {
        word: "extract",
        prefix: "ex-",
        prefixMeaning: "out (밖으로)",
        definition: "To pull out; to remove",
        example: "Extract the key information from the text."
      },
      {
        word: "distract",
        prefix: "dis-",
        prefixMeaning: "apart (떨어져)",
        definition: "To pull apart; to divert attention",
        example: "Don't let noise distract you."
      },
      {
        word: "subtract",
        prefix: "sub-",
        prefixMeaning: "under, away (아래로)",
        definition: "To pull away; to take away",
        example: "Subtract 5 from 10 to get 5."
      },
      {
        word: "contract",
        prefix: "con-",
        prefixMeaning: "together (함께)",
        definition: "To pull together; an agreement",
        example: "They signed a contract."
      },
      {
        word: "retract",
        prefix: "re-",
        prefixMeaning: "back (뒤로)",
        definition: "To pull back; to withdraw",
        example: "The newspaper had to retract the story."
      },
      {
        word: "abstract",
        prefix: "abs-",
        prefixMeaning: "away (멀리)",
        definition: "To pull away from concrete; theoretical",
        example: "Abstract art uses shapes and colors."
      }
    ]
  },
  {
    id: "mit",
    root: "-mit / -miss",
    meaning: "to send (보내다)",
    origin: "Latin: mittere",
    words: [
      {
        word: "submit",
        prefix: "sub-",
        prefixMeaning: "under (아래에)",
        definition: "To send under; to yield or present",
        example: "Submit your assignment by Friday."
      },
      {
        word: "transmit",
        prefix: "trans-",
        prefixMeaning: "across (가로질러)",
        definition: "To send across; to pass on",
        example: "Radio waves transmit information."
      },
      {
        word: "admit",
        prefix: "ad-",
        prefixMeaning: "to, toward (향해)",
        definition: "To send to; to allow entry or acknowledge",
        example: "I admit I made a mistake."
      },
      {
        word: "emit",
        prefix: "e- (ex-)",
        prefixMeaning: "out (밖으로)",
        definition: "To send out; to discharge",
        example: "Factories emit pollutants."
      },
      {
        word: "permit",
        prefix: "per-",
        prefixMeaning: "through (통해서)",
        definition: "To send through; to allow",
        example: "The rules permit flexible hours."
      },
      {
        word: "omit",
        prefix: "o- (ob-)",
        prefixMeaning: "against, away (떨어져)",
        definition: "To send away; to leave out",
        example: "Don't omit any important details."
      },
      {
        word: "dismiss",
        prefix: "dis-",
        prefixMeaning: "apart (떨어져)",
        definition: "To send apart; to let go",
        example: "The judge dismissed the case."
      }
    ]
  },
  {
    id: "scrib",
    root: "-scrib / -script",
    meaning: "to write (쓰다)",
    origin: "Latin: scribere",
    words: [
      {
        word: "describe",
        prefix: "de-",
        prefixMeaning: "down (아래로)",
        definition: "To write down; to give an account of",
        example: "Describe your experience in detail."
      },
      {
        word: "prescribe",
        prefix: "pre-",
        prefixMeaning: "before (앞에)",
        definition: "To write before; to order or recommend",
        example: "Doctors prescribe medication."
      },
      {
        word: "subscribe",
        prefix: "sub-",
        prefixMeaning: "under (아래에)",
        definition: "To write under; to sign up for",
        example: "Subscribe to our newsletter."
      },
      {
        word: "inscribe",
        prefix: "in-",
        prefixMeaning: "into, on (안에)",
        definition: "To write on; to engrave",
        example: "Inscribe your name on the trophy."
      },
      {
        word: "transcribe",
        prefix: "trans-",
        prefixMeaning: "across (가로질러)",
        definition: "To write across; to copy in writing",
        example: "Transcribe the audio recording."
      },
      {
        word: "manuscript",
        prefix: "manu-",
        prefixMeaning: "hand (손으로)",
        definition: "Written by hand; an original document",
        example: "The ancient manuscript was preserved."
      }
    ]
  },
  {
    id: "fer",
    root: "-fer",
    meaning: "to carry, to bring (나르다, 가져오다)",
    origin: "Latin: ferre",
    words: [
      {
        word: "transfer",
        prefix: "trans-",
        prefixMeaning: "across (가로질러)",
        definition: "To carry across; to move from one place to another",
        example: "Transfer the files to your computer."
      },
      {
        word: "refer",
        prefix: "re-",
        prefixMeaning: "back (뒤로)",
        definition: "To carry back; to direct attention to",
        example: "Please refer to page 42."
      },
      {
        word: "prefer",
        prefix: "pre-",
        prefixMeaning: "before (앞에)",
        definition: "To carry before; to like better",
        example: "I prefer coffee over tea."
      },
      {
        word: "infer",
        prefix: "in-",
        prefixMeaning: "into (안으로)",
        definition: "To carry into the mind; to conclude",
        example: "We can infer meaning from context."
      },
      {
        word: "differ",
        prefix: "dif- (dis-)",
        prefixMeaning: "apart (떨어져)",
        definition: "To carry apart; to be unlike",
        example: "Our opinions differ significantly."
      },
      {
        word: "confer",
        prefix: "con-",
        prefixMeaning: "together (함께)",
        definition: "To bring together; to discuss or grant",
        example: "Let me confer with my colleagues."
      },
      {
        word: "offer",
        prefix: "of- (ob-)",
        prefixMeaning: "toward (향해)",
        definition: "To bring toward; to present",
        example: "I offer my sincere apologies."
      }
    ]
  },
  {
    id: "vert",
    root: "-vert / -vers",
    meaning: "to turn (돌다, 돌리다)",
    origin: "Latin: vertere",
    words: [
      {
        word: "convert",
        prefix: "con-",
        prefixMeaning: "together (함께)",
        definition: "To turn together; to change form",
        example: "Convert the file to PDF format."
      },
      {
        word: "revert",
        prefix: "re-",
        prefixMeaning: "back (뒤로)",
        definition: "To turn back; to return to a previous state",
        example: "The settings will revert to default."
      },
      {
        word: "invert",
        prefix: "in-",
        prefixMeaning: "in, into (안으로)",
        definition: "To turn in; to flip upside down",
        example: "Invert the fraction to divide."
      },
      {
        word: "divert",
        prefix: "di- (dis-)",
        prefixMeaning: "apart (떨어져)",
        definition: "To turn apart; to redirect",
        example: "Divert traffic around the accident."
      },
      {
        word: "avert",
        prefix: "a- (ab-)",
        prefixMeaning: "away (멀리)",
        definition: "To turn away; to prevent",
        example: "Quick action helped avert disaster."
      },
      {
        word: "reverse",
        prefix: "re-",
        prefixMeaning: "back (뒤로)",
        definition: "To turn back; opposite direction",
        example: "Reverse the car slowly."
      },
      {
        word: "diverse",
        prefix: "di-",
        prefixMeaning: "apart (떨어져)",
        definition: "Turned apart; varied, different",
        example: "We have a diverse team."
      }
    ]
  },
  {
    id: "cede",
    root: "-cede / -ceed / -cess",
    meaning: "to go, to yield (가다, 양보하다)",
    origin: "Latin: cedere",
    words: [
      {
        word: "proceed",
        prefix: "pro-",
        prefixMeaning: "forward (앞으로)",
        definition: "To go forward; to continue",
        example: "Please proceed to the next step."
      },
      {
        word: "exceed",
        prefix: "ex-",
        prefixMeaning: "out, beyond (밖으로)",
        definition: "To go beyond; to surpass",
        example: "Sales exceeded expectations."
      },
      {
        word: "succeed",
        prefix: "suc- (sub-)",
        prefixMeaning: "after, under (뒤에)",
        definition: "To go after; to achieve or follow",
        example: "Hard work helps you succeed."
      },
      {
        word: "precede",
        prefix: "pre-",
        prefixMeaning: "before (앞에)",
        definition: "To go before; to come earlier",
        example: "Chapter 1 precedes Chapter 2."
      },
      {
        word: "recede",
        prefix: "re-",
        prefixMeaning: "back (뒤로)",
        definition: "To go back; to withdraw",
        example: "The floodwaters began to recede."
      },
      {
        word: "concede",
        prefix: "con-",
        prefixMeaning: "with (함께)",
        definition: "To yield with; to admit or surrender",
        example: "I concede that you have a point."
      },
      {
        word: "access",
        prefix: "ac- (ad-)",
        prefixMeaning: "toward (향해)",
        definition: "A way to go toward; entry",
        example: "Students have access to the library."
      }
    ]
  },
  {
    id: "port",
    root: "-port",
    meaning: "to carry (운반하다)",
    origin: "Latin: portare",
    words: [
      {
        word: "export",
        prefix: "ex-",
        prefixMeaning: "out (밖으로)",
        definition: "To carry out; to send goods abroad",
        example: "Korea exports electronics worldwide."
      },
      {
        word: "import",
        prefix: "im- (in-)",
        prefixMeaning: "into (안으로)",
        definition: "To carry in; to bring goods in",
        example: "We import coffee from Brazil."
      },
      {
        word: "transport",
        prefix: "trans-",
        prefixMeaning: "across (가로질러)",
        definition: "To carry across; to move",
        example: "Trucks transport goods across the country."
      },
      {
        word: "report",
        prefix: "re-",
        prefixMeaning: "back (뒤로)",
        definition: "To carry back; to give an account",
        example: "Report your findings to the team."
      },
      {
        word: "support",
        prefix: "sup- (sub-)",
        prefixMeaning: "under (아래에서)",
        definition: "To carry from below; to hold up",
        example: "I support your decision."
      },
      {
        word: "deport",
        prefix: "de-",
        prefixMeaning: "away (멀리)",
        definition: "To carry away; to expel from a country",
        example: "Illegal immigrants may be deported."
      }
    ]
  },
  {
    id: "struct",
    root: "-struct",
    meaning: "to build (짓다, 세우다)",
    origin: "Latin: struere",
    words: [
      {
        word: "construct",
        prefix: "con-",
        prefixMeaning: "together (함께)",
        definition: "To build together; to create",
        example: "They will construct a new bridge."
      },
      {
        word: "destruct",
        prefix: "de-",
        prefixMeaning: "down (아래로)",
        definition: "To build down; to destroy",
        example: "The building will self-destruct."
      },
      {
        word: "instruct",
        prefix: "in-",
        prefixMeaning: "into (안으로)",
        definition: "To build into the mind; to teach",
        example: "The manual instructs users clearly."
      },
      {
        word: "obstruct",
        prefix: "ob-",
        prefixMeaning: "against (반대로)",
        definition: "To build against; to block",
        example: "Don't obstruct the emergency exit."
      },
      {
        word: "structure",
        prefix: "(none)",
        prefixMeaning: "-",
        definition: "Something built; organization",
        example: "The essay has a clear structure."
      },
      {
        word: "infrastructure",
        prefix: "infra-",
        prefixMeaning: "below (아래에)",
        definition: "Built below; basic facilities",
        example: "The city invested in infrastructure."
      }
    ]
  }
];

export const commonPrefixes = [
  { prefix: "pre-", meaning: "before (앞에)", examples: "predict, prevent, prepare" },
  { prefix: "post-", meaning: "after (뒤에)", examples: "postpone, postwar, postgraduate" },
  { prefix: "re-", meaning: "again, back (다시, 뒤로)", examples: "return, review, repeat" },
  { prefix: "un-", meaning: "not (아닌)", examples: "unable, unclear, unhappy" },
  { prefix: "dis-", meaning: "not, apart (아닌, 떨어져)", examples: "disagree, disappear, disconnect" },
  { prefix: "in-/im-/il-/ir-", meaning: "not, into (아닌, 안으로)", examples: "impossible, illegal, irregular" },
  { prefix: "ex-", meaning: "out, former (밖으로, 전)", examples: "export, exclude, ex-president" },
  { prefix: "sub-", meaning: "under (아래에)", examples: "subway, submarine, subtitle" },
  { prefix: "super-", meaning: "above, beyond (위에)", examples: "supermarket, supernatural, supervise" },
  { prefix: "trans-", meaning: "across (가로질러)", examples: "transfer, transform, translate" },
  { prefix: "inter-", meaning: "between (사이에)", examples: "international, internet, interview" },
  { prefix: "mis-", meaning: "wrong (잘못된)", examples: "mistake, misunderstand, mislead" },
  { prefix: "over-", meaning: "too much (너무)", examples: "overwork, overcome, overlook" },
  { prefix: "under-", meaning: "too little (부족한)", examples: "underestimate, understand, underpaid" },
  { prefix: "co-/con-/com-", meaning: "with, together (함께)", examples: "cooperate, connect, combine" },
  { prefix: "anti-", meaning: "against (반대)", examples: "antibiotic, antisocial, antivirus" },
  { prefix: "auto-", meaning: "self (스스로)", examples: "automatic, automobile, autobiography" },
  { prefix: "bi-", meaning: "two (둘)", examples: "bicycle, bilingual, biannual" },
  { prefix: "mono-/uni-", meaning: "one (하나)", examples: "monopoly, uniform, universe" },
  { prefix: "multi-", meaning: "many (많은)", examples: "multiply, multimedia, multicultural" },
];
