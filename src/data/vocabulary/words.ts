export interface VocabularyWord {
  id: string;
  word: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  category: string;
}

export const vocabularyWords: VocabularyWord[] = [
  // Academic
  { id: "v1", word: "hypothesis", partOfSpeech: "noun", definition: "A proposed explanation for a phenomenon", example: "The scientist tested her hypothesis through experiments.", category: "Academic" },
  { id: "v2", word: "analyze", partOfSpeech: "verb", definition: "To examine in detail", example: "We need to analyze the data before drawing conclusions.", category: "Academic" },
  { id: "v3", word: "methodology", partOfSpeech: "noun", definition: "A system of methods used in a study", example: "The research methodology was clearly explained.", category: "Academic" },
  { id: "v4", word: "empirical", partOfSpeech: "adjective", definition: "Based on observation or experience", example: "The theory is supported by empirical evidence.", category: "Academic" },
  { id: "v5", word: "thesis", partOfSpeech: "noun", definition: "A statement put forward as a premise", example: "Her thesis argues for renewable energy adoption.", category: "Academic" },
  { id: "v6", word: "paradigm", partOfSpeech: "noun", definition: "A typical example or pattern", example: "This discovery shifted the scientific paradigm.", category: "Academic" },
  { id: "v7", word: "synthesis", partOfSpeech: "noun", definition: "Combination of parts into a whole", example: "The paper provides a synthesis of recent research.", category: "Academic" },
  { id: "v8", word: "criterion", partOfSpeech: "noun", definition: "A standard for judgment", example: "What criterion did you use to make this decision?", category: "Academic" },
  { id: "v9", word: "discourse", partOfSpeech: "noun", definition: "Written or spoken communication", example: "Academic discourse requires formal language.", category: "Academic" },
  { id: "v10", word: "inference", partOfSpeech: "noun", definition: "A conclusion based on evidence", example: "We can make an inference from the available data.", category: "Academic" },
  { id: "v11", word: "articulate", partOfSpeech: "verb", definition: "To express clearly", example: "She articulated her ideas with great precision.", category: "Academic" },
  { id: "v12", word: "coherent", partOfSpeech: "adjective", definition: "Logical and consistent", example: "The essay presents a coherent argument.", category: "Academic" },
  { id: "v13", word: "substantiate", partOfSpeech: "verb", definition: "To provide evidence for", example: "You need to substantiate your claims with sources.", category: "Academic" },
  { id: "v14", word: "consensus", partOfSpeech: "noun", definition: "General agreement", example: "Scientists have reached a consensus on climate change.", category: "Academic" },
  { id: "v15", word: "comprehensive", partOfSpeech: "adjective", definition: "Complete and thorough", example: "The report provides a comprehensive overview.", category: "Academic" },

  // Science
  { id: "v16", word: "phenomenon", partOfSpeech: "noun", definition: "An observable fact or event", example: "The aurora is a natural phenomenon.", category: "Science" },
  { id: "v17", word: "catalyst", partOfSpeech: "noun", definition: "Something that causes change", example: "The enzyme acts as a catalyst in the reaction.", category: "Science" },
  { id: "v18", word: "equilibrium", partOfSpeech: "noun", definition: "A state of balance", example: "The ecosystem maintains a delicate equilibrium.", category: "Science" },
  { id: "v19", word: "metabolism", partOfSpeech: "noun", definition: "Chemical processes in organisms", example: "Exercise can increase your metabolism.", category: "Science" },
  { id: "v20", word: "biodiversity", partOfSpeech: "noun", definition: "Variety of life in an ecosystem", example: "Rainforests have high biodiversity.", category: "Science" },
  { id: "v21", word: "photosynthesis", partOfSpeech: "noun", definition: "Process plants use to convert sunlight to energy", example: "Photosynthesis is essential for plant growth.", category: "Science" },
  { id: "v22", word: "species", partOfSpeech: "noun", definition: "A group of similar organisms", example: "This species is found only in Madagascar.", category: "Science" },
  { id: "v23", word: "mutation", partOfSpeech: "noun", definition: "A change in genetic material", example: "The mutation led to a new trait in the organism.", category: "Science" },
  { id: "v24", word: "ecosystem", partOfSpeech: "noun", definition: "A biological community and its environment", example: "The coral reef is a fragile ecosystem.", category: "Science" },
  { id: "v25", word: "evolution", partOfSpeech: "noun", definition: "Gradual development over time", example: "Evolution explains the diversity of life on Earth.", category: "Science" },
  { id: "v26", word: "hypothesis", partOfSpeech: "noun", definition: "A proposed explanation to be tested", example: "The hypothesis was confirmed by the experiment.", category: "Science" },
  { id: "v27", word: "organism", partOfSpeech: "noun", definition: "An individual living thing", example: "Each organism plays a role in the food chain.", category: "Science" },
  { id: "v28", word: "particle", partOfSpeech: "noun", definition: "A tiny piece of matter", example: "Atoms are made up of subatomic particles.", category: "Science" },
  { id: "v29", word: "compound", partOfSpeech: "noun", definition: "A substance made of two or more elements", example: "Water is a compound of hydrogen and oxygen.", category: "Science" },
  { id: "v30", word: "laboratory", partOfSpeech: "noun", definition: "A room for scientific work", example: "The experiment was conducted in the laboratory.", category: "Science" },

  // Social
  { id: "v31", word: "demographics", partOfSpeech: "noun", definition: "Statistical data about a population", example: "The survey collected demographic information.", category: "Social" },
  { id: "v32", word: "infrastructure", partOfSpeech: "noun", definition: "Basic facilities of a society", example: "The city invested in public infrastructure.", category: "Social" },
  { id: "v33", word: "legislation", partOfSpeech: "noun", definition: "Laws enacted by a government", example: "New legislation was passed to protect consumers.", category: "Social" },
  { id: "v34", word: "contemporary", partOfSpeech: "adjective", definition: "Belonging to the present time", example: "Contemporary art challenges traditional forms.", category: "Social" },
  { id: "v35", word: "hierarchy", partOfSpeech: "noun", definition: "A system of ranking", example: "The company has a strict hierarchy.", category: "Social" },
  { id: "v36", word: "ideology", partOfSpeech: "noun", definition: "A set of beliefs", example: "Political ideology influences voting behavior.", category: "Social" },
  { id: "v37", word: "cultural", partOfSpeech: "adjective", definition: "Related to culture", example: "Cultural exchange programs promote understanding.", category: "Social" },
  { id: "v38", word: "migration", partOfSpeech: "noun", definition: "Movement from one place to another", example: "Urban migration has increased in recent decades.", category: "Social" },
  { id: "v39", word: "socioeconomic", partOfSpeech: "adjective", definition: "Related to social and economic factors", example: "Socioeconomic status affects educational outcomes.", category: "Social" },
  { id: "v40", word: "stereotype", partOfSpeech: "noun", definition: "An oversimplified image of a group", example: "Media often perpetuates harmful stereotypes.", category: "Social" },
  { id: "v41", word: "diversity", partOfSpeech: "noun", definition: "Variety in a group", example: "Workplace diversity leads to innovation.", category: "Social" },
  { id: "v42", word: "inequality", partOfSpeech: "noun", definition: "Unequal distribution of resources", example: "Economic inequality has social consequences.", category: "Social" },
  { id: "v43", word: "globalization", partOfSpeech: "noun", definition: "Worldwide integration", example: "Globalization has transformed international trade.", category: "Social" },
  { id: "v44", word: "urbanization", partOfSpeech: "noun", definition: "Growth of urban areas", example: "Rapid urbanization creates housing challenges.", category: "Social" },
  { id: "v45", word: "community", partOfSpeech: "noun", definition: "A group of people in an area", example: "The local community organized a cleanup event.", category: "Social" },

  // Technology
  { id: "v46", word: "algorithm", partOfSpeech: "noun", definition: "A set of rules for solving problems", example: "The algorithm processes millions of data points.", category: "Technology" },
  { id: "v47", word: "innovation", partOfSpeech: "noun", definition: "Introduction of new ideas", example: "Technological innovation drives economic growth.", category: "Technology" },
  { id: "v48", word: "automation", partOfSpeech: "noun", definition: "Use of machines to perform tasks", example: "Automation has transformed manufacturing.", category: "Technology" },
  { id: "v49", word: "interface", partOfSpeech: "noun", definition: "A point of interaction", example: "The user interface is intuitive and easy to use.", category: "Technology" },
  { id: "v50", word: "database", partOfSpeech: "noun", definition: "An organized collection of data", example: "The database stores customer information securely.", category: "Technology" },
  { id: "v51", word: "network", partOfSpeech: "noun", definition: "A connected system", example: "The computer network allows file sharing.", category: "Technology" },
  { id: "v52", word: "artificial", partOfSpeech: "adjective", definition: "Made by humans, not natural", example: "Artificial intelligence is advancing rapidly.", category: "Technology" },
  { id: "v53", word: "digital", partOfSpeech: "adjective", definition: "Related to computer technology", example: "Digital transformation affects all industries.", category: "Technology" },
  { id: "v54", word: "software", partOfSpeech: "noun", definition: "Computer programs", example: "The software needs to be updated regularly.", category: "Technology" },
  { id: "v55", word: "virtual", partOfSpeech: "adjective", definition: "Simulated by computer", example: "Virtual reality creates immersive experiences.", category: "Technology" },
  { id: "v56", word: "bandwidth", partOfSpeech: "noun", definition: "Data transmission capacity", example: "Video calls require high bandwidth.", category: "Technology" },
  { id: "v57", word: "encryption", partOfSpeech: "noun", definition: "Converting data into code", example: "Encryption protects sensitive information.", category: "Technology" },
  { id: "v58", word: "optimize", partOfSpeech: "verb", definition: "To make as effective as possible", example: "We need to optimize the website for mobile.", category: "Technology" },
  { id: "v59", word: "integrate", partOfSpeech: "verb", definition: "To combine into a whole", example: "The app integrates with other services.", category: "Technology" },
  { id: "v60", word: "compatible", partOfSpeech: "adjective", definition: "Able to work together", example: "The devices are compatible with each other.", category: "Technology" },

  // Environment
  { id: "v61", word: "sustainable", partOfSpeech: "adjective", definition: "Able to be maintained long-term", example: "Sustainable practices protect the environment.", category: "Environment" },
  { id: "v62", word: "conservation", partOfSpeech: "noun", definition: "Protection of natural resources", example: "Wildlife conservation efforts have increased.", category: "Environment" },
  { id: "v63", word: "renewable", partOfSpeech: "adjective", definition: "Able to be replenished naturally", example: "Solar power is a renewable energy source.", category: "Environment" },
  { id: "v64", word: "emission", partOfSpeech: "noun", definition: "Discharge of gases into the air", example: "Carbon emissions contribute to climate change.", category: "Environment" },
  { id: "v65", word: "pollution", partOfSpeech: "noun", definition: "Contamination of the environment", example: "Air pollution affects public health.", category: "Environment" },
  { id: "v66", word: "habitat", partOfSpeech: "noun", definition: "Natural environment of an organism", example: "Deforestation destroys animal habitats.", category: "Environment" },
  { id: "v67", word: "deforestation", partOfSpeech: "noun", definition: "Clearing of forests", example: "Deforestation contributes to climate change.", category: "Environment" },
  { id: "v68", word: "recycle", partOfSpeech: "verb", definition: "To convert waste into reusable material", example: "We should recycle plastic bottles.", category: "Environment" },
  { id: "v69", word: "endangered", partOfSpeech: "adjective", definition: "At risk of extinction", example: "Many species are endangered due to habitat loss.", category: "Environment" },
  { id: "v70", word: "climate", partOfSpeech: "noun", definition: "Weather patterns over time", example: "Climate change affects global temperatures.", category: "Environment" },
  { id: "v71", word: "carbon", partOfSpeech: "noun", definition: "A chemical element", example: "Reducing carbon footprint is important.", category: "Environment" },
  { id: "v72", word: "ecological", partOfSpeech: "adjective", definition: "Related to ecology", example: "The ecological balance must be maintained.", category: "Environment" },
  { id: "v73", word: "greenhouse", partOfSpeech: "noun/adjective", definition: "Related to heat-trapping effect", example: "Greenhouse gases trap heat in the atmosphere.", category: "Environment" },
  { id: "v74", word: "fossil", partOfSpeech: "noun/adjective", definition: "Preserved remains or related to ancient life", example: "Fossil fuels are non-renewable resources.", category: "Environment" },
  { id: "v75", word: "biodegradable", partOfSpeech: "adjective", definition: "Able to decompose naturally", example: "Use biodegradable packaging to reduce waste.", category: "Environment" },

  // Business
  { id: "v76", word: "entrepreneur", partOfSpeech: "noun", definition: "A person who starts a business", example: "The entrepreneur launched a successful startup.", category: "Business" },
  { id: "v77", word: "revenue", partOfSpeech: "noun", definition: "Income from business activities", example: "The company increased its revenue this quarter.", category: "Business" },
  { id: "v78", word: "investment", partOfSpeech: "noun", definition: "Money put into something for profit", example: "The investment paid off within two years.", category: "Business" },
  { id: "v79", word: "marketing", partOfSpeech: "noun", definition: "Promoting and selling products", example: "Digital marketing reaches a wide audience.", category: "Business" },
  { id: "v80", word: "strategy", partOfSpeech: "noun", definition: "A plan to achieve goals", example: "The company developed a new growth strategy.", category: "Business" },
  { id: "v81", word: "competition", partOfSpeech: "noun", definition: "Rivalry in business", example: "Competition keeps prices competitive.", category: "Business" },
  { id: "v82", word: "consumer", partOfSpeech: "noun", definition: "A person who buys goods", example: "Consumer preferences are constantly changing.", category: "Business" },
  { id: "v83", word: "profit", partOfSpeech: "noun", definition: "Financial gain", example: "The business made a significant profit.", category: "Business" },
  { id: "v84", word: "budget", partOfSpeech: "noun", definition: "A financial plan", example: "Stay within the project budget.", category: "Business" },
  { id: "v85", word: "negotiate", partOfSpeech: "verb", definition: "To discuss to reach an agreement", example: "We need to negotiate the contract terms.", category: "Business" },
  { id: "v86", word: "stakeholder", partOfSpeech: "noun", definition: "A person with interest in a business", example: "All stakeholders were consulted.", category: "Business" },
  { id: "v87", word: "productivity", partOfSpeech: "noun", definition: "Efficiency of production", example: "New tools improved team productivity.", category: "Business" },
  { id: "v88", word: "acquisition", partOfSpeech: "noun", definition: "Buying another company", example: "The acquisition expanded the company's reach.", category: "Business" },
  { id: "v89", word: "quarterly", partOfSpeech: "adjective/adverb", definition: "Every three months", example: "Quarterly reports show company performance.", category: "Business" },
  { id: "v90", word: "franchise", partOfSpeech: "noun", definition: "A licensed business model", example: "The franchise expanded to new cities.", category: "Business" },

  // More Academic
  { id: "v91", word: "perspective", partOfSpeech: "noun", definition: "A point of view", example: "Consider the issue from different perspectives.", category: "Academic" },
  { id: "v92", word: "relevant", partOfSpeech: "adjective", definition: "Closely connected to the topic", example: "Only include relevant information.", category: "Academic" },
  { id: "v93", word: "abstract", partOfSpeech: "noun/adjective", definition: "A summary or theoretical", example: "Read the abstract before the full paper.", category: "Academic" },
  { id: "v94", word: "cite", partOfSpeech: "verb", definition: "To quote as evidence", example: "Remember to cite your sources properly.", category: "Academic" },
  { id: "v95", word: "evaluate", partOfSpeech: "verb", definition: "To assess the value of", example: "We need to evaluate all options carefully.", category: "Academic" },
  { id: "v96", word: "implication", partOfSpeech: "noun", definition: "A possible effect or consequence", example: "Consider the implications of this decision.", category: "Academic" },
  { id: "v97", word: "fundamental", partOfSpeech: "adjective", definition: "Basic and essential", example: "Understanding fundamentals is crucial.", category: "Academic" },
  { id: "v98", word: "derive", partOfSpeech: "verb", definition: "To obtain from a source", example: "The theory derives from earlier research.", category: "Academic" },
  { id: "v99", word: "concept", partOfSpeech: "noun", definition: "An abstract idea", example: "This concept is central to the theory.", category: "Academic" },
  { id: "v100", word: "framework", partOfSpeech: "noun", definition: "A basic structure", example: "The framework guides our analysis.", category: "Academic" }
];

export const categories = ["Academic", "Science", "Social", "Technology", "Environment", "Business"];
