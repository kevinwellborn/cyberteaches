// App Challenge course content: a self-paced guide to building and submitting an app for the
// Congressional App Challenge (CAC). Written for students working on their own, with no teacher needed.
// Rules facts come from the official 2026 CAC rules. Dates for 2027 are not announced yet; update CAC_INFO when they are.
// Each lesson: summary (one paragraph), more (extra paragraphs), terms ([word, meaning]), steps (things to do),
// example ({ title, text }), fields (fill-in boxes saved in the browser and collected on the My Plan page),
// quiz ({ q, a, c, why }). Lessons with soon: true are listed but not written yet.
window.CAC_INFO = {
  site: 'https://www.congressionalappchallenge.us/',
  season: '2027',
  lastDeadline: 'October 26, 2026 at 12:00 pm Eastern',
  note: 'The 2026 challenge closed on October 26, 2026. Dates for 2027 are not announced yet. In 2026, submissions opened in May and closed in late October, so plan for about the same.'
};

window.AP_UNITS = [
  {
    id: 'm0', num: 0, title: 'Get ready for the challenge',
    blurb: 'Learn what the challenge is, check that you can enter, decide on a team, and set up a place to work.',
    milestone: 'You know you are eligible, you know who is on your team, and your project folder and build journal exist.',
    topics: [
      { id: '0.1', title: 'What is the Congressional App Challenge?',
        summary: `The Congressional App Challenge (CAC) is a coding competition for middle and high school students, hosted by Members of the U.S. House of Representatives. You build an app about anything you like, record a short video that shows it working, and answer a few written questions. Each district that takes part picks its own winner, and winning apps are featured on House.gov and on the challenge website.`,
        more: [
          `You do not need to be an expert. The rules allow any topic, any programming language, and any platform, from a website to a phone app to a robot. What judges look for is a good idea, an app that really works, and proof that you understand your own code.`,
          `Your entry has three parts: the app itself, a demonstration video that is 1 to 3 minutes long, and written answers to questions about your app. This course walks you through all three, one small step at a time.`
        ],
        terms: [
          ['Congressional App Challenge (CAC)', 'A yearly app competition for middle and high school students, run district by district by Members of Congress.'],
          ['Congressional district', 'An area of a state that elects one Member of the U.S. House of Representatives. You compete inside one district.'],
          ['Submission', 'Everything you turn in: your registration, your demonstration video, and your written answers.'],
          ['Demonstration video', 'A 1 to 3 minute video that explains your app and shows it working.'],
          ['Judging criteria', 'What judges score: the quality of the idea, how well it is built and designed, and your coding skill.']
        ],
        steps: [
          'Open the official site, congressionalappchallenge.us, and look around.',
          'Watch two or three winning demo videos from past years. Notice how short and simple they are.',
          'Write down one thing you liked in a past winner and one thing you would do differently.'
        ],
        example: { title: 'What judges score', text: `1. Quality of the idea, including creativity and originality.\n2. Implementation of the idea, including user experience and design.\n3. Demonstrated excellence of coding and programming skills.` },
        quiz: [
          { q: 'Which of these is NOT one of the three parts of a CAC entry?', a: ['A working app', 'A 1 to 3 minute demonstration video', 'A printed poster mailed to Congress', 'Written answers about your app'], c: 2, why: 'You submit online: the app, a demonstration video, and written answers. No poster is needed.' },
          { q: 'A student wants to build a game in Python instead of a phone app. Do the rules allow it?', a: ['No, it must be a phone app', 'No, it must be written in JavaScript', 'Yes, any topic, platform, and programming language is allowed', 'Only if a teacher approves it'], c: 2, why: 'The rules allow any topic, any platform, and any programming language, including block-based languages.' },
          { q: 'Which of these do judges score?', a: ['How expensive your computer is', 'The quality of your idea, how well it is built, and your coding skill', 'How many followers your video has', 'How long your code is'], c: 1, why: 'Judges look at the idea, the implementation and design, and your coding and programming skills.' }
        ] },
      { id: '0.2', title: 'Check that you can enter',
        summary: `Before you write any code, make sure you are allowed to enter. You must be a middle school or high school student on the deadline day, and you must compete in a congressional district that is hosting a challenge. You may enter in the district where you live or the district where you go to school, but only in one of them, and you may submit only one app per year.`,
        more: [
          `Not every district takes part every year. The official site lists the districts that are hosting. If neither your home district nor your school district is on the list, you cannot enter that year, so check early.`,
          `Your app also has to be new. For the 2026 challenge, apps had to be created after October 30, 2025. Expect a similar cutoff for 2027. The safest plan is to start a brand new project for this course. If you improve an older app, only the new code counts.`
        ],
        terms: [
          ['Eligible', 'Allowed to enter because you meet every rule.'],
          ['Host district', 'A congressional district whose Member of Congress is running a challenge this year.'],
          ['Member of Congress', 'The person elected to represent your district in the U.S. House of Representatives.'],
          ['ZIP+4', 'A 9-digit ZIP code, such as 90210-1234. Registration asks for it for your home and your school.'],
          ['Deadline', 'The last moment you can submit. After it passes, your entry cannot be changed in any way.']
        ],
        steps: [
          'Find your home district and Member of Congress at house.gov (search "Find Your Representative" and type your ZIP code).',
          'Do the same for your school address. It may be a different district.',
          'On congressionalappchallenge.us, check that at least one of those districts is hosting a challenge.',
          'Look up the 9-digit ZIP code for your home and your school with the USPS ZIP Code lookup. Save them for registration.',
          'Tell a parent or guardian you plan to enter. Registration asks for their name and email.'
        ],
        example: { title: 'Eligibility checklist', text: `I am in middle school or high school.\nMy home district or my school district is hosting a challenge.\nI will enter in only one district.\nI will submit only one app this year.\nMy app is a new project started for this challenge.\nA parent or guardian knows I am entering.` },
        fields: [
          { key: 'district', label: 'The district I will enter in', hint: 'Example: California 30th (my school district)', rows: 1 }
        ],
        quiz: [
          { q: 'Maya lives in District 5 and goes to school in District 7. Both are hosting a challenge. What can she do?', a: ['Enter one app in District 5 and a second app in District 7', 'Enter the same app in both districts', 'Choose either district, but enter in only one', 'She cannot enter because her districts are different'], c: 2, why: 'You may compete where you live or where you attend school, but only in one district, with one app per year.' },
          { q: 'A student built a quiz app two years ago and wants to enter it unchanged. What do the rules say?', a: ['Any app ever made is fine', 'Apps must be created after the cutoff date, and for an updated app only the new code counts', 'Old apps are fine if they won before', 'Old apps are fine if the name changes'], c: 1, why: 'The app must be created after the cutoff date. A 2.0 version is allowed, but only the new coding is considered.' },
          { q: 'What happens to your submission after the deadline passes?', a: ['You can still fix small typos', 'You can swap the video for a week', 'It cannot be changed in any way', 'You can add teammates'], c: 2, why: 'After the submission period ends, the submission cannot be modified in any way. Submit early.' }
        ] },
      { id: '0.3', title: 'Solo or team?',
        summary: `You can enter alone or in a team of up to four students. A team with more than four members is not eligible. At least half of the teammates must live or go to school in the same congressional district, and every person can be on only one entry per year. Working alone gives you full control. A team lets you split the work and build something bigger.`,
        more: [
          `If you team up, give everyone a real job. All coding and technical work must be done by the students on the team, and judges may ask any of you about the code. A good team has people who can each explain what the app does and how it works.`,
          `Common roles are builder (writes most of the code), designer (plans screens and how the app feels), tester (tries to break the app and reports bugs), and presenter (leads the video and written answers). On a small team, one person takes more than one role.`
        ],
        terms: [
          ['Team', 'Two to four students who submit one app together.'],
          ['Role', 'The main job a teammate is responsible for.'],
          ['Builder', 'The teammate who writes most of the code.'],
          ['Tester', 'The teammate who tries the app in many ways to find bugs before the judges do.'],
          ['Team profile', 'The team page one teammate creates when registering. That person invites up to three others.']
        ],
        steps: [
          'Decide: solo or team? If team, agree on who is in. Four is the limit.',
          'Check the district rule: at least half of your team must live or attend school in the same district.',
          'Make sure nobody on your team is also on another entry this year.',
          'Give each person a main role. Write it down.',
          'Pick a regular time to work, such as two afternoons a week.'
        ],
        example: { title: 'A team of three', text: `Builder: writes the JavaScript and fixes bugs.\nDesigner: sketches the screens, picks colors, writes the words in the app.\nTester and presenter: tests each new feature, keeps the build journal, leads the video.\nEveryone: can explain every part of the code.` },
        fields: [
          { key: 'team', label: 'Solo or team, and who does what', hint: 'Example: Team of 2. I build, my teammate designs and tests. We both present.', rows: 3 }
        ],
        quiz: [
          { q: 'Five friends want to enter one app together. What do the rules say?', a: ['That is fine', 'It is fine if they all live in one district', 'A team can have at most four students, so they are not eligible as one team', 'They need a teacher to join'], c: 2, why: 'Any team with more than four students is not eligible to compete.' },
          { q: 'A team has four members. How many must live or attend school in the same district?', a: ['At least one', 'At least two', 'All four', 'None'], c: 1, why: 'At least half of the teammates must live or attend school in the same congressional district. Half of four is two.' },
          { q: 'Sam is on Team A. Can Sam also join Team B to help with a second app this year?', a: ['Yes, if the apps are different', 'Yes, if the teams are in different districts', 'No, each student can be on only one entry per year', 'Yes, but only as a tester'], c: 2, why: 'One entry per person per year. Entries across multiple teams are not allowed.' }
        ] },
      { id: '0.4', title: 'Set up your workspace',
        summary: `A little setup now saves a lot of stress later. You need three things: a personal email address, a project folder where your code and notes live, and a build journal. The journal is a simple dated list of what you did, what broke, and how you fixed it. Later, it becomes the raw material for your written answers.`,
        more: [
          `Registration needs a personal email address that is not your school account. School email often blocks messages from outside, and you would miss the email that lets you continue your application.`,
          `One of the written questions asks what technical difficulty you faced and how you solved it. Students who keep a journal answer this in minutes. Students who do not have to guess what happened months ago. A journal with dates also helps show your work is new and your own.`
        ],
        terms: [
          ['Build journal', 'A dated log of your work: what you did, what went wrong, and how you fixed it.'],
          ['Project folder', 'One folder that holds all the files for your app.'],
          ['Version history', 'Saved earlier copies of your work, so you can go back if something breaks.'],
          ['GitHub', 'A free website for storing code and its history. Judges may ask to see your code, and a link makes that easy.'],
          ['Personal email', 'An email account that is yours and is not run by your school.']
        ],
        steps: [
          'Make sure you have a personal email address. If you are under 13, ask a parent or guardian to help set one up.',
          'Create a project folder named for your app idea, or "cac-app" for now.',
          'Inside it, create a file named journal.txt (or a document) and write today\'s date and "Started the App Challenge course."',
          'Optional: create a free GitHub account with a parent or guardian\'s OK. We will use it later to share your code.',
          'Put two work sessions on your calendar for this week.'
        ],
        example: { title: 'A build journal entry', text: `Nov 17\nDid: sketched 3 app ideas, picked the homework planner.\nProblem: could not decide between a website and a phone app.\nFix: chose a website because it works on my Chromebook and my phone.\nNext: interview 3 friends about how they track homework.` },
        quiz: [
          { q: 'Why does registration ask for a personal email instead of a school email?', a: ['Personal email looks more professional', 'School accounts may block outside messages, so you could miss important emails', 'School email costs money', 'Judges cannot read school email'], c: 1, why: 'The rules require a personal email that is not your school account, so messages from the challenge reach you.' },
          { q: 'What is the main reason to keep a build journal?', a: ['It is required to be 10 pages long', 'It makes your code run faster', 'It records problems and fixes you can use in your written answers and shows the work is yours', 'It replaces the demo video'], c: 2, why: 'A written question asks about a technical difficulty and how you solved it. Your journal holds the answer.' },
          { q: 'Judges have the right to ask for something to verify your app works. What is it?', a: ['Your report card', 'Access to the app and its source code', 'A letter from your school', 'A payment'], c: 1, why: 'Judges may request access to the app and source code. If you refuse, the entry is disqualified, so keep your code organized.' }
        ] }
    ]
  },
  {
    id: 'm1', num: 1, title: 'Find a problem worth solving',
    blurb: 'Great apps start with a real problem for real people. Find one, talk to the people who have it, and say it in one sentence.',
    milestone: 'You have a problem statement, a target audience, and a one-sentence purpose. That sentence opens your demo video.',
    topics: [
      { id: '1.1', title: 'Spot problems around you',
        summary: `The best app ideas do not start with "what app should I make?" They start with "what bugs people?" Look at your own day: school, home, sports, clubs, your neighborhood. Every time someone says "I wish," "I always forget," or "this takes forever," you have found a possible app. Small, real problems beat big, vague ones.`,
        more: [
          `Judges score the quality of your idea, including creativity and originality. An original idea does not have to be something nobody has ever thought of. It can be a known problem solved for a specific group, like a carpool planner just for your marching band.`,
          `Aim for a problem you can solve with one main feature. "Fix climate change" is too big. "Help my family remember which bin goes out on which day" is the right size, and you can finish it.`
        ],
        terms: [
          ['Problem', 'Something that is hard, slow, annoying, or unfair for a group of people.'],
          ['Pain point', 'A specific moment when the problem hurts, like forgetting an assignment the night before it is due.'],
          ['Brainstorm', 'Writing down many ideas quickly without judging them yet.'],
          ['Scope', 'How big your project is. Small scope means fewer features, done well.'],
          ['Originality', 'Your own thinking and work, not a copy of an existing app.']
        ],
        steps: [
          'Set a timer for 10 minutes. List at least 10 problems you or people around you have. Do not judge them yet.',
          'Circle the three you care about most.',
          'For each of the three, write who has the problem and when it happens.',
          'Cross out any that need things you cannot get, like private data or special hardware.',
          'Pick one to explore. You can still change your mind after the next lesson.'
        ],
        example: { title: 'From too big to just right', text: `Too big: "Help people be healthier."\nStill big: "Help teens drink more water."\nJust right: "Remind students on my cross country team to drink water before practice, and let them log it with one tap."` },
        fields: [
          { key: 'problem', label: 'The problem I want to solve', hint: 'Who has it, and when does it happen? Two or three sentences.', rows: 3 }
        ],
        quiz: [
          { q: 'Which idea has the best scope for a first app?', a: ['An app that ends world hunger', 'An app that replaces every social network', 'An app that helps a school club track who is bringing snacks each week', 'An app that does everything a phone can do'], c: 2, why: 'A small, specific problem with one main feature is something you can finish and explain well.' },
          { q: 'What is a good first step for finding an app idea?', a: ['Copy the most popular app in the app store', 'Notice what frustrates you and people around you', 'Pick the hardest programming language', 'Design the logo'], c: 1, why: 'Strong ideas come from real problems. Start by noticing them.' },
          { q: 'During a brainstorm, what should you do with ideas that seem silly?', a: ['Delete them right away', 'Write them down anyway and judge later', 'Stop the brainstorm', 'Ask a judge'], c: 1, why: 'Brainstorming works when you collect many ideas first and sort them afterward.' }
        ] },
      { id: '1.2', title: 'Talk to real people',
        summary: `You are not the only user of your app. Before building, talk to at least three people who have the problem. Ask how they deal with it today, what they have tried, and what annoys them most. You will learn things you could never guess, and you will find out whether the problem is real or just something you imagined.`,
        more: [
          `Ask about what people do, not what they might do. "Would you use my app?" always gets a polite yes. "Tell me about the last time you forgot an assignment" gets a true story.`,
          `Write down what you hear the same day. Protect people's privacy: use first names or no names in your notes, and never record anyone without asking. The contest rules also say your app must not violate anyone's privacy rights.`
        ],
        terms: [
          ['User', 'A person who will use your app.'],
          ['Target audience', 'The specific group of people your app is made for. The demo video must name it.'],
          ['Interview', 'A short conversation where you ask questions and mostly listen.'],
          ['Open question', 'A question that cannot be answered with yes or no, such as "How do you keep track of homework now?"'],
          ['Feedback', 'What people tell you about your idea or app that helps you improve it.']
        ],
        steps: [
          'Pick three people who have your problem. Friends, family, teammates, and neighbors all count.',
          'Ask each one the four questions in the example below. Listen more than you talk.',
          'Write down their answers the same day in your build journal.',
          'Look for something at least two people said. That is your strongest clue.',
          'Decide: keep the problem, adjust it, or go back and pick another from your list.'
        ],
        example: { title: 'Four interview questions', text: `1. Tell me about the last time this problem happened to you.\n2. What do you do about it now?\n3. What is the most annoying part?\n4. If you had a magic wand, what would you change?` },
        fields: [
          { key: 'audience', label: 'My target audience', hint: 'Be specific. Example: middle school students at my school who ride the bus.', rows: 2 },
          { key: 'learned', label: 'What I learned from talking to people', hint: 'One or two things that surprised you or that more than one person said.', rows: 3 }
        ],
        quiz: [
          { q: 'Which interview question will teach you the most?', a: ['"Would you use my app?"', '"Do you like my idea?"', '"Tell me about the last time you lost track of a homework assignment."', '"Is my app name cool?"'], c: 2, why: 'Open questions about real past events get true stories instead of polite yes answers.' },
          { q: 'Which is the best target audience?', a: ['Everyone', 'People with phones', 'New students at my middle school who do not know where their classes are', 'Humans'], c: 2, why: 'A specific audience is easier to design for and easier to explain in your video.' },
          { q: 'You want to record an interview on your phone. What should you do first?', a: ['Record secretly so the answers are natural', 'Ask the person for permission', 'Post it online', 'Nothing, recording is always fine'], c: 1, why: 'Respect privacy. Always ask before recording, and keep names out of your notes.' }
        ] },
      { id: '1.3', title: 'Write your one-sentence purpose',
        summary: `The rules say your demo video should explain the purpose of your app in one clear sentence. Write that sentence now, before you build anything. It keeps you focused, and every later decision gets easier: if a feature does not serve the sentence, it can wait.`,
        more: [
          `A simple pattern works well: "My app helps [audience] [do something] so that [benefit]." Name the audience you chose, the one main thing the app does, and why that matters to them.`,
          `Test your sentence on someone who knows nothing about your idea. If they can repeat it back and it still makes sense, you are done. If they look confused, make it shorter.`
        ],
        terms: [
          ['Purpose', 'What your app is for. One of the required parts of the demo video and the written answers.'],
          ['Purpose statement', 'One clear sentence that says who the app helps, what it does, and why.'],
          ['Benefit', 'The good result for the user, such as saving time or feeling less stressed.'],
          ['Core feature', 'The one main thing your app must do to deliver its purpose.'],
          ['Pitch', 'A very short explanation of your idea, said out loud.']
        ],
        steps: [
          'Fill in the pattern: "My app helps [audience] [do something] so that [benefit]."',
          'Write three different versions. Pick the clearest.',
          'Say it out loud to someone. Ask them to repeat it back.',
          'Fix any word they stumbled on.',
          'Pick a working name for your app. You can change it later.'
        ],
        example: { title: 'Purpose sentences', text: `Weak: "My app is about recycling."\nBetter: "My app helps families in my town know which bin goes out each week so that they never miss pickup day."\n\nWeak: "It is a study app with lots of features."\nBetter: "StudyBuddy helps 7th graders at my school quiz themselves on vocabulary so that they feel ready for tests."` },
        fields: [
          { key: 'appname', label: 'Working name for my app', hint: 'Short and easy to say.', rows: 1 },
          { key: 'purpose', label: 'My one-sentence purpose', hint: 'My app helps [audience] [do something] so that [benefit].', rows: 2 }
        ],
        quiz: [
          { q: 'Which is the strongest purpose statement?', a: ['"My app is really cool and uses AI."', '"My app helps new band members learn their marching spots so that they feel ready for the first game."', '"It is an app."', '"My app has 12 screens and a login."'], c: 1, why: 'It names the audience, the one thing the app does, and the benefit.' },
          { q: 'Why write the purpose sentence before coding?', a: ['The rules forbid coding first', 'It keeps you focused on the one thing the app must do', 'It makes the code shorter', 'Judges read it before the deadline'], c: 1, why: 'A clear purpose helps you choose what to build first and what can wait.' },
          { q: 'Where will this sentence be used in your submission?', a: ['Nowhere, it is just practice', 'Only in the source code', 'In the demo video and the written answers', 'On a poster'], c: 2, why: 'The video must clearly explain the purpose, and a written question asks you to explain the app\'s purpose.' }
        ] },
      { id: '1.4', title: 'Check your idea against the rules',
        summary: `Before you fall in love with an idea, make sure it fits the contest rules. Your app must be respectful and decent, it must be your own original work, and it must not use other people's creations or private information without the right to do so. A few minutes of checking now can save your whole entry later.`,
        more: [
          `The content rules are strict. Apps that are indecent, hateful, threatening, or that encourage violence are not allowed, and neither is anything that would embarrass the congressional district. If you are unsure, pick a safer idea.`,
          `Originality matters too. You may use open-source libraries, frameworks, and tools, and you may use AI tools, but you must clearly document all of it, and AI cannot do the whole build. The project has to show significant personal effort, and you must understand your own code. Start a list today of anything you use that you did not make yourself.`
        ],
        terms: [
          ['Intellectual property (IP)', 'Creations that belong to someone, such as images, music, characters, code, and brand names.'],
          ['Open source', 'Code that its authors let others use, usually with a license that says how.'],
          ['License', 'The rules for how you may use someone else\'s work.'],
          ['Privacy', 'People\'s right to control their personal information.'],
          ['Disclosure', 'Telling the judges clearly what tools, libraries, and AI help you used.']
        ],
        steps: [
          'Read your purpose sentence and ask: would I be comfortable showing this app to my Member of Congress and my grandparents?',
          'List any images, music, characters, or data you planned to use. For each, ask: did I make it, or do I have the right to use it?',
          'Replace anything you do not have the right to use with your own work or with free-to-use material.',
          'If your app stores information about people, write down what it stores and why. Store as little as possible.',
          'Create a file named CREDITS.txt in your project folder. Add every library, tool, and AI assistant as you use them.'
        ],
        example: { title: 'Idea check', text: `Respectful and decent for all ages?  Yes\nMy own idea and my own work?  Yes\nUses only images and sounds I made or may use?  Yes, I drew the icons\nCollects private information?  Only a first name, saved on the device\nCREDITS.txt started?  Yes` },
        fields: [
          { key: 'rulescheck', label: 'My idea check', hint: 'Anything you need to change or replace to fit the rules? Write "nothing" if it all passes.', rows: 3 }
        ],
        quiz: [
          { q: 'A student wants to use a famous cartoon character as their app\'s mascot. What is the problem?', a: ['Cartoons are not allowed in apps', 'The character is someone else\'s intellectual property', 'Mascots slow the app down', 'There is no problem'], c: 1, why: 'The app must not violate anyone\'s intellectual property rights. Draw your own mascot instead.' },
          { q: 'What do the 2026 rules say about using AI tools?', a: ['AI is banned completely', 'AI can build the whole app if you say so', 'AI is allowed if fully disclosed, but it cannot be the entire technical development', 'AI use never needs to be mentioned'], c: 2, why: 'AI use is permitted when fully disclosed. It may support parts of the project, and you must show your own contributions and understanding.' },
          { q: 'You used an open-source charting library. What must you do?', a: ['Hide it so the app looks more original', 'Clearly document that you used it', 'Rewrite it from scratch', 'Nothing'], c: 1, why: 'Libraries, frameworks, and external tools are allowed, but you must clearly document their use.' }
        ] }
    ]
  },
  { id: 'm2', num: 2, title: 'Design your app', blurb: 'Plan before you code: the one core feature, the screens, and the data your app needs.',
    milestone: 'Sketches of your screens and a feature list split into "must have" and "if there is time."',
    topics: [
      { id: '2.1', title: 'User stories and your one core feature', soon: true },
      { id: '2.2', title: 'Sketch your screens', soon: true },
      { id: '2.3', title: 'Plan your data with privacy first', soon: true },
      { id: '2.4', title: 'Score your design like a judge', soon: true }
    ] },
  { id: 'm3', num: 3, title: 'Coding basics', blurb: 'Choose your tools and learn just enough code to start: events, variables, decisions, lists, and saving data.',
    milestone: 'A one-screen "hello app" that takes input and shows output.',
    topics: [
      { id: '3.1', title: 'Choose your platform and language', soon: true },
      { id: '3.2', title: 'Your first web page: HTML and CSS', soon: true },
      { id: '3.3', title: 'Make it respond: JavaScript and events', soon: true },
      { id: '3.4', title: 'Variables, decisions, and lists', soon: true },
      { id: '3.5', title: 'Build your hello app', soon: true }
    ] },
  { id: 'm4', num: 4, title: 'Build responsibly', blurb: 'Keep your entry safe: do your own work, credit what you use, and use AI the allowed way.',
    milestone: 'A CREDITS file and an AI use log in your project folder.',
    topics: [
      { id: '4.1', title: 'What "your own work" means', soon: true },
      { id: '4.2', title: 'Credit libraries, images, and sounds', soon: true },
      { id: '4.3', title: 'Use AI as a tutor, not the builder', soon: true },
      { id: '4.4', title: 'Save your history with GitHub', soon: true }
    ] },
  { id: 'm5', num: 5, title: 'Build the core', blurb: 'Build the one feature your app cannot live without, from start to finish.',
    milestone: 'Your core feature works. This is the minimum the judges need to see.',
    topics: [
      { id: '5.1', title: 'Break the core feature into small steps', soon: true },
      { id: '5.2', title: 'Save and load data', soon: true },
      { id: '5.3', title: 'Debugging: find and fix errors', soon: true },
      { id: '5.4', title: 'Weekly check-in with your journal', soon: true }
    ] },
  { id: 'm6', num: 6, title: 'Polish and test', blurb: 'Make it easy to use, try to break it, and fix what matters most.',
    milestone: 'A tested app and a short test report.',
    topics: [
      { id: '6.1', title: 'Add your "if there is time" features', soon: true },
      { id: '6.2', title: 'Design that is easy for everyone to use', soon: true },
      { id: '6.3', title: 'Test with three real users', soon: true },
      { id: '6.4', title: 'Clean up and comment your code', soon: true }
    ] },
  { id: 'm7', num: 7, title: 'Make your demo video', blurb: 'Plan, record, and upload a 1 to 3 minute video that covers everything the rules require.',
    milestone: 'A public video link and a link to your code.',
    topics: [
      { id: '7.1', title: 'Write a script that covers all six required items', soon: true },
      { id: '7.2', title: 'Record your screen with clear sound', soon: true },
      { id: '7.3', title: 'Edit to 1 to 3 minutes', soon: true },
      { id: '7.4', title: 'Upload to YouTube or Vimeo as public', soon: true }
    ] },
  { id: 'm8', num: 8, title: 'Submit your entry', blurb: 'Register, write your answers, check everything twice, and submit early.',
    milestone: 'Your entry is submitted and your exit questionnaire is done.',
    topics: [
      { id: '8.1', title: 'Register: what you need ready', soon: true },
      { id: '8.2', title: 'Write your six answers from your journal', soon: true },
      { id: '8.3', title: 'Final check against the judging criteria', soon: true },
      { id: '8.4', title: 'Submit early, then the exit questionnaire', soon: true }
    ] }
];

// The rules in plain words, shown on the Rules page. Source: official 2026 CAC rules.
window.CAC_RULES = [
  { h: 'Who can enter', items: ['Middle school and high school students (enrolled on the deadline day).', 'You compete in the district where you live or where you go to school. Pick one. That district must be hosting a challenge.', 'Solo or a team of up to 4. At least half the team must live or attend school in the same district.', 'One app per person per year.'] },
  { h: 'What you can build', items: ['Any topic, any platform (web, phone, desktop, robots, AR and VR, wearables, and more), any programming language, including block-based.', 'It has to work. The app must show some real functionality.', 'It must be new. For 2026, apps had to be created after October 30, 2025. For an updated app, only the new code counts.', 'It must be decent and respectful, and must not violate anyone\'s intellectual property or privacy rights.'] },
  { h: 'Your own work', items: ['All coding and technical work must be done by you or your team.', 'Open-source libraries, frameworks, and tools are allowed if you clearly document them.', 'AI tools are allowed if you fully disclose them. AI cannot be the entire build, and you must understand your own code.', 'Judges may ask to see your app and source code. Saying no means disqualification.'] },
  { h: 'What you submit', items: ['Online registration: a personal (not school) email, home and school addresses with 9-digit ZIP codes, district and Member of Congress, and a parent or guardian\'s name and email.', 'A demonstration video, 1 to 3 minutes, uploaded to YouTube or Vimeo and set to public.', 'Written answers to questions about your app.', 'After the deadline, an exit questionnaire. Every team member fills it out.'] }
];
window.CAC_VIDEO = ['The name of each participant', 'The name of the app', 'The purpose of the app, in one clear sentence', 'The target audience: who the app is for', 'The tools and coding languages you used', 'The app working: show what it does'];
window.CAC_QUESTIONS = ['What is the title of your app?', 'Explain the app\'s purpose.', 'What inspired you to create this app?', 'What technical or coding difficulty did you face, and how did you address it?', 'What did you learn while participating? What was your biggest takeaway?', 'What would you change if you made a 2.0 version?'];
