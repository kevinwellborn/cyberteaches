/* AP CSP Practice Exam 1 (cyberteaches.com/apcsp/exam/)
   Every question, passage, program and scenario here is original CyberTeaches material.
   People, apps, cities and companies are fictional.
   Question fields:
     id     number shown to students (1-62 single answer, 131-138 select two)
     topic  course topic id, e.g. "3.8" (links to /apcsp/#/topic/3.8)
     stem   HTML
     code   optional pseudocode shown under the stem
     block  true = show code (and code answer choices) in block-based form
     robot  optional robot grid: {rows:[...], r, c, dir}  "." open, "#" blocked, "G" gray goal, "A"-"D" labels
     opts   4 answer choices: a string, or {code:"..."}
     ans    "B" (single) or "AC" (select two)
     set    optional id of a shared stimulus in SETS */
window.CSP_EXAM = {
id: "exam-1",
name: "AP CSP Practice Exam 1",
sets: {
  NET: { html: `<p>The figure below shows a network of computing devices. Each line is a direct connection between two devices.</p>
<svg class="netfig" viewBox="0 0 360 200" role="img" aria-label="Network diagram. Connections: A-B, A-C, B-C, B-D, C-E, D-E, D-F.">
<g class="edges"><line x1="40" y1="100" x2="130" y2="40"/><line x1="40" y1="100" x2="130" y2="160"/><line x1="130" y1="40" x2="130" y2="160"/><line x1="130" y1="40" x2="230" y2="40"/><line x1="130" y1="160" x2="230" y2="160"/><line x1="230" y1="40" x2="230" y2="160"/><line x1="230" y1="40" x2="320" y2="100"/></g>
<g class="nodes"><circle cx="40" cy="100" r="18"/><circle cx="130" cy="40" r="18"/><circle cx="130" cy="160" r="18"/><circle cx="230" cy="40" r="18"/><circle cx="230" cy="160" r="18"/><circle cx="320" cy="100" r="18"/></g>
<g class="labels"><text x="40" y="106">A</text><text x="130" y="46">B</text><text x="130" y="166">C</text><text x="230" y="46">D</text><text x="230" y="166">E</text><text x="320" y="106">F</text></g></svg>` },
  RIDE: { html: `<p><b>Computing innovation: RideNow</b></p>
<p>The city of Riverton launched RideNow, a free smartphone app for its public buses. Every bus carries a GPS receiver that sends the bus's location to a city server every 15 seconds. The app combines these locations with the published bus schedule to predict when the next bus will arrive at each stop.</p>
<p>Riders can tap a button in the app to report that a bus is full or that a stop has a problem, such as a broken bench or a missing sign. These reports appear on a public map that everyone using the app can see.</p>
<p>If a rider gives permission, the app saves the rider's trip history (the stops used and the times of each trip) so that it can suggest faster routes. The city removes riders' names from the trip histories and studies them to decide where new bus routes are needed.</p>
<p>Riders who do not have a smartphone can call a free phone number that reads arrival predictions aloud. The city also installed arrival screens at its 40 busiest stops.</p>` }
},
questions: [
{ id:1, topic:"2.1", stem:"What is the decimal (base 10) value of the binary number <code>101101</code>?", opts:["44","45","54","90"], ans:"B", expl:"From right to left the place values are 1, 2, 4, 8, 16, 32. The 1 bits are in the 32, 8, 4, and 1 places, and 32 + 8 + 4 + 1 = 45." },
{ id:2, topic:"3.5", stem:"A school library lets a person check out a book only if the person has a valid library card and also either owes less than $5 in fines or is a staff member. The Boolean variable <code>cardValid</code> is true when the card is valid, the variable <code>fines</code> holds the amount owed, and the Boolean variable <code>isStaff</code> is true for staff members. Which expression evaluates to true if and only if the person may check out a book?", opts:["(cardValid AND (fines < 5)) OR isStaff","cardValid OR ((fines < 5) AND isStaff)","cardValid AND ((fines < 5) OR isStaff)","cardValid AND (fines < 5) AND isStaff"], ans:"C", expl:"A valid card is always required, so cardValid must be joined with AND to the rest. The second requirement is met by low fines OR staff status. The first choice lets a staff member with an invalid card check out a book, and the last choice requires both low fines and staff status." },
{ id:3, topic:"3.1", stem:"Consider the following code segment.", code:`a ← 4
b ← 7
a ← b
b ← a
DISPLAY(a)
DISPLAY(b)`, stemAfter:"What is displayed as a result of executing the code segment?", opts:["4 7","7 4","7 7","4 4"], ans:"C", expl:"After a ← b, the variable a holds 7 and the original 4 is gone. Then b ← a copies 7 into b. Both variables hold 7. Swapping two values needs a third, temporary variable." },
{ id:4, topic:"4.1", stem:"Which of the following best explains why the Internet uses open protocols, such as TCP and IP, that are freely available to everyone?", opts:["Open protocols allow devices and software made by many different companies to communicate with each other.","Open protocols encrypt all data so that it cannot be read by anyone except the receiver.","Open protocols guarantee that every packet takes the shortest path through the network.","Open protocols prevent any single device from sending more data than other devices."], ans:"A", expl:"Because the rules are public, anyone can build hardware or software that follows them, so devices from different makers can connect and exchange data. Open protocols do not by themselves encrypt data, choose the shortest path, or limit how much a device sends." },
{ id:5, topic:"3.8", block:true, stem:"A code segment is intended to display the following output.<pre class=\"out\">1 4 9 16 25</pre>Which of the following code segments displays the intended output?", opts:[
    { code:`n ← 1
REPEAT 5 TIMES
{
  n ← n + 1
  DISPLAY(n * n)
}` },
    { code:`n ← 1
REPEAT 5 TIMES
{
  DISPLAY(n * 2)
  n ← n + 1
}` },
    { code:`n ← 1
REPEAT 5 TIMES
{
  DISPLAY(n * n)
  n ← n * n
}` },
    { code:`n ← 1
REPEAT 5 TIMES
{
  DISPLAY(n * n)
  n ← n + 1
}` }
  ], ans:"D", expl:"The last segment displays n × n for n = 1, 2, 3, 4, 5, which gives 1 4 9 16 25. The first segment adds 1 before displaying, so it starts at 4 and ends at 36. The second displays 2 4 6 8 10. The third keeps n at 1, so it displays 1 five times." },
{ id:6, topic:"5.6", stem:"Marcus receives an email that appears to come from his school. It says his student account will be closed today unless he clicks a link and types his username and password. Which of the following best describes this email?", opts:["A phishing attempt that tries to trick Marcus into giving away his login information","A computer virus that has already copied itself onto Marcus's computer","A rogue access point that is reading the data Marcus sends over Wi-Fi","A legitimate security check, because it appears to come from the school"], ans:"A", expl:"Phishing uses a message that looks trustworthy, often with urgent language, to get a person to reveal personal information such as a password. Schools and companies do not ask for passwords by email. The email itself is not a virus or a rogue access point." },
{ id:7, topic:"3.9", robot:{ rows:["G...",".#..",".#..","...."], r:3, c:3, dir:"N" }, stem:"The robot in the grid below is represented by the triangle, which starts in the bottom-right square facing toward the top of the grid. The robot cannot move into a black square or off the grid. Which code segment moves the robot to the gray square?", opts:[
    { code:`ROTATE_LEFT()
REPEAT 3 TIMES
{
  MOVE_FORWARD()
}
ROTATE_LEFT()
REPEAT 3 TIMES
{
  MOVE_FORWARD()
}` },
    { code:`REPEAT 3 TIMES
{
  ROTATE_LEFT()
  MOVE_FORWARD()
}` },
    { code:`REPEAT 3 TIMES
{
  MOVE_FORWARD()
}
ROTATE_LEFT()
REPEAT 3 TIMES
{
  MOVE_FORWARD()
}` },
    { code:`REPEAT 3 TIMES
{
  MOVE_FORWARD()
  ROTATE_LEFT()
  MOVE_FORWARD()
  ROTATE_RIGHT()
}` }
  ], ans:"C", expl:"The third segment moves the robot up three squares to the top-right corner, turns it to face left, and moves it three squares to the gray square. The first segment moves left along the bottom row, turns to face down, and tries to leave the grid. The second moves one square left, then turns to face down and tries to leave the grid. The fourth zigzags up and to the left and runs into a black square." },
{ id:8, topic:"1.1", stem:"A team is designing an app to help older adults schedule medical appointments. Which of the following is the best reason for the team to include people of different ages and backgrounds in the design process?", opts:["It guarantees that the app will not contain any errors.","It allows the team to finish the app without testing it.","It reduces the amount of code that the team needs to write.","It brings in more perspectives, which helps the team avoid bias and design an app that works for more users."], ans:"D", expl:"Diverse collaborators notice needs and problems that a single type of person might miss, which helps reduce bias in the design. Collaboration does not remove the need for testing or guarantee error-free code." },
{ id:9, topic:"2.1", stem:"A school wants to give each of its 300 students a unique ID number written in binary. What is the minimum number of bits needed so that every student can have a different ID?", opts:["8","9","10","300"], ans:"B", expl:"With n bits there are 2ⁿ different values. 8 bits give 256 values, which is not enough. 9 bits give 512 values, which is enough for 300 students." },
{ id:10, topic:"3.3", stem:"What value is displayed as a result of executing the following code segment?", code:`x ← 23 MOD 5 + 2 * 3
DISPLAY(x)`, opts:["1","6","9","15"], ans:"C", expl:"MOD and * are done before +. 23 MOD 5 is 3 (23 = 4 × 5 + 3) and 2 * 3 is 6, so x is 3 + 6 = 9. The choice 15 comes from adding before multiplying, and 1 comes from computing 23 MOD 11." },
{ id:11, topic:"2.3", stem:"A smartphone saves several kinds of information when it takes a photo. Which of the following is an example of metadata about the photo?", opts:["The date the photo was taken and the GPS location where it was taken","The colors of the pixels that make up the photo","The faces of the people who appear in the photo","The number of times the photo has been printed"], ans:"A", expl:"Metadata is data that describes other data. The date and location are stored alongside the photo to describe it. The pixel colors are the photo data itself." },
{ id:12, topic:"5.6", stem:"Priya wants to send a message to Leo using public key encryption so that only Leo can read it. Which of the following should happen?", opts:["Priya encrypts the message with her own public key, and Leo decrypts it with Priya's public key.","Priya encrypts the message with Leo's private key, and Leo decrypts it with his public key.","Priya and Leo must first meet in person to agree on one secret key that both of them use.","Priya encrypts the message with Leo's public key, and Leo decrypts it with his private key."], ans:"D", expl:"In public key encryption, anyone can use Leo's public key to encrypt a message, but only Leo's private key can decrypt it. Leo never shares his private key. Agreeing on one shared secret key is symmetric encryption, which public key encryption avoids." },
{ id:13, topic:"3.8", stem:"What value is displayed as a result of executing the following code segment?", code:`n ← 1
count ← 0
REPEAT UNTIL (n > 20)
{
  n ← n * 2
  count ← count + 1
}
DISPLAY(count)`, opts:["4","5","6","32"], ans:"B", expl:"n takes the values 2, 4, 8, 16, and 32. After the fifth time through the loop, n is 32, which is greater than 20, so the loop stops with count equal to 5. The value 32 is n, not count." },
{ id:14, topic:"4.1", stem:"A large video file is sent from a server to a laptop over the Internet. Which of the following is true about how the file is sent?", opts:["The file is broken into packets that may travel along different paths and arrive out of order, and the laptop puts them back in order.","The whole file travels along one fixed path that is reserved for the file until the transfer is finished.","The packets always arrive in the same order they were sent, so no reordering is needed.","If any packet takes a different path from the others, the entire file is lost."], ans:"A", expl:"Data on the Internet is split into packets. Routers send each packet along whatever path is available, so packets can arrive out of order. TCP uses the sequence information in each packet to reassemble the file and request any missing packets." },
{ id:15, topic:"1.2", stem:"Which of the following best describes an event-driven program?", opts:["A program whose statements always run in the same order from the first line to the last line","A program that can only receive input from a file","A program that stops running when an error occurs","A program in which code segments run when actions happen, such as a button being clicked or a key being pressed"], ans:"D", expl:"In event-driven programming, code runs in response to events such as clicks, key presses, or a timer, so the order depends on what the user does." },
{ id:16, topic:"3.7", stem:"An online store uses the following procedure to compute shipping costs. The parameter <code>weight</code> is the package weight in pounds, and the Boolean parameter <code>member</code> is true for store members.", code:`PROCEDURE shipping(weight, member)
{
  IF (weight > 10)
  {
    cost ← 15
  }
  ELSE
  {
    IF (member)
    {
      cost ← 0
    }
    ELSE
    {
      cost ← 5
    }
  }
  RETURN(cost)
}`, opts:["Members ship packages of 10 pounds or less for free, and every package over 10 pounds costs $15 to ship.","Members never pay for shipping, and everyone else pays $5.","Packages that weigh exactly 10 pounds always cost $15 to ship.","Members pay $15 for packages over 10 pounds, and nonmembers pay $5 for every package."], ans:"A", expl:"The outer condition is checked first: any package over 10 pounds costs 15, whether or not the customer is a member. Only packages of 10 pounds or less reach the inner IF, where members pay 0 and nonmembers pay 5. A 10-pound package is not greater than 10, so it does not cost 15." },
{ id:17, topic:"2.2", stem:"In which of the following situations is lossless compression necessary instead of lossy compression?", opts:["Sending a short video clip to friends on a social media app","Storing thousands of vacation photos on a phone with little free space","Streaming music to a phone on a slow cellular connection","Compressing a program file that must work exactly as it did before it was compressed"], ans:"D", expl:"Lossless compression lets the original data be restored exactly. A program file must be restored bit for bit or it will not run correctly. For photos, video, and music, a small loss of quality is usually acceptable in exchange for much smaller files." },
{ id:18, topic:"5.5", stem:"A student finds a photo online that has a Creative Commons license allowing reuse with attribution. Which of the following best describes what the student may do?", opts:["Use the photo in a project, as long as the student gives credit to the photographer as the license requires","Use the photo without giving credit, because anything on the Internet is free to use","Claim the photo as the student's own work","Not use the photo at all, because all online images are protected by copyright"], ans:"A", expl:"A Creative Commons license is the creator's way of giving the public permission to use a work under stated conditions. With an attribution license, the student may use the photo but must credit the creator." },
{ id:19, topic:"3.10", stem:"What is displayed as a result of executing the following code segment?", code:`lst ← [3, 8, 1]
INSERT(lst, 2, 5)
APPEND(lst, 4)
REMOVE(lst, 1)
DISPLAY(lst)`, opts:["[3, 5, 8, 4]","[3, 8, 5, 1, 4]","[5, 3, 8, 1, 4]","[5, 8, 1, 4]"], ans:"D", expl:"INSERT(lst, 2, 5) puts 5 at index 2: [3, 5, 8, 1]. APPEND adds 4 at the end: [3, 5, 8, 1, 4]. REMOVE(lst, 1) removes the item at index 1, which is 3: [5, 8, 1, 4]. REMOVE uses an index, not a value." },
{ id:20, topic:"4.3", stem:"A computer has four tasks that take 30, 20, 40, and 10 seconds. The tasks are independent, so they can run in any order. When run sequentially on one processor, all four take 100 seconds. If the computer has two processors that run in parallel, and each task runs on only one processor, what is the minimum time needed to finish all four tasks?", opts:["40 seconds","50 seconds","60 seconds","100 seconds"], ans:"B", expl:"Split the work as evenly as possible: one processor runs the 40- and 10-second tasks (50 seconds), and the other runs the 30- and 20-second tasks (50 seconds). The parallel solution takes as long as its busiest processor, 50 seconds, which is a speedup of 100 ÷ 50 = 2." },
{ id:21, topic:"2.1", stem:"A game stores each player's number of lives using 4 bits, so it can only represent whole numbers from 0 to 15. A player with 14 lives earns 3 more lives. Which of the following best describes the problem that can occur?", opts:["An overflow error, because 17 is too large to be represented with 4 bits","A round-off error, because the result is not a whole number","A syntax error, because the number of lives was written incorrectly","A lossy compression error, because some bits were removed"], ans:"A", expl:"14 + 3 = 17, but the largest value 4 bits can hold is 15. A result outside the range that a fixed number of bits can represent causes an overflow error." },
{ id:22, topic:"1.4", stem:"A procedure <code>inRange(n)</code> is supposed to return true if <code>n</code> is between 1 and 10, inclusive, and false otherwise. Which set of test inputs would be most useful for checking that the procedure is correct?", opts:["2, 4, 6, 8","5, 50, 500, 5000","1, 2, 3, 4","0, 1, 10, 11"], ans:"D", expl:"Errors often happen at boundaries, for example writing &lt; instead of ≤. The values 0 and 11 are just outside the range, and 1 and 10 are the edge values inside it, so this set checks both boundaries." },
{ id:23, topic:"3.12", stem:"Consider the following procedure.", code:`PROCEDURE f(x)
{
  IF (x MOD 2 = 0)
  {
    RETURN(x / 2)
  }
  ELSE
  {
    RETURN(3 * x + 1)
  }
}`, opts:["3","5","10","16"], ans:"C", stemAfter:"What is displayed by the statement <code>DISPLAY(f(f(6)))</code> ?", expl:"The inner call runs first. 6 is even, so f(6) returns 3. Then f(3) is evaluated: 3 is odd, so it returns 3 × 3 + 1 = 10." },
{ id:24, topic:"5.2", stem:"Which of the following actions would most directly help reduce the digital divide in a community?", opts:["The public library lends free Wi-Fi hotspots and laptops to families who do not have home Internet access.","A company releases a faster model of an expensive smartphone.","A school requires all homework to be submitted online, with no other option.","A website adds more high-resolution videos to its home page."], ans:"A", expl:"The digital divide is the gap between people who have access to computing devices and the Internet and people who do not. Lending hotspots and laptops gives access to people who lacked it. Requiring online-only homework could make the divide worse." },
{ id:25, topic:"3.8", stem:"Which of the following code segments results in an infinite loop?", opts:[
    { code:`i ← 0
REPEAT UNTIL (i > 10)
{
  i ← i + 3
}` },
    { code:`i ← 20
REPEAT UNTIL (i < 0)
{
  i ← i - 5
}` },
    { code:`i ← 1
REPEAT UNTIL (i = 10)
{
  i ← i + 2
}` },
    { code:`i ← 1
REPEAT UNTIL (i ≥ 100)
{
  i ← i * 2
}` }
  ], ans:"C", expl:"In the third segment, i takes the values 1, 3, 5, 7, 9, 11, 13, ... It is always odd, so it never equals 10 and the loop never ends. The other loops reach their stopping conditions (12, −5, and 128)." },
{ id:26, topic:"2.3", stem:"A researcher finds that, in a large data set, cities with more ice cream shops also have more swimming pool accidents. Which of the following is the most appropriate conclusion?", opts:["Ice cream shops cause swimming pool accidents.","The data shows a correlation, but more investigation is needed to find out whether one causes the other, since a third factor such as hot weather may affect both.","Swimming pool accidents cause more ice cream shops to open.","The data must contain an error, because the two values are unrelated."], ans:"B", expl:"A correlation in data does not prove that one thing causes the other. Warm places tend to have both more ice cream shops and more swimming, so a third factor can explain the pattern." },
{ id:27, topic:"3.4", stem:"The procedure <code>substring(str, start, length)</code> returns <code>length</code> characters of the string <code>str</code>, beginning at position <code>start</code>. The first character of a string is at position 1. The procedure <code>concat(str1, str2)</code> returns a single string made of <code>str1</code> followed by <code>str2</code>. What is displayed by the following code segment?", code:`word ← "COMPUTER"
part1 ← substring(word, 1, 3)
part2 ← substring(word, 6, 3)
DISPLAY(concat(part2, part1))`, opts:["COMTER","UTECOM","TERCOM","TERCOMP"], ans:"C", expl:"part1 is the 3 characters starting at position 1: \"COM\". In COMPUTER, position 6 is T, so part2 is \"TER\". concat(part2, part1) puts part2 first: \"TERCOM\"." },
{ id:28, topic:"5.3", stem:"A company builds a program to screen job applications. The program learns from the résumés of people the company hired over the past 20 years, most of whom came from a small number of colleges. Which of the following is the most likely problem?", opts:["The program will run too slowly to be useful.","The program cannot be biased, because computers make decisions without human input.","The program will reject every application it receives.","The program may favor applicants who are similar to past hires, which reflects bias in the data used to train it."], ans:"D", expl:"Computing innovations can reflect existing human biases through the data used to build them. If past hiring favored certain colleges, a program trained on that history will tend to repeat the pattern." },
{ id:29, topic:"1.3", stem:"Before writing any code for a new homework-reminder app, a development team surveys students and interviews teachers. Which of the following best describes the purpose of this step?", opts:["To investigate what users need so the team can define the app's requirements","To find bugs in the app's code","To make the app run faster","To make sure the app follows copyright law"], ans:"A", expl:"Investigating and reflecting comes early in the development process. Surveys and interviews help the team understand users' needs and constraints, which become the program's requirements." },
{ id:30, topic:"3.10", stem:"What value is displayed as a result of executing the following code segment?", code:`nums ← [12, 4, 30, 10, 11]
result ← 0
FOR EACH n IN nums
{
  IF (n MOD 2 = 0)
  {
    result ← result + n
  }
  ELSE
  {
    result ← result - n
  }
}
DISPLAY(result)`, opts:["34","45","56","67"], ans:"B", expl:"Even values are added and odd values are subtracted: 12 + 4 + 30 + 10 − 11 = 45. The choice 56 adds only the even values, and 67 adds all of them." },
{ id:31, topic:"4.1", stem:"The Internet has been changing from IPv4 addresses, which use 32 bits, to IPv6 addresses, which use 128 bits. Which of the following is the main reason for this change?", opts:["IPv6 addresses make data travel faster through each router.","IPv6 allows many more devices to have unique addresses, so the Internet can keep growing.","IPv6 addresses are easier for people to memorize.","IPv6 encrypts every packet automatically."], ans:"B", expl:"32 bits can represent about 4.3 billion addresses, which is not enough for all the devices now online. 128 bits give a vastly larger number of addresses, which supports the Internet's scalability." },
{ id:32, topic:"2.1", stem:"A program adds 0.1 to a variable ten times, starting from 0, and then checks whether the variable equals 1.0. The check is false. Which of the following best explains why?", opts:["An overflow error occurred, because 1.0 is too large to store.","The program has a syntax error in the comparison.","Some decimal numbers, such as 0.1, can only be approximated with a fixed number of bits, so small round-off errors add up.","Computers cannot store numbers that have a decimal point."], ans:"C", expl:"Just as 1/3 cannot be written exactly in decimal, 0.1 cannot be stored exactly in binary with a fixed number of bits. Each addition carries a tiny round-off error, so the total is very close to 1.0 but not exactly 1.0." },
{ id:33, topic:"3.15", stem:"A weather simulation should display \"rain\" with a probability of 30%. Which of the following code segments does this?", opts:[
    { code:`IF (RANDOM(1, 10) < 3)
{
  DISPLAY("rain")
}` },
    { code:`IF (RANDOM(0, 10) ≤ 3)
{
  DISPLAY("rain")
}` },
    { code:`IF (RANDOM(1, 3) = 1)
{
  DISPLAY("rain")
}` },
    { code:`IF (RANDOM(1, 10) ≤ 3)
{
  DISPLAY("rain")
}` }
  ], ans:"D", expl:"RANDOM(1, 10) is equally likely to be any of the 10 integers from 1 to 10. Three of them (1, 2, 3) are ≤ 3, so the probability is 3/10 = 30%. The first choice gives 20%, the second gives 4/11, and the third gives 1/3." },
{ id:34, topic:"5.1", stem:"A fitness app published a public map showing where its users go running. The app's makers intended the map to help people find popular running routes. Which of the following is an example of an unintended harmful effect of this innovation?", opts:["Runners discovered new parks near their homes.","The map revealed the locations of private places, such as the routes people run near their homes, to strangers.","The app encouraged users to exercise more often.","City planners used the map to decide where to add sidewalks."], ans:"B", expl:"Computing innovations can have effects their creators did not plan. Showing exact running routes can expose where people live or work, which harms their privacy and safety. The other choices are beneficial effects." },
{ id:35, topic:"1.4", stem:"The following procedure is intended to return the number of scores in the list <code>scores</code> that are passing, where a passing score is 65 or more.", code:`PROCEDURE countPassing(scores)
{
  count ← 0
  FOR EACH s IN scores
  {
    IF (s > 65)
    {
      count ← count + 1
    }
  }
  RETURN(count)
}`, stemAfter:"Which of the following calls can be used to show that the procedure does not work as intended?", opts:["countPassing([70, 80, 90])","countPassing([40, 50])","countPassing([100])","countPassing([65, 30])"], ans:"D", expl:"The condition s > 65 leaves out a score of exactly 65. For [65, 30], the correct answer is 1, but the procedure returns 0. For the other lists, the procedure happens to return the correct answer, so those tests would not reveal the error." },
{ id:36, topic:"3.9", stem:"The following procedure is intended to return the largest value in a nonempty list of numbers.", code:`PROCEDURE findMax(list)
{
  max ← 0
  FOR EACH v IN list
  {
    IF (v > max)
    {
      max ← v
    }
  }
  RETURN(max)
}`, stemAfter:"For which of the following lists will the procedure NOT return the largest value in the list?", opts:["[-5, -2, -9]","[3, 8, 2]","[0, 0, 0]","[7]"], ans:"A", expl:"max starts at 0. When every value is negative, no value is greater than 0, so the procedure returns 0 instead of −2. Starting with max ← list[1] fixes the error." },
{ id:37, topic:"4.1", stem:"An Internet service provider advertises a plan with a bandwidth of 200 megabits per second. Which of the following best describes what this measures?", opts:["The number of devices that can connect to the network","The maximum amount of data that can be sent in a fixed amount of time","The distance a signal can travel through a cable","The amount of data the provider will store for the customer"], ans:"B", expl:"Bandwidth is the maximum amount of data that can be sent in a fixed amount of time, usually measured in bits per second." },
{ id:38, topic:"2.3", stem:"A school collects the following data for each student: student ID, grade level, average minutes spent reading each day, and favorite book genre. Which of the following questions CANNOT be answered using only this data?", opts:["Which grade level spends the most average time reading each day?","What is the most popular favorite genre among ninth graders?","Do students who read more each day earn higher test scores?","How many students chose mystery as their favorite genre?"], ans:"C", expl:"The data does not include test scores, so it cannot be used to compare reading time with scores. The other questions use only grade level, minutes reading, and genre." },
{ id:39, topic:"3.13", stem:"A programmer writes a procedure <code>drawStar(size)</code> that draws a star of the given size, and then calls it many times with different arguments to draw a night sky. Which of the following best explains how this procedure helps manage complexity?", opts:["It makes the program run faster than any other approach.","It allows the program to draw stars without any code at all.","It guarantees that the program has no errors.","The star-drawing code is written once and reused with different sizes, and a change to how stars are drawn only needs to be made in one place."], ans:"D", expl:"Procedural abstraction lets a programmer reuse code by name, with parameters that make it general. People who call drawStar do not need to know how it works, and fixes or changes happen inside the procedure only." },
{ id:40, topic:"5.4", stem:"A wildlife group asks thousands of volunteers to upload photos of birds they see, with the date and location, so that scientists can track how bird populations move. Which of the following best describes this practice?", opts:["Crowdsourcing, because many people contribute data online to help solve a problem","Data compression, because many photos are combined into one file","Phishing, because the group collects information from strangers","Parallel computing, because the photos are processed on many processors"], ans:"A", expl:"Crowdsourcing is getting input or information from a large number of people, usually over the Internet. This kind of project is also called citizen science." },
{ id:41, topic:"3.11", stem:"A sorted list contains 200 numbers. What is the maximum number of list elements that a binary search must examine to find a value or determine that it is not in the list?", opts:["8","14","100","200"], ans:"A", expl:"Each step of a binary search cuts the remaining part of the list about in half: 200, 100, 50, 25, 12, 6, 3, 1. That is at most 8 elements to examine. A linear search could need to examine all 200." },
{ id:42, topic:"2.1", stem:"Which of the following lists numbers in order from least to greatest?", opts:["decimal 12, binary 1011, binary 1110","binary 1011, decimal 12, binary 1110","binary 1110, decimal 12, binary 1011","binary 1011, binary 1110, decimal 12"], ans:"B", expl:"Binary 1011 is 8 + 2 + 1 = 11 and binary 1110 is 8 + 4 + 2 = 14, so the order 11, 12, 14 is least to greatest." },
{ id:43, topic:"1.4", stem:"A program that calculates movie ticket prices runs without stopping and displays a price for every customer, but children are charged the adult price. Which type of error does the program have?", opts:["A syntax error","A run-time error","A logic error","An overflow error"], ans:"C", expl:"A logic error is a mistake in the algorithm or program that makes it behave incorrectly or unexpectedly, even though it runs. A syntax error stops the program from running, and a run-time error happens while the program is running and usually stops it." },
{ id:44, topic:"3.9", robot:{ rows:["....A","...#.","..D..",".#...",".#C.B"], r:4, c:0, dir:"N" }, stem:"The robot in the grid below starts in the bottom-left square facing toward the top of the grid. The robot cannot move into a black square or off the grid. <code>CAN_MOVE(direction)</code> evaluates to true if there is an open square next to the robot in the given direction, relative to the way the robot is facing. Consider the following code segment.", code:`REPEAT 4 TIMES
{
  REPEAT UNTIL (NOT CAN_MOVE(forward))
  {
    MOVE_FORWARD()
  }
  ROTATE_RIGHT()
}`, stemAfter:"In which labeled square is the robot after the code segment runs?", opts:["Square A","Square B","Square C","Square D"], ans:"C", expl:"Each pass of the outer loop moves the robot forward until it is blocked, then turns it right. Pass 1: up the left column to the top-left corner, then turn to face right. Pass 2: across the top row to square A, then turn to face down. Pass 3: down the right column to square B, then turn to face left. Pass 4: left along the bottom row until the black square stops it in square C." },
{ id:45, topic:"5.6", stem:"Many websites store small files called cookies on a user's computer. Which of the following is a privacy concern about cookies?", opts:["Cookies make a computer's processor run more slowly.","Cookies permanently delete files from the user's computer.","Cookies stop a person from logging in to websites.","Cookies can be used to track the websites a person visits and build a profile of the person's interests."], ans:"D", expl:"Cookies help websites remember a user, for example keeping items in a shopping cart. Some cookies are used to track a person across websites, which lets companies collect information about the person's browsing habits." },
{ id:46, topic:"3.16", stem:"A city uses a computer simulation to test new timing for its traffic lights before changing the real lights. Which of the following is a limitation of using the simulation?", opts:["The simulation lets the city test many timing plans without causing traffic jams on real streets.","The simulation can be run many times quickly and at low cost.","The simulation leaves out some details of real traffic, so its results may not exactly match what would happen on the streets.","The simulation lets the city try timing plans that would be unsafe to test in real life."], ans:"C", expl:"Simulations are simplified models, so they leave out or simplify some real-world details, and their results can differ from reality. The other choices are benefits of simulation." },
{ id:47, topic:"2.4", stem:"A survey asked people to type the state they live in. The results include entries such as \"Texas\", \"TX\", \"texas\", and \"Tex.\" for the same state. Before analyzing the data, a student changes all of these entries to \"TX\". Which of the following best describes what the student is doing?", opts:["Cleaning the data so that it is consistent","Compressing the data so that it uses fewer bits","Encrypting the data so that it is secure","Filtering the data to remove all entries from Texas"], ans:"A", expl:"Cleaning data makes it uniform without changing its meaning, for example making different spellings of the same value consistent. This makes counting and grouping the data accurate." },
{ id:48, topic:"4.2", set:"NET", stem:"Which single connection, if it failed, would prevent device F from communicating with device A?", opts:["The connection between B and D","The connection between D and F","The connection between C and E","The connection between D and E"], ans:"B", expl:"F has only one connection, to D. If the D-F connection fails, F cannot reach any other device. If any one of the other listed connections fails, there is still another path from F through D to A." },
{ id:49, topic:"4.2", set:"NET", stem:"What is the minimum number of connections that would need to fail before device B could no longer communicate with device E?", opts:["1","2","3","4"], ans:"B", expl:"E has only two connections, to C and to D. If both of those fail, E is cut off from B. If only one connection anywhere in the network fails, there is still a path from B to E (for example B-D-E or B-C-E), so 2 is the minimum. This redundancy is what makes the network fault tolerant." },
{ id:50, topic:"3.17", stem:"Three algorithms solve the same problem. For an input of size n, the number of steps each one takes is shown below.<div class=\"tablewrap\"><table class=\"stim\"><tr><th>Algorithm</th><th>Number of steps</th></tr><tr><td>I</td><td>5n + 20</td></tr><tr><td>II</td><td>n³</td></tr><tr><td>III</td><td>2ⁿ</td></tr></table></div>Which of the algorithms run in a reasonable amount of time?", opts:["I only","I and II only","II and III only","I, II, and III"], ans:"B", expl:"Algorithms whose number of steps grows as a polynomial (such as 5n + 20 or n³) run in a reasonable amount of time. An exponential algorithm like 2ⁿ runs in an unreasonable amount of time, because the number of steps doubles every time n increases by 1." },
{ id:51, topic:"5.5", stem:"Which of the following best describes open source software?", opts:["Software that can only be used by the company that wrote it","Software that is sold in a store on a disc","Software whose code is made freely available so that anyone can use, study, and modify it","Software that is free of all errors"], ans:"C", expl:"Open source software is software whose source code is freely available and can be changed and shared, often under a license that sets the terms." },
{ id:52, topic:"3.10", stem:"The following procedure is intended to return the sum of the numbers in the list <code>nums</code>.", code:`PROCEDURE sumList(nums)
{
  total ← 0
  index ← 1
  REPEAT UNTIL (index ≥ LENGTH(nums))
  {
    total ← total + nums[index]
    index ← index + 1
  }
  RETURN(total)
}`, stemAfter:"Which of the following best describes the behavior of the procedure?", opts:["It returns the correct sum for every list.","It returns the sum of all the elements except the first element.","It causes an error because it accesses an index that is not in the list.","It returns the sum of all the elements except the last element."], ans:"D", expl:"The loop stops as soon as index equals LENGTH(nums), before the last element is added. For [4, 6, 9], it returns 4 + 6 = 10 instead of 19. The condition should be index > LENGTH(nums)." },
{ id:53, topic:"1.2", stem:"Which of the following best describes the purpose of adding comments to program code?", opts:["Comments describe how the code works or what it is for, so that people can understand and maintain it.","Comments make the program run faster.","Comments are displayed to the user while the program runs.","Comments are required for the program to run."], ans:"A", expl:"Comments are a form of program documentation. The computer ignores them, but they help the original programmer and other programmers understand the code later." },
{ id:54, topic:"3.18", stem:"Which of the following is true about an undecidable problem?", opts:["It is a problem that can be solved, but only by a very fast computer.","It is a problem for which no algorithm can be written that always gives a correct yes-or-no answer for every possible input.","It is a problem that has no correct answer for any input.","It is a problem that can only be solved with a heuristic."], ans:"B", expl:"An undecidable problem is a decision problem for which no algorithm can always give a correct yes-or-no answer. Some individual cases may still be solvable. A faster computer does not change this." },
{ id:55, topic:"5.6", stem:"A student uses a public computer at a café. Without the student knowing, someone has installed a program on it that records every key pressed. Which of the following is the greatest risk to the student?", opts:["The computer's screen might break.","The student's files on a home computer will be deleted.","Passwords and other private information the student types could be captured and stolen.","The café's Wi-Fi will become slower."], ans:"C", expl:"This is keylogging software, a kind of malware that records keystrokes so an attacker can collect passwords, credit card numbers, and other private data." },
{ id:56, topic:"5.6", stem:"Which of the following is an example of personally identifiable information (PII)?", opts:["The average temperature in a city last July","The number of people who visited a website last week","The name of the most popular song of the year","A person's home address and date of birth"], ans:"D", expl:"PII is information about a person that identifies, links, relates, or describes them, such as an address, a phone number, a Social Security number, or a date of birth." },
{ id:57, topic:"2.2", stem:"A student saves a large photo using lossy compression instead of lossless compression. Which of the following is most likely true?", opts:["The file is smaller, but the original photo cannot be restored exactly.","The file is larger, but the photo is restored exactly.","The file size and the photo quality are both unchanged.","The photo can no longer be opened."], ans:"A", expl:"Lossy compression throws away some information, usually details people do not notice, to make the file much smaller. The original cannot be reconstructed exactly." },
{ id:58, topic:"2.3", set:"RIDE", stem:"Which of the following data does RideNow use to predict when a bus will arrive at a stop?", opts:["The trip histories of riders who gave permission","The locations reported by each bus's GPS receiver, together with the bus schedule","The reports riders make about full buses","The phone numbers of riders who call the phone line"], ans:"B", expl:"The passage says the app combines the buses' GPS locations with the published schedule to predict arrival times. Trip histories are used for route suggestions and planning, not for arrival predictions." },
{ id:59, topic:"5.4", set:"RIDE", stem:"Which feature of RideNow is an example of crowdsourcing?", opts:["Buses sending their GPS locations every 15 seconds","Arrival screens at the 40 busiest stops","Riders reporting full buses and broken benches, which appear on a public map","A phone number that reads arrival predictions aloud"], ans:"C", expl:"The reports come from many riders and are shared for everyone to use, which is crowdsourcing. The GPS data comes from the city's own equipment." },
{ id:60, topic:"5.6", set:"RIDE", stem:"Which of the following is the most likely privacy risk of RideNow?", opts:["The arrival predictions may sometimes be a few minutes late.","Riders may have to wait on the phone to hear predictions.","The public map may show that a bench is broken.","Even without names, a rider's trip history could reveal where the rider lives, works, or goes to school."], ans:"D", expl:"Removing names does not always make data anonymous. A pattern such as a trip that starts at the same stop every morning and returns every evening can point to a specific person's home and workplace." },
{ id:61, topic:"5.2", set:"RIDE", stem:"Which feature of RideNow most directly reduces the effect of the digital divide on bus riders?", opts:["The free phone line and the arrival screens at busy stops","The public map of rider reports","Saving trip histories to suggest faster routes","Updating bus locations every 15 seconds"], ans:"A", expl:"Riders who do not own smartphones can still get arrival information through the phone line and the screens, so they are not left out." },
{ id:62, topic:"5.3", set:"RIDE", stem:"The city uses RideNow trip histories to decide where to add bus routes. Which of the following is a possible harmful effect of this decision?", opts:["The app will stop predicting arrival times.","Neighborhoods where fewer people own smartphones or use the app may be underrepresented in the data, so they may receive fewer new routes.","Riders will no longer be able to report broken benches.","The buses' GPS receivers will use more electricity."], ans:"B", expl:"The data only represents people who use the app and share their histories. Decisions based on it may overlook groups who are missing from the data, which is a form of bias." },
{ id:131, topic:"3.5", multi:true, stem:"The Boolean variables <code>a</code> and <code>b</code> may each be true or false. Which of the following expressions always evaluate to the same value as <code>NOT (a AND b)</code>? Select <b>two</b> answers.", opts:["(NOT a) OR (NOT b)","(NOT a) AND (NOT b)","NOT a AND b","(a = false) OR (b = false)"], ans:"AD", expl:"NOT (a AND b) is false only when both a and b are true. (NOT a) OR (NOT b) is also false only in that case, and (a = false) OR (b = false) means the same thing written another way. (NOT a) AND (NOT b) is true only when both are false, and NOT a AND b is (NOT a) AND b, which is false when a and b are both false." },
{ id:132, topic:"2.3", multi:true, stem:"A music streaming service has data about each song play: the song title, the artist, the length of the song in seconds, the date and time it was played, and the listener's country. Which of the following questions can be answered using only this data? Select <b>two</b> answers.", opts:["What is the average age of listeners in each country?","Which artist's songs were played the most times last month?","Which songs did listeners add to their playlists?","Do more songs get played in the evening than in the morning?"], ans:"BD", expl:"Counting plays by artist and month uses the artist and date and time fields. Comparing evening and morning plays uses the time field. The data has no listener ages and no playlist information." },
{ id:133, topic:"3.10", multi:true, stem:"Which of the following code segments correctly assign to <code>total</code> the sum of all the numbers in a nonempty list <code>nums</code>? Select <b>two</b> answers.", opts:[
    { code:`total ← 0
FOR EACH n IN nums
{
  total ← total + n
}` },
    { code:`total ← 0
FOR EACH n IN nums
{
  total ← n
}` },
    { code:`total ← 0
i ← 1
REPEAT LENGTH(nums) TIMES
{
  total ← total + nums[i]
  i ← i + 1
}` },
    { code:`total ← 0
i ← 0
REPEAT LENGTH(nums) TIMES
{
  total ← total + nums[i]
  i ← i + 1
}` }
  ], ans:"AC", expl:"The first segment adds each element to total. The third visits indexes 1 through LENGTH(nums) and adds each element. The second only keeps the last element, and the fourth starts at index 0, which causes an error because list indexes start at 1." },
{ id:134, topic:"4.3", multi:true, stem:"A research team uses distributed computing, sending pieces of a large problem to many computers over a network. Which of the following are benefits of this approach? Select <b>two</b> answers.", opts:["It can solve problems that would need more time or storage than a single computer has.","It guarantees that every computer finishes its part at the same moment.","It allows a large problem to be solved faster by working on parts at the same time.","It removes the need to send any data over the network."], ans:"AC", expl:"Distributed computing lets a problem use the processing power and storage of many devices, which makes very large problems possible and can make them faster. Computers still need to communicate, and they may finish at different times." },
{ id:135, topic:"2.2", multi:true, stem:"Which of the following statements about lossless data compression are true? Select <b>two</b> answers.", opts:["It allows the original data to be restored exactly.","It always makes files smaller than lossy compression does.","It usually reduces file size by finding and using patterns or repeated data.","It permanently removes details that people are unlikely to notice."], ans:"AC", expl:"Lossless compression works by encoding patterns and repetition more efficiently, and the original can be reconstructed exactly. Lossy compression usually gives smaller files, and removing details is what lossy compression does." },
{ id:136, topic:"5.6", multi:true, stem:"Which of the following actions would best help a person protect online accounts from being taken over by attackers? Select <b>two</b> answers.", opts:["Using the same password for every account so it is easy to remember","Turning on multifactor authentication where it is offered","Sharing passwords with friends so they can help if the person forgets","Using a long, unique password for each account, stored in a password manager"], ans:"BD", expl:"Multifactor authentication requires more than a password, so a stolen password is not enough. Long, unique passwords mean one leaked password does not unlock other accounts. Reusing or sharing passwords increases risk." },
{ id:137, topic:"3.9", multi:true, robot:{ rows:["...G","....",".#..","...."], r:3, c:0, dir:"E" }, stem:"The robot in the grid below starts in the bottom-left square facing right. The robot cannot move into a black square or off the grid. If the robot tries to, it stays in place and the code segment ends. Which of the following code segments move the robot to the gray square? Select <b>two</b> answers.", opts:[
    { code:`REPEAT 3 TIMES
{
  MOVE_FORWARD()
}
ROTATE_LEFT()
REPEAT 3 TIMES
{
  MOVE_FORWARD()
}` },
    { code:`REPEAT 3 TIMES
{
  MOVE_FORWARD()
  ROTATE_LEFT()
  MOVE_FORWARD()
  ROTATE_RIGHT()
}` },
    { code:`ROTATE_LEFT()
REPEAT 3 TIMES
{
  MOVE_FORWARD()
}
ROTATE_RIGHT()
REPEAT 3 TIMES
{
  MOVE_FORWARD()
}` },
    { code:`REPEAT 2 TIMES
{
  REPEAT 3 TIMES
  {
    MOVE_FORWARD()
  }
  ROTATE_RIGHT()
}` }
  ], ans:"AC", expl:"The first segment moves right along the bottom row, turns to face up, and moves up the right column. The third moves up the left column, turns to face right, and moves along the top row. The second runs into the black square on its first zigzag, and the fourth turns to face down at the bottom-right corner and tries to leave the grid." },
{ id:138, topic:"5.3", multi:true, stem:"A team is building a speech-recognition app. Which of the following actions would best help reduce bias in the app? Select <b>two</b> answers.", opts:["Testing the app only with members of the development team","Training the app with recordings of people with many different accents, ages, and speaking styles","Asking a diverse group of users to test the app and report problems","Training the app with recordings from a single region to keep the data simple"], ans:"BC", expl:"Bias can be reduced by using data that represents all the people who will use the app and by testing with a diverse group of users. Using data or testers from a narrow group builds that group's patterns into the app." }
],
wr: { title:"Quiz Score Tracker", intro:`<p>On the real exam, you answer the written response questions about <b>your own</b> Create performance task program, using your Personalized Project Reference (PPR). For this practice exam, use the sample program below instead. A student wrote it to keep track of practice quiz scores.</p>
<p><b>Program purpose:</b> The user types quiz scores one at a time and types −1 when finished. The program shows the average of the passing scores (70 or more) and lists any scores that should be retaken.</p>`, ppr:[
    [
      "Procedure",
      "i",
      "Procedure definition",
      `PROCEDURE averageAtLeast(scores, minScore)
{
  total ← 0
  count ← 0
  index ← 1
  REPEAT UNTIL (index > LENGTH(scores))
  {
    IF (scores[index] ≥ minScore)
    {
      total ← total + scores[index]
      count ← count + 1
    }
    index ← index + 1
  }
  RETURN(total / count)
}`
    ],
    [
      "Procedure",
      "ii",
      "Where the procedure is called",
      `passAvg ← averageAtLeast(quizScores, 70)
DISPLAY("Average of passing quizzes:")
DISPLAY(passAvg)`
    ],
    [
      "List",
      "i",
      "Where data is stored in the list",
      `quizScores ← []
newScore ← INPUT()
REPEAT UNTIL (newScore = -1)
{
  APPEND(quizScores, newScore)
  newScore ← INPUT()
}`
    ],
    [
      "List",
      "ii",
      "Where the data in the list is used",
      `FOR EACH score IN quizScores
{
  IF (score < 70)
  {
    DISPLAY("Retake:")
    DISPLAY(score)
  }
}`
    ]
  ], parts:[
    { q:"Written Response 1", label:"Program Design, Function, and Purpose", prompt:"Another programmer is going to add a new feature to this program. Describe one piece of documentation that would be appropriate to include with this program. Then explain how the other programmer could use that documentation to understand the <code>averageAtLeast</code> procedure.", rubric:"Describes a specific, plausible piece of documentation (for example, a comment, a description of a procedure's parameters and return value, or a design note) AND explains how it would help another <b>programmer</b> understand the code (not just help a user run the program).", sample:"A comment above averageAtLeast could say: \"Returns the average of the values in scores that are greater than or equal to minScore. scores is a list of numbers and minScore is the passing cutoff.\" A programmer adding a feature could read this comment to learn what each parameter means and what value comes back, so they could call the procedure correctly (for example, with a different cutoff) without having to trace every line of the loop." },
    { q:"Written Response 2 (a)", label:"Algorithm Development", prompt:"Consider the first iteration statement in Procedure part (i). Identify the variable(s) and the specific value(s) that cause this loop to stop running, and explain why the loop stops.", rubric:"Identifies <code>index</code> as the variable and explains that the loop stops when <code>index</code> becomes greater than <code>LENGTH(scores)</code> (one more than the number of items), because the REPEAT UNTIL condition becomes true. The values named must actually stop the loop.", sample:"The loop is controlled by the variable index, which starts at 1 and increases by 1 at the end of every pass. The condition is index > LENGTH(scores). If scores holds 5 quiz scores, the loop stops when index becomes 6, because 6 > 5 makes the condition true. At that point every score in the list has been checked once." },
    { q:"Written Response 2 (b)", label:"Errors and Testing", prompt:"Write a call to the <code>averageAtLeast</code> procedure, using specific arguments, that would cause the procedure to not work as intended. Describe what would happen, and explain why it happens based on the code.", rubric:"Gives a call with specific arguments that the procedure accepts, such as <code>averageAtLeast([50, 60], 70)</code> or <code>averageAtLeast([], 70)</code>, AND describes the incorrect behavior (an error from dividing by zero) AND explains why: no score meets <code>minScore</code>, so <code>count</code> stays 0 and the return statement divides <code>total</code> by 0.", sample:"The call averageAtLeast([50, 60], 70) does not work as intended. Neither 50 nor 60 is greater than or equal to 70, so the IF statement never runs its block. count stays at 0, and the statement RETURN(total / count) divides 0 by 0. Dividing by zero causes an error and the program stops instead of showing an average or a message such as \"No passing scores yet.\"" },
    { q:"Written Response 2 (c)", label:"Data and Procedural Abstraction", prompt:"Consider the list <code>quizScores</code> in List part (i). Explain how this list manages complexity in the program. Then describe how the code in List part (ii) would need to be written to work the same way without using the list, or explain why it could not be written without the list.", rubric:"Explains how the list manages complexity (it stores any number of scores under one name so they can be processed with a loop) AND explains how part (ii) would change without the list, or why it could not work without it (the number of scores is not known in advance, so separate variables could not hold them all; a fixed number of variables, each with its own IF statement, would be needed).", sample:"quizScores stores all the scores the user types under one name, no matter how many there are. Because of this, List part (ii) can use one FOR EACH loop to check every score. Without the list, the program would need a separate variable for each score (score1, score2, score3, and so on) and a separate IF statement for each variable. That would not work the same way, because the user can enter any number of scores, so the programmer cannot know ahead of time how many variables and IF statements to write." }
  ] }
};
