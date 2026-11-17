// App Builder course content: a self-paced course on designing and building your own app.
// It works for students on their own and for classes. The last unit is an optional track for students who
// want to enter their app in the Congressional App Challenge (CAC).
// Rules facts in the track come from the official 2026 CAC rules. Dates for 2027 are not announced yet; update CAC_INFO when they are.
// Each lesson: summary (one paragraph), more (extra paragraphs), terms ([word, meaning]), steps (things to do),
// example ({ title, text }), fields (fill-in boxes saved in the browser and collected on the My Plan page),
// cac (optional note shown as "For the App Challenge"), blocks (optional note linking to Academy block coding),
// tries (Try it boxes: { mode: 'js' | 'html', title, intro, code, challenge }), quiz ({ q, a, c, why }).
// A unit with track: true is the App Challenge track. A lesson with soon: true is listed but not written yet.
window.CAC_INFO = {
  site: 'https://www.congressionalappchallenge.us/',
  season: '2027',
  lastDeadline: 'October 26, 2026 at 12:00 pm Eastern',
  note: 'The 2026 challenge closed on October 26, 2026. Dates for 2027 are not announced yet. In 2026, submissions opened in May and closed in late October, so plan for about the same.'
};

window.AP_UNITS = [
  {
    id: 'm1', num: 1, title: 'Find a problem worth solving',
    blurb: 'Great apps start with a real problem for real people. Find one, talk to the people who have it, and say it in one sentence.',
    milestone: 'You have a problem, a target audience, a one-sentence purpose, and a project folder with a build journal.',
    topics: [
      { id: '1.1', title: 'Spot problems around you',
        summary: `The best app ideas do not start with "what app should I make?" They start with "what bugs people?" Look at your own day: school, home, sports, clubs, your neighborhood. Every time someone says "I wish," "I always forget," or "this takes forever," you have found a possible app. Small, real problems beat big, vague ones.`,
        more: [
          `An original idea does not have to be something nobody has ever thought of. It can be a known problem solved for a specific group, like a carpool planner just for your marching band.`,
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
          'Set a timer for 10 minutes. In the first box below, list at least 10 problems you or people around you have, one on each line. Do not judge them yet.',
          'Pick the three you care about most and put a star (*) in front of each one.',
          'For each of the three, add who has the problem and when it happens.',
          'Cross out any that need things you cannot get, like private data or special hardware.'
        ],
        together: {
          title: 'Trade problems with a partner',
          time: 'About 15 minutes',
          steps: [
            'Pair up with a classmate. Decide who goes first.',
            'Partner A reads their three starred problems out loud. Partner B asks about each one: "Who has this problem?" and "When does it happen?"',
            'Partner B says which of the three they would most want solved, and why. Partner A writes that down in the second box below.',
            'Switch roles and do it again.',
            'Give your partner one new problem they did not think of. Add the one you get to your own list.',
            'Class share: each person says one problem in one sentence. Raise your hand when you hear a problem you have too. Problems that get many hands are worth a closer look.',
            'Pick one problem to explore and write it in the last box. You can still change your mind after the next lesson.'
          ]
        },
        example: { title: 'From too big to just right', text: `Too big: "Help people be healthier."\nStill big: "Help teens drink more water."\nJust right: "Remind students on my cross country team to drink water before practice, and let them log it with one tap."` },
        cac: 'Judges score the quality of your idea, including creativity and originality. A small, real problem for a specific group scores better than a copy of a famous app.',
        fields: [
          { key: 'problemlist', label: 'My list of problems', hint: 'One problem on each line. Put a star (*) in front of your top three.', rows: 10, lines: 10 },
          { key: 'partner', label: 'What my partner said', hint: 'Your partner\'s first name, which problem they would most want solved, and why.', rows: 3, min: 12 },
          { key: 'problem', label: 'The problem I want to solve', hint: 'Who has it, and when does it happen? Two or three sentences.', rows: 3, min: 15 }
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
          `Write down what you hear the same day. Protect people's privacy: use first names or no names in your notes, and never record anyone without asking.`
        ],
        terms: [
          ['User', 'A person who will use your app.'],
          ['Target audience', 'The specific group of people your app is made for.'],
          ['Interview', 'A short conversation where you ask questions and mostly listen.'],
          ['Open question', 'A question that cannot be answered with yes or no, such as "How do you keep track of homework now?"'],
          ['Feedback', 'What people tell you about your idea or app that helps you improve it.']
        ],
        steps: [
          'Pick three people who have your problem. Friends, family, teammates, and neighbors all count.',
          'Ask each one the four questions in the example below. Listen more than you talk.',
          'Write down their answers the same day.',
          'Look for something at least two people said. That is your strongest clue.',
          'Decide: keep the problem, adjust it, or go back and pick another from your list.'
        ],
        example: { title: 'Four interview questions', text: `1. Tell me about the last time this problem happened to you.\n2. What do you do about it now?\n3. What is the most annoying part?\n4. If you had a magic wand, what would you change?` },
        cac: 'Your demo video must explain your target audience, and the rules say your app must not violate anyone\'s privacy rights. The notes you take now cover both.',
        fields: [
          { key: 'audience', label: 'My target audience', hint: 'Be specific. Example: middle school students at my school who ride the bus.', rows: 2 },
          { key: 'interviews', label: 'What I learned from talking to people', hint: 'One or two things that surprised you or that more than one person said.', rows: 3 }
        ],
        quiz: [
          { q: 'Which interview question will teach you the most?', a: ['"Would you use my app?"', '"Do you like my idea?"', '"Tell me about the last time you lost track of a homework assignment."', '"Is my app name cool?"'], c: 2, why: 'Open questions about real past events get true stories instead of polite yes answers.' },
          { q: 'Which is the best target audience?', a: ['Everyone', 'People with phones', 'New students at my middle school who do not know where their classes are', 'Humans'], c: 2, why: 'A specific audience is easier to design for and easier to explain in your video.' },
          { q: 'You want to record an interview on your phone. What should you do first?', a: ['Record secretly so the answers are natural', 'Ask the person for permission', 'Post it online', 'Nothing, recording is always fine'], c: 1, why: 'Respect privacy. Always ask before recording, and keep names out of your notes.' }
        ] },
      { id: '1.3', title: 'Write your one-sentence purpose',
        summary: `If you cannot say what your app is for in one sentence, it is not ready to build. Write that sentence now, before any code. It keeps you focused, and every later decision gets easier: if a feature does not serve the sentence, it can wait.`,
        more: [
          `A simple pattern works well: "My app helps [audience] [do something] so that [benefit]." Name the audience you chose, the one main thing the app does, and why that matters to them.`,
          `Test your sentence on someone who knows nothing about your idea. If they can repeat it back and it still makes sense, you are done. If they look confused, make it shorter.`
        ],
        terms: [
          ['Purpose', 'What your app is for.'],
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
        cac: 'The rules say your demo video should explain the purpose of your app in one clear sentence, and a written question asks for it too. The sentence you write here is that sentence.',
        fields: [
          { key: 'appname', label: 'Working name for my app', hint: 'Short and easy to say.', rows: 1 },
          { key: 'purpose', label: 'My one-sentence purpose', hint: 'My app helps [audience] [do something] so that [benefit].', rows: 2 }
        ],
        quiz: [
          { q: 'Which is the strongest purpose statement?', a: ['"My app is really cool and uses AI."', '"My app helps new band members learn their marching spots so that they feel ready for the first game."', '"It is an app."', '"My app has 12 screens and a login."'], c: 1, why: 'It names the audience, the one thing the app does, and the benefit.' },
          { q: 'Why write the purpose sentence before coding?', a: ['Computers will not run code without one', 'It keeps you focused on the one thing the app must do', 'It makes the code shorter', 'It makes the app load faster'], c: 1, why: 'A clear purpose helps you choose what to build first and what can wait.' },
          { q: 'A friend hears your purpose sentence and cannot repeat it back. What should you do?', a: ['Add more details to it', 'Make it shorter and clearer, then try again', 'Keep it, they were not listening', 'Skip the sentence and start coding'], c: 1, why: 'If a listener cannot repeat it, the sentence is too long or unclear. Shorten it and test again.' }
        ] },
      { id: '1.4', title: 'Make sure your idea is safe and your own',
        summary: `Before you fall in love with an idea, check three things. Is it respectful to everyone who might see it? Is it your own work? Does it leave other people's creations and private information alone unless you have the right to use them? A few minutes of checking now can save your whole project later.`,
        more: [
          `Images, music, characters, and code that someone else made belong to them. You can use them only when the owner allows it, for example through a free-to-use license. When in doubt, make your own or pick material that is clearly free to use.`,
          `Real developers use open-source libraries and AI tools all the time, and you can too. The honest way is to say what you used, and to understand every part of your own code. Start a list today of anything you use that you did not make yourself.`
        ],
        terms: [
          ['Intellectual property (IP)', 'Creations that belong to someone, such as images, music, characters, code, and brand names.'],
          ['Open source', 'Code that its authors let others use, usually with a license that says how.'],
          ['License', 'The rules for how you may use someone else\'s work.'],
          ['Privacy', 'People\'s right to control their personal information.'],
          ['Disclosure', 'Telling people clearly what tools, libraries, and AI help you used.']
        ],
        steps: [
          'Read your purpose sentence and ask: would I be comfortable showing this app to my principal and my grandparents?',
          'List any images, music, characters, or data you planned to use. For each, ask: did I make it, or do I have the right to use it?',
          'Replace anything you do not have the right to use with your own work or with free-to-use material.',
          'If your app stores information about people, write down what it stores and why. Store as little as possible.',
          'Start a credits list. Write down every library, tool, and AI assistant as you use them.'
        ],
        example: { title: 'Idea check', text: `Respectful and decent for all ages?  Yes\nMy own idea and my own work?  Yes\nUses only images and sounds I made or may use?  Yes, I drew the icons\nCollects private information?  Only a first name, saved on the device\nCredits list started?  Yes` },
        cac: 'The rules require apps to be decent and respectful and to respect intellectual property and privacy. Libraries, tools, and AI are allowed only if you clearly document them, AI cannot be the whole build, and you must understand your own code.',
        fields: [
          { key: 'rulescheck', label: 'My idea check', hint: 'Anything you need to change or replace? Write "nothing" if it all passes.', rows: 3 }
        ],
        quiz: [
          { q: 'A student wants to use a famous cartoon character as their app\'s mascot. What is the problem?', a: ['Cartoons are not allowed in apps', 'The character is someone else\'s intellectual property', 'Mascots slow the app down', 'There is no problem'], c: 1, why: 'You need the owner\'s permission to use their character. Draw your own mascot instead.' },
          { q: 'Which is the most honest way to use an AI tool on your project?', a: ['Have it write the whole app and say you wrote it', 'Use it to help you learn or fix a bug, write down that you used it, and make sure you understand the code', 'Use it secretly so nobody asks questions', 'Never tell anyone, because everyone uses AI'], c: 1, why: 'Use AI as a helper, say that you used it, and be able to explain every part of your own code.' },
          { q: 'You used an open-source charting library. What must you do?', a: ['Hide it so the app looks more original', 'Clearly document that you used it', 'Rewrite it from scratch', 'Nothing'], c: 1, why: 'Using a library is fine. Giving credit for it is the honest thing to do, and many licenses require it.' }
        ] },
      { id: '1.5', title: 'Set up your project and build journal',
        summary: `A little setup now saves a lot of stress later. You need two things: a project folder where your code and notes live, and a build journal. The journal is a simple dated list of what you did, what broke, and how you fixed it. Professional developers keep notes like this, and it is the fastest way to remember how you solved a problem.`,
        more: [
          `Keep the journal short. Three lines per work session is enough: what you did, what went wrong, and what comes next. Write it at the end of each session while it is fresh.`,
          `Later you will want to explain your app to other people, such as a class, a family member, or a judge. Your journal already holds the story of how you built it.`
        ],
        terms: [
          ['Build journal', 'A dated log of your work: what you did, what went wrong, and how you fixed it.'],
          ['Project folder', 'One folder that holds all the files for your app.'],
          ['Version history', 'Saved earlier copies of your work, so you can go back if something breaks.'],
          ['GitHub', 'A free website for storing code and its history.'],
          ['Work session', 'A block of time you set aside to work on your app.']
        ],
        steps: [
          'Create a project folder named for your app.',
          'Inside it, create a file named journal.txt (or a document). Write today\'s date and "Started my app."',
          'Create a file named CREDITS.txt and copy in your credits list from the last lesson.',
          'Copy your problem, audience, and purpose sentence from the My plan page into your journal.',
          'Put two work sessions on your calendar for this week.'
        ],
        example: { title: 'A build journal entry', text: `Nov 17\nDid: sketched 3 app ideas, picked the homework planner.\nProblem: could not decide between a website and a phone app.\nFix: chose a website because it works on my Chromebook and my phone.\nNext: sketch the main screen.` },
        cac: 'One written question asks what technical difficulty you faced and how you solved it. Your journal holds the answer. Judges may also ask to see your source code, so keep your project folder organized.',
        quiz: [
          { q: 'What is the main reason to keep a build journal?', a: ['It must be 10 pages long', 'It makes your code run faster', 'It records problems and fixes so you can remember and explain how you built your app', 'It replaces testing'], c: 2, why: 'A journal is your memory. It helps you fix similar problems later and explain your work to others.' },
          { q: 'When is the best time to write a journal entry?', a: ['Once, when the app is finished', 'At the end of each work session', 'Only when something breaks', 'Never, code explains itself'], c: 1, why: 'Short entries written right after each session are accurate and take only a minute.' },
          { q: 'What belongs in CREDITS.txt?', a: ['Your passwords', 'Every library, tool, image, sound, and AI assistant you used that you did not make yourself', 'Only your own name', 'Your quiz scores'], c: 1, why: 'A credits file gives honest credit for anything in your app that came from someone or something else.' }
        ] }
    ]
  },
  {
    id: 'm2', num: 2, title: 'Design your app',
    blurb: 'Plan before you code: the one core feature, the screens, and the data your app needs.',
    milestone: 'Sketches of your screens and a feature list split into "must have" and "if there is time."',
    topics: [
      { id: '2.1', title: 'User stories and your one core feature',
        summary: `Designing an app starts with deciding what it does, and just as important, what it does not do. A user story is one sentence that describes something a user wants to do and why. Write a few, then choose the single most important one. That is your core feature, and it is the first thing you will build.`,
        more: [
          `User stories follow a pattern: "As a [user], I want to [do something] so that [reason]." They keep you thinking about people instead of buttons.`,
          `Sort your stories into two piles. "Must have" is the short list the app is useless without. "If there is time" is everything else. Beginners almost always plan too much. A finished app with one great feature beats an unfinished app with ten.`
        ],
        terms: [
          ['Feature', 'One thing your app can do.'],
          ['User story', 'A sentence that says what a user wants to do and why.'],
          ['Core feature', 'The one feature your app cannot work without.'],
          ['Must have', 'A feature the app needs in its first version.'],
          ['MVP', 'Minimum viable product: the smallest version of your app that still solves the problem.'],
          ['Scope creep', 'When a project keeps growing because new features keep getting added.']
        ],
        steps: [
          'Write five user stories for your app using the pattern.',
          'Put a star next to the one story the app is useless without. That is your core feature.',
          'Sort the other four: "must have" or "if there is time." Try to keep "must have" to three stories or fewer.',
          'Check each must-have against your purpose sentence. If it does not serve the sentence, move it down.'
        ],
        example: { title: 'User stories for a homework planner', text: `★ As a student, I want to add an assignment with a due date so that I do not forget it.\n\nMust have:\nAs a student, I want to see my assignments in date order so that I know what is due next.\nAs a student, I want to mark an assignment done so that my list stays short.\n\nIf there is time:\nAs a student, I want a reminder the night before so that I start on time.\nAs a student, I want to pick a color for each class so that the list is easy to scan.` },
        fields: [
          { key: 'corefeature', label: 'My core feature', hint: 'One user story: As a ___, I want to ___ so that ___.', rows: 2 },
          { key: 'features', label: 'My feature list', hint: 'Two short lists: "Must have" and "If there is time."', rows: 5 }
        ],
        quiz: [
          { q: 'Which is a well-written user story?', a: ['"The app has a blue button."', '"As a club member, I want to see who is bringing snacks so that we do not get five bags of chips."', '"Use JavaScript."', '"Make it good."'], c: 1, why: 'It names the user, what they want to do, and why.' },
          { q: 'What is a core feature?', a: ['The feature with the most code', 'The one feature the app cannot work without', 'The last feature you add', 'A feature copied from another app'], c: 1, why: 'The core feature delivers your purpose. Build it first.' },
          { q: 'Your must-have list has 14 features. What should you do?', a: ['Build all 14 at once', 'Move most of them to "if there is time" and keep only what the app truly needs', 'Add more', 'Give up on the idea'], c: 1, why: 'A small first version gets finished. You can add more after the core works.' }
        ] },
      { id: '2.2', title: 'Sketch your screens',
        summary: `Before you write code, draw your app on paper. A quick sketch of each screen is called a wireframe. It shows where things go, such as titles, buttons, lists, and text boxes, without worrying about colors or pictures. Changing a drawing takes seconds. Changing code takes much longer.`,
        more: [
          `Start with the screen where your core feature happens. Draw a rectangle for the screen, then add boxes and labels for each part. Stick figures and messy handwriting are fine.`,
          `Then show how screens connect. Draw an arrow from each button to the screen it opens. This map is called a user flow. Many good first apps have only one or two screens.`
        ],
        terms: [
          ['Wireframe', 'A simple sketch of a screen that shows what goes where.'],
          ['Screen', 'One view of your app, such as a home screen or a settings screen.'],
          ['Layout', 'How the parts of a screen are arranged.'],
          ['User flow', 'The path a user takes from screen to screen to get something done.'],
          ['User interface (UI)', 'Everything the user sees and touches in your app.'],
          ['Prototype', 'An early model of your app that you can show to people before it is built.']
        ],
        steps: [
          'Take a sheet of paper. Draw the screen where your core feature happens.',
          'Label every part: title, buttons, text boxes, lists.',
          'Draw any other screens your must-have features need. Aim for three screens or fewer.',
          'Draw arrows to show which button leads where.',
          'Take a photo of your sketches and save it in your project folder.'
        ],
        example: { title: 'A one-screen wireframe, described', text: `+-----------------------------+\n|  Homework Planner           |\n|                             |\n|  [ Assignment name      ]   |\n|  [ Due date ]  ( Add )      |\n|                             |\n|  Due next:                  |\n|  1. Math worksheet   Tue    |\n|  2. Read chapter 4   Wed    |\n|  3. Science poster   Fri    |\n+-----------------------------+` },
        fields: [
          { key: 'screens', label: 'My screens', hint: 'List each screen and what is on it. Example: Home: title, add box, Add button, list of tasks.', rows: 4 }
        ],
        quiz: [
          { q: 'What is a wireframe?', a: ['The finished app', 'A simple sketch showing what goes where on a screen', 'A kind of bug', 'A programming language'], c: 1, why: 'A wireframe is a quick plan of a screen, usually drawn before any code.' },
          { q: 'Why sketch on paper before coding?', a: ['Paper is required', 'Changing a sketch is much faster than changing code', 'Computers cannot draw', 'It makes the app run faster'], c: 1, why: 'Sketching lets you try ideas and fix problems in seconds.' },
          { q: 'What does a user flow show?', a: ['How fast the app runs', 'The path a user takes from screen to screen', 'The colors of the app', 'Who wrote the code'], c: 1, why: 'A user flow maps how someone moves through your app to get something done.' }
        ] },
      { id: '2.3', title: 'Plan your data with privacy first',
        summary: `Almost every app stores data, which is the information it remembers, such as tasks, scores, or names. Before you build, list what your app needs to store and where it will be kept. Then ask the most important question: do I really need this? The safest data is data you never collect.`,
        more: [
          `Personal information is anything that can identify a real person, such as a full name, address, phone number, birthday, photo, or location. Collect as little of it as you can. A task list does not need anyone's birthday.`,
          `For a first app, the simplest and safest choice is to keep data on the user's own device and never send it anywhere. Web apps can do this with a feature called local storage, which you will learn in Module 4.`
        ],
        terms: [
          ['Data', 'Information your app stores or uses.'],
          ['Personal information', 'Data that can identify a real person.'],
          ['Privacy', 'People\'s right to control their personal information.'],
          ['Data minimization', 'Collecting only the data you truly need.'],
          ['Local storage', 'A way for a web app to save data on the user\'s own device.'],
          ['Consent', 'Permission a person gives before you collect or use their information.']
        ],
        steps: [
          'List every piece of data your app will store.',
          'Next to each one, write why the app needs it.',
          'Cross out anything without a good reason.',
          'Circle any personal information that is left. Can you avoid it or use less? For example, a first name or nickname instead of a full name.',
          'Decide where the data lives. For a first app, choose "on the user\'s device."'
        ],
        example: { title: 'Data plan for a homework planner', text: `Assignment name     needed to show the list\nDue date            needed to sort the list\nDone or not done    needed to hide finished work\nStudent full name   NOT needed. Removed.\nSchool name         NOT needed. Removed.\n\nWhere it lives: on the user's device only.` },
        cac: 'The rules say an app must not violate the privacy rights of others. An app that keeps data on the device and collects no personal information is the easiest to defend.',
        fields: [
          { key: 'data', label: 'My data plan', hint: 'What the app stores, why, and where it lives.', rows: 4 }
        ],
        quiz: [
          { q: 'Which of these is personal information?', a: ['A high score', 'A home address', 'The app\'s background color', 'The number of tasks'], c: 1, why: 'A home address can identify and locate a real person.' },
          { q: 'What does data minimization mean?', a: ['Using the smallest font', 'Collecting only the data you truly need', 'Deleting your code', 'Making files smaller'], c: 1, why: 'The less you collect, the less can go wrong.' },
          { q: 'A student\'s quiz app asks for each user\'s birthday but never uses it. What should they do?', a: ['Keep it in case it is useful later', 'Stop collecting it', 'Share it with friends', 'Ask for the address too'], c: 1, why: 'If the app does not need a piece of data, do not collect it.' }
        ] },
      { id: '2.4', title: 'Get feedback on your design',
        summary: `You know how your app is supposed to work, so your sketches make sense to you. The real test is whether they make sense to someone else. Show your wireframes to two or three people before you build, watch what confuses them, and fix the design while it is still just paper.`,
        more: [
          `Do not explain your design first. Hand over the sketch, give the person a task such as "add a homework assignment," and ask them to point at what they would tap. Stay quiet and watch. Every pause or wrong tap is a clue.`,
          `Good feedback is specific. "It's nice" does not help you. "I could not find the Add button" does. Thank people for criticism. They just saved you hours of rebuilding.`
        ],
        terms: [
          ['Feedback', 'What people tell you or show you that helps you improve your work.'],
          ['Usability', 'How easy your app is to use.'],
          ['Paper prototype', 'Testing your sketches by having someone pretend to use them.'],
          ['Task', 'Something you ask a tester to try to do in your app.'],
          ['Revise', 'To change your work to make it better.'],
          ['Iterate', 'To repeat the cycle of making, testing, and improving.']
        ],
        steps: [
          'Pick one task a user should be able to do, such as your core feature.',
          'Show your sketch to someone and ask them to do the task by pointing. Do not help.',
          'Write down where they paused, guessed wrong, or asked a question.',
          'Repeat with one or two more people.',
          'Change your sketches to fix the biggest problem you saw.'
        ],
        example: { title: 'Rate your own design', text: `Score each from 1 (no) to 4 (yes):\n\nThe idea: Is it clear what problem this solves, and for whom?\nThe design: Could a new user do the main task without help?\nThe plan: Is the core feature small enough to finish?\n\nAnything you scored 1 or 2 is what to fix next.` },
        cac: 'Judges score "implementation of the idea, including user experience and design." Testing your design with real people is how you earn that score.',
        fields: [
          { key: 'designfeedback', label: 'What I changed after feedback', hint: 'What confused people, and what did you change?', rows: 3 }
        ],
        quiz: [
          { q: 'What is the best way to test a paper sketch?', a: ['Explain every part first, then ask if they like it', 'Give the person a task and watch what they try to tap, without helping', 'Hide the sketch', 'Only ask your best friend if it is cool'], c: 1, why: 'Watching someone try a task shows you what is confusing.' },
          { q: 'Which feedback is most useful?', a: ['"Looks good."', '"I did not know what the star button does."', '"Cool."', '"Nice colors."'], c: 1, why: 'Specific feedback tells you exactly what to fix.' },
          { q: 'Two of three testers could not find your Add button. What should you do?', a: ['Blame the testers', 'Change the design so the button is easier to find', 'Remove the feature', 'Ignore it'], c: 1, why: 'If more than one person struggles, the design has a problem. Fix it now, while it is easy.' }
        ] }
    ]
  },
  {
    id: 'm3', num: 3, title: 'Coding basics',
    blurb: 'Learn the programming logic every app runs on: variables, if / else, loops, lists, and functions. Then use it to build your first small app.',
    milestone: 'A one-screen "hello app" that uses a variable, an if / else, a loop, and a list.',
    topics: [
      { id: '3.1', title: 'Choose your platform and language',
        summary: `A platform is where your app runs, such as a web browser or a phone. A programming language is how you write instructions for it. There are many good choices, but you only need one to start. This course teaches web apps written in HTML, CSS, and JavaScript, because they run on almost any device, cost nothing, and need nothing installed.`,
        more: [
          `A web app is a website that does something, like a quiz, a planner, or a game. You can open it on a Chromebook, a laptop, or a phone, and you can share it with a link. HTML builds the parts of the page, CSS makes them look good, and JavaScript makes them do things.`,
          `Other paths work too. MIT App Inventor builds Android and iPhone apps with blocks. Python is great for games, data, and tools. If you already know one of these, you can keep using it. The ideas in this module, such as variables, if / else, loops, and lists, are the same in every language.`
        ],
        terms: [
          ['Platform', 'Where an app runs, such as a web browser, a phone, or a desktop computer.'],
          ['Programming language', 'A set of words and rules for writing instructions a computer can follow.'],
          ['Web app', 'An app that runs in a web browser and is shared with a link.'],
          ['JavaScript', 'The programming language that makes web pages interactive.'],
          ['Code', 'Instructions written in a programming language.'],
          ['Run', 'To have the computer carry out your code.']
        ],
        steps: [
          'Run the code in the Try it box below. Then change the message and run it again.',
          'Think about your app. Where will people use it: at a desk, or on a phone while walking around?',
          'Pick your platform and language. If you are not sure, choose a web app with JavaScript.',
          'Write your choice in the box below and in your build journal.'
        ],
        tries: [
          { mode: 'js', title: 'Your first line of code', intro: 'Press Run. The computer follows each line from top to bottom. console.log shows a message in the output.',
            code: `console.log("Hello, world!");\nconsole.log("I am going to build an app.");`,
            challenge: 'Add a third line that shows the name of your app.' }
        ],
        fields: [
          { key: 'platform', label: 'My platform and language', hint: 'Example: a web app in HTML, CSS, and JavaScript, because my users have Chromebooks.', rows: 2 }
        ],
        cac: 'The rules allow any platform and any programming language, including block-based languages. Your demo video must name the tools and coding languages you used.',
        quiz: [
          { q: 'What is the job of JavaScript in a web app?', a: ['It decides the colors and fonts', 'It makes the page do things when people use it', 'It stores the page on the internet', 'It draws the logo'], c: 1, why: 'HTML builds the parts, CSS styles them, and JavaScript makes them interactive.' },
          { q: 'Why is a web app a good first choice?', a: ['It only works on expensive phones', 'It runs in a browser on almost any device and is easy to share', 'It needs no code', 'It cannot have bugs'], c: 1, why: 'Web apps run on Chromebooks, laptops, and phones, and you can share one with a link.' },
          { q: 'A student already knows Python well. What should they do?', a: ['Start over, because Python is not allowed', 'They can keep using Python, because the main ideas are the same in every language', 'Stop coding', 'Use two languages at once'], c: 1, why: 'Variables, if / else, loops, and lists work the same way everywhere. Use what helps you build.' }
        ] },
      { id: '3.2', title: 'Your first web page: HTML and CSS',
        summary: `Every web app starts as a page. HTML describes what is on the page using tags, such as a heading, a paragraph, or a button. CSS describes how those things look, such as color, size, and spacing. You write both as plain text, and the browser turns them into what you see.`,
        more: [
          `Most tags come in pairs. An opening tag like <h1> starts something, and a closing tag like </h1> ends it. Whatever is between them is the content. A tag can also have an id, which is a name you give it so that CSS and JavaScript can find it later.`,
          `CSS is a list of rules. Each rule picks something on the page and sets properties on it. For example, the rule h1 { color: teal; } turns every main heading teal.`
        ],
        terms: [
          ['HTML', 'The language that describes what is on a web page.'],
          ['Tag', 'A label in angle brackets, like <p> or <button>, that tells the browser what something is.'],
          ['Element', 'One thing on the page, made of an opening tag, its content, and a closing tag.'],
          ['CSS', 'The language that describes how a page looks.'],
          ['Property', 'One thing CSS can change, such as color or font-size.'],
          ['id', 'A unique name you give an element so code can find it.']
        ],
        steps: [
          'Run the page in the Try it box. Change the heading text and run it again.',
          'Change the color in the CSS to another color name, such as tomato or royalblue.',
          'Add a second paragraph with a new <p> tag.',
          'Look at one of your screen sketches from Module 2. List the HTML elements it needs, such as headings, buttons, and text boxes.'
        ],
        tries: [
          { mode: 'html', title: 'A page with a heading, text, and a button', intro: 'The part inside <style> is CSS. Everything else is HTML. Press Run to see the page.',
            code: `<style>\n  body { font-family: sans-serif; padding: 16px; }\n  h1 { color: teal; }\n  button { font-size: 18px; padding: 8px 16px; }\n</style>\n\n<h1>Homework Helper</h1>\n<p>Never forget an assignment again.</p>\n<button>Add homework</button>`,
            challenge: 'Make the page look like the start of your own app: your app name, your purpose sentence, and one button.' }
        ],
        quiz: [
          { q: 'Which tag makes a main heading?', a: ['<p>', '<h1>', '<button>', '<style>'], c: 1, why: '<h1> is the main heading. <p> is a paragraph.' },
          { q: 'What does this CSS rule do?  p { color: blue; }', a: ['Deletes every paragraph', 'Makes the text of every paragraph blue', 'Makes a blue button', 'Names the page "blue"'], c: 1, why: 'The rule picks every p element and sets its color property to blue.' },
          { q: 'Why would you give an element an id?', a: ['To make it invisible', 'So CSS and JavaScript can find that one element', 'To make the page load faster', 'It is required on every tag'], c: 1, why: 'An id is a unique name. Your code uses it to find and change that element.' }
        ] },
      { id: '3.3', title: 'Events: make a button do something',
        summary: `A page that only sits there is not an app yet. Apps respond to events. An event is something that happens, such as a click, a key press, or a tap. You write code that waits for an event and then runs. This is called event-driven programming, and almost every app works this way.`,
        more: [
          `There are three steps. First, find the element with document.getElementById and the id you gave it. Second, tell it which event to listen for with addEventListener. Third, give it the code to run, wrapped in a function.`,
          `To show a result, change what is on the page. Setting an element's textContent replaces the words inside it.`
        ],
        terms: [
          ['Event', 'Something that happens in an app, such as a click or a key press.'],
          ['Event listener', 'Code that waits for an event and runs when it happens.'],
          ['Click', 'The event that fires when someone presses a button or taps it.'],
          ['getElementById', 'A JavaScript command that finds the element with a certain id.'],
          ['textContent', 'The words inside an element. Changing it changes what the page shows.'],
          ['Input', 'What the user gives the app, such as a click or typed text.']
        ],
        steps: [
          'Run the code and press the button.',
          'Change the message that appears when the button is pressed.',
          'Do the challenge: add a second button with its own message.',
          'Look at your screen sketches. For each button, write one sentence: "When the user clicks ___, the app ___."'
        ],
        tries: [
          { mode: 'html', title: 'A button that responds', intro: 'The code inside <script> is JavaScript. It finds the button, listens for a click, and changes the message.',
            code: `<button id="helloButton">Say hello</button>\n<p id="message">Waiting for a click...</p>\n\n<script>\n  const button = document.getElementById("helloButton");\n  const message = document.getElementById("message");\n\n  button.addEventListener("click", function () {\n    message.textContent = "Hello! You clicked the button.";\n  });\n</script>`,
            challenge: 'Add a second button with the id "byeButton" that changes the message to "Goodbye!"' }
        ],
        quiz: [
          { q: 'Which of these is an event?', a: ['A color', 'A user clicking a button', 'A heading', 'A file name'], c: 1, why: 'An event is something that happens, such as a click, that code can respond to.' },
          { q: 'What does addEventListener("click", ...) do?', a: ['Clicks the button for the user', 'Runs the given code each time the element is clicked', 'Deletes the button', 'Changes the button color'], c: 1, why: 'It tells the element to run your code whenever the click event happens.' },
          { q: 'A button does nothing when clicked. The code uses getElementById("startBtn"), but the HTML says id="startButton". What is wrong?', a: ['Buttons cannot be clicked', 'The id in the code does not match the id in the HTML', 'The page needs more CSS', 'JavaScript is turned off'], c: 1, why: 'The id must match exactly. Mismatched names are one of the most common bugs.' }
        ] },
      { id: '3.4', title: 'Variables: remember things',
        summary: `Apps need to remember things: a score, a name, how many tasks are left. A variable is a named box that holds a value. You create one with the word let, give it a name, and put a value in it. Later you can read the value or change it.`,
        more: [
          `Values come in types. A number is written plainly, like 12. Text is called a string and goes inside quotes, like "Maya". A boolean is either true or false.`,
          `The equals sign does not mean "is equal to" here. It means "put the value on the right into the variable on the left." So score = score + 1 means "take the current score, add 1, and store the result back in score."`,
          `Pick names that say what the value is. tasksLeft is clear. x is a mystery.`
        ],
        terms: [
          ['Variable', 'A named place in memory that holds a value.'],
          ['Value', 'A piece of data, such as 7, "hello", or true.'],
          ['Assign', 'To put a value into a variable, using the equals sign.'],
          ['String', 'Text, written inside quotes.'],
          ['Number', 'A numeric value you can do math with.'],
          ['Boolean', 'A value that is either true or false.']
        ],
        steps: [
          'Run the code. Before each run, guess what the output will be.',
          'Change the starting score and the name. Run it again.',
          'Do the challenge.',
          'List three things your own app has to remember. Give each a clear variable name.'
        ],
        tries: [
          { mode: 'js', title: 'Make a variable, then change it', intro: 'Read each line and guess the output before you press Run.',
            code: `let playerName = "Maya";\nlet score = 0;\n\nconsole.log(playerName + " starts with " + score + " points.");\n\nscore = score + 10;\nconsole.log("After one win: " + score);\n\nscore = score + 10;\nconsole.log("After two wins: " + score);`,
            challenge: 'Add a variable named level that starts at 1. Add 1 to it, then show it with console.log.' }
        ],
        fields: [
          { key: 'variables', label: 'Things my app has to remember', hint: 'Example: tasksLeft (number), userName (string), isDone (true or false)', rows: 3 }
        ],
        quiz: [
          { q: 'What is shown?\n\nlet coins = 5;\ncoins = coins + 3;\nconsole.log(coins);', a: ['5', '3', '8', 'coins + 3'], c: 2, why: 'coins starts at 5. The second line adds 3 and stores 8 back in coins.' },
          { q: 'Which value is a string?', a: ['42', 'true', '"42"', 'score'], c: 2, why: 'Anything inside quotes is a string, even if it looks like a number.' },
          { q: 'Which is the best variable name for the number of lives a player has left?', a: ['x', 'thing', 'livesLeft', 'n2'], c: 2, why: 'A good name says what the value means, so the code is easy to read.' }
        ] },
      { id: '3.5', title: 'If / else: make decisions',
        summary: `Apps make decisions all the time. Is the password right? Is the cart empty? Did the player win? An if statement checks a condition, which is a question with a true or false answer. If it is true, one block of code runs. With else, a different block runs when it is false.`,
        more: [
          `Conditions compare values. Use === for "is equal to", !== for "is not equal to", and <, >, <=, >= for less than and greater than. Notice that a single = assigns a value, while === asks a question.`,
          `You can chain choices with else if, which checks another condition when the first one was false. You can also join conditions: && means "and", so both sides must be true. || means "or", so one true side is enough.`
        ],
        blocks: 'In CyberTeaches Academy you used the "if tank ahead" and "if ... else" blocks to help the rover decide what to do. This is the same idea, written as text.',
        terms: [
          ['Condition', 'A question the code asks that is either true or false.'],
          ['if statement', 'Code that runs a block only when a condition is true.'],
          ['else', 'The block that runs when the condition is false.'],
          ['else if', 'A second condition to check when the first one was false.'],
          ['Comparison', 'Checking two values against each other, with ===, !==, <, >, <=, or >=.'],
          ['Boolean', 'A value that is either true or false. Every condition produces one.']
        ],
        steps: [
          'Run the code with score set to 85. Then try 95, 70, and 40. Guess the output first each time.',
          'Change the messages to ones you would want to see.',
          'Do the challenge.',
          'Write one decision your own app must make, as a sentence: "If ___, then ___, otherwise ___."'
        ],
        tries: [
          { mode: 'js', title: 'Choose a message', intro: 'Only one of the three blocks runs. Change the score on the first line to see each one.',
            code: `let score = 85;\n\nif (score >= 90) {\n  console.log("Amazing! You earned a gold star.");\n} else if (score >= 70) {\n  console.log("Nice work. You passed.");\n} else {\n  console.log("Keep practicing. Try again.");\n}`,
            challenge: 'Add one more else if so that a score of exactly 100 shows "Perfect score!" Hint: check for 100 first.' }
        ],
        fields: [
          { key: 'decision', label: 'A decision my app must make', hint: 'If ___, then ___, otherwise ___.', rows: 2 }
        ],
        quiz: [
          { q: 'What is shown?\n\nlet age = 12;\nif (age >= 13) {\n  console.log("Teen");\n} else {\n  console.log("Kid");\n}', a: ['Teen', 'Kid', 'Teen and Kid', 'Nothing'], c: 1, why: '12 >= 13 is false, so the else block runs.' },
          { q: 'What is the difference between = and === ?', a: ['There is no difference', '= stores a value, and === asks whether two values are equal', '=== stores a value, and = compares', '= is for numbers and === is for text'], c: 1, why: 'A single equals sign assigns. Three equals signs compare.' },
          { q: 'What is shown?\n\nlet temp = 75;\nlet sunny = false;\nif (temp > 70 && sunny) {\n  console.log("Go to the park");\n} else {\n  console.log("Stay in");\n}', a: ['Go to the park', 'Stay in', 'Both', 'An error'], c: 1, why: '&& needs both sides to be true. sunny is false, so the else block runs.' }
        ] },
      { id: '3.6', title: 'Loops: repeat without retyping',
        summary: `Computers are great at repeating things. A loop runs the same block of code many times, so you do not have to type it many times. Use a for loop when you know how many times to repeat. Use a while loop when you want to repeat until something changes.`,
        more: [
          `A for loop has three parts inside its parentheses: where the counter starts, the condition for continuing, and how the counter changes after each round. for (let i = 1; i <= 5; i++) starts i at 1, keeps going while i is 5 or less, and adds 1 to i each time. i++ is a short way to write i = i + 1.`,
          `A while loop repeats as long as its condition is true. Something inside the loop must eventually make the condition false. If nothing does, the loop never ends. That bug is called an infinite loop. The Try it box stops your code after a few seconds if this happens, so it is safe to experiment.`
        ],
        blocks: 'In CyberTeaches Academy, the "repeat" block is a for loop, and "repeat until" is a while loop. You already know how to think in loops.',
        terms: [
          ['Loop', 'Code that runs a block again and again.'],
          ['for loop', 'A loop that repeats a set number of times, using a counter.'],
          ['while loop', 'A loop that repeats as long as a condition is true.'],
          ['Counter', 'A variable that keeps track of which round of the loop you are on. It is often named i.'],
          ['Iteration', 'One trip through the loop.'],
          ['Infinite loop', 'A loop that never ends because its condition never becomes false.']
        ],
        steps: [
          'Run the first box. Change the loop so it counts to 10.',
          'Run the second box. Change the starting battery level and guess how many lines will show.',
          'Do both challenges.',
          'Find one place in your own app where something repeats, such as showing every item in a list.'
        ],
        tries: [
          { mode: 'js', title: 'A for loop: repeat a set number of times', intro: 'The variable i counts the rounds. It changes each time through the loop.',
            code: `for (let i = 1; i <= 5; i++) {\n  console.log("Lap " + i);\n}\n\nconsole.log("Done running!");`,
            challenge: 'Make it count down from 5 to 1. Hint: start at 5, continue while i >= 1, and use i-- to subtract 1.' },
          { mode: 'js', title: 'A while loop: repeat until something changes', intro: 'This loop keeps going while the battery is above 0. Each round uses 25.',
            code: `let battery = 100;\n\nwhile (battery > 0) {\n  console.log("Battery at " + battery + "%. Still exploring.");\n  battery = battery - 25;\n}\n\nconsole.log("Battery empty. Time to recharge.");`,
            challenge: 'Add a variable named trips that starts at 0 and goes up by 1 each round. Show the total after the loop.' }
        ],
        quiz: [
          { q: 'How many times does "Hi" show?\n\nfor (let i = 0; i < 4; i++) {\n  console.log("Hi");\n}', a: ['3', '4', '5', 'Forever'], c: 1, why: 'i takes the values 0, 1, 2, and 3. That is 4 rounds. When i reaches 4, the condition is false.' },
          { q: 'What is wrong with this loop?\n\nlet n = 1;\nwhile (n < 5) {\n  console.log(n);\n}', a: ['Nothing, it shows 1 to 4', 'n never changes, so the loop never ends', 'while loops cannot use numbers', 'It needs an else'], c: 1, why: 'Nothing inside the loop changes n, so n < 5 stays true forever. Add n = n + 1 inside the loop.' },
          { q: 'You need to show a welcome message to each of 30 students. What is the best tool?', a: ['30 separate console.log lines', 'A loop', 'An if statement', 'A bigger screen'], c: 1, why: 'Loops repeat work for you. One loop handles 30 students or 300.' }
        ] },
      { id: '3.7', title: 'Lists: keep many things together',
        summary: `One variable holds one value. But apps deal with many things at once: all your tasks, every player, each photo. A list holds many values in order under one name. In JavaScript a list is called an array, and you write it with square brackets.`,
        more: [
          `Each item has a position called an index. In JavaScript, counting starts at 0, so the first item is at index 0 and the second is at index 1. To get an item, write the list name and the index in square brackets, like tasks[0].`,
          `Lists can grow. push adds an item to the end. length tells you how many items the list has. Lists and loops are best friends: a loop can visit every item, no matter how long the list gets.`
        ],
        terms: [
          ['List', 'An ordered group of values stored under one name.'],
          ['Array', 'The JavaScript word for a list.'],
          ['Item', 'One value in a list. Also called an element.'],
          ['Index', 'The position of an item in a list. In JavaScript the first index is 0.'],
          ['length', 'How many items are in a list.'],
          ['push', 'The command that adds an item to the end of a list.']
        ],
        steps: [
          'Run the code. Guess each line of output first.',
          'Change the list to hold three things from your own life, such as your classes.',
          'Do the challenge.',
          'What list does your own app need? Write its name and three example items.'
        ],
        tries: [
          { mode: 'js', title: 'Make a list, add to it, and loop over it', intro: 'The loop uses i as the index, so tasks[i] is a different item each round.',
            code: `let tasks = ["Math worksheet", "Read chapter 4", "Science poster"];\n\nconsole.log("First task: " + tasks[0]);\nconsole.log("Number of tasks: " + tasks.length);\n\ntasks.push("Practice piano");\nconsole.log("Now there are " + tasks.length + " tasks:");\n\nfor (let i = 0; i < tasks.length; i++) {\n  console.log((i + 1) + ". " + tasks[i]);\n}`,
            challenge: 'Add an if inside the loop that shows "(last one!)" after the final task. Hint: the last index is tasks.length - 1.' }
        ],
        fields: [
          { key: 'lists', label: 'A list my app needs', hint: 'Example: tasks, such as "Math worksheet", "Read chapter 4", "Science poster"', rows: 2 }
        ],
        quiz: [
          { q: 'What is shown?\n\nlet pets = ["cat", "dog", "fish"];\nconsole.log(pets[1]);', a: ['cat', 'dog', 'fish', '1'], c: 1, why: 'Indexes start at 0 in JavaScript. Index 0 is "cat" and index 1 is "dog".' },
          { q: 'What is shown?\n\nlet nums = [4, 8];\nnums.push(15);\nconsole.log(nums.length);', a: ['2', '3', '15', '27'], c: 1, why: 'push adds one item to the end, so the list now has 3 items.' },
          { q: 'Why do lists and loops work so well together?', a: ['Loops delete lists', 'A loop can visit every item, however long the list is', 'Lists make loops run only once', 'They do not work together'], c: 1, why: 'A loop from 0 up to the list length handles every item, even after the list grows.' }
        ] },
      { id: '3.8', title: 'Functions: name your steps and reuse them',
        summary: `A function is a named set of steps. You write the steps once, give them a name, and then run them any time by calling that name. Functions keep code short, and they make it easier to read, because a good name tells you what a chunk of code does.`,
        more: [
          `Functions can take inputs called parameters, which go inside the parentheses. They let one function do slightly different work each time. A function can also hand back a result with the word return.`,
          `You have already used functions. console.log is a function someone else wrote. The code you gave to addEventListener was a function too. Now you can write your own.`
        ],
        terms: [
          ['Function', 'A named block of code you can run whenever you need it.'],
          ['Call', 'To run a function by writing its name followed by parentheses.'],
          ['Parameter', 'A named input a function receives.'],
          ['Argument', 'The actual value you pass in when you call a function.'],
          ['return', 'The word that sends a result back from a function.'],
          ['Reuse', 'Using the same code in more than one place without retyping it.']
        ],
        steps: [
          'Run the code. Find where each function is defined and where it is called.',
          'Call greet with your own name.',
          'Do the challenge.',
          'Name two functions your own app might need, such as addTask or showScore.'
        ],
        tries: [
          { mode: 'js', title: 'Write a function once, use it many times', intro: 'greet shows a message. addPoints calculates a number and returns it.',
            code: `function greet(name) {\n  console.log("Welcome, " + name + "!");\n}\n\nfunction addPoints(score, points) {\n  return score + points;\n}\n\ngreet("Maya");\ngreet("Leo");\n\nlet score = 10;\nscore = addPoints(score, 5);\nconsole.log("Score is now " + score);`,
            challenge: 'Write a function named double that takes a number and returns twice that number. Show the result of double(21).' }
        ],
        quiz: [
          { q: 'What is shown?\n\nfunction area(width, height) {\n  return width * height;\n}\nconsole.log(area(3, 4));', a: ['7', '12', '34', 'area'], c: 1, why: 'The function multiplies its two inputs. 3 times 4 is 12.' },
          { q: 'What is the main benefit of a function?', a: ['It makes the screen brighter', 'You write the steps once and reuse them by name', 'It stops all bugs', 'It replaces variables'], c: 1, why: 'Functions let you reuse code and give it a clear name.' },
          { q: 'In greet("Leo"), what is "Leo"?', a: ['A loop', 'The argument passed to the function', 'A condition', 'The function name'], c: 1, why: 'The value you pass in when calling a function is an argument. Inside the function it becomes the parameter.' }
        ] },
      { id: '3.9', title: 'Build your hello app',
        summary: `Time to put it all together. A hello app is a tiny but complete app with one screen. It takes input from the user, remembers it, makes a decision, and shows a result. The one in this lesson is a small task list. It uses everything from this module: HTML, CSS, an event, variables, an if / else, a loop, a list, and a function.`,
        more: [
          `Read the code slowly before you run it. You will recognize every piece. The only new part is input.value, which reads what the user typed into a text box.`,
          `Then move it out of this page and onto your own computer. Save the code as a file named index.html in your project folder and open that file in a browser. That file is a real web app. To edit it, use any plain text editor, or a free code editor that runs in the browser, such as vscode.dev.`
        ],
        terms: [
          ['Hello app', 'A first small app that proves your tools work and you know the basics.'],
          ['Text box', 'An <input> element where the user can type.'],
          ['value', 'What is currently typed in a text box.'],
          ['index.html', 'The usual name for the main file of a web app.'],
          ['Code editor', 'A program for writing code, with helpful colors and checks.'],
          ['Bug', 'A mistake in code that makes it behave in a way you did not intend.']
        ],
        steps: [
          'Run the app. Add three tasks. Try adding an empty one and see what happens.',
          'Find the variable, the list, the if / else, the loop, and the function in the code.',
          'Change it: rename the app, change the colors, and change the messages.',
          'Do the challenge.',
          'Save the code as index.html in your project folder and open it in your browser.',
          'Write a journal entry: what you built, one thing that broke, and how you fixed it.'
        ],
        tries: [
          { mode: 'html', tall: true, title: 'A tiny task list app', intro: 'This is a complete app in one file. Every part comes from a lesson in this module.',
            code: `<style>\n  body { font-family: sans-serif; padding: 16px; }\n  h1 { color: teal; }\n  input, button { font-size: 16px; padding: 6px 10px; }\n</style>\n\n<h1>My Tasks</h1>\n<input id="taskInput" placeholder="Type a task">\n<button id="addButton">Add</button>\n<p id="message">You have no tasks yet.</p>\n<ol id="taskList"></ol>\n\n<script>\n  let tasks = [];\n\n  const input = document.getElementById("taskInput");\n  const message = document.getElementById("message");\n  const list = document.getElementById("taskList");\n\n  function showTasks() {\n    list.innerHTML = "";\n    for (let i = 0; i < tasks.length; i++) {\n      const item = document.createElement("li");\n      item.textContent = tasks[i];\n      list.appendChild(item);\n    }\n    message.textContent = "You have " + tasks.length + " tasks.";\n  }\n\n  document.getElementById("addButton").addEventListener("click", function () {\n    const text = input.value;\n    if (text === "") {\n      message.textContent = "Type a task first.";\n    } else {\n      tasks.push(text);\n      input.value = "";\n      showTasks();\n    }\n  });\n</script>`,
            challenge: 'Add a "Clear all" button that empties the list. Hint: set tasks = [] and then call showTasks().' }
        ],
        cac: 'The rules say the app must demonstrate some degree of functionality to be competitive. A small app that really works beats a big idea that does not run.',
        quiz: [
          { q: 'In the task app, what does tasks.push(text) do?', a: ['Deletes the task', 'Adds what the user typed to the end of the list', 'Shows the list', 'Checks whether the box is empty'], c: 1, why: 'push adds an item to the end of the tasks list.' },
          { q: 'Why does the app check if (text === "") before adding?', a: ['To make the app slower', 'To avoid adding an empty task when the box is blank', 'Because loops require it', 'To change the color'], c: 1, why: 'The condition catches an empty text box and shows a helpful message instead of adding a blank task.' },
          { q: 'Why is showTasks written as a function?', a: ['Functions are required by HTML', 'So the same steps can run any time the list changes', 'To hide the list', 'It makes the list longer'], c: 1, why: 'Redrawing the list is needed in more than one place, so it is written once and called by name.' }
        ] }
    ]
  },
  {
    id: 'm4', num: 4, title: 'Build the core',
    blurb: 'Build the one feature your app cannot live without, from start to finish.',
    milestone: 'Your core feature works from start to finish, and your code is saved with its history.',
    topics: [
      { id: '4.1', title: 'Break the core feature into small steps',
        summary: `A whole app is too big to build in one go. Programmers break big jobs into small steps, build one step, test it, and then move on. This is called decomposition, and it is the most useful habit you can learn. Each step should be small enough to finish in one work session.`,
        more: [
          `Start by writing what should happen in plain words, one line at a time. This is called pseudocode. It is not real code, so there are no syntax errors to fight. You are just thinking clearly about the order of things.`,
          `Then build in tiny pieces. Get one line of your plan working, and run it. Never write fifty lines before running anything. When you run after every small change, a new bug can only be in the few lines you just wrote.`
        ],
        terms: [
          ['Decomposition', 'Breaking a big problem into smaller ones you can solve one at a time.'],
          ['Pseudocode', 'A plan for code written in plain words.'],
          ['Algorithm', 'A set of steps that solves a problem.'],
          ['Incremental development', 'Building and testing one small piece at a time.'],
          ['Test', 'To run your code and check that it does what you expect.'],
          ['Working session goal', 'The one small thing you plan to finish today.']
        ],
        steps: [
          'Write your core feature as pseudocode: five to ten plain lines.',
          'Turn each line into a small task. Order them so each one builds on the last.',
          'Open your index.html from lesson 3.9 and rename things to fit your app, or start a fresh file.',
          'Build the first task only. Run it. Fix it until it works.',
          'Write a journal entry, then move to the next task next session.'
        ],
        example: { title: 'Pseudocode for "add an assignment"', text: `When the user clicks Add:\n  read the assignment name from the text box\n  read the due date\n  if the name is empty, show "Type a name first" and stop\n  otherwise make a new assignment with that name and date\n  add it to the list of assignments\n  sort the list by due date\n  show the list on the page\n  clear the text box` },
        fields: [
          { key: 'buildsteps', label: 'My build steps', hint: 'The small tasks for your core feature, in order.', rows: 6 }
        ],
        quiz: [
          { q: 'What is decomposition?', a: ['Deleting old code', 'Breaking a big problem into smaller, solvable pieces', 'Making code run faster', 'Writing code without testing'], c: 1, why: 'Small pieces are easier to build, test, and fix.' },
          { q: 'Why run your code after every small change?', a: ['To use more battery', 'So a new bug can only be in the few lines you just wrote', 'Because the computer forgets code', 'It is not useful'], c: 1, why: 'Frequent testing makes bugs easy to find.' },
          { q: 'What is pseudocode?', a: ['Code with errors', 'A plan written in plain words, before real code', 'A secret language', 'Code copied from the internet'], c: 1, why: 'Pseudocode lets you think about the steps without worrying about exact syntax.' }
        ] },
      { id: '4.2', title: 'Save and load data',
        summary: `Right now your app forgets everything when the page is closed. Variables live only while the page is open. To remember data between visits, a web app can save it on the user's device with local storage. You save when something changes, and you load when the app starts.`,
        more: [
          `Local storage holds text only. To save a list, first turn it into text with JSON.stringify. To get the list back, turn the text into a list again with JSON.parse. JSON is just a standard way to write data as text.`,
          `Local storage has two main commands. localStorage.setItem("tasks", text) saves text under a name. localStorage.getItem("tasks") reads it back, or gives null if nothing was saved yet. Always check for null before you use what you loaded.`,
          `Local storage stays on one device and one browser. It is private to the user, which fits the privacy plan you made in Module 2. It does not sync between a phone and a laptop.`
        ],
        terms: [
          ['Persistence', 'Keeping data after the app is closed.'],
          ['Local storage', 'A place in the browser where a web app can save text on the user\'s device.'],
          ['JSON', 'A standard way to write data, such as lists, as text.'],
          ['JSON.stringify', 'Turns a value such as a list into text.'],
          ['JSON.parse', 'Turns that text back into a value.'],
          ['null', 'A special value that means "nothing here."']
        ],
        steps: [
          'Run the Try it box to see a list turn into text and back.',
          'In your own index.html, add a save function like the one in the example. Call it every time your data changes.',
          'Add the loading lines near the top of your script, so saved data comes back when the page opens.',
          'Test it: add something, close the tab, and open the file again. Is it still there?'
        ],
        example: { title: 'Saving and loading a list in a web app', text: `let tasks = [];\n\n// Load: runs once when the page opens\nconst saved = localStorage.getItem("tasks");\nif (saved !== null) {\n  tasks = JSON.parse(saved);\n}\n\n// Save: call this every time tasks changes\nfunction saveTasks() {\n  localStorage.setItem("tasks", JSON.stringify(tasks));\n}` },
        tries: [
          { mode: 'js', title: 'Turn a list into text and back', intro: 'Local storage can only hold text. This is how a list makes the trip.',
            code: `let tasks = ["Math worksheet", "Read chapter 4"];\n\nlet text = JSON.stringify(tasks);\nconsole.log("As text: " + text);\n\nlet loaded = JSON.parse(text);\nconsole.log("Back as a list with " + loaded.length + " items.");\nconsole.log("First item: " + loaded[0]);`,
            challenge: 'Add a third task to the list and run it again. What changes in the text?' }
        ],
        quiz: [
          { q: 'Why does an app without saved data forget everything when it is closed?', a: ['The browser deletes the app', 'Variables only live while the page is open', 'Lists cannot hold data', 'The internet turned off'], c: 1, why: 'Variables are temporary. To keep data, you have to save it somewhere.' },
          { q: 'What does JSON.stringify do?', a: ['Deletes a list', 'Turns a value such as a list into text', 'Sorts a list', 'Draws a string on the screen'], c: 1, why: 'Local storage holds only text, so lists are converted to text first.' },
          { q: 'localStorage.getItem("tasks") gives null. What does that mean?', a: ['The app is broken', 'Nothing has been saved under that name yet', 'The list is full', 'The user typed "null"'], c: 1, why: 'null means there is no saved value, which is normal the first time someone opens the app.' }
        ] },
      { id: '4.3', title: 'Debugging: find and fix errors',
        summary: `Every programmer writes bugs, every day. A bug is a mistake that makes code do something you did not intend. Debugging is the skill of finding and fixing bugs, and it is a normal part of coding, not a sign you are bad at it. Good debuggers stay calm and follow a method.`,
        more: [
          `There are three kinds of errors. A syntax error breaks the rules of the language, like a missing bracket, and the code will not run at all. A runtime error happens while the code runs, like using a variable that does not exist. A logic error is the sneaky one: the code runs, but gives the wrong answer.`,
          `The method: read the error message, because it usually names the problem and the line. Find the last thing that worked. Use console.log to show the values of your variables, so you can see where they stop being what you expected. Change one thing at a time. If you are stuck, explain the code out loud, line by line, to a friend or even a rubber duck. Explaining often reveals the mistake.`
        ],
        terms: [
          ['Bug', 'A mistake in code that makes it behave in a way you did not intend.'],
          ['Debugging', 'Finding and fixing bugs.'],
          ['Syntax error', 'Code that breaks the rules of the language and cannot run.'],
          ['Runtime error', 'An error that happens while the code is running.'],
          ['Logic error', 'Code that runs but does the wrong thing.'],
          ['Console', 'The place where console.log messages and error messages appear. In a browser, press F12 or right-click and choose Inspect.']
        ],
        steps: [
          'Fix all three bugs in the Try it box. Run after each fix.',
          'In your own app, open the browser console (F12, or right-click and choose Inspect, then Console).',
          'Add a console.log to show one of your variables, and find it in the console.',
          'Next time something breaks, write the bug and the fix in your journal.'
        ],
        tries: [
          { mode: 'js', title: 'Bug hunt: this code has three bugs', intro: 'It should show the total of the prices and say whether it is over the $20 budget. Fix one bug at a time and run after each fix.',
            code: `let prices = [4, 7, 12];\nlet total = 0;\n\nfor (let i = 0; i <= prices.length; i++) {\n  total = total + prices[i];\n}\n\nconsole.log("Total: " + totl);\n\nif (total < 20) {\n  console.log("Over budget!");\n} else {\n  console.log("Within budget.");\n}`,
            challenge: 'When it is fixed, the output is "Total: 23" and "Over budget!" Name the kind of error each bug was.' }
        ],
        cac: 'One written question asks: "What technical or coding difficulty did you face, and how did you address it?" Every bug you write in your journal is a possible answer.',
        quiz: [
          { q: 'Your code runs with no error message, but the total it shows is wrong. What kind of error is this?', a: ['Syntax error', 'Runtime error', 'Logic error', 'Network error'], c: 2, why: 'The code runs but does the wrong thing. That is a logic error.' },
          { q: 'What should you do first when you see an error message?', a: ['Delete all your code', 'Read it, because it usually names the problem and the line', 'Restart the computer', 'Ignore it'], c: 1, why: 'Error messages are clues. Read them carefully.' },
          { q: 'How does console.log help with debugging?', a: ['It fixes bugs automatically', 'It shows the values of variables so you can see where things go wrong', 'It makes the code faster', 'It hides errors'], c: 1, why: 'Showing values lets you compare what the code is doing with what you expected.' }
        ] },
      { id: '4.4', title: 'Use libraries and AI the honest way',
        summary: `Professional developers rarely write everything from scratch. They use libraries, which are code other people wrote and shared, and many use AI assistants. You can too. The honest way has two rules: say what you used, and understand every part of your own app.`,
        more: [
          `Keep a credits file. For each library, image, sound, or font you did not make, write its name, where it came from, and what you used it for. Check that you are allowed to use it. Look for words like "free to use," "open source," or a license name.`,
          `Treat an AI assistant like a tutor, not a builder. Good uses: asking it to explain an error message, explain a concept, or suggest why a function is not working. A bad use: asking it to write your whole app. If it does, you have not learned to build, and you cannot explain or fix what it wrote.`,
          `A simple test: could you explain every line of your app to a friend? If AI or a tutorial gave you a piece you do not understand, slow down, ask how it works, and rewrite it in your own way before you keep it.`
        ],
        terms: [
          ['Library', 'Code written by someone else that you can use in your project.'],
          ['Open source', 'Code that its authors let others use, usually under a license.'],
          ['License', 'The rules for how you may use someone else\'s work.'],
          ['Credit', 'Saying clearly who made something you used.'],
          ['AI assistant', 'A program that can answer questions and write text or code.'],
          ['AI use log', 'Your own record of when you used AI and what for.']
        ],
        steps: [
          'Open CREDITS.txt in your project folder. Add anything in your app that you did not make.',
          'Add a section named "AI use." If you have used AI, write what you asked and what you did with the answer. If not, write "None so far."',
          'Pick the hardest part of your code. Explain it out loud, line by line.',
          'If there is a line you cannot explain, look it up or ask how it works, then rewrite it yourself.'
        ],
        example: { title: 'CREDITS.txt', text: `Homework Planner by Maya R.\n\nLibraries: none\nIcons: drawn by me\nFont: Atkinson Hyperlegible (Google Fonts, free to use)\n\nAI use:\nNov 20. Asked an AI assistant what "undefined" means in an error.\n  It explained that my loop went one step past the end of the list. I fixed the loop myself.\nDec 2. Asked how to sort a list by date. It showed an example.\n  I rewrote it for my assignments and can explain each line.` },
        cac: 'The rules: all coding must be done by the student or team. Libraries, frameworks, and tools are allowed if clearly documented. AI is permitted only if fully disclosed, it must not be the entire technical development, and you must show significant personal contribution and technical understanding. Your credits file and AI use log are your proof.',
        quiz: [
          { q: 'Which is an honest use of an AI assistant?', a: ['Having it write the whole app, then saying you wrote it', 'Asking it to explain an error message, then fixing the bug yourself and noting it in your log', 'Hiding that you used it', 'Copying its answer without reading it'], c: 1, why: 'Use AI to learn and get unstuck, understand the result, and say that you used it.' },
          { q: 'What belongs in a credits file?', a: ['Only your name', 'Each library, image, sound, font, or tool you did not make, and where it came from', 'Your passwords', 'Nothing'], c: 1, why: 'Credits give honest attribution and show what work is your own.' },
          { q: 'A tutorial gave you ten lines that work, but you cannot explain them. What is the best move?', a: ['Keep them and hope nobody asks', 'Learn how they work and rewrite them in your own way', 'Delete your whole app', 'Add more lines you do not understand'], c: 1, why: 'You should be able to explain every part of your own app.' }
        ] },
      { id: '4.5', title: 'Save your history with GitHub',
        summary: `Imagine breaking your app the night before you show it, with no way to go back. Version history prevents that. It is a record of saved copies of your project over time. GitHub is a free website that stores your code and its history online, so it is backed up and easy to share.`,
        more: [
          `Each saved point is called a commit. A commit has a short message that says what changed, such as "Add due dates." A project stored on GitHub is called a repository, or repo.`,
          `GitHub accounts are for people 13 and older. If you are younger, ask a parent or guardian whether they can hold the account for you. You can also keep history without GitHub: at the end of each work session, copy your project folder and add the date to the copy's name.`,
          `Never upload private information. No passwords, no home address, and no data about real people. A public repository can be seen by anyone.`
        ],
        terms: [
          ['Version history', 'Saved earlier versions of your project that you can go back to.'],
          ['GitHub', 'A website that stores code and its history.'],
          ['Repository (repo)', 'A project folder stored on GitHub.'],
          ['Commit', 'One saved point in your project\'s history, with a message.'],
          ['Commit message', 'A short note that says what changed.'],
          ['Backup', 'A second copy of your work kept somewhere safe.']
        ],
        steps: [
          'With a parent or guardian\'s OK, create a free account at github.com. If you are under 13, use dated folder copies instead and skip to the last step.',
          'Create a new repository. Name it after your app.',
          'Choose "Add file", then "Upload files". Add index.html, CREDITS.txt, and your journal.',
          'Write a commit message such as "First working version" and commit.',
          'From now on, upload your changed files at the end of each work session, with a message that says what changed.'
        ],
        example: { title: 'Good commit messages', text: `Add the assignment list\nSave assignments so they stay after closing\nFix bug: empty names were being added\nSort assignments by due date\n\nNot helpful: "stuff", "update", "asdf"` },
        cac: 'Judges have the right to request access to your app and source code to verify it works as you say. A GitHub repository with dated commits makes that easy, and shows your work was done after the contest start date.',
        quiz: [
          { q: 'What is a commit?', a: ['A bug', 'A saved point in your project\'s history, with a message', 'A kind of loop', 'A password'], c: 1, why: 'Each commit records what your project looked like at that moment.' },
          { q: 'Which is the best commit message?', a: ['"stuff"', '"Fix bug: empty tasks were being added"', '"asdfgh"', '"final final v2"'], c: 1, why: 'A good message says what changed, so you can find that version later.' },
          { q: 'What should you never upload to a public repository?', a: ['Your index.html', 'Passwords or private information about real people', 'Your credits file', 'Your commit messages'], c: 1, why: 'Anyone can see a public repository. Keep private information out of it.' }
        ] }
    ]
  },
  {
    id: 'm5', num: 5, title: 'Test and polish',
    blurb: 'Make it easy to use, try to break it, and fix what matters most.',
    milestone: 'A tested app and a short test report.',
    topics: [
      { id: '5.1', title: 'Add your "if there is time" features',
        summary: `Your core feature works. Now you can make the app better, carefully. Go back to your "if there is time" list from Module 2 and add features one at a time. After each one, test the whole app again, because new code can break old code.`,
        more: [
          `Choose what to add by asking two questions. How much does it help the user? How hard is it to build? Start with features that help a lot and are easy. Leave the ones that are hard and help only a little.`,
          `Set a stopping point. Decide on a date when you will stop adding features and only fix and polish. Apps that keep growing until the last day usually ship with bugs.`
        ],
        terms: [
          ['Priority', 'How important something is compared with other things.'],
          ['Regression', 'A bug in something that used to work, caused by a new change.'],
          ['Feature freeze', 'The point when you stop adding features and only fix and polish.'],
          ['Polish', 'Small improvements that make an app feel finished.'],
          ['Trade-off', 'Giving up one thing to get another, such as fewer features for fewer bugs.'],
          ['Backlog', 'Your list of features and fixes that are not done yet.']
        ],
        steps: [
          'Rate each "if there is time" feature: how much it helps (1 to 3) and how hard it is (1 to 3).',
          'Pick the one that helps most and is easiest. Break it into steps, like you did in lesson 4.1.',
          'Build it. Then test your core feature again to make sure it still works.',
          'Save a version with a clear message before you start the next feature.',
          'Write your feature freeze date in your journal.'
        ],
        example: { title: 'Choosing what to add', text: `Feature                Helps  Hard   Decision\nMark as done            3      1     Build first\nColor per class         2      1     Build second\nSort by class           2      2     If time\nNight-before reminder   3      3     Save for version 2.0` },
        quiz: [
          { q: 'You have time for one more feature. Which should you choose?', a: ['The hardest one, to impress people', 'One that helps users a lot and is easy to build', 'One nobody asked for', 'All of them at once'], c: 1, why: 'High help and low difficulty gives the most value for your time.' },
          { q: 'After adding a new feature, your Add button stops working. What is this called?', a: ['A feature freeze', 'A regression', 'A wireframe', 'A commit'], c: 1, why: 'A regression is a bug in something that used to work. Retest old features after every change.' },
          { q: 'Why set a feature freeze date?', a: ['To stop coding forever', 'To leave time to fix bugs and polish before you share the app', 'Because features expire', 'To delete old features'], c: 1, why: 'Stopping new features early gives you time to make the app solid.' }
        ] },
      { id: '5.2', title: 'Design that is easy for everyone to use',
        summary: `An app can work perfectly and still be hard to use. Good design means people can see what to do, read everything easily, and never feel lost. It also means the app works for everyone, including people who cannot see well, cannot use a mouse, or are using a small phone. That is called accessibility.`,
        more: [
          `A few rules fix most problems. Make text big enough to read, at least 16 pixels. Use strong contrast, such as dark text on a light background. Make buttons large enough to tap, and label them with what they do, such as "Add task" instead of "OK" or "Go."`,
          `Do not rely on color alone to show meaning, because some people cannot tell red from green. Add a word or a symbol too. Be consistent: the same kind of button should look the same on every screen. When something goes wrong, show a friendly message that says how to fix it.`
        ],
        terms: [
          ['User experience (UX)', 'How it feels to use your app.'],
          ['Accessibility', 'Designing so that everyone can use your app, including people with disabilities.'],
          ['Contrast', 'How different the text color is from the background color.'],
          ['Label', 'Words that say what a button or text box is for.'],
          ['Consistency', 'Making similar things look and work the same way.'],
          ['Responsive', 'A design that adjusts to fit different screen sizes.']
        ],
        steps: [
          'Fix the page in the Try it box using the rules above.',
          'Open your own app on a phone or make the browser window narrow. Can you still read and tap everything?',
          'Try using your app with only the keyboard: Tab to move, Enter to press.',
          'Check every button label. Does it say what will happen?',
          'Fix the two biggest problems you found.'
        ],
        tries: [
          { mode: 'html', title: 'Fix this hard-to-use page', intro: 'This page works, but it is hard to read and use. Change the CSS and the words to fix it.',
            code: `<style>\n  body { font-family: sans-serif; padding: 16px; background: white; }\n  h1 { color: #dddddd; font-size: 14px; }\n  p { color: yellow; font-size: 9px; }\n  button { font-size: 8px; padding: 1px; }\n</style>\n\n<h1>Snack Sign-Up</h1>\n<p>Tell your club what you are bringing this week.</p>\n<input placeholder="?">\n<button>OK</button>`,
            challenge: 'Make the heading large and dark, the paragraph readable, the button big with a clear label, and the text box hint helpful.' }
        ],
        cac: 'Judges score "implementation of the idea, including user experience and design." A clean, readable app that anyone can use scores better than a flashy one that confuses people.',
        quiz: [
          { q: 'Which button label is best?', a: ['"OK"', '"Click"', '"Add task"', '"Button 1"'], c: 2, why: 'A good label says exactly what will happen.' },
          { q: 'Why should you not use color alone to show that something is wrong?', a: ['Color slows the app down', 'Some people cannot tell certain colors apart, so add words or a symbol too', 'Colors are not allowed', 'Red is unlucky'], c: 1, why: 'Accessible designs give more than one signal, such as color plus a message.' },
          { q: 'Which text is easiest to read?', a: ['Light gray on white', 'Yellow on white', 'Dark text on a light background', 'Red on green'], c: 2, why: 'Strong contrast between text and background makes reading easy.' }
        ] },
      { id: '5.3', title: 'Test with three real users',
        summary: `You have tested your app many times, but you always use it the way you meant it to be used. Real users will do things you never imagined. Ask three people to try your app while you watch quietly. You will find more problems in fifteen minutes than in a week of testing alone.`,
        more: [
          `Before the testers arrive, write a test plan: a list of things to try and what should happen for each. Include unusual inputs called edge cases, such as an empty box, a very long name, or pressing a button twice.`,
          `During the test, give each person a task and do not help. Write down every bug and every moment of confusion. Afterward, sort the problems. Fix anything that stops the main task first. Small annoyances come after that.`
        ],
        terms: [
          ['User testing', 'Watching real people use your app to find problems.'],
          ['Test plan', 'A list of things to try and what should happen.'],
          ['Test case', 'One thing to try, with its expected result.'],
          ['Edge case', 'An unusual input or situation, such as an empty box or a huge number.'],
          ['Bug report', 'A note that says what happened, what should have happened, and how to make it happen again.'],
          ['Expected result', 'What the app should do if it is working correctly.']
        ],
        steps: [
          'Write a test plan with at least six test cases. Include three edge cases.',
          'Run the plan yourself first. Fix anything that fails.',
          'Ask three people to try your app. Give each the same task. Watch and take notes.',
          'Write a bug report for each problem.',
          'Fix the problems that block the main task. Then retest.'
        ],
        example: { title: 'Part of a test plan', text: `Test                              Expected                 Result\nAdd "Math worksheet"              Shows in the list         Pass\nAdd with an empty box             "Type a name first"       Pass\nAdd a 200-letter name             Wraps, does not break     FAIL: runs off the screen\nClose and reopen the page         List is still there       Pass\nPress Add twice quickly           Only one item added       Pass\nUse on a phone                    Everything fits           FAIL: button cut off` },
        fields: [
          { key: 'testreport', label: 'My test report', hint: 'How many tests passed, what users struggled with, and what you fixed.', rows: 5 }
        ],
        quiz: [
          { q: 'Which is an edge case for a "type your age" box?', a: ['Typing 14', 'Typing 15', 'Leaving it empty or typing -5', 'Typing 13'], c: 2, why: 'Edge cases are unusual inputs. Good apps handle them without breaking.' },
          { q: 'During a user test, the tester cannot find the Save button. What should you do?', a: ['Point to it right away', 'Stay quiet, write it down, and fix the design later', 'Tell them they are wrong', 'End the test'], c: 1, why: 'Their confusion is exactly what you need to see. Note it and fix it afterward.' },
          { q: 'What does a good bug report include?', a: ['Only "it is broken"', 'What happened, what should have happened, and how to make it happen again', 'The tester\'s home address', 'A guess about who caused it'], c: 1, why: 'Clear steps and expected results make a bug possible to find and fix.' }
        ] },
      { id: '5.4', title: 'Clean up and comment your code',
        summary: `Code is read far more often than it is written, sometimes by other people and often by you, weeks later. Clean code uses clear names, tidy spacing, and short comments that explain why something is done. Cleaning up does not change what your app does. It changes how easy it is to understand.`,
        more: [
          `A comment is a note for humans that the computer ignores. In JavaScript, a comment starts with two slashes. Write comments that explain the reason or the tricky part. Do not repeat what the code already says.`,
          `Other cleanup jobs: rename unclear variables, delete code you no longer use, indent blocks the same way everywhere, and move repeated code into a function. Run your tests again after cleaning to make sure nothing broke.`
        ],
        terms: [
          ['Comment', 'A note in code for people to read. The computer ignores it.'],
          ['Readable', 'Easy for a person to understand.'],
          ['Indentation', 'Spaces at the start of a line that show which code belongs inside a block.'],
          ['Refactor', 'To improve how code is written without changing what it does.'],
          ['Dead code', 'Code that is never used and should be deleted.'],
          ['Documentation', 'Written explanation of what a program does and how to use it.']
        ],
        steps: [
          'Clean up the code in the Try it box. It should show the same output when you are done.',
          'In your own app, rename any variable whose name does not say what it holds.',
          'Add a comment at the top of the file: the app name, your name, and its purpose sentence.',
          'Add a one-line comment above each function saying what it is for.',
          'Delete code you do not use. Run your test plan again. Save a new version.'
        ],
        tries: [
          { mode: 'js', title: 'Make this code readable', intro: 'This code works, but it is hard to understand. Rename the variables, fix the spacing, and add comments. The output must stay the same.',
            code: `let a = [3, 5, 4];\nlet b = 0;\nfor (let i = 0; i < a.length; i++) {\nb = b + a[i];\n}\nlet c = b / a.length;\nconsole.log(c);\nif (c > 3) { console.log("yes"); } else { console.log("no"); }`,
            challenge: 'Hint: a holds hours of practice on three days. What do b and c really mean? Make the final messages say something useful.' }
        ],
        cac: 'Judges score "demonstrated excellence of coding and programming skills" and may ask to see your source code. Clear names and comments help them see your skill.',
        quiz: [
          { q: 'What is a comment in code?', a: ['A bug', 'A note for people that the computer ignores', 'A kind of loop', 'An error message'], c: 1, why: 'Comments explain code to human readers.' },
          { q: 'Which comment is most useful?', a: ['// add 1 to i', '// Skip the first row because it holds the column titles', '// code', '// this is a variable'], c: 1, why: 'Good comments explain why, not what the code already says.' },
          { q: 'What does refactoring change?', a: ['What the app does', 'How the code is written, without changing what it does', 'The app\'s name', 'The user\'s data'], c: 1, why: 'Refactoring improves the code\'s structure while keeping its behavior the same.' }
        ] }
    ]
  },
  {
    id: 'm6', num: 6, title: 'Share your app',
    blurb: 'Put your app in front of people: publish it, demo it, and plan what comes next.',
    milestone: 'Your app is online and you have shown it to an audience.',
    topics: [
      { id: '6.1', title: 'Put your app online',
        summary: `So far your app lives in a file on your computer. Publishing puts it on the internet, so anyone with the link can use it. For a web app made of HTML, CSS, and JavaScript files, this is free and takes a few minutes with GitHub Pages.`,
        more: [
          `GitHub Pages turns a repository into a website. Your main file must be named index.html. In your repository, open Settings, then Pages. Under "Build and deployment," choose "Deploy from a branch," pick the main branch, and save. After a minute or two, your app is live at an address like yourname.github.io/your-app.`,
          `Before you publish, look through your files one more time. Remove anything private. Then test the live link on a different device, because problems sometimes show up only after publishing. If you cannot use GitHub, you can still share your app by sending the project folder to someone, who can open index.html in a browser.`
        ],
        terms: [
          ['Publish', 'To put your app where other people can reach it.'],
          ['Host', 'A service that stores your app and serves it to visitors.'],
          ['GitHub Pages', 'A free service that turns a GitHub repository into a website.'],
          ['URL', 'The web address of your app.'],
          ['Live', 'Available on the internet right now.'],
          ['Deploy', 'To send a new version of your app to the place where people use it.']
        ],
        steps: [
          'Make sure your main file is named index.html and your latest version is uploaded to your repository.',
          'Check your files for anything private, and remove it.',
          'In the repository, go to Settings, then Pages. Choose "Deploy from a branch," pick main, and save.',
          'Wait a minute or two, then open the link GitHub shows you.',
          'Test the live app on a phone and on a computer. Send the link to one person and ask them to try it.'
        ],
        example: { title: 'Before you publish', text: `Main file is named index.html\nNo passwords or private information in any file\nCREDITS.txt is up to date\nThe app works when opened in a fresh browser window\nA parent or guardian knows it is going online` },
        quiz: [
          { q: 'What does it mean to publish a web app?', a: ['Print the code on paper', 'Put it on the internet so people can use it with a link', 'Delete the old version', 'Email it to yourself'], c: 1, why: 'Publishing makes your app reachable by other people.' },
          { q: 'What must your main file be named for GitHub Pages to show your app?', a: ['app.txt', 'index.html', 'main.doc', 'home.js'], c: 1, why: 'Web hosts look for index.html as the starting page.' },
          { q: 'What should you check before publishing?', a: ['That the files contain no private information', 'That the app has at least 20 screens', 'That nobody else can open it', 'That the code has no comments'], c: 0, why: 'Anything you publish can be seen by anyone, so remove private information first.' }
        ] },
      { id: '6.2', title: 'Give a two-minute demo',
        summary: `A demo is a short, live show of your app. It answers three questions quickly: what problem does this solve, who is it for, and does it work? Two minutes is plenty. A good demo tells a small story about one user and shows the app doing its main job.`,
        more: [
          `Use this order. Start with the problem and who has it. Say your purpose sentence. Then show the app working, by doing the main task on screen while you describe it. Mention what you used to build it and one thing you learned. End with what you would add next.`,
          `Practice out loud with a timer at least three times. Set up your app with a little example data before you start, so the screen is not empty. If something breaks during a demo, stay calm, say what should have happened, and keep going. Everyone who builds software has had a demo go wrong.`
        ],
        terms: [
          ['Demo', 'A short showing of your app in action.'],
          ['Audience', 'The people watching your demo.'],
          ['Hook', 'An opening line that makes people want to listen.'],
          ['Script', 'A written plan of what you will say and show.'],
          ['Rehearse', 'To practice before the real thing.'],
          ['Call to action', 'What you ask your audience to do next, such as trying the app.']
        ],
        steps: [
          'Write a demo script using the order above. Keep it under 250 words.',
          'Put example data in your app so it looks real.',
          'Practice out loud with a timer. Cut words until you are under two minutes.',
          'Give your demo to a real audience: your class, your family, or a friend.',
          'Ask for one thing they liked and one thing that was unclear.'
        ],
        example: { title: 'A two-minute demo plan', text: `0:00  Problem: "Last month I forgot three assignments. My friends do too."\n0:15  Purpose: "Homework Planner helps students see what is due next, so nothing gets forgotten."\n0:25  Show it: add an assignment, watch the list sort, mark one done, reload to show it saves.\n1:15  How I built it: HTML, CSS, JavaScript. A list, a loop, and local storage.\n1:35  What I learned: my hardest bug and how I fixed it.\n1:50  Next: reminders the night before.` },
        fields: [
          { key: 'demoscript', label: 'My demo script', hint: 'Problem, purpose sentence, what you will show, how you built it, what you learned, what is next.', rows: 8 }
        ],
        quiz: [
          { q: 'What should a demo start with?', a: ['Every line of your code', 'The problem and who has it', 'An apology', 'Your favorite color'], c: 1, why: 'Starting with the problem tells the audience why your app matters.' },
          { q: 'What is the most important part of a demo?', a: ['Reading your code aloud', 'Showing the app doing its main job', 'A long introduction', 'Talking as fast as you can'], c: 1, why: 'People want to see that the app works.' },
          { q: 'Something breaks in the middle of your demo. What should you do?', a: ['Stop and leave', 'Stay calm, say what should have happened, and keep going', 'Blame the computer loudly', 'Start over from the beginning three times'], c: 1, why: 'Staying calm and moving on is what experienced presenters do.' }
        ] },
      { id: '6.3', title: 'Record a demo video',
        summary: `A demo video lets people see your app when you are not there to show it. It is your two-minute demo, recorded: your screen, your voice, and your app working. You do not need a camera crew or fancy editing. Clear sound and a clear screen matter most.`,
        more: [
          `Most devices can record the screen with no extra software. On a Chromebook, use Screen capture in the quick settings menu. On Windows, the Snipping Tool can record video. On a Mac, press Shift, Command, and 5. Phones and tablets have a screen recording button in their control menus.`,
          `Record in a quiet room and speak a little slower than normal. Close other tabs and turn off notifications so nothing private pops up. Make the browser text large enough to read. Do a ten-second test recording first and play it back to check the sound. It usually takes a few tries, and that is normal.`
        ],
        terms: [
          ['Screen recording', 'A video of what happens on your screen.'],
          ['Voice-over', 'Your voice explaining what the video shows.'],
          ['Take', 'One attempt at recording.'],
          ['Edit', 'To cut or rearrange a recording.'],
          ['Upload', 'To send a file from your device to a website.'],
          ['Public / unlisted', 'Public videos can be found by anyone. Unlisted videos can be seen only by people with the link.']
        ],
        steps: [
          'Open your demo script from the last lesson.',
          'Close other tabs, turn off notifications, and put example data in your app.',
          'Make a ten-second test recording. Play it back and check the sound.',
          'Record your demo. If you make a mistake, pause, then say the sentence again. You can cut it later, or just start a new take.',
          'Watch the whole video once. Is the screen readable? Can you hear every word?',
          'Save the video file in your project folder.'
        ],
        example: { title: 'Video checklist', text: `Under 3 minutes\nSays my name and the app name\nPurpose in one clear sentence\nSays who the app is for\nNames the tools and languages I used\nShows the app working\nSound is clear, screen is readable\nNothing private on screen` },
        cac: 'The official demonstration video must be 1 to 3 minutes long, uploaded to YouTube or Vimeo, and set to public. It must include each participant\'s name, the app name, the purpose in one clear sentence, the target audience, the tools and coding languages used, and the app\'s functionality. Videos outside the time limit may be penalized.',
        quiz: [
          { q: 'What matters most in a demo video?', a: ['Special effects', 'Clear sound and a readable screen showing the app working', 'Background music', 'A long title sequence'], c: 1, why: 'Viewers need to hear you and see the app. Everything else is extra.' },
          { q: 'Why turn off notifications before recording?', a: ['They use too much battery', 'So nothing private or distracting pops up in your video', 'They make the video longer', 'Recording does not work with them on'], c: 1, why: 'A pop-up message can show private information or distract the viewer.' },
          { q: 'What should you do before recording the full demo?', a: ['Make a short test recording and check the sound', 'Delete your app', 'Memorize your code', 'Nothing'], c: 0, why: 'A quick test catches sound and screen problems before you record the whole thing.' }
        ] },
      { id: '6.4', title: 'Plan version 2.0',
        summary: `You built an app. Take a moment to notice that. Then do what every developer does after a release: look back at what you learned, and look ahead to what comes next. Apps are never really finished. Each version teaches you what the next one should be.`,
        more: [
          `Reflection turns experience into skill. Read through your build journal. What was the hardest problem, and how did you solve it? What would you do differently if you started again? What surprised you about how people used the app?`,
          `Then sketch version 2.0. Use the features you saved for later, plus the feedback from your testers and your demo audience. You do not have to build it now. Having a plan means you know where to start when you are ready.`
        ],
        terms: [
          ['Version', 'One release of your app. The first is often called 1.0.'],
          ['Reflection', 'Thinking carefully about what you did and what you learned.'],
          ['Roadmap', 'A plan for what you will build next, in order.'],
          ['Feedback loop', 'Using what users tell you to improve the next version.'],
          ['Release', 'Making a version of your app available to users.'],
          ['Portfolio', 'A collection of projects that shows what you can do.']
        ],
        steps: [
          'Read your whole build journal from the beginning.',
          'Write what you learned: your hardest problem, how you solved it, and your biggest takeaway.',
          'List three things for version 2.0, from your saved features and your feedback.',
          'Copy everything from your My plan page into your journal for safekeeping.',
          'Share your app link with someone new. You are an app developer now.'
        ],
        example: { title: 'Looking back, looking ahead', text: `Hardest problem: my list disappeared on reload.\nHow I solved it: learned local storage and JSON. Saved after every change.\nBiggest takeaway: build one small piece at a time and test it.\n\nVersion 2.0:\n1. Reminder the night before\n2. Color for each class\n3. A weekly view` },
        fields: [
          { key: 'learned', label: 'What I learned', hint: 'Your hardest problem, how you solved it, and your biggest takeaway.', rows: 4 },
          { key: 'v2', label: 'What I would add in version 2.0', hint: 'Two or three things, and why.', rows: 3 }
        ],
        cac: 'Three of the written questions are answered right here: the technical difficulty you faced and how you addressed it, what you learned and your biggest takeaway, and what you would change in a 2.0 version.',
        quiz: [
          { q: 'Why reflect after finishing a project?', a: ['It is a waste of time', 'Thinking about what worked and what did not makes you better at the next project', 'To find someone to blame', 'Because apps expire'], c: 1, why: 'Reflection turns what happened into lessons you can use again.' },
          { q: 'Where do good ideas for version 2.0 come from?', a: ['Only from guessing', 'Features you saved for later and feedback from real users', 'Copying another app exactly', 'Nowhere, version 1.0 is final'], c: 1, why: 'Your backlog and your users tell you what to build next.' },
          { q: 'What is a roadmap?', a: ['A map of your school', 'A plan for what you will build next, in order', 'A list of bugs you will ignore', 'A kind of loop'], c: 1, why: 'A roadmap keeps future work organized and in priority order.' }
        ] }
    ]
  },
  {
    id: 'c', num: 'c', track: true, title: 'Congressional App Challenge track',
    blurb: 'Optional. Want to enter your app in the Congressional App Challenge? These lessons cover who can enter, the rules, the demo video, and how to submit.',
    milestone: 'Your entry is submitted: a working app, a 1 to 3 minute demo video, and your written answers.',
    topics: [
      { id: 'C.1', title: 'What is the Congressional App Challenge?',
        summary: `The Congressional App Challenge (CAC) is a coding competition for middle and high school students, hosted by Members of the U.S. House of Representatives. You build an app about anything you like, record a short video that shows it working, and answer a few written questions. Each district that takes part picks its own winner, and winning apps are featured on House.gov and on the challenge website.`,
        more: [
          `You do not need to be an expert. The rules allow any topic, any programming language, and any platform, from a website to a phone app to a robot. What judges look for is a good idea, an app that really works, and proof that you understand your own code.`,
          `Your entry has three parts: the app itself, a demonstration video that is 1 to 3 minutes long, and written answers to questions about your app. The main course helps you build the app. This track covers the contest parts.`
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
      { id: 'C.2', title: 'Check that you can enter',
        summary: `Before you write any code, make sure you are allowed to enter. You must be a middle school or high school student on the deadline day, and you must compete in a congressional district that is hosting a challenge. You may enter in the district where you live or the district where you go to school, but only in one of them, and you may submit only one app per year.`,
        more: [
          `Not every district takes part every year. The official site lists the districts that are hosting. If neither your home district nor your school district is on the list, you cannot enter that year, so check early.`,
          `Your app also has to be new. For the 2026 challenge, apps had to be created after October 30, 2025. Expect a similar cutoff for 2027. The safest plan is to start a brand new project. If you improve an older app, only the new code counts.`
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
          'Tell a parent or guardian you plan to enter. Registration asks for their name and email.',
          'Make sure you have a personal email address that is not your school account. Registration requires one.'
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
      { id: 'C.3', title: 'Solo or team?',
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
      { id: 'C.4', title: 'Build by the rules: credits and AI disclosure',
        summary: `The challenge wants to see what you can do. The rules protect that with three requirements: the app must be new, the technical work must be yours, and anything that is not yours must be clearly disclosed. None of this is hard if you keep records while you build. It is very hard to rebuild those records at the last minute.`,
        more: [
          `New means created after the cutoff date. For the 2026 challenge that was October 30, 2025. If you enter a 2.0 version of an older app, only the new coding is considered, so be ready to point out exactly what is new.`,
          `Yours means all coding and technical development is done by you or your team. You may use open-source libraries, frameworks, and external tools, but you must clearly document them, and the project must reflect significant personal effort and technical understanding.`,
          `AI tools are permitted only if all AI use is fully disclosed in your submission materials. AI may support specific parts of the project. It must not be the entire technical development, and you are expected to show significant individual contribution and understanding of your app. Judges may ask for your app and source code, and refusing means disqualification.`
        ],
        terms: [
          ['Cutoff date', 'The date after which your app must have been created.'],
          ['Disclosure', 'Clearly telling the judges what tools, libraries, and AI help you used.'],
          ['Original work', 'Work created by you or your team, not copied.'],
          ['Technical understanding', 'Being able to explain how your own code works.'],
          ['Disqualification', 'Being removed from the contest for breaking a rule.'],
          ['Source code', 'The code you wrote, which judges may ask to see.']
        ],
        steps: [
          'Check your start date. Your first journal entry and your first commit should be after the cutoff date.',
          'Open CREDITS.txt. Make sure every library, framework, tool, image, sound, and font you did not make is listed.',
          'Check your AI use log. Each entry should say what you asked and what you did with the answer.',
          'Practice explaining your code. Pick any function and explain it line by line to someone.',
          'Write a short disclosure paragraph in the box below. You will paste it into your submission.'
        ],
        example: { title: 'A disclosure paragraph', text: `I wrote all of the HTML, CSS, and JavaScript for Homework Planner myself. I used no code libraries. The font is Atkinson Hyperlegible from Google Fonts. I used an AI assistant twice: once to explain an error message, and once to see an example of sorting by date, which I then rewrote for my own data. I can explain every line of my code.` },
        fields: [
          { key: 'disclosure', label: 'My disclosure paragraph', hint: 'What you built yourself, what libraries and tools you used, and exactly how you used AI, if at all.', rows: 5 }
        ],
        quiz: [
          { q: 'A student used an AI assistant to explain two error messages. What do the rules require?', a: ['Nothing, because it was a small use', 'Fully disclosing the AI use in the submission', 'Deleting the app', 'Removing the fixed code'], c: 1, why: 'AI use is permitted only when it is fully disclosed, however small.' },
          { q: 'A team has AI generate the entire app and submits it. Is this allowed?', a: ['Yes, if they disclose it', 'No, AI must not be the entire technical development', 'Yes, if the app works', 'Only for teams of four'], c: 1, why: 'AI may support specific parts only. Students must show significant contribution and understanding.' },
          { q: 'Judges ask to see a team\'s source code and the team refuses. What happens?', a: ['Nothing', 'The submission is disqualified', 'They get extra time', 'They lose one point'], c: 1, why: 'The rules say failing to honor the request results in immediate disqualification.' }
        ] },
      { id: 'C.5', title: 'Make the official demo video',
        summary: `The rules call the demonstration video the most critical part of your application. Judges may never run your app. They learn about it from your video. It must be 1 to 3 minutes long, cover six required things, and be uploaded to YouTube or Vimeo with the visibility set to public.`,
        more: [
          `The six required things are: the name of each participant, the name of the app, the purpose of the app in one clear sentence, the target audience, the tools and coding languages used, and a showcase of the app's functionality. Write a script that checks off each one, and spend most of the time showing the app working.`,
          `The rules say this is not a video-creation competition, so skip fancy effects. Do make it clear and compelling. Stay inside the time limit, because videos that are too short or too long may be penalized. Lesson 6.3 covers how to record. This lesson is about getting the content right.`
        ],
        terms: [
          ['Demonstration video', 'The 1 to 3 minute video that explains and shows your app. The most important part of your entry.'],
          ['Functionality', 'What your app actually does when someone uses it.'],
          ['Target audience', 'The specific people your app is made for.'],
          ['Public', 'A video setting that lets anyone watch. Required by the rules.'],
          ['Penalized', 'Scored lower for breaking a rule.'],
          ['Script', 'A written plan of what you will say and show.']
        ],
        steps: [
          'Write your script in the box below. Cover all six required items.',
          'Read it aloud with a timer. Aim for about two minutes, and never more than three.',
          'Record it using the steps in lesson 6.3.',
          'Watch it with the checklist in the example. Fix anything missing and record again if needed.',
          'With a parent or guardian\'s OK, upload it to YouTube or Vimeo and set it to public.',
          'Open the link in a private browser window to make sure anyone can watch it. Save the link.'
        ],
        example: { title: 'Script that covers all six', text: `1. Names:      "Hi, I'm Maya, and this is my teammate Leo."\n2. App name:   "Our app is called Homework Planner."\n3. Purpose:    "It helps students see what is due next so that nothing gets forgotten."\n4. Audience:   "We built it for middle school students who juggle many classes."\n5. Tools:      "We wrote it in HTML, CSS, and JavaScript, using a browser and GitHub."\n6. Show it:    Add an assignment, show the sorted list, mark one done, reload to show it saves.\n\nClose: one thing we learned, and what we would add next.` },
        fields: [
          { key: 'videoscript', label: 'My official video script', hint: 'Names, app name, one-sentence purpose, audience, tools and languages, then what you will show.', rows: 8 },
          { key: 'videolink', label: 'My video link', hint: 'The public YouTube or Vimeo link, once it is uploaded.', rows: 1 }
        ],
        quiz: [
          { q: 'How long must the demonstration video be?', a: ['Under 30 seconds', '1 to 3 minutes', 'Exactly 5 minutes', 'Any length'], c: 1, why: 'The rules require 1 to 3 minutes. Videos outside that range may be penalized.' },
          { q: 'Which of these is NOT one of the six required items?', a: ['The app\'s purpose in one sentence', 'The tools and coding languages used', 'The number of lines of code', 'The target audience'], c: 2, why: 'The six items are names, app name, purpose, audience, tools and languages, and functionality.' },
          { q: 'What visibility setting must the uploaded video have?', a: ['Private', 'Public', 'Friends only', 'Deleted after a week'], c: 1, why: 'The rules say the video must be set to public.' }
        ] },
      { id: 'C.6', title: 'Register, write your answers, and submit',
        summary: `This is the finish line. You register on the official site, pass a short eligibility quiz, and fill in an application: your video link and written answers to questions about your app. After the submission period ends, nothing can be changed, so submit early and check everything twice.`,
        more: [
          `To register you need a personal email address that is not your school account, your home and school addresses with 9-digit ZIP codes, the congressional district and Member of Congress for each, and a parent or guardian's name and email. A teacher or mentor's name and email is optional. For a team, one member creates the team profile and invites up to three others.`,
          `Expect questions like these: the title of your app, its purpose, what inspired you, what technical difficulty you faced and how you addressed it, what you learned and your biggest takeaway, and what you would change in a 2.0 version. You have already written most of this. Your My plan page holds your purpose, what you learned, and your version 2.0 ideas.`,
          `After the deadline, you will receive a link to an exit questionnaire. Every team member must complete it individually. Winners are chosen by each Member of Congress and announced by that office.`
        ],
        terms: [
          ['Registration', 'Signing up on the official site with your details.'],
          ['Eligibility quiz', 'A short set of questions on the official site that confirms you are allowed to enter.'],
          ['Application', 'The form with your video link and written answers.'],
          ['Submission period', 'The dates when entries are accepted. In 2026 it ran from May to late October.'],
          ['Exit questionnaire', 'A survey every participant fills out after the deadline.'],
          ['Embargo', 'A date before which results cannot be announced.']
        ],
        steps: [
          'Gather your registration details: personal email, both addresses with 9-digit ZIP codes, districts, and your parent or guardian\'s contact.',
          'Register at congressionalappchallenge.us and complete the eligibility quiz. Teams: one person creates the team and invites the others.',
          'Write your answers in a document first, using your My plan page. Fill in the two boxes below for the answers you have not written yet.',
          'Ask someone to proofread your answers.',
          'Paste in your answers and your public video link. Check every field.',
          'Submit at least a week before the deadline. Then watch your email for the exit questionnaire.'
        ],
        example: { title: 'Final submission checklist', text: `Everyone on the team is registered\nI am entering in one district only\nVideo is 1 to 3 minutes, public, and the link works in a private window\nVideo covers all six required items\nEvery written question is answered\nAI use and libraries are fully disclosed\nMy code is ready to share if judges ask\nSubmitted before the deadline\nExit questionnaire done by every team member` },
        fields: [
          { key: 'inspired', label: 'What inspired me to create this app', hint: 'The real moment or person that gave you the idea.', rows: 3 },
          { key: 'difficulty', label: 'A technical difficulty I faced and how I addressed it', hint: 'Pick one from your build journal. Say what broke, how you found the cause, and how you fixed it.', rows: 4 }
        ],
        quiz: [
          { q: 'What kind of email address does registration require?', a: ['Your school email', 'A personal email that is not your school account', 'A teacher\'s email', 'No email is needed'], c: 1, why: 'The rules require a personal email address that is not a school account.' },
          { q: 'You notice a typo in your answers one day after the deadline. What can you do?', a: ['Edit the submission', 'Nothing. Submissions cannot be changed after the period ends', 'Submit a second entry', 'Email a new video'], c: 1, why: 'After the submission period ends, the submission cannot be modified in any way.' },
          { q: 'Who must complete the exit questionnaire?', a: ['Only the team captain', 'Every team member, individually', 'Only the winners', 'Parents'], c: 1, why: 'All members of a team must complete the exit questionnaire individually.' }
        ] }
    ]
  }
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

// A quiz question written as "Question?\n\ncode" is split into q (the question) and st (the code shown with it),
// the same shape the other courses use.
window.AP_UNITS.forEach(u => u.topics.forEach(t => (t.quiz || []).forEach(q => {
  const k = q.q.indexOf('\n\n');
  if (k > 0) { q.st = q.q.slice(k + 2); q.q = q.q.slice(0, k); }
})));

// Automatic lesson scores, used by the course page and the teacher page so both always agree.
// A lesson is worth 10 points: quick check 4 (first try), steps checked off 2, written work 4.
// Written work earns its points when each box is long enough: f.lines (lines) or f.min (words, 5 if not set).
// A lesson with no boxes is scored on the other two parts. The score checks that work is complete,
// not how good it is. Teachers read the writing itself on the teacher page.
window.AB_COUNT = (f, v) => { v = String(v || '').trim(); return !v ? 0 : f.lines ? v.split(/\n+/).filter(x => x.trim()).length : v.split(/\s+/).length; };
window.AB_NEED = f => f.lines || f.min || 5;
window.AB_STEPS = t => t.steps.length + (t.together ? t.together.steps.length : 0);
// s = { done: lesson finished, first: questions right on the first try, steps: steps checked, fields: { key: text } }
window.AB_GRADE = function (t, s) {
  const nq = t.quiz.length, ns = window.AB_STEPS(t), fl = t.fields || [], text = s.fields || {};
  const tried = s.first != null || !!s.done;
  const first = s.first != null ? Math.min(+s.first || 0, nq) : s.done ? nq : 0;
  const steps = Math.min(+s.steps || 0, ns);
  const ok = fl.filter(f => window.AB_COUNT(f, text[f.key]) >= window.AB_NEED(f)).length;
  const ww = fl.length ? 4 : 0;
  const pts = first / nq * 4 + steps / ns * 2 + (fl.length ? ok / fl.length * ww : 0);
  return { pct: Math.round(pts / (6 + ww) * 100), started: tried || steps > 0 || fl.some(f => String(text[f.key] || '').trim()),
    tried, first, questions: nq, steps, stepsOf: ns, written: ok, writtenOf: fl.length };
};
