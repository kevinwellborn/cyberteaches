// Course content shared by the student site and the teacher dashboard.
// video: a YouTube link for the lesson (shown in the lesson intro when set).
// Each lesson introduces new blocks (newBlocks). Puzzles in a lesson only offer that lesson's toolbox.
const UNITS = [
  {n:1, title:'Repeat and collect', color:'var(--b-loop)', newBlocks:['collect','repeat'], video:'',
   concept:'Collect every crystal on the map. When the same steps happen again and again, put them inside a repeat block instead of dragging them in over and over.',
   intro:['Your rover is on a crystal survey. Drive onto a crystal and use <b>collect crystal</b> to pick it up.',
          'Lots of crystals in a row? A <b>repeat</b> block runs the blocks inside it as many times as you choose.',
          'Try to match the block goal for 3 stars. Shorter programs are easier to read and fix.']},
  {n:2, title:'Repeat until', color:'var(--b-logic)', newBlocks:['until'], video:'',
   concept:'Sometimes you do not know how many times to repeat. "Repeat until at flag" keeps going until the rover arrives, however far away the flag is.',
   intro:['A plain repeat needs you to count. <b>Repeat until at flag</b> keeps repeating by itself and stops the moment the rover reaches the flag.',
          'Watch out: if the blocks inside never get the rover to the flag, it repeats forever and the rover gets stuck.',
          'You can still use repeat and collect crystal from Lesson 1.']},
  {n:3, title:'Tank battle', color:'var(--b-act)', newBlocks:['fire','iftank','untilclear'], video:'',
   concept:'Drive the rover yourself and blast enemy tanks, then write programs that find and fire on tanks all by themselves.',
   intro:['Puzzle 1 is drive mode. Use the arrow keys (or the buttons) to drive and Space to fire. Every move you make turns into a block in your program.',
          'After that, you write the program first. <b>fire cannon</b> shoots straight ahead until the shell hits a tank or a rock. Shells are limited, so do not waste them.',
          '<b>if tank ahead</b> runs the blocks inside only when a tank is in your line of fire. <b>repeat until no tanks left</b> keeps your patrol going until the job is done.',
          'Careful: a red <b>!</b> means a tank has spotted you. If you are still in front of its cannon after your next move, it fires.']}
];
const UPCOMING = [
  {title:'If / else', blurb:'Pick between two plans, depending on what the rover sees.'},
  {title:'Destroy walls', blurb:'Blast cracked walls, collect charges, and find keys to locked gates.'}
];

// map legend: # rock, . sand, S start, G flag (optional), * crystal, % cracked wall, b charge, k key, D gate, $ coin
// enemy tanks: ^ > v < (the way its cannon points). A map with tanks is won when every tank is destroyed.
// drive:true puzzles are played with the keyboard or buttons instead of a program. shells: cannon shells (default one per tank).
// dir: 0 up, 1 right, 2 down, 3 left. A map with no G is won by collecting every crystal.
const L1 = ['forward','left','right','collect','repeat'];
const L2 = ['forward','left','right','collect','repeat','until'];
const L3 = ['forward','left','right','fire','repeat'];
const LEVELS = [
  {unit:1, title:'Pick it up', dir:1, ideal:3, blocks:L1,
   goal:'Drive onto the crystal and collect it.',
   hint:'Move forward twice so the rover is on top of the crystal, then use "collect crystal".',
   map:['#####','#S.*#','#####']},
  {unit:1, title:'Crystal row', dir:1, ideal:3, blocks:L1,
   goal:'Collect all 4 crystals using only 3 blocks.',
   hint:'Each crystal needs the same two steps: move forward, collect. Put those inside a repeat and set it to 4.',
   map:['#######','#S****#','#######']},
  {unit:1, title:'Every other square', dir:1, ideal:4, blocks:L1,
   goal:'The crystals are spaced out. Collect all 3 with 4 blocks.',
   hint:'Now the steps for each crystal are: forward, forward, collect.',
   map:['#########','#S.*.*.*#','#########']},
  {unit:1, title:'Around the corner', dir:2, ideal:7, blocks:L1,
   goal:'Collect the crystals down the side and along the bottom.',
   hint:'Use one repeat for the column, turn left, then another repeat for the row.',
   map:['######','#S####','#*####','#*####','#****#','######']},
  {unit:1, title:'Crystal stairs', dir:1, ideal:7, blocks:L1,
   goal:'Collect every crystal on the staircase with 7 blocks.',
   hint:'One step of the stairs is: forward, collect, turn right, forward, collect, turn left. Repeat it 3 times.',
   map:['#######','#S*####','##**###','###**##','####*##','#######']},
  {unit:1, title:'Loop inside a loop', dir:1, ideal:5, blocks:L1,
   goal:'Collect all 9 crystals around the rocks. Try putting a repeat inside another repeat.',
   hint:'Each side is "forward, collect" 3 times, then "turn right". Repeat that whole side 3 times.',
   map:['######','#S***#','####*#','####*#','#****#','######']},

  {unit:2, title:'Keep going', dir:1, ideal:2, blocks:L2,
   goal:'No counting needed. Keep moving until the rover reaches the flag.',
   hint:'Put one "move forward" inside "repeat until at flag".',
   map:['############','#S........G#','############']},
  {unit:2, title:'Collect on the way', dir:1, ideal:3, blocks:L2,
   goal:'Collect every crystal on the way to the flag, using 3 blocks.',
   hint:'Inside "repeat until at flag", put "move forward" and then "collect crystal".',
   map:['########','#S****G#','########']},
  {unit:2, title:'Count, then don\'t', dir:1, ideal:5, blocks:L2,
   goal:'Drive along the top, turn, and then keep going until the flag.',
   hint:'Use "repeat 4 times" for the top row, then "turn right", then "repeat until at flag" with "move forward" inside.',
   map:['#######','#S....#','#####.#','#####.#','#####G#','#######']},
  {unit:2, title:'Endless stairs', dir:1, ideal:5, blocks:L2,
   goal:'Climb down the staircase to the flag. You do not need to count the steps.',
   hint:'One step is: forward, turn right, forward, turn left. Put it inside "repeat until at flag".',
   map:['########','#S.#####','##..####','###..###','####..##','#####G##','########']},
  {unit:2, title:'Crystal staircase', dir:1, ideal:7, blocks:L2,
   goal:'Collect every crystal on the stairs, then reach the flag.',
   hint:'One step is: forward, collect, turn right, forward, collect, turn left. Repeat until at flag.',
   map:['########','#S*#####','##**####','###**###','####*G##','########']},

  {unit:3, title:'Drive mode', dir:2, ideal:14, drive:true, shells:5, blocks:['forward','left','right','fire'],
   goal:'You drive! Arrow keys move and turn, Space fires. The tank below is aiming at you, so fire first. Destroy all 3 tanks.',
   hint:'Fire right away to stop the tank below you. Then sneak up on the other two from the side, where their cannons are not pointing.',
   map:['#########','#S..#..v#','#.#.#.#.#','#...>...#','#.#.#.#.#','#^....#.#','#########']},
  {unit:3, title:'Tank row', dir:1, ideal:2, blocks:L3,
   goal:'Three parked tanks are lined up ahead. Destroy them all using only 2 blocks.',
   hint:'Each shell stops at the first tank it hits. Put "fire cannon" inside a repeat set to 3.',
   map:['##########','#S..>.>.>#','##########']},
  {unit:3, title:'Around the corner', dir:1, ideal:4, blocks:L3,
   goal:'The tank is hiding around the corner. Drive there, aim, and fire.',
   hint:'Repeat "move forward" 3 times, turn right so you face the tank, then fire.',
   map:['#######','#S...##','####.##','####.##','####v##','#######']},
  {unit:3, title:'Do not stop', dir:1, ideal:7, blocks:L3,
   goal:'That tank guards the gap. Drive past it without stopping, come around, and hit it from the side.',
   hint:'Crossing in front of a cannon is safe if your next move takes you out again. Repeat forward 5 times, turn right, forward 2 times, turn right, fire.',
   map:['#########','#S.....##','###.##.##','###^...##','#########']},
  {unit:3, title:'Look before you fire', dir:1, ideal:6, blocks:[...L3,'iftank'],
   goal:'Some spaces above the road have tanks and some are empty. You have one shell per tank, so only fire when a tank is ahead.',
   hint:'Repeat 6 times: move forward, turn left, if tank ahead fire cannon, turn right.',
   map:['#########','#.^.^^.^#','#S......#','#########']},
  {unit:3, title:'Auto-pilot', dir:1, ideal:12, blocks:[...L3,'iftank','untilclear'],
   goal:'Write one patrol program that checks above and below the road and keeps going until no tanks are left. The tank at the end of the road is aiming at you!',
   hint:'Repeat until no tanks left: if tank ahead fire; move forward; turn left; if tank ahead fire; turn right; turn right; if tank ahead fire; turn left.',
   map:['###########','#.^.^..^.##','#S.......<#','#..v.v..v.#','###########']}
];
LEVELS.forEach((l,i)=>{ l.n=i+1; l.k=LEVELS.slice(0,i).filter(o=>o.unit===l.unit).length+1 });  // k: puzzle number inside its lesson
