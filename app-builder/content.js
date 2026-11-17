// App Builder course content: a self-paced course on designing and building your own app.
// It works for students on their own and for classes. The last unit is an optional track for students who
// want to enter their app in the Congressional App Challenge (CAC).
// Rules facts in the track come from the official 2026 CAC rules. Dates for 2027 are not announced yet; update CAC_INFO when they are.
// Each lesson: summary (one paragraph), more (extra paragraphs), terms ([word, meaning]), steps (things to do),
// example ({ title, text }), fields (fill-in boxes saved in the browser and collected on the My Plan page),
// cac (optional note shown as "For the App Challenge"), blocks (optional note linking to Academy block coding),
// tries (Try it boxes: { mode: 'js' | 'html', title, intro, code, challenge }), quiz ({ q, a, c, why }).
// Lessons with soon: true are listed but not written yet. A unit with track: true is the App Challenge track.
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
          'Set a timer for 10 minutes. List at least 10 problems you or people around you have. Do not judge them yet.',
          'Circle the three you care about most.',
          'For each of the three, write who has the problem and when it happens.',
          'Cross out any that need things you cannot get, like private data or special hardware.',
          'Pick one to explore. You can still change your mind after the next lesson.'
        ],
        example: { title: 'From too big to just right', text: `Too big: "Help people be healthier."\nStill big: "Help teens drink more water."\nJust right: "Remind students on my cross country team to drink water before practice, and let them log it with one tap."` },
        cac: 'Judges score the quality of your idea, including creativity and originality. A small, real problem for a specific group scores better than a copy of a famous app.',
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
          { key: 'learned', label: 'What I learned from talking to people', hint: 'One or two things that surprised you or that more than one person said.', rows: 3 }
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
  { id: 'm2', num: 2, title: 'Design your app', blurb: 'Plan before you code: the one core feature, the screens, and the data your app needs.',
    milestone: 'Sketches of your screens and a feature list split into "must have" and "if there is time."',
    topics: [
      { id: '2.1', title: 'User stories and your one core feature', soon: true },
      { id: '2.2', title: 'Sketch your screens', soon: true },
      { id: '2.3', title: 'Plan your data with privacy first', soon: true },
      { id: '2.4', title: 'Get feedback on your design', soon: true }
    ] },
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
  { id: 'm4', num: 4, title: 'Build the core', blurb: 'Build the one feature your app cannot live without, from start to finish.',
    milestone: 'Your core feature works from start to finish.',
    topics: [
      { id: '4.1', title: 'Break the core feature into small steps', soon: true },
      { id: '4.2', title: 'Save and load data', soon: true },
      { id: '4.3', title: 'Debugging: find and fix errors', soon: true },
      { id: '4.4', title: 'Use libraries and AI the honest way', soon: true },
      { id: '4.5', title: 'Save your history with GitHub', soon: true }
    ] },
  { id: 'm5', num: 5, title: 'Test and polish', blurb: 'Make it easy to use, try to break it, and fix what matters most.',
    milestone: 'A tested app and a short test report.',
    topics: [
      { id: '5.1', title: 'Add your "if there is time" features', soon: true },
      { id: '5.2', title: 'Design that is easy for everyone to use', soon: true },
      { id: '5.3', title: 'Test with three real users', soon: true },
      { id: '5.4', title: 'Clean up and comment your code', soon: true }
    ] },
  { id: 'm6', num: 6, title: 'Share your app', blurb: 'Put your app in front of people: publish it, demo it, and plan what comes next.',
    milestone: 'Your app is online and you have shown it to an audience.',
    topics: [
      { id: '6.1', title: 'Put your app online', soon: true },
      { id: '6.2', title: 'Give a two-minute demo', soon: true },
      { id: '6.3', title: 'Record a demo video', soon: true },
      { id: '6.4', title: 'Plan version 2.0', soon: true }
    ] },
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
      { id: 'C.4', title: 'Build by the rules: credits and AI disclosure', soon: true },
      { id: 'C.5', title: 'Make the official demo video', soon: true },
      { id: 'C.6', title: 'Register, write your answers, and submit', soon: true }
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
