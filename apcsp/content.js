// AP Computer Science Principles course content. Big Ideas and topic names follow the College Board
// AP CSP course framework; summaries, terms and questions are original.
// Each topic: summary (one paragraph), terms ([word, meaning] pairs). Questions live in questions.js.
window.AP_UNITS = [
  {
    id: 'u1', num: 1, title: 'Creative Development', weight: '10–13%',
    blurb: 'How programs are planned, built, tested, and improved, often by teams working together.',
    topics: [
      { id: '1.1', title: 'Collaboration',
        summary: 'Most computing innovations are built by teams, not lone geniuses. People with different backgrounds notice different problems and ideas, which helps avoid bias and leads to better solutions. Teams use tools like shared documents, version control, and pair programming, where one person types (the driver) while the other reviews and plans (the navigator). Good collaboration also means giving and accepting feedback respectfully.',
        terms: [['Computing innovation', 'A new or improved program, device, or idea that uses computing as a key part of how it works.'], ['Pair programming', 'Two programmers sharing one task: a driver writes the code and a navigator reviews it and plans ahead.'], ['Diverse perspectives', 'Ideas from people with different backgrounds and experiences, which help a team avoid bias and blind spots.'], ['Feedback', 'Comments from users or teammates used to improve a program.']] },
      { id: '1.2', title: 'Program Function and Purpose',
        summary: 'Every program is written for a purpose: to solve a problem or to let people express themselves creatively. A program takes inputs, such as clicks, typed text, or sensor readings, processes them, and produces outputs, such as text, sound, or movement. Many programs are event driven, which means code runs when something happens, like a button being pressed. Describing what a program does, its behavior, is different from describing the code that makes it work.',
        terms: [['Program', 'A collection of instructions that a computer follows to do a task.'], ['Input', 'Data sent to a program, from a user, a device, or another program.'], ['Output', 'Data a program sends out, such as text on a screen, a sound, or a file.'], ['Event', 'An action, like a key press or mouse click, that triggers code to run.']] },
      { id: '1.3', title: 'Program Design and Development',
        summary: 'Programmers follow a development process: investigate the problem, design a plan, build the program, and test it, then repeat. An iterative process cycles through these steps many times, improving the program with each round. An incremental process builds and tests one small piece at a time before adding the next. Programmers write comments and documentation so others, and their future selves, understand the code, and they credit any code they borrow from others.',
        terms: [['Iterative development', 'Repeating the design, build, and test steps to refine a program over many cycles.'], ['Incremental development', 'Building a program in small pieces, testing each piece before adding more.'], ['Documentation', 'Written descriptions of how a program or piece of code works and how to use it.'], ['Comment', 'A note in the code for people to read; the computer ignores it.']] },
      { id: '1.4', title: 'Identifying and Correcting Errors',
        summary: 'Errors are a normal part of programming. A syntax error breaks the rules of the language, so the program will not run. A logic error lets the program run but produces the wrong result. A run-time error happens while the program runs, like dividing by zero, and an overflow error happens when a number is too large to store. Programmers find errors by testing with chosen inputs, including edge cases, tracing code by hand, and adding output statements to check values.',
        terms: [['Syntax error', 'A mistake in the rules of the language, such as a missing bracket, that stops the program from running.'], ['Logic error', 'A mistake in the algorithm that makes the program behave incorrectly or give a wrong answer.'], ['Run-time error', 'An error that happens while the program is running, often stopping it unexpectedly.'], ['Edge case', 'An input at the extreme end of what is allowed, such as 0, an empty list, or the largest value.']] }
    ]
  },
  {
    id: 'u2', num: 2, title: 'Data', weight: '17–22%',
    blurb: 'How computers store everything as bits, shrink data, and turn raw data into useful information.',
    topics: [
      { id: '2.1', title: 'Binary Numbers',
        summary: 'Computers store all data, including numbers, text, images, and sound, as bits, which are 0s and 1s. Binary is base 2, so each place value is a power of 2: 1, 2, 4, 8, 16, and so on. With n bits you can represent 2 to the n different values, so 8 bits (one byte) gives 256 values. Because computers use a fixed number of bits, some values cause overflow errors, and real numbers can only be stored approximately, causing round-off errors.',
        terms: [['Bit', 'A binary digit, 0 or 1; the smallest unit of data in a computer.'], ['Byte', 'A group of 8 bits, which can represent 256 different values.'], ['Binary', 'A base-2 number system that uses only the digits 0 and 1.'], ['Abstraction', 'Hiding details to focus on what matters, such as treating a group of bits as a letter or color.']] },
      { id: '2.2', title: 'Data Compression',
        summary: 'Compression reduces the number of bits needed to store or send data. Lossless compression lets you rebuild the original data exactly, which matters for text and code. Lossy compression throws away some detail to make files much smaller, which works well for photos, music, and video where small losses are hard to notice. Choosing between them is a tradeoff between file size and quality.',
        terms: [['Data compression', 'Reducing the number of bits used to represent data.'], ['Lossless', 'Compression that allows the original data to be restored exactly.'], ['Lossy', 'Compression that permanently removes some data to save more space.'], ['Run-length encoding', 'A lossless method that replaces repeated values with a count, such as AAAA becoming 4A.']] },
      { id: '2.3', title: 'Extracting Information from Data',
        summary: 'Data becomes useful information when we find patterns in it. Large data sets can reveal trends that no single record shows, but they may need cleaning to fix missing, duplicate, or inconsistent values first. Metadata is data about data, such as the date and location a photo was taken. Correlation in data does not prove that one thing causes another, and a data set may be biased if it does not represent everyone it claims to.',
        terms: [['Information', 'The patterns and meaning people get from analyzing data.'], ['Metadata', 'Data that describes other data, such as a file\'s size, author, or creation date.'], ['Data cleaning', 'Fixing or removing incorrect, missing, or inconsistent data before analysis.'], ['Correlation', 'A relationship where two values tend to change together; it does not prove cause.']] },
      { id: '2.4', title: 'Using Programs with Data',
        summary: 'Programs help people process far more data than they could by hand. Common tasks include filtering (keeping only rows that match a condition), sorting, combining data sets, and summarizing with counts, averages, or charts. Visualizations such as bar graphs and maps make patterns easier to see. Spreadsheets and simple programs let anyone ask questions of data, but the answers are only as good as the data that goes in.',
        terms: [['Filter', 'Keeping only the data that meets a condition, such as students in grade 10.'], ['Data visualization', 'A chart, graph, or map that shows data so patterns are easier to see.'], ['Scalability', 'How well a solution keeps working as the amount of data grows.'], ['Data set', 'A collection of related data, often organized in rows and columns.']] }
    ]
  },
  {
    id: 'u3', num: 3, title: 'Algorithms and Programming', weight: '30–35%',
    blurb: 'Variables, conditions, loops, lists, and procedures, written in the AP exam\'s pseudocode.',
    topics: [
      { id: '3.1', title: 'Variables and Assignments',
        summary: 'A variable is a named place to store a value that a program can change later. In AP pseudocode, the arrow assigns a value: score ← 10 stores 10 in score. Assignment replaces the old value, and the right side is calculated first, so score ← score + 1 adds one to the current score. Good variable names describe what they hold, which makes code easier to read.',
        terms: [['Variable', 'A named storage location for a value that can change while the program runs.'], ['Assignment', 'Storing a value in a variable, written with ← in AP pseudocode.'], ['Data type', 'The kind of value stored, such as a number, a string, or a Boolean.'], ['Boolean', 'A value that is either true or false.']] },
      { id: '3.2', title: 'Data Abstraction',
        summary: 'A list is a single variable that holds many values in order, like a list of test scores. Each value is an element, and you reach it by its index. In AP pseudocode, list indexes start at 1, so scores[1] is the first element. Lists are a form of data abstraction: you work with the whole collection by name without managing each value separately, which makes programs shorter and easier to change.',
        terms: [['List', 'An ordered collection of elements stored under one name.'], ['Element', 'One value inside a list.'], ['Index', 'The position number of an element; AP pseudocode starts at 1.'], ['Data abstraction', 'Giving a collection of data one name so it can be used without knowing every detail.']] },
      { id: '3.3', title: 'Mathematical Expressions',
        summary: 'An algorithm is a step-by-step process for completing a task. Every algorithm can be built from three parts: sequencing (steps in order), selection (choosing a path), and iteration (repeating). Expressions combine values and operators to produce a new value. AP pseudocode uses +, -, *, / and MOD, which gives the remainder after division, so 17 MOD 5 is 2. Operators follow the usual order of operations.',
        terms: [['Algorithm', 'A finite set of instructions that completes a task.'], ['Sequencing', 'Running steps one after another in a set order.'], ['Expression', 'A combination of values, variables, and operators that produces a single value.'], ['MOD', 'An operator that gives the remainder after division, for example 17 MOD 5 = 2.']] },
      { id: '3.4', title: 'Strings',
        summary: 'A string is an ordered sequence of characters, such as a word or sentence. Concatenation joins strings end to end, so "data" and "base" become "database". A substring is part of a larger string, like "cat" inside "concatenate". Programs use strings to work with names, messages, passwords, and other text.',
        terms: [['String', 'An ordered sequence of characters, such as "hello".'], ['Concatenation', 'Joining two or more strings end to end.'], ['Substring', 'A part of a string, taken from inside a larger string.'], ['Length', 'The number of characters in a string.']] },
      { id: '3.5', title: 'Boolean Expressions',
        summary: 'A Boolean expression evaluates to true or false. Relational operators compare values: =, ≠, >, <, ≥, and ≤. Logical operators combine conditions: AND is true only when both sides are true, OR is true when at least one side is true, and NOT flips true to false. These expressions are how programs make decisions.',
        terms: [['Boolean expression', 'An expression that evaluates to true or false.'], ['Relational operator', 'An operator that compares two values, such as > or ≠.'], ['AND', 'True only if both conditions are true.'], ['OR', 'True if at least one condition is true.']] },
      { id: '3.6', title: 'Conditionals',
        summary: 'Selection lets a program choose what to do based on a condition. In AP pseudocode, IF (condition) runs a block only when the condition is true, and ELSE gives a second block that runs when it is false. This is how a game decides whether you won, or an app decides whether a password is long enough.',
        terms: [['Selection', 'Choosing which part of an algorithm to run based on a condition.'], ['Conditional statement', 'An IF or IF-ELSE statement that runs code only when a condition is met.'], ['Condition', 'A Boolean expression that decides which path the program takes.'], ['Block', 'A group of statements that run together, shown inside braces or a box.']] },
      { id: '3.7', title: 'Nested Conditionals',
        summary: 'A nested conditional is an IF statement inside another IF statement. The inner condition is checked only when the outer one leads there. Nesting lets programs handle several cases, like assigning letter grades or deciding ticket prices by age and day. Order matters: checking the most specific case first often avoids logic errors.',
        terms: [['Nested conditional', 'A conditional statement placed inside another conditional.'], ['Branch', 'One possible path through a conditional.'], ['Trace', 'Following code step by step by hand to see what it does.'], ['Logic error', 'A mistake that makes code run but give the wrong result.']] },
      { id: '3.8', title: 'Iteration',
        summary: 'Iteration repeats a set of steps. REPEAT n TIMES runs a block a fixed number of times. REPEAT UNTIL (condition) keeps running until the condition becomes true, so it might run zero times or many times. If the condition never becomes true, the loop never stops: an infinite loop. Loops let short programs do huge amounts of work.',
        terms: [['Iteration', 'Repeating part of an algorithm a set number of times or until a condition is met.'], ['REPEAT n TIMES', 'An AP pseudocode loop that runs its block exactly n times.'], ['REPEAT UNTIL', 'An AP pseudocode loop that stops once its condition becomes true.'], ['Infinite loop', 'A loop whose ending condition is never met, so it never stops.']] },
      { id: '3.9', title: 'Developing Algorithms',
        summary: 'Different algorithms can solve the same problem, and some are clearer or faster than others. Programmers often build new algorithms by combining existing ones, such as finding a maximum, computing an average, or counting matches. Two algorithms that look different can still produce the same result for every input. Before writing code, it helps to describe the algorithm in plain steps.',
        terms: [['Algorithm', 'A step-by-step process for solving a problem.'], ['Existing algorithm', 'A known, tested algorithm, such as finding the minimum of a list, that can be reused.'], ['Efficiency', 'How much time or memory an algorithm uses as its input grows.'], ['Equivalent', 'Producing the same output for every possible input.']] },
      { id: '3.10', title: 'Lists',
        summary: 'Programs change lists with built-in procedures. In AP pseudocode, APPEND(list, value) adds to the end, INSERT(list, i, value) adds at position i, REMOVE(list, i) deletes position i, and LENGTH(list) gives the number of elements. FOR EACH item IN list visits every element in order, which is called traversing the list. Accessing an index below 1 or above the length is an error.',
        terms: [['Traversal', 'Visiting each element of a list, usually with a loop.'], ['APPEND', 'Adds a value to the end of a list.'], ['FOR EACH', 'An AP pseudocode loop that runs once for every element in a list.'], ['LENGTH', 'Returns the number of elements in a list.']] },
      { id: '3.11', title: 'Binary Search',
        summary: 'A linear search checks each element one by one and works on any list. A binary search only works on a sorted list: it checks the middle element, then throws away the half that cannot contain the target, repeating until it finds the value or runs out. Each step cuts the list in half, so binary search is much faster on large lists. Searching 1,000 sorted items takes at most about 10 checks.',
        terms: [['Linear search', 'Checking elements one at a time from the start until the target is found.'], ['Binary search', 'Repeatedly checking the middle of a sorted list and discarding half.'], ['Sorted', 'Arranged in order, such as smallest to largest.'], ['Efficiency', 'A measure of how much work an algorithm does as the input grows.']] },
      { id: '3.12', title: 'Calling Procedures',
        summary: 'A procedure is a named group of instructions that can be used again and again. Calling a procedure runs its code. Arguments are the values you pass in when calling it, and they fill the procedure\'s parameters. Some procedures return a value back to the caller, which can be stored in a variable or used in an expression.',
        terms: [['Procedure', 'A named group of instructions that may take parameters and return a value; also called a function.'], ['Procedure call', 'An instruction that runs a procedure.'], ['Argument', 'A value passed into a procedure when it is called.'], ['Return value', 'The value a procedure sends back to the code that called it.']] },
      { id: '3.13', title: 'Developing Procedures',
        summary: 'Writing your own procedures is procedural abstraction: you give a task a name and use it without thinking about the details each time. Parameters make a procedure general, so one procedure like area(width, height) works for any rectangle. Breaking a big problem into smaller procedures makes code easier to read, test, and fix, and a change inside a procedure updates everywhere it is used.',
        terms: [['Procedural abstraction', 'Naming a process so it can be used by knowing what it does, not how.'], ['Parameter', 'A variable in a procedure definition that receives an argument.'], ['Modularity', 'Dividing a program into separate parts that each do one job.'], ['RETURN', 'Ends a procedure and sends a value back to the caller.']] },
      { id: '3.14', title: 'Libraries',
        summary: 'A software library is a collection of procedures that others have already written and tested, such as tools for math, graphics, or maps. Libraries save time because you do not rebuild common tasks. An API, or application program interface, is the documentation that explains what each procedure does, what inputs it needs, and what it returns.',
        terms: [['Library', 'A collection of prewritten procedures that can be used in new programs.'], ['API', 'Application program interface: the specification for how to use a library\'s procedures.'], ['Documentation', 'A description of how a procedure behaves and how to use it.'], ['Reuse', 'Using existing tested code instead of writing it again.']] },
      { id: '3.15', title: 'Random Values',
        summary: 'Programs can generate random numbers to add chance, like rolling dice or shuffling cards. In AP pseudocode, RANDOM(a, b) returns a whole number from a to b, including both ends, and each value is equally likely. Because results change each run, you test random programs by checking the range of possible outputs rather than one exact answer.',
        terms: [['RANDOM(a, b)', 'Returns a random integer from a to b, inclusive.'], ['Inclusive', 'Includes the end values; RANDOM(1, 6) can return 1 or 6.'], ['Probability', 'How likely an outcome is, from 0 (never) to 1 (always).'], ['Nondeterministic', 'Able to give different outputs from the same input on different runs.']] },
      { id: '3.16', title: 'Simulations',
        summary: 'A simulation is a program that models a real-world process, like the spread of a disease or traffic at an intersection. Simulations let people test ideas that would be too expensive, slow, or dangerous to try for real. Every simulation simplifies reality by leaving out details, so its results depend on the assumptions built into it. Random values often stand in for unpredictable events.',
        terms: [['Simulation', 'A program that imitates a real-world process to study or predict it.'], ['Model', 'A simplified representation of something real.'], ['Assumption', 'A simplification or guess built into a model that affects its results.'], ['Bias', 'A tilt in results caused by what a model includes or leaves out.']] },
      { id: '3.17', title: 'Algorithmic Efficiency',
        summary: 'Efficiency describes how much time or memory an algorithm needs as the input size grows. Algorithms that grow at a polynomial rate, like n or n squared steps, run in a reasonable time. Algorithms that grow exponentially, like 2 to the n, quickly become impossible to run for large inputs. For some hard problems, programmers use a heuristic: an approach that finds a good-enough answer quickly instead of the perfect one.',
        terms: [['Efficiency', 'The amount of computing resources an algorithm uses relative to input size.'], ['Reasonable time', 'Running time that grows at a polynomial rate or slower.'], ['Unreasonable time', 'Running time that grows exponentially or faster.'], ['Heuristic', 'A shortcut that gives a good-enough solution when the best one takes too long.']] },
      { id: '3.18', title: 'Undecidable Problems',
        summary: 'A decision problem has a yes-or-no answer, like "is this number even?" A problem is decidable if an algorithm can always give the correct answer for every input. Some problems are undecidable: no algorithm can ever solve them for all inputs. The classic example is the halting problem, which asks whether any given program will eventually stop. A specific case might still be solvable even when the general problem is not.',
        terms: [['Decision problem', 'A problem with a yes-or-no answer.'], ['Decidable', 'Solvable by an algorithm that gives a correct answer for every input.'], ['Undecidable', 'Impossible for any algorithm to answer correctly for all inputs.'], ['Halting problem', 'Deciding whether any program will stop running; proven undecidable.']] }
    ]
  },
  {
    id: 'u4', num: 4, title: 'Computer Systems and Networks', weight: '11–15%',
    blurb: 'How the internet moves data, why it keeps working when parts fail, and how computers share work.',
    topics: [
      { id: '4.1', title: 'The Internet',
        summary: 'The internet is a network of networks that connects computing devices around the world. Data is broken into small packets that travel separately, possibly by different routes, and are reassembled at the destination. Protocols are agreed-upon rules that make this work: IP addresses devices and routes packets, TCP makes sure all packets arrive in order, and HTTP is used for web pages. The World Wide Web is one system that runs on top of the internet, not the internet itself.',
        terms: [['Packet', 'A small chunk of data sent across a network with addressing information.'], ['Protocol', 'An agreed set of rules for how data is sent and received.'], ['IP address', 'A unique number that identifies a device on the internet.'], ['Bandwidth', 'The maximum amount of data that can be sent in a fixed amount of time.']] },
      { id: '4.2', title: 'Fault Tolerance',
        summary: 'The internet was designed to keep working even when parts of it fail. Because there are many paths between devices, packets can be routed around a broken connection. This redundancy costs extra equipment, but it makes the system fault tolerant. The more independent paths there are between two devices, the more failures the connection can survive.',
        terms: [['Fault tolerance', 'The ability of a system to keep working when some parts fail.'], ['Redundancy', 'Extra parts or paths that can take over when others fail.'], ['Route', 'The path packets take from sender to receiver.'], ['Router', 'A device that forwards packets toward their destination.']] },
      { id: '4.3', title: 'Parallel and Distributed Computing',
        summary: 'Sequential computing runs one step at a time, while parallel computing splits a task so several processors work at the same time. Distributed computing spreads work across many separate computers, which allows problems too big for one machine. Speedup is the sequential time divided by the parallel time. Adding processors helps only up to a point, because some steps must still happen in order and processors must coordinate.',
        terms: [['Sequential computing', 'Running operations one at a time, in order.'], ['Parallel computing', 'Breaking a task into parts that run at the same time on multiple processors.'], ['Distributed computing', 'Using many networked computers to work on one problem.'], ['Speedup', 'Sequential running time divided by parallel running time.']] }
    ]
  },
  {
    id: 'u5', num: 5, title: 'Impact of Computing', weight: '21–26%',
    blurb: 'The good and harm computing causes, who gets left out, bias, sharing, ethics, and staying safe online.',
    topics: [
      { id: '5.1', title: 'Beneficial and Harmful Effects',
        summary: 'Computing innovations can help and harm at the same time. A navigation app saves time but can send heavy traffic through quiet neighborhoods. Effects can be intended or unintended, and some only show up after an innovation spreads widely. Responsible developers think about who might be affected, not only the people the product was designed for.',
        terms: [['Beneficial effect', 'A positive result of a computing innovation.'], ['Harmful effect', 'A negative result, which may affect people the creators never considered.'], ['Unintended consequence', 'An effect the creators did not plan or predict.'], ['Impact', 'The effect an innovation has on society, the economy, or culture.']] },
      { id: '5.2', title: 'Digital Divide',
        summary: 'The digital divide is the gap between people who have good access to computing devices and the internet and those who do not. It can depend on income, location, age, disability, or education, and it exists within countries and between them. The divide affects access to school, jobs, health care, and government services. Schools, companies, and governments try to narrow it with programs like low-cost internet and device loans.',
        terms: [['Digital divide', 'Unequal access to computing devices, the internet, and the skills to use them.'], ['Access', 'Being able to use technology when needed.'], ['Broadband', 'High-speed internet service.'], ['Equity', 'Fairness in who gets resources and opportunities.']] },
      { id: '5.3', title: 'Computing Bias',
        summary: 'Computing systems can reflect the biases of the people who build them or of the data used to train them. A face recognition system trained mostly on one group may work poorly on others, and a hiring program trained on past decisions may repeat past unfairness. Bias can enter at any stage, from collecting data to designing the algorithm. Testing with diverse data and diverse teams helps reduce it.',
        terms: [['Bias', 'A tendency that unfairly favors or harms certain groups.'], ['Training data', 'Data used to teach a machine learning system how to make decisions.'], ['Machine learning', 'A way for computers to find patterns in data and improve without being explicitly programmed.'], ['Representative data', 'Data that fairly reflects all the groups a system will be used on.']] },
      { id: '5.4', title: 'Crowdsourcing',
        summary: 'Crowdsourcing gets ideas, services, money, or data from a large group of people, usually online. Examples include online encyclopedias written by volunteers, apps that report traffic, and science projects where the public classifies photos. Citizen science lets ordinary people contribute to real research. The internet makes it easy to reach many contributors, but the quality of crowdsourced data can vary.',
        terms: [['Crowdsourcing', 'Getting input, work, or funding from a large group of people online.'], ['Citizen science', 'Scientific research done with help from members of the public.'], ['Crowdfunding', 'Raising money for a project from many people, each giving a small amount.'], ['Open access', 'Making research or data free for anyone to use.']] },
      { id: '5.5', title: 'Legal and Ethical Concerns',
        summary: 'Creators own the intellectual property they make, like code, music, and images, and copyright law protects it. Licenses tell others how they may use a work: Creative Commons lets creators share with conditions, and open source software lets anyone view and change the code. Using someone\'s work without permission or credit can be illegal or unethical. Easy copying and sharing online make these questions more important.',
        terms: [['Intellectual property', 'Creations of the mind, such as code, music, writing, and images.'], ['Copyright', 'A legal right that protects a creator\'s work from being copied without permission.'], ['Creative Commons', 'A set of licenses that let creators share work under conditions they choose.'], ['Open source', 'Software whose code is freely available for anyone to view, use, and change.']] },
      { id: '5.6', title: 'Safe Computing',
        summary: 'Personally identifiable information (PII), like your name, address, birthday, and location, can be collected and combined to track or impersonate you. Protect accounts with strong passwords and multifactor authentication, which requires two or more kinds of proof. Encryption scrambles data so only someone with the key can read it, and public key encryption lets strangers send private messages. Watch for phishing, malware, and fake Wi-Fi networks that try to steal data.',
        terms: [['PII', 'Personally identifiable information: data that can identify a specific person.'], ['Multifactor authentication', 'Signing in with two or more kinds of proof, such as a password and a code from your phone.'], ['Encryption', 'Scrambling data so only someone with the right key can read it.'], ['Phishing', 'A trick, usually an email or text, that tries to get you to reveal private information.']] }
    ]
  }
];

window.AP_LABS = {};

// Leave title empty to hide every book section.
window.AP_BOOK = {
  title: "Kevin Wellborn's AP® Computer Science Principles Study Guide",
  author: 'Kevin Wellborn',
  tagline: 'A study guide for all 5 Big Ideas, written to go with these free lessons.',
  description: 'Clear explanations of every Big Idea, worked examples in AP pseudocode, vocabulary review, and AP-style practice questions. Watch the matching video lessons on the CyberTeaches YouTube channel.',
  buyUrl: 'https://www.amazon.com/dp/B0HN67PZWG',
  cover: 'book-cover.jpg',
  chapters: {}
};

// CyberTeaches YouTube videos: map from topic id to a YouTube link or video id.
window.AP_VIDEOS = { channelUrl: 'https://www.youtube.com/@cyberteaches', topics: {} };
